# Laravel Helper Functions

A collection of custom helper functions for handling responses, quiz sessions, and participant management in Laravel applications.

## Overview

This helper file provides:
- 🔄 **Response Helpers**: Standardized success/error responses with flash messages
- 👤 **Session Management**: Quiz participant session binding and verification
- 🎯 **Participant Tracking**: Guest email and contact information management

## Installation

Add the helper file to your Laravel application:

```php
// bootstrap/app.php or AppServiceProvider.php
require_once app_path('Helpers/helpers.php');
```

Or use Composer autoloading:

```json
// composer.json
{
    "autoload": {
        "files": [
            "app/Helpers/helpers.php"
        ]
    }
}
```

Then run:

```bash
composer dump-autoload
```

## Response Helpers

### `success_response()`

Returns a redirect response with a success flash message.

```php
success_response(string $message, int $statusCode = 200): RedirectResponse
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$message` | `string` | **Required** | Success message to flash |
| `$statusCode` | `int` | `200` | HTTP status code |

#### Examples

```php
// Basic usage
public function store(Request $request)
{
    $user = User::create($request->validated());
    
    return success_response('User created successfully!');
}

// With custom status code
public function publish(Post $post)
{
    $post->publish();
    
    return success_response('Post published successfully!', 201);
}

// In controller method
public function update(Request $request, Product $product)
{
    $product->update($request->validated());
    
    return success_response('Product updated successfully!');
}
```

---

### `error_response()`

Returns a redirect response with an error flash message.

```php
error_response(string $message, int $statusCode = 422): RedirectResponse
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$message` | `string` | **Required** | Error message to flash |
| `$statusCode` | `int` | `422` | HTTP status code |

#### Examples

```php
// Basic usage
public function destroy(User $user)
{
    if ($user->hasActiveSubscription()) {
        return error_response('Cannot delete user with active subscription.');
    }
    
    $user->delete();
    return success_response('User deleted successfully!');
}

// With custom status code
public function process(Order $order)
{
    if (!$order->canBeProcessed()) {
        return error_response('Order cannot be processed.', 400);
    }
    
    $order->process();
    return success_response('Order processed successfully!');
}

// Validation alternative
public function store(Request $request)
{
    if ($request->email && User::where('email', $request->email)->exists()) {
        return error_response('Email already exists.');
    }
    
    // Continue with creation...
}
```

---

### `success_route()`

Returns a redirect to a specific route with a success flash message.

```php
success_route(
    string $route, 
    string $message, 
    array $params = [], 
    int $statusCode = 200
): RedirectResponse
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$route` | `string` | **Required** | Route name to redirect to |
| `$message` | `string` | **Required** | Success message to flash |
| `$params` | `array` | `[]` | Route parameters |
| `$statusCode` | `int` | `200` | HTTP status code |

#### Examples

```php
// Redirect to named route
public function store(Request $request)
{
    $post = Post::create($request->validated());
    
    return success_route(
        'posts.show',
        'Post created successfully!',
        ['post' => $post->id]
    );
}

// Redirect to index after update
public function update(Request $request, User $user)
{
    $user->update($request->validated());
    
    return success_route(
        'users.index',
        'User updated successfully!'
    );
}

// With query parameters
public function approve(Document $document)
{
    $document->approve();
    
    return success_route(
        'documents.index',
        'Document approved successfully!',
        ['status' => 'approved']
    );
}
```

---

### `error_route()`

Returns a redirect to a specific route with an error flash message.

```php
error_route(
    string $route, 
    string $message, 
    array $params = [], 
    int $statusCode = 422
): RedirectResponse
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$route` | `string` | **Required** | Route name to redirect to |
| `$message` | `string` | **Required** | Error message to flash |
| `$params` | `array` | `[]` | Route parameters |
| `$statusCode` | `int` | `422` | HTTP status code |

#### Examples

```php
// Redirect with error
public function destroy(Post $post)
{
    if ($post->hasComments()) {
        return error_route(
            'posts.show',
            'Cannot delete post with comments.',
            ['post' => $post->id]
        );
    }
    
    $post->delete();
    return success_route('posts.index', 'Post deleted successfully!');
}

// Access denied scenario
public function edit(Document $document)
{
    if (!$document->canBeEditedBy(auth()->user())) {
        return error_route(
            'documents.index',
            'You do not have permission to edit this document.'
        );
    }
    
    return view('documents.edit', compact('document'));
}

// Resource not available
public function checkout(Cart $cart)
{
    if ($cart->isEmpty()) {
        return error_route(
            'shop.index',
            'Your cart is empty.',
            ['tab' => 'products']
        );
    }
    
    return view('checkout', compact('cart'));
}
```

---

## Quiz Session Helpers

### `bind_participant_session()`

Binds a quiz participant to the current session, enabling guest user tracking and quiz progress management.

```php
bind_participant_session(
    Quiz $quiz,
    QuizParticipant $participant,
    ?string $guestEmail = null,
    ?string $quizCode = null
): void
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$quiz` | `Quiz` | **Required** | Quiz model instance |
| `$participant` | `QuizParticipant` | **Required** | Participant model instance |
| `$guestEmail` | `?string` | `null` | Guest user's email address |
| `$quizCode` | `?string` | `null` | Unique quiz access code |

#### Examples

```php
// Basic participant binding
public function start(Quiz $quiz)
{
    $participant = QuizParticipant::create([
        'quiz_id' => $quiz->id,
        'user_id' => auth()->id(),
        'started_at' => now(),
    ]);
    
    bind_participant_session($quiz, $participant);
    
    return redirect()->route('quiz.questions', $quiz);
}

// Guest user with email
public function startAsGuest(Request $request, Quiz $quiz)
{
    $request->validate([
        'email' => 'required|email',
    ]);
    
    $participant = QuizParticipant::create([
        'quiz_id' => $quiz->id,
        'email' => $request->email,
        'started_at' => now(),
    ]);
    
    bind_participant_session($quiz, $participant, $request->email);
    
    return redirect()->route('quiz.questions', $quiz);
}

// With quiz access code
public function joinWithCode(Request $request)
{
    $quiz = Quiz::where('code', $request->code)->firstOrFail();
    
    $participant = QuizParticipant::create([
        'quiz_id' => $quiz->id,
        'user_id' => auth()->id(),
        'started_at' => now(),
    ]);
    
    bind_participant_session($quiz, $participant, null, $request->code);
    
    return redirect()->route('quiz.questions', [$quiz, 'code' => $request->code]);
}

// Resume existing session
public function resume(Quiz $quiz, QuizParticipant $participant)
{
    // Re-bind in case session was lost
    bind_participant_session($quiz, $participant);
    
    return redirect()->route('quiz.questions', $quiz);
}
```

---

### `verify_participant_session()`

Verifies that the current session is authorized for the given participant (prevents session hijacking).

```php
verify_participant_session(QuizParticipant $participant): bool
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `$participant` | `QuizParticipant` | Participant to verify |

#### Returns

`bool` - `true` if session is valid, `false` otherwise

#### Examples

```php
// Middleware verification
public function show(Quiz $quiz, QuizParticipant $participant)
{
    if (!verify_participant_session($participant)) {
        return error_response('Invalid session. Please start the quiz again.');
    }
    
    return view('quiz.show', compact('quiz', 'participant'));
}

// Before submitting answers
public function submitAnswer(Request $request, Quiz $quiz, QuizParticipant $participant)
{
    if (!verify_participant_session($participant)) {
        return error_response('Session expired. Please restart the quiz.');
    }
    
    // Process answer...
}

// In a custom middleware
class VerifyQuizSession
{
    public function handle($request, Closure $next)
    {
        $participant = $request->route('participant');
        
        if ($participant && !verify_participant_session($participant)) {
            return error_route(
                'quiz.index',
                'Your quiz session has expired.'
            );
        }
        
        return $next($request);
    }
}

// Before viewing results
public function results(Quiz $quiz, QuizParticipant $participant)
{
    if (!verify_participant_session($participant)) {
        abort(403, 'Unauthorized access to quiz results.');
    }
    
    return view('quiz.results', compact('quiz', 'participant'));
}
```

---

### `get_in_progress_participant_for_quiz()`

Retrieves the participant ID for an in-progress quiz from the session.

```php
get_in_progress_participant_for_quiz(int $quizId, ?string $quizCode = null): ?int
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$quizId` | `int` | **Required** | Quiz ID |
| `$quizCode` | `?string` | `null` | Quiz access code |

#### Returns

`?int` - Participant ID or `null` if not found

#### Examples

```php
// Check for existing session before starting
public function start(Quiz $quiz)
{
    $existingParticipantId = get_in_progress_participant_for_quiz($quiz->id);
    
    if ($existingParticipantId) {
        $participant = QuizParticipant::find($existingParticipantId);
        
        return redirect()
            ->route('quiz.resume', $participant)
            ->with('info', 'Resuming your previous attempt.');
    }
    
    // Create new participant...
}

// With quiz code
public function joinWithCode(Request $request, string $code)
{
    $quiz = Quiz::where('code', $code)->firstOrFail();
    
    $participantId = get_in_progress_participant_for_quiz($quiz->id, $code);
    
    if ($participantId) {
        return success_route(
            'quiz.continue',
            'Continuing your quiz...',
            ['participant' => $participantId]
        );
    }
    
    return view('quiz.start', compact('quiz', 'code'));
}

// Dashboard showing in-progress quizzes
public function dashboard()
{
    $quizzes = Quiz::published()->get();
    
    $inProgress = $quizzes->filter(function ($quiz) {
        return get_in_progress_participant_for_quiz($quiz->id) !== null;
    });
    
    return view('dashboard', compact('quizzes', 'inProgress'));
}

// Cleanup expired sessions
public function cleanup()
{
    $expiredParticipants = QuizParticipant::where('started_at', '<', now()->subHours(2))
        ->whereNull('completed_at')
        ->get();
        
    foreach ($expiredParticipants as $participant) {
        $sessionId = get_in_progress_participant_for_quiz($participant->quiz_id);
        
        if ($sessionId === $participant->id) {
            // Session still active, notify user
            // Send email reminder...
        }
    }
}
```

---

### `get_guest_email_for_quiz()`

Retrieves the stored guest email for a quiz from the session.

```php
get_guest_email_for_quiz(int $quizId, ?string $quizCode = null): ?string
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$quizId` | `int` | **Required** | Quiz ID |
| `$quizCode` | `?string` | `null` | Quiz access code |

#### Returns

`?string` - Guest email or `null` if not found

#### Examples

```php
// Pre-fill email field for guest users
public function show(Quiz $quiz)
{
    $guestEmail = get_guest_email_for_quiz($quiz->id);
    
    return view('quiz.start', compact('quiz', 'guestEmail'));
}

// Send results email to guest
public function complete(Quiz $quiz, QuizParticipant $participant)
{
    $participant->update(['completed_at' => now()]);
    
    $email = $participant->email ?? get_guest_email_for_quiz($quiz->id);
    
    if ($email) {
        Mail::to($email)->send(new QuizResultsMail($participant));
    }
    
    return success_route('quiz.results', 'Quiz completed!', ['participant' => $participant]);
}

// Track guest completions
public function analytics(Quiz $quiz)
{
    $participants = QuizParticipant::where('quiz_id', $quiz->id)->get();
    
    $guestCompletions = $participants->filter(function ($participant) use ($quiz) {
        $email = get_guest_email_for_quiz($quiz->id);
        return $email && $participant->email === $email;
    })->count();
    
    return view('quiz.analytics', compact('quiz', 'guestCompletions'));
}

// Newsletter signup prompt
public function results(QuizParticipant $participant)
{
    $guestEmail = get_guest_email_for_quiz($participant->quiz_id);
    $alreadySubscribed = $guestEmail && Newsletter::isSubscribed($guestEmail);
    
    return view('quiz.results', compact('participant', 'guestEmail', 'alreadySubscribed'));
}
```

---

### `get_participant_contact_from_session()`

Retrieves participant's complete contact information (name, email, phone) from the session.

```php
get_participant_contact_from_session(int $quizId, ?string $quizCode = null): ?array
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `$quizId` | `int` | **Required** | Quiz ID |
| `$quizCode` | `?string` | `null` | Quiz access code |

#### Returns

`?array` - Contact information array or `null` if not found

```php
[
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'phone' => '+1234567890'
]
```

#### Examples

```php
// Pre-fill contact form
public function showContactForm(Quiz $quiz)
{
    $contact = get_participant_contact_from_session($quiz->id);
    
    return view('quiz.contact', compact('quiz', 'contact'));
}

// Send personalized certificate
public function certificate(QuizParticipant $participant)
{
    $contact = get_participant_contact_from_session($participant->quiz_id);
    
    $pdf = PDF::loadView('certificates.quiz', [
        'participant' => $participant,
        'name' => $contact['name'] ?? 'Participant',
    ]);
    
    return $pdf->download('certificate.pdf');
}

// SMS notification for quiz completion
public function sendCompletionNotification(QuizParticipant $participant)
{
    $contact = get_participant_contact_from_session($participant->quiz_id);
    
    if ($contact && isset($contact['phone'])) {
        SMS::send($contact['phone'], 
            "Congratulations {$contact['name']}! You've completed the quiz."
        );
    }
}

// Export participants with contact info
public function export(Quiz $quiz)
{
    $participants = QuizParticipant::where('quiz_id', $quiz->id)->get();
    
    $data = $participants->map(function ($participant) use ($quiz) {
        $contact = get_participant_contact_from_session($quiz->id);
        
        return [
            'name' => $contact['name'] ?? $participant->user?->name ?? 'N/A',
            'email' => $contact['email'] ?? $participant->email ?? 'N/A',
            'phone' => $contact['phone'] ?? 'N/A',
            'score' => $participant->score,
            'completed_at' => $participant->completed_at,
        ];
    });
    
    return Excel::download(new ParticipantsExport($data), 'participants.xlsx');
}

// Contact verification before results
public function viewResults(Request $request, QuizParticipant $participant)
{
    if (!auth()->check()) {
        $contact = get_participant_contact_from_session($participant->quiz_id);
        
        if (!$contact || $contact['email'] !== $request->input('email')) {
            return error_response('Please verify your email to view results.');
        }
    }
    
    return view('quiz.results', compact('participant'));
}
```

---

## Usage Patterns

### Complete Quiz Flow

```php
// 1. Start quiz (bind session)
public function start(Request $request, Quiz $quiz)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'phone' => 'nullable|string',
    ]);
    
    $participant = QuizParticipant::create([
        'quiz_id' => $quiz->id,
        'user_id' => auth()->id(),
        'started_at' => now(),
    ]);
    
    bind_participant_session($quiz, $participant, $request->email);
    
    return success_route(
        'quiz.questions',
        'Quiz started! Good luck!',
        ['quiz' => $quiz->id]
    );
}

// 2. Answer questions (verify session)
public function answer(Request $request, Quiz $quiz)
{
    $participantId = get_in_progress_participant_for_quiz($quiz->id);
    
    if (!$participantId) {
        return error_route('quiz.start', 'Session expired. Please start again.', ['quiz' => $quiz]);
    }
    
    $participant = QuizParticipant::findOrFail($participantId);
    
    if (!verify_participant_session($participant)) {
        return error_response('Invalid session.');
    }
    
    // Process answer...
    
    return success_response('Answer submitted!');
}

// 3. Complete quiz (get contact info)
public function complete(Quiz $quiz)
{
    $participantId = get_in_progress_participant_for_quiz($quiz->id);
    $participant = QuizParticipant::findOrFail($participantId);
    
    $participant->update([
        'completed_at' => now(),
        'score' => $participant->calculateScore(),
    ]);
    
    $contact = get_participant_contact_from_session($quiz->id);
    
    if ($contact && $contact['email']) {
        Mail::to($contact['email'])->send(new QuizResultsMail($participant));
    }
    
    return success_route(
        'quiz.results',
        'Quiz completed successfully!',
        ['participant' => $participant->id]
    );
}
```

### Resume Interrupted Quiz

```php
public function resume(Quiz $quiz)
{
    $participantId = get_in_progress_participant_for_quiz($quiz->id);
    
    if (!$participantId) {
        return error_route(
            'quiz.start',
            'No in-progress quiz found.',
            ['quiz' => $quiz]
        );
    }
    
    $participant = QuizParticipant::findOrFail($participantId);
    
    if (!verify_participant_session($participant)) {
        return error_route(
            'quiz.start',
            'Cannot resume this quiz. Please start a new attempt.',
            ['quiz' => $quiz]
        );
    }
    
    return success_route(
        'quiz.questions',
        'Resuming your quiz...',
        ['quiz' => $quiz, 'question' => $participant->current_question_number]
    );
}
```

---

## Service Classes

These helpers wrap the following service classes:

### ResponseService

```php
class ResponseService
{
    public static function success(string $message, int $statusCode = 200): RedirectResponse;
    public static function error(string $message, int $statusCode = 422): RedirectResponse;
    public static function success_route(string $route, string $message, array $params = [], int $statusCode = 200): RedirectResponse;
    public static function error_route(string $route, string $message, array $params = [], int $statusCode = 422): RedirectResponse;
}
```

### QuizSessionService

```php
class QuizSessionService
{
    public function bindParticipantSession(Quiz $quiz, QuizParticipant $participant, ?string $guestEmail = null, ?string $quizCode = null): void;
    public function verifyParticipantSession(QuizParticipant $participant): bool;
    public function getInProgressParticipantForQuiz(int $quizId, ?string $quizCode = null): ?int;
    public function getGuestEmailForQuiz(int $quizId, ?string $quizCode = null): ?string;
    public function getParticipantContactFromSession(int $quizId, ?string $quizCode = null): ?array;
}
```

---

## Best Practices

### ✅ Response Helpers

```php
// Use success_response for back redirects
return success_response('Profile updated!');

// Use success_route for specific redirects
return success_route('dashboard', 'Welcome back!');

// Consistent error handling
if (!$user->canDelete()) {
    return error_response('Cannot delete this user.');
}
```

### ✅ Session Management

```php
// Always bind after creating participant
$participant = QuizParticipant::create([...]);
bind_participant_session($quiz, $participant, $email);

// Verify before sensitive operations
if (!verify_participant_session($participant)) {
    return error_response('Invalid session.');
}

// Check for existing sessions
$existingId = get_in_progress_participant_for_quiz($quiz->id);
if ($existingId) {
    // Handle resume logic
}
```

### ❌ Avoid

```php
// Don't use without try-catch in critical flows
$participant = QuizParticipant::findOrFail($participantId); // Can throw

// Don't skip session verification
// Always verify before showing sensitive data

// Don't forget to handle null returns
$contact = get_participant_contact_from_session($quizId);
$email = $contact['email'] ?? 'default@example.com'; // Good
```

---

## Testing

```php
use Illuminate\Support\Facades\Session;

class QuizHelperTest extends TestCase
{
    public function test_bind_participant_session()
    {
        $quiz = Quiz::factory()->create();
        $participant = QuizParticipant::factory()->create(['quiz_id' => $quiz->id]);
        
        bind_participant_session($quiz, $participant, 'guest@example.com');
        
        $this->assertEquals(
            $participant->id,
            get_in_progress_participant_for_quiz($quiz->id)
        );
        
        $this->assertEquals(
            'guest@example.com',
            get_guest_email_for_quiz($quiz->id)
        );
    }
    
    public function test_verify_participant_session()
    {
        $quiz = Quiz::factory()->create();
        $participant = QuizParticipant::factory()->create(['quiz_id' => $quiz->id]);
        
        bind_participant_session($quiz, $participant);
        
        $this->assertTrue(verify_participant_session($participant));
    }
}
```

---

## Dependencies

- **Models**: `Quiz`, `QuizParticipant`
- **Services**: `ResponseService`, `QuizSessionService`
- **Laravel**: Session, Redirect, Service Container