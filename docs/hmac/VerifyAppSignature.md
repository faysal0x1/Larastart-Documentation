# VerifyAppSignature Middleware Documentation

## Overview

The `VerifyAppSignature` middleware provides HMAC-based signature verification for mobile app API requests. It implements a multi-layered security approach to prevent replay attacks, validate request authenticity, and track suspicious activity.

## Purpose

This middleware validates mobile app requests before they reach your controllers by:

- **HMAC Signature Validation** - Ensures requests are authentic and haven't been tampered with
- **Nonce Uniqueness** - Prevents replay attacks by tracking used nonces
- **Timestamp Validation** - Rejects requests that are too old
- **Client ID Validation** - Verifies the client is authorized
- **IP Address Validation** - Enforces public IP requirements in production
- **Device Tracking** - Optionally tracks and manages device information
- **Suspicious Activity Detection** - Automatically blocks IPs/devices after repeated failures

## Security Features

### 1. Simple HMAC Signature

The middleware uses a simple HMAC SHA256 signature scheme:

**String to Sign:**
```
method + uri + nonce + timestamp + clientId
```

**Example:**
```
POST/api/v1/auth/app-tokenabc123def4561699123456pencilbox-quiz-mobile
```

**Signature Generation:**
```php
$signature = hash_hmac('sha256', $stringToSign, $clientSecret);
```

### 2. Nonce Replay Prevention

- Each request must include a unique nonce
- Nonces are stored in Redis with a TTL (default: 5 minutes)
- Reused nonces are rejected immediately
- Prevents attackers from replaying captured requests

### 3. Timestamp Validation

- Requests must include a Unix timestamp
- Timestamp must be within tolerance window (default: 2 minutes)
- Prevents replay of old requests even if nonce is unique
- Configurable via `appsecurity.hmac.timestamp_tolerance`

### 4. Client ID Validation

- Validates client ID against configured value
- Uses constant-time comparison (`hash_equals`) to prevent timing attacks
- Configured via `appsecurity.client.id`

## Required Headers

The middleware expects the following headers:

| Header | Description | Example |
|--------|-------------|---------|
| `X-App-Signature` | HMAC SHA256 signature | `a1b2c3d4e5f6...` |
| `X-App-Nonce` | Unique nonce (UUID recommended) | `550e8400-e29b-41d4-a716-446655440000` |
| `X-App-Timestamp` | Unix timestamp | `1699123456` |
| `X-App-Client-ID` | Client identifier | `pencilbox-quiz-mobile` |
| `X-Device-IP` | Client IP address (required in production) | `203.0.113.42` |

### Optional Headers

| Header | Description | Example |
|--------|-------------|---------|
| `X-Device-ID` | Device identifier | `device-uuid-123` |
| `X-Device-Type` | Device type | `iOS`, `Android` |
| `X-Device-Model` | Device model | `iPhone 14 Pro` |
| `X-OS-Version` | Operating system version | `iOS 17.0` |
| `X-App-Version` | App version | `1.2.3` |

## Configuration

All settings are configured in `config/appsecurity.php`:

```php
'hmac' => [
    'algorithm' => 'sha256',
    'nonce_ttl' => 300, // 5 minutes
    'timestamp_tolerance' => 120, // 2 minutes
    'header_name' => 'X-App-Signature',
    'nonce_header' => 'X-App-Nonce',
    'timestamp_header' => 'X-App-Timestamp',
    'client_id_header' => 'X-App-Client-ID',
    'ip_header' => 'X-Device-IP',
],

'client' => [
    'id' => env('APP_CLIENT_ID', 'pencilbox-quiz-mobile'),
    'secret' => env('APP_CLIENT_SECRET'),
],
```

## Usage

### Applying Middleware

Apply to routes that require HMAC authentication:

```php
Route::middleware(['verify.app.signature'])->group(function () {
    Route::post('/auth/app-token', [AppTokenController::class, 'generateToken']);
});
```

### Accessing Client IP

The middleware stores the client IP in request attributes:

```php
$clientIp = $request->attributes->get('client_ip');
```

## Validation Flow

1. **Extract Headers** - Retrieves signature, nonce, timestamp, and client ID
2. **IP Validation** - Validates IP address (public IP required in production)
3. **Header Validation** - Ensures all required headers are present
4. **Client ID Validation** - Verifies client ID matches configuration
5. **Timestamp Validation** - Checks timestamp is within tolerance window
6. **Nonce Validation** - Verifies nonce hasn't been used before
7. **Signature Validation** - Validates HMAC signature
8. **Store Nonce** - Stores nonce in Redis to prevent reuse
9. **Device Tracking** - Tracks device information if device ID provided
10. **Log Event** - Logs successful verification

## Error Responses

The middleware returns standardized error responses:

### Missing Headers
```json
{
    "error": "MISSING_HEADERS",
    "message": "Required security headers missing"
}
```

### Invalid Client ID
```json
{
    "error": "INVALID_CLIENT_ID",
    "message": "Invalid client ID"
}
```

### Invalid Timestamp
```json
{
    "error": "INVALID_TIMESTAMP",
    "message": "Request timestamp is too old or invalid"
}
```

### Nonce Reuse
```json
{
    "error": "NONCE_REUSE",
    "message": "Nonce has already been used"
}
```

### Invalid Signature
```json
{
    "error": "INVALID_SIGNATURE",
    "message": "Invalid HMAC signature
}
```

### Public IP Required (Production)
```json
{
    "error": "Public IP required.",
    "received_ip": "192.168.1.1"
}
```

## Security Features

### Suspicious Activity Detection

The middleware automatically tracks and blocks suspicious activity:

- **Threshold**: Configurable via `appsecurity.rate_limiting.suspicious_threshold` (default: 5)
- **Block Duration**: Configurable via `appsecurity.rate_limiting.block_duration` (default: 15 minutes)
- **Tracking**: Tracks failed attempts per IP address
- **Automatic Blocking**: Blocks IP after threshold exceeded

### Device Tracking

If a device ID is provided, the middleware:

- Creates or updates device record in database
- Tracks device metadata (type, model, OS version, app version)
- Updates last seen information (IP, user agent, request URI)
- Checks if device is blocked and rejects if so

### Security Audit Logging

All security events are logged to:

- **Database**: `security_audit_logs` table
- **File Logs**: Configured logging channel
- **Structured Logs**: JSON format when enabled

Events logged:
- `signature_verified` - Successful signature verification
- `signature_verification_failed` - Failed verification attempts
- `suspicious_activity` - Suspicious activity detected
- `ip_blocked` - IP address blocked

## Implementation Details

### Signature Generation (Client Side)

```javascript
// Example JavaScript implementation
const crypto = require('crypto');

function generateSignature(method, uri, nonce, timestamp, clientId, secret) {
    const stringToSign = method + uri + nonce + timestamp + clientId;
    return crypto.createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');
}

// Usage
const method = 'POST';
const uri = '/api/v1/auth/app-token';
const nonce = generateUUID();
const timestamp = Math.floor(Date.now() / 1000).toString();
const clientId = 'pencilbox-quiz-mobile';
const secret = 'your-client-secret';

const signature = generateSignature(method, uri, nonce, timestamp, clientId, secret);
```

### Request Example

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
X-Device-Model: iPhone 14 Pro
X-OS-Version: iOS 17.0
X-App-Version: 1.2.3
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

1. **Always Use HTTPS** - HMAC signatures don't protect against man-in-the-middle attacks
2. **Rotate Secrets Regularly** - Use secret rotation for enhanced security
3. **Monitor Logs** - Regularly review security audit logs for suspicious activity
4. **Set Appropriate TTLs** - Balance security with usability for nonce and timestamp tolerances
5. **Use Strong Secrets** - Generate cryptographically secure client secrets
6. **Implement Rate Limiting** - Combine with rate limiting middleware for additional protection

## Troubleshooting

### Signature Validation Fails

**Common Causes:**
- Incorrect string-to-sign format
- Secret mismatch between client and server
- URL encoding issues (ensure URI matches exactly)
- Clock skew (adjust timestamp tolerance)

**Debug Steps:**
1. Verify client secret matches server configuration
2. Log the string-to-sign on both client and server
3. Compare generated signatures
4. Check timestamp synchronization

### Nonce Already Used

**Common Causes:**
- Client reusing nonces
- Redis not clearing expired nonces
- Multiple requests with same nonce

**Solutions:**
- Generate new UUID for each request
- Ensure Redis TTL is working correctly
- Check for duplicate request sending

### Timestamp Validation Fails

**Common Causes:**
- Clock skew between client and server
- Timestamp tolerance too strict
- Client sending future timestamps

**Solutions:**
- Increase `timestamp_tolerance` if needed
- Synchronize client/server clocks
- Use NTP for time synchronization

## Related Documentation

- [VerifyAppJwt.md](./VerifyAppJwt.md) - JWT token verification middleware
- [AppTokenController.md](./AppTokenController.md) - Token generation controller
- [AppSecurity-Combined.md](./AppSecurity-Combined.md) - Complete security system overview

## Configuration Reference

See `config/appsecurity.php` for all configuration options.

---

**Last Updated**: November 2025  
**Middleware**: `App\Http\Middleware\VerifyAppSignature`  
**Status**: ✅ Production Ready

