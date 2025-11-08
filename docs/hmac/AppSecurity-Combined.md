# App Security System - Combined Documentation

## Overview

The Pencilbox Quiz mobile app security system provides a comprehensive, multi-layered authentication and authorization framework. It combines HMAC signature verification, JWT token management, device tracking, and security monitoring to create a robust security solution.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Mobile App Client                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 1. HMAC Authenticated Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│           VerifyAppSignature Middleware                      │
│  • HMAC Signature Validation                                 │
│  • Nonce Replay Prevention                                   │
│  • Timestamp Validation                                      │
│  • Client ID Validation                                      │
│  • IP Address Validation                                     │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 2. Validated Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              AppTokenController                               │
│  • Token Generation                                          │
│  • Token Refresh                                             │
│  • Token Revocation                                          │
│  • Device Tracking                                           │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 3. JWT Token Response
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Mobile App Client                         │
│              (Stores JWT Token)                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 4. Bearer Token Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              VerifyAppJwt Middleware                          │
│  • JWT Signature Validation                                  │
│  • Token Expiration Check                                    │
│  • Token Blacklist Check                                     │
│  • Device Binding Validation                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 5. Authenticated Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Protected API Endpoints                         │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. VerifyAppSignature Middleware

**Purpose**: Validates HMAC signatures for token generation endpoints

**Key Features**:
- Simple HMAC SHA256 signature validation
- Nonce-based replay attack prevention
- Timestamp freshness validation
- Client ID verification
- IP address validation (production)
- Device tracking
- Suspicious activity detection

**Documentation**: [VerifyAppSignature.md](./VerifyAppSignature.md)

### 2. VerifyAppJwt Middleware

**Purpose**: Validates JWT tokens for protected API endpoints

**Key Features**:
- JWT signature and structure validation
- Token expiration and not-before claims
- Token blacklist checking
- Audience and issuer validation
- Device binding (optional)
- Secret rotation support
- Suspicious activity detection

**Documentation**: [VerifyAppJwt.md](./VerifyAppJwt.md)

### 3. AppTokenController

**Purpose**: Manages JWT token lifecycle

**Key Features**:
- Token generation
- Token refresh
- Token revocation
- Token information retrieval
- Device tracking
- Security audit logging

**Documentation**: [AppTokenController.md](./AppTokenController.md)

## Authentication Flow

### Step 1: Generate Token

```
1. Client generates HMAC signature:
   - String to sign: method + uri + nonce + timestamp + clientId
   - Signature: HMAC-SHA256(stringToSign, clientSecret)

2. Client sends request with headers:
   - X-App-Signature: <signature>
   - X-App-Nonce: <unique-nonce>
   - X-App-Timestamp: <unix-timestamp>
   - X-App-Client-ID: <client-id>
   - X-Device-ID: <device-id> (optional)

3. VerifyAppSignature middleware validates:
   - Signature matches
   - Nonce is unique
   - Timestamp is fresh
   - Client ID is valid

4. AppTokenController generates JWT token:
   - Creates unique JTI
   - Builds JWT payload
   - Signs with JWT secret
   - Stores JTI in Redis
   - Tracks device

5. Client receives JWT token:
   - access_token: <jwt-token>
   - expires_in: <seconds>
   - jti: <token-id>
```

### Step 2: Use Token

```
1. Client includes token in requests:
   - Authorization: Bearer <jwt-token>
   - X-Device-ID: <device-id> (if device binding enabled)

2. VerifyAppJwt middleware validates:
   - JWT signature
   - Token expiration
   - Token blacklist status
   - Device binding (if enabled)

3. Request proceeds to controller:
   - JWT payload attached to request
   - Device ID available in attributes
```

### Step 3: Refresh Token

```
1. Client sends refresh request:
   - Authorization: Bearer <current-token>

2. AppTokenController:
   - Validates current token
   - Generates new token
   - Blacklists old token
   - Returns new token

3. Client updates stored token
```

### Step 4: Revoke Token

```
1. Client sends revoke request:
   - Authorization: Bearer <token>

2. AppTokenController:
   - Decodes token
   - Blacklists token in Redis
   - Logs revocation event

3. Token can no longer be used
```

## Security Features

### 1. HMAC Signature Protection

**Purpose**: Prevent request tampering and ensure authenticity

**Implementation**:
- Simple string-to-sign: `method + uri + nonce + timestamp + clientId`
- HMAC SHA256 signature
- Constant-time comparison to prevent timing attacks

**Configuration**:
```php
'hmac' => [
    'algorithm' => 'sha256',
    'timestamp_tolerance' => 120, // 2 minutes
    'nonce_ttl' => 300, // 5 minutes
]
```

### 2. Nonce Replay Prevention

**Purpose**: Prevent replay attacks

**Implementation**:
- Unique nonce required per request
- Nonces stored in Redis with TTL
- Reused nonces rejected immediately

**Storage**:
- Redis key: `app:nonce:{nonce}`
- TTL: 5 minutes (configurable)

### 3. Timestamp Validation

**Purpose**: Prevent replay of old requests

**Implementation**:
- Unix timestamp required in request
- Must be within tolerance window (default: 2 minutes)
- Rejects requests outside window

**Configuration**:
```php
'hmac' => [
    'timestamp_tolerance' => 120, // seconds
]
```

### 4. JWT Token Management

**Purpose**: Secure, stateless authentication

**Features**:
- Short-lived tokens (default: 120 minutes)
- Unique JTI per token
- Token blacklisting support
- Secret rotation support

**Token Structure**:
```json
{
    "iss": "Pencilbox Quiz",
    "aud": "pencilbox-quiz-mobile",
    "iat": 1699123456,
    "exp": 1699125856,
    "jti": "unique-token-id",
    "device_id": "device-uuid",
    "scope": "api"
}
```

### 5. Device Binding

**Purpose**: Prevent token theft and unauthorized device usage

**Implementation**:
- Device ID embedded in JWT token
- Device ID must match request header
- Prevents cross-device token usage

**Configuration**:
```php
'device' => [
    'binding_enabled' => true,
    'header_name' => 'X-Device-ID',
]
```

### 6. Token Blacklisting

**Purpose**: Immediate token revocation

**Implementation**:
- Revoked tokens stored in Redis
- TTL set to token expiration time
- Checked on every request

**Storage**:
- Redis key: `app:blacklist:{jti}`
- TTL: Until token naturally expires

### 7. Suspicious Activity Detection

**Purpose**: Automatic threat detection and blocking

**Implementation**:
- Tracks failed authentication attempts
- Blocks IP/device after threshold
- Configurable thresholds and durations

**Configuration**:
```php
'rate_limiting' => [
    'suspicious_threshold' => 5,
    'block_duration' => 900, // 15 minutes
]
```

### 8. Security Audit Logging

**Purpose**: Track security events for monitoring and forensics

**Events Logged**:
- Signature verification (success/failure)
- Token generation
- Token refresh
- Token revocation
- Suspicious activity
- IP/device blocking

**Storage**:
- Database: `security_audit_logs` table
- File logs: Configured logging channel
- Structured JSON format

## Configuration

### Environment Variables

```env
# Client Configuration
APP_CLIENT_ID=pencilbox-quiz-mobile
APP_CLIENT_SECRET=your-secure-secret-here

# JWT Configuration
JWT_APP_SECRET=your-jwt-secret-here
JWT_TTL=120
JWT_REFRESH_TTL=60

# HMAC Configuration
HMAC_NONCE_TTL=300
HMAC_TIMESTAMP_TOLERANCE=120

# Device Binding
DEVICE_BINDING_ENABLED=true

# Rate Limiting
SUSPICIOUS_THRESHOLD=5
BLOCK_DURATION=900

# Secret Rotation
SECRET_ROTATION_ENABLED=true
JWT_PREVIOUS_SECRETS=old-secret-1,old-secret-2

# Logging
SECURITY_LOG_CHANNEL=security
SECURITY_LOG_LEVEL=info
SECURITY_STRUCTURED_LOGS=true
```

### Configuration File

All settings in `config/appsecurity.php`:

- `client` - Client ID and secret
- `jwt` - JWT token settings
- `hmac` - HMAC signature settings
- `device` - Device binding settings
- `rate_limiting` - Rate limiting and blocking
- `redis_keys` - Redis key patterns
- `logging` - Security logging configuration
- `secret_rotation` - Secret rotation settings

## Request/Response Examples

### Generate Token Request

```http
POST /api/v1/auth/app-token HTTP/1.1
Host: api.example.com
X-App-Signature: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
X-App-Nonce: 550e8400-e29b-41d4-a716-446655440000
X-App-Timestamp: 1699123456
X-App-Client-ID: pencilbox-quiz-mobile
X-Device-IP: 203.0.113.42
X-Device-ID: device-uuid-123
X-Device-Type: iOS
Content-Type: application/json
```

**Response**:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "scope": "api",
    "jti": "550e8400-e29b-41d4-a716-446655440000"
}
```

### Protected API Request

```http
GET /api/v1/user/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
X-Device-ID: device-uuid-123
Content-Type: application/json
```

## Error Codes

### HMAC Authentication Errors

| Code | Description |
|------|-------------|
| `MISSING_HEADERS` | Required security headers missing |
| `INVALID_CLIENT_ID` | Invalid client ID |
| `INVALID_TIMESTAMP` | Request timestamp is too old or invalid |
| `NONCE_REUSE` | Nonce has already been used |
| `INVALID_SIGNATURE` | Invalid HMAC signature |

### JWT Authentication Errors

| Code | Description |
|------|-------------|
| `MISSING_TOKEN` | Authorization token missing |
| `INVALID_TOKEN` | Invalid JWT token |
| `TOKEN_EXPIRED` | JWT token has expired |
| `INVALID_SIGNATURE` | JWT signature is invalid |
| `TOKEN_REVOKED` | Token has been revoked |
| `DEVICE_MISMATCH` | Device binding validation failed |

### Token Management Errors

| Code | Description |
|------|-------------|
| `DEVICE_ID_REQUIRED` | Device ID is required for token generation |
| `TOKEN_GENERATION_FAILED` | Failed to generate access token |
| `TOKEN_REFRESH_FAILED` | Failed to refresh access token |
| `TOKEN_REVOCATION_FAILED` | Failed to revoke token |

## Security Best Practices

### 1. Client Implementation

- **Store Secrets Securely**: Use secure storage (keychain/keystore)
- **Generate Strong Nonces**: Use UUIDs or cryptographically random values
- **Synchronize Clocks**: Use NTP for accurate timestamps
- **Handle Errors Gracefully**: Implement retry logic with backoff
- **Rotate Tokens**: Refresh tokens before expiration
- **Revoke on Logout**: Always revoke tokens on user logout

### 2. Server Configuration

- **Use Strong Secrets**: Generate cryptographically secure secrets
- **Enable Device Binding**: Prevent token theft
- **Set Appropriate TTLs**: Balance security with usability
- **Monitor Logs**: Regularly review security audit logs
- **Rotate Secrets**: Implement secret rotation strategy
- **Use HTTPS Only**: Never allow unencrypted connections
- **Implement Rate Limiting**: Protect against brute force attacks

### 3. Monitoring and Alerting

- **Track Failed Attempts**: Monitor signature and token validation failures
- **Alert on Suspicious Activity**: Set up alerts for threshold breaches
- **Monitor Token Usage**: Track token generation, refresh, and revocation patterns
- **Review Audit Logs**: Regularly review security audit logs
- **Track Device Activity**: Monitor device registration and usage

## Troubleshooting Guide

### Common Issues

#### 1. Signature Validation Fails

**Symptoms**: `INVALID_SIGNATURE` error

**Causes**:
- Secret mismatch
- Incorrect string-to-sign format
- URL encoding issues
- Clock skew

**Solutions**:
- Verify client secret matches server
- Log and compare string-to-sign
- Ensure URI matches exactly
- Synchronize clocks

#### 2. Nonce Already Used

**Symptoms**: `NONCE_REUSE` error

**Causes**:
- Client reusing nonces
- Redis TTL issues
- Duplicate requests

**Solutions**:
- Generate new UUID per request
- Check Redis connectivity
- Implement request deduplication

#### 3. Token Expired

**Symptoms**: `TOKEN_EXPIRED` error

**Causes**:
- Token TTL too short
- Client not refreshing
- Clock skew

**Solutions**:
- Increase JWT TTL if needed
- Implement refresh before expiration
- Synchronize clocks

#### 4. Device Binding Fails

**Symptoms**: `DEVICE_MISMATCH` error

**Causes**:
- Device ID missing from token
- Device ID missing from header
- Device ID mismatch

**Solutions**:
- Include device ID when generating token
- Include device ID in requests
- Verify device IDs match

## API Endpoints Summary

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v1/auth/app-token` | POST | HMAC | Generate new JWT token |
| `/api/v1/auth/app-token/refresh` | POST | JWT | Refresh existing token |
| `/api/v1/auth/app-token/revoke` | POST | JWT | Revoke token |
| `/api/v1/auth/app-token/info` | GET | JWT | Get token information |

## Related Documentation

- [VerifyAppSignature.md](./VerifyAppSignature.md) - HMAC signature middleware
- [VerifyAppJwt.md](./VerifyAppJwt.md) - JWT verification middleware
- [AppTokenController.md](./AppTokenController.md) - Token management controller
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - General API documentation
- [api-overview.md](./api-overview.md) - API overview

## Support

For issues or questions:

- **Documentation**: See individual component documentation
- **Configuration**: Check `config/appsecurity.php`
- **Logs**: Review security audit logs
- **Support**: Contact your administrator

---

**Last Updated**: November 2025  
**System Status**: ✅ Production Ready  
**Version**: 1.0

