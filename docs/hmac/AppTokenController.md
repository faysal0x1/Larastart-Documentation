# AppTokenController Documentation

## Overview

The `AppTokenController` handles JWT token generation, refresh, and revocation for mobile app authentication. It provides OAuth-lite functionality with short-lived tokens and secure token management.

## Purpose

This controller manages the complete token lifecycle:

- **Token Generation** - Creates new JWT tokens for authenticated clients
- **Token Refresh** - Issues new tokens while invalidating old ones
- **Token Revocation** - Blacklists tokens to prevent further use
- **Token Information** - Provides token metadata and claims
- **Device Tracking** - Tracks device information for security
- **Security Logging** - Logs all token-related events

## Endpoints

### 1. Generate Token

**Endpoint:** `POST /api/v1/auth/app-token`

Generates a new JWT access token for the authenticated client.

#### Request Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `X-App-Signature` | Yes | HMAC signature | `a1b2c3d4...` |
| `X-App-Nonce` | Yes | Unique nonce | `550e8400-...` |
| `X-App-Timestamp` | Yes | Unix timestamp | `1699123456` |
| `X-App-Client-ID` | Yes | Client ID | `pencilbox-quiz-mobile` |
| `X-Device-ID` | Conditional* | Device identifier | `device-uuid-123` |
| `X-Device-Type` | No | Device type | `iOS`, `Android` |
| `X-Device-Model` | No | Device model | `iPhone 14 Pro` |
| `X-OS-Version` | No | OS version | `iOS 17.0` |
| `X-App-Version` | No | App version | `1.2.3` |

*Required if device binding is enabled

#### Request Body

None required (empty body or `{}`)

#### Response (Success)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "scope": "api",
    "jti": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### Response (Error)

```json
{
    "error": "DEVICE_ID_REQUIRED",
    "message": "Device ID is required for token generation"
}
```

#### Token Payload Structure

```json
{
    "iss": "Pencilbox Quiz",
    "aud": "pencilbox-quiz-mobile",
    "iat": 1699123456,
    "nbf": 1699123456,
    "exp": 1699125856,
    "jti": "550e8400-e29b-41d4-a716-446655440000",
    "device_id": "device-uuid-123",
    "scope": "api"
}
```

### 2. Refresh Token

**Endpoint:** `POST /api/v1/auth/app-token/refresh`

Refreshes an existing JWT token by issuing a new token and blacklisting the old one.

#### Request Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `Authorization` | Yes | Bearer token | `Bearer eyJhbGci...` |
| `X-Device-ID` | Conditional* | Device identifier | `device-uuid-123` |

*Required if device binding is enabled

#### Request Body

None required

#### Response (Success)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "scope": "api",
    "jti": "new-uuid-here"
}
```

#### Response (Error)

```json
{
    "error": "MISSING_TOKEN",
    "message": "Authorization token missing"
}
```

```json
{
    "error": "INVALID_TOKEN",
    "message": "Invalid or expired token"
}
```

```json
{
    "error": "TOKEN_REVOKED",
    "message": "Token has been revoked"
}
```

### 3. Revoke Token

**Endpoint:** `POST /api/v1/auth/app-token/revoke`

Revokes (blacklists) a JWT token to prevent further use.

#### Request Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `Authorization` | Yes | Bearer token | `Bearer eyJhbGci...` |

#### Request Body

None required

#### Response (Success)

```json
{
    "message": "Token revoked successfully",
    "revoked_at": "2025-11-15T10:30:00.000000Z"
}
```

#### Response (Error)

```json
{
    "error": "MISSING_TOKEN",
    "message": "Authorization token missing"
}
```

```json
{
    "error": "INVALID_TOKEN",
    "message": "Invalid token format"
}
```

### 4. Token Information

**Endpoint:** `GET /api/v1/auth/app-token/info`

Retrieves information about the current JWT token.

#### Request Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `Authorization` | Yes | Bearer token | `Bearer eyJhbGci...` |

#### Request Body

None required

#### Response (Success)

```json
{
    "jti": "550e8400-e29b-41d4-a716-446655440000",
    "device_id": "device-uuid-123",
    "scope": "api",
    "issued_at": "2025-11-15T10:00:00.000000Z",
    "expires_at": "2025-11-15T12:00:00.000000Z",
    "issued_by": "Pencilbox Quiz",
    "audience": "pencilbox-quiz-mobile"
}
```

#### Response (Error)

```json
{
    "error": "NO_TOKEN_PAYLOAD",
    "message": "No token payload available"
}
```

## Token Lifecycle

### 1. Token Generation

```
Client Request (HMAC Auth)
    ↓
VerifyAppSignature Middleware
    ↓
AppTokenController::generateToken()
    ↓
Create JWT Payload
    ↓
Generate JWT Token
    ↓
Store JTI in Redis
    ↓
Track Device (if provided)
    ↓
Return Token to Client
```

### 2. Token Usage

```
Client Request (Bearer Token)
    ↓
VerifyAppJwt Middleware
    ↓
Validate Token
    ↓
Check Blacklist
    ↓
Validate Device Binding
    ↓
Attach Payload to Request
    ↓
Controller Processing
```

### 3. Token Refresh

```
Client Request (Bearer Token)
    ↓
VerifyAppJwt Middleware (optional)
    ↓
AppTokenController::refreshToken()
    ↓
Decode Current Token
    ↓
Check Blacklist
    ↓
Generate New Token
    ↓
Blacklist Old Token
    ↓
Store New JTI
    ↓
Return New Token
```

### 4. Token Revocation

```
Client Request (Bearer Token)
    ↓
AppTokenController::revokeToken()
    ↓
Decode Token
    ↓
Blacklist Token
    ↓
Track Device
    ↓
Return Success
```

## Configuration

All settings are configured in `config/appsecurity.php`:

```php
'jwt' => [
    'secret' => env('JWT_APP_SECRET'),
    'algorithm' => 'HS256',
    'issuer' => env('APP_NAME', 'Pencilbox Quiz'),
    'audience' => env('APP_CLIENT_ID', 'pencilbox-quiz-mobile'),
    'ttl' => env('JWT_TTL', 120), // minutes
],

'device' => [
    'binding_enabled' => env('DEVICE_BINDING_ENABLED', true),
    'header_name' => 'X-Device-ID',
],

'redis_keys' => [
    'jti_prefix' => 'app:jti:',
    'blacklist_prefix' => 'app:blacklist:',
],
```

## Implementation Details

### Token Generation

```php
// Generate unique JTI
$jti = Str::uuid()->toString();

// Create payload
$payload = [
    'iss' => config('appsecurity.jwt.issuer'),
    'aud' => config('appsecurity.jwt.audience'),
    'iat' => time(),
    'nbf' => time(),
    'exp' => time() + (config('appsecurity.jwt.ttl') * 60),
    'jti' => $jti,
    'device_id' => $deviceId,
    'scope' => 'api',
];

// Generate JWT
$token = JWT::encode($payload, $secret, 'HS256');

// Store JTI in Redis
$key = 'app:jti:' . $jti;
$ttl = $payload['exp'] - time();
Redis::setex($key, $ttl, 'active');
```

### Token Refresh

```php
// Decode current token
$currentPayload = $this->decodeJwt($currentToken);

// Check if blacklisted
if ($this->isTokenBlacklisted($currentPayload['jti'])) {
    return error_response('TOKEN_REVOKED');
}

// Generate new token
$newJti = Str::uuid()->toString();
$newPayload = $this->createJwtPayload($newJti, $deviceId, $scope);
$newToken = $this->generateJwt($newPayload);

// Blacklist old token
$this->blacklistToken($currentPayload['jti'], $currentPayload['exp']);

// Store new JTI
$this->storeJti($newJti, $newPayload['exp']);
```

### Token Revocation

```php
// Decode token
$payload = $this->decodeJwt($token);

// Blacklist token
$key = 'app:blacklist:' . $payload['jti'];
$ttl = max(0, $payload['exp'] - time());
if ($ttl > 0) {
    Redis::setex($key, $ttl, 'revoked');
}
```

## Security Features

### Device Tracking

The controller automatically tracks device information:

- **Device Creation**: Creates device record if doesn't exist
- **Metadata**: Stores device type, model, OS version, app version
- **Last Seen**: Updates last seen IP, user agent, request URI
- **Block Checking**: Rejects requests from blocked devices

### Security Audit Logging

All token events are logged:

- **Database**: Stored in `security_audit_logs` table
- **File Logs**: Written to configured logging channel
- **Events Logged**:
  - `token_generated` - New token created
  - `token_refreshed` - Token refreshed
  - `token_revoked` - Token revoked

### Token Blacklisting

Revoked tokens are stored in Redis:

- **Key Pattern**: `app:blacklist:{jti}`
- **TTL**: Set to token expiration time
- **Purpose**: Prevent reuse of revoked tokens

### JTI Tracking

Active tokens are tracked in Redis:

- **Key Pattern**: `app:jti:{jti}`
- **TTL**: Set to token expiration time
- **Purpose**: Track active tokens for monitoring

## Error Handling

### Common Errors

| Error Code | HTTP Status | Description |
|------------|-------------|-------------|
| `DEVICE_ID_REQUIRED` | 400 | Device ID required but missing |
| `MISSING_TOKEN` | 400 | Authorization token missing |
| `INVALID_TOKEN` | 401 | Invalid or expired token |
| `TOKEN_REVOKED` | 401 | Token has been revoked |
| `TOKEN_GENERATION_FAILED` | 500 | Internal error during generation |
| `TOKEN_REFRESH_FAILED` | 500 | Internal error during refresh |
| `TOKEN_REVOCATION_FAILED` | 500 | Internal error during revocation |

## Usage Examples

### Generate Token (cURL)

```bash
curl -X POST https://api.example.com/api/v1/auth/app-token \
  -H "X-App-Signature: a1b2c3d4..." \
  -H "X-App-Nonce: 550e8400-e29b-41d4-a716-446655440000" \
  -H "X-App-Timestamp: 1699123456" \
  -H "X-App-Client-ID: pencilbox-quiz-mobile" \
  -H "X-Device-ID: device-uuid-123" \
  -H "X-Device-Type: iOS" \
  -H "Content-Type: application/json"
```

### Refresh Token (cURL)

```bash
curl -X POST https://api.example.com/api/v1/auth/app-token/refresh \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "X-Device-ID: device-uuid-123" \
  -H "Content-Type: application/json"
```

### Revoke Token (cURL)

```bash
curl -X POST https://api.example.com/api/v1/auth/app-token/revoke \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "Content-Type: application/json"
```

### Get Token Info (cURL)

```bash
curl -X GET https://api.example.com/api/v1/auth/app-token/info \
  -H "Authorization: Bearer eyJhbGci..." \
  -H "Content-Type: application/json"
```

## Best Practices

1. **Short Token TTL** - Use short-lived tokens (default: 120 minutes)
2. **Implement Refresh** - Use refresh endpoint before token expires
3. **Revoke on Logout** - Always revoke tokens on user logout
4. **Device Binding** - Enable device binding for enhanced security
5. **Monitor Token Usage** - Track token generation and revocation patterns
6. **Rotate Secrets** - Regularly rotate JWT secrets
7. **HTTPS Only** - Never transmit tokens over unencrypted connections
8. **Store Securely** - Store tokens securely on client (keychain/keystore)

## Troubleshooting

### Token Generation Fails

**Common Causes:**
- HMAC signature validation fails
- Device ID missing when required
- Redis connection issues

**Solutions:**
- Verify HMAC signature generation
- Include device ID if binding enabled
- Check Redis connectivity

### Token Refresh Fails

**Common Causes:**
- Original token expired
- Original token revoked
- Secret mismatch

**Solutions:**
- Refresh before token expires
- Don't revoke token before refresh
- Verify JWT secret configuration

### Token Revocation Not Working

**Common Causes:**
- Token already expired
- Redis connection issues
- TTL calculation error

**Solutions:**
- Revoke before token expires
- Check Redis connectivity
- Verify TTL calculation

## Related Documentation

- [VerifyAppSignature.md](./VerifyAppSignature.md) - HMAC signature verification
- [VerifyAppJwt.md](./VerifyAppJwt.md) - JWT verification middleware
- [AppSecurity-Combined.md](./AppSecurity-Combined.md) - Complete security system overview

## Configuration Reference

See `config/appsecurity.php` for all configuration options.

---

**Last Updated**: November 2025  
**Controller**: `App\Http\Controllers\Auth\AppTokenController`  
**Status**: ✅ Production Ready

