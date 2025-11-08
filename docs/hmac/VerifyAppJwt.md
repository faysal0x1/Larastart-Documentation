# VerifyAppJwt Middleware Documentation

## Overview

The `VerifyAppJwt` middleware provides JWT (JSON Web Token) verification for authenticated API requests. It validates JWT tokens, checks for revocation, enforces device binding, and tracks security events.

## Purpose

This middleware secures protected API endpoints by:

- **JWT Validation** - Verifies token signature, expiration, and structure
- **Token Blacklisting** - Prevents use of revoked tokens
- **Device Binding** - Optionally enforces device-to-token binding
- **Audience/Issuer Validation** - Ensures tokens are issued by correct authority
- **Secret Rotation Support** - Gracefully handles secret rotation
- **Suspicious Activity Detection** - Tracks and blocks suspicious behavior

## Security Features

### 1. JWT Structure Validation

Validates that the JWT contains all required claims:

- `iss` (Issuer) - Token issuer
- `aud` (Audience) - Token audience
- `iat` (Issued At) - Token issuance timestamp
- `exp` (Expiration) - Token expiration timestamp
- `jti` (JWT ID) - Unique token identifier

### 2. Signature Verification

- Validates JWT signature using configured secret
- Supports HS256 algorithm
- Constant-time comparison to prevent timing attacks
- Supports secret rotation with previous secrets

### 3. Token Blacklisting

- Tracks revoked tokens in Redis
- Prevents use of revoked tokens even if valid
- Automatic expiration when token naturally expires

### 4. Device Binding (Optional)

When enabled, enforces that:
- Device ID in token matches device ID in request header
- Both device ID and header must be present
- Prevents token theft and unauthorized device usage

### 5. Secret Rotation

- Supports graceful secret rotation
- Tries previous secrets if current secret fails
- Allows tokens issued with old secrets to remain valid during rotation period

## Required Headers

The middleware expects the following header:

| Header | Description | Example |
|--------|-------------|---------|
| `Authorization` | Bearer token | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### Optional Headers

| Header | Description | Example |
|--------|-------------|---------|
| `X-Device-ID` | Device identifier (required if device binding enabled) | `device-uuid-123` |
| `X-Device-IP` | Client IP address (required in production) | `203.0.113.42` |

## Configuration

All settings are configured in `config/appsecurity.php`:

```php
'jwt' => [
    'secret' => env('JWT_APP_SECRET'),
    'algorithm' => 'HS256',
    'issuer' => env('APP_NAME', 'Pencilbox Quiz'),
    'audience' => env('APP_CLIENT_ID', 'pencilbox-quiz-mobile'),
    'ttl' => env('JWT_TTL', 120), // minutes
    'refresh_ttl' => env('JWT_REFRESH_TTL', 60), // minutes
    'leeway' => env('JWT_LEEWAY', 30), // seconds
],

'device' => [
    'binding_enabled' => env('DEVICE_BINDING_ENABLED', true),
    'header_name' => 'X-Device-ID',
],

'secret_rotation' => [
    'enabled' => env('SECRET_ROTATION_ENABLED', true),
    'grace_period' => env('SECRET_ROTATION_GRACE_PERIOD', 3600),
    'jwt_previous_secrets' => array_filter(explode(',', env('JWT_PREVIOUS_SECRETS', ''))),
],
```

## Usage

### Applying Middleware

Apply to routes that require JWT authentication:

```php
Route::middleware(['verify.app.jwt'])->group(function () {
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::post('/quiz/submit', [QuizController::class, 'submit']);
});
```

### Accessing Token Payload

The middleware attaches the decoded JWT payload to the request:

```php
$payload = $request->attributes->get('jwt_payload');

// Access token claims
$jti = $payload['jti'];
$deviceId = $payload['device_id'];
$scope = $payload['scope'];
$issuedAt = $payload['iat'];
$expiresAt = $payload['exp'];
```

### Accessing Device ID

The middleware also provides device ID as a separate attribute:

```php
$deviceId = $request->attributes->get('device_id');
```

## Validation Flow

1. **Extract Token** - Retrieves JWT from Authorization header
2. **IP Validation** - Validates IP address (public IP required in production)
3. **Decode JWT** - Decodes and validates JWT structure
4. **Validate Claims** - Ensures all required claims are present
5. **Validate Audience/Issuer** - Verifies token was issued by correct authority
6. **Check Blacklist** - Verifies token hasn't been revoked
7. **Device Binding** - Validates device binding if enabled
8. **Attach Payload** - Attaches decoded payload to request
9. **Log Event** - Logs successful verification

## Error Responses

The middleware returns standardized error responses:

### Missing Token
```json
{
    "error": "MISSING_TOKEN",
    "message": "Authorization token missing"
}
```

### Invalid Token
```json
{
    "error": "INVALID_TOKEN",
    "message": "Invalid JWT token"
}
```

### Token Expired
```json
{
    "error": "TOKEN_EXPIRED",
    "message": "JWT token has expired"
}
```

### Invalid Signature
```json
{
    "error": "INVALID_SIGNATURE",
    "message": "JWT signature is invalid"
}
```

### Token Revoked
```json
{
    "error": "TOKEN_REVOKED",
    "message": "Token has been revoked"
}
```

### Device Mismatch
```json
{
    "error": "DEVICE_MISMATCH",
    "message": "Device binding validation failed"
}
```

### Public IP Required (Production)
```json
{
    "error": "Public IP required.",
    "received_ip": "192.168.1.1"
}
```

## JWT Token Structure

### Token Payload

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

### Claims Explained

- **iss** (Issuer): Identifies who issued the token
- **aud** (Audience): Identifies who the token is intended for
- **iat** (Issued At): Unix timestamp when token was issued
- **nbf** (Not Before): Unix timestamp before which token is not valid
- **exp** (Expiration): Unix timestamp when token expires
- **jti** (JWT ID): Unique identifier for the token
- **device_id**: Device identifier (optional, used for device binding)
- **scope**: Token scope/permissions (e.g., "api", "admin")

## Security Features

### Suspicious Activity Detection

The middleware automatically tracks and blocks suspicious activity:

- **IP Tracking**: Tracks failed attempts per IP address
- **Device Tracking**: Tracks failed attempts per device (if device ID available)
- **Threshold**: Configurable via `appsecurity.rate_limiting.suspicious_threshold` (default: 5)
- **Block Duration**: Configurable via `appsecurity.rate_limiting.block_duration` (default: 15 minutes)
- **Automatic Blocking**: Blocks IP/device after threshold exceeded

### Token Blacklisting

Revoked tokens are stored in Redis:

- **Key Pattern**: `app:blacklist:{jti}`
- **TTL**: Set to token expiration time
- **Purpose**: Prevent use of revoked tokens

### Device Binding

When device binding is enabled:

1. Token must contain `device_id` claim
2. Request must include `X-Device-ID` header
3. Both values must match exactly
4. Prevents token theft and cross-device usage

### Secret Rotation

Supports graceful secret rotation:

1. If token validation fails with current secret
2. Try previous secrets from configuration
3. If valid with previous secret, allow request
4. Enables zero-downtime secret rotation

## Implementation Details

### Token Extraction

```php
// Extracts token from: Authorization: Bearer <token>
$authorization = $request->header('Authorization');
$token = substr($authorization, 7); // Remove 'Bearer ' prefix
```

### Token Validation

```php
// Decode and validate
$payload = JWT::decode($token, new Key($secret, 'HS256'));

// Validate required claims
$requiredClaims = ['iss', 'aud', 'iat', 'exp', 'jti'];
foreach ($requiredClaims as $claim) {
    if (!isset($payload[$claim])) {
        return false;
    }
}

// Validate audience and issuer
$issuerValid = hash_equals($expectedIssuer, $payload['iss']);
$audienceValid = hash_equals($expectedAudience, $payload['aud']);
```

### Device Binding Validation

```php
$deviceIdHeader = $request->header('X-Device-ID');
$tokenDeviceId = $payload['device_id'];

// Both must be present and match
if (empty($deviceIdHeader) || empty($tokenDeviceId)) {
    return false;
}

return hash_equals($deviceIdHeader, $tokenDeviceId);
```

## Request Example

```http
GET /api/v1/user/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQZW5jaWxib3ggUXVpeiIsImF1ZCI6InBlbmNpbGJveC1xdWl6LW1vYmlsZSIsImlhdCI6MTY5OTEyMzQ1NiwibmJmIjoxNjk5MTIzNDU2LCJleHAiOjE2OTkxMjU4NTYsImp0aSI6IjU1MGU4NDAwLWUyOWItNDFkNC1hNzE2LTQ0NjY1NTQ0MDAwMCIsImRldmljZV9pZCI6ImRldmljZS11dWlkLTEyMyIsInNjb3BlIjoiYXBpIn0.signature
X-Device-ID: device-uuid-123
X-Device-IP: 203.0.113.42
Content-Type: application/json
```

## Testing

### Disabling Middleware (Development)

The middleware can be temporarily disabled for testing:

```php
public function handle(Request $request, Closure $next): Response {
    return $next($request); // Skip validation
    // ... rest of validation code
}
```

**⚠️ Warning**: Never disable in production!

### Testing with Postman

The middleware allows Postman requests with private IPs for testing:

```php
$userAgent = $request->header('User-Agent');
if (!str_contains($userAgent, 'Postman')) {
    // Enforce public IP validation
}
```

## Best Practices

1. **Short Token TTL** - Use short-lived tokens (default: 120 minutes)
2. **Implement Refresh Tokens** - Use refresh token endpoint for long-lived sessions
3. **Enable Device Binding** - Prevent token theft and unauthorized usage
4. **Monitor Token Usage** - Track token generation, refresh, and revocation
5. **Rotate Secrets Regularly** - Use secret rotation for enhanced security
6. **Log Security Events** - Monitor for suspicious token usage patterns
7. **Use HTTPS Only** - Never transmit tokens over unencrypted connections

## Troubleshooting

### Token Validation Fails

**Common Causes:**
- Secret mismatch
- Token expired
- Missing required claims
- Audience/issuer mismatch

**Debug Steps:**
1. Verify JWT secret matches configuration
2. Check token expiration time
3. Validate all required claims are present
4. Compare expected vs actual issuer/audience

### Device Binding Fails

**Common Causes:**
- Device ID missing from token
- Device ID missing from header
- Device ID mismatch

**Solutions:**
- Ensure device ID is included when generating token
- Include `X-Device-ID` header in requests
- Verify device IDs match exactly

### Token Expired Too Quickly

**Solutions:**
- Increase `jwt.ttl` configuration
- Implement refresh token mechanism
- Use refresh endpoint before token expires

### Secret Rotation Issues

**Common Causes:**
- Previous secrets not configured
- Grace period too short
- Tokens issued with very old secrets

**Solutions:**
- Configure `jwt_previous_secrets` in environment
- Increase grace period if needed
- Ensure all tokens are refreshed before old secrets expire

## Related Documentation

- [VerifyAppSignature.md](./VerifyAppSignature.md) - HMAC signature verification middleware
- [AppTokenController.md](./AppTokenController.md) - Token generation controller
- [AppSecurity-Combined.md](./AppSecurity-Combined.md) - Complete security system overview

## Configuration Reference

See `config/appsecurity.php` for all configuration options.

---

**Last Updated**: November 2025  
**Middleware**: `App\Http\Middleware\VerifyAppJwt`  
**Status**: ✅ Production Ready

