# Utility Helper Functions

A comprehensive collection of utility functions for question types, formatting, UI helpers, and data transformations in React applications.

## Overview

This utility library provides:
- 📝 **Question Type Helpers**: Labels, icons, and formatting for quiz questions
- 🎨 **UI Helpers**: Colors, badges, and visual components
- 📅 **Date/Time Formatting**: Consistent date and time display
- 🔢 **Number Formatting**: Locale-aware number display
- 🎯 **Status Badges**: Visual status indicators
- 🌈 **Color Utilities**: Dark mode compatible color schemes
- 👤 **Avatar Generation**: Consistent avatar URLs
- 📊 **Answer Rendering**: Complex answer display logic

## Installation

```bash
# Install required dependencies
npm install lucide-react @/components/ui/badge
```

## Import

```javascript
// Import all helpers
import * as helpers from '@/lib/helpers';

// Import specific helpers
import { 
  getTypeLabel, 
  formatDate, 
  getDifficultyColor 
} from '@/lib/helpers';
```

---

## Question Type Helpers

### `getTypeLabel()`

Returns human-readable labels for question types.

```javascript
getTypeLabel(type: string): string
```

#### Examples

```javascript
getTypeLabel('mcq_single');        // "Single Choice"
getTypeLabel('mcq_multiple');      // "Multiple Choice"
getTypeLabel('fill_blank');        // "Fill in the Blank"
getTypeLabel('true_false');        // "True/False"
getTypeLabel('short_answer');      // "Short Answer"
getTypeLabel('essay');             // "Essay"
getTypeLabel('file_upload');       // "File Upload"
getTypeLabel('drag_drop');         // "Drag & Drop"
getTypeLabel('hotspot');           // "Hotspot"
getTypeLabel('ordering');          // "Ordering"
getTypeLabel('numeric');           // "Numeric"
getTypeLabel('matrix');            // "Matrix"
getTypeLabel('rating_scale');      // "Rating Scale"
getTypeLabel('unknown_type');      // "unknown_type" (fallback)
```

#### Supported Question Types

| Type | Label |
|------|-------|
| `mcq_single` | Single Choice |
| `mcq_multiple` | Multiple Choice |
| `fill_blank` | Fill in the Blank |
| `matching` | Matching |
| `true_false` | True/False |
| `short_answer` | Short Answer |
| `essay` | Essay |
| `file_upload` | File Upload |
| `drag_drop` | Drag & Drop |
| `hotspot` | Hotspot |
| `ordering` | Ordering |
| `numeric` | Numeric |
| `matrix` | Matrix |
| `rating_scale` | Rating Scale |

---

### `getQuestionTypeIcon()`

Returns appropriate Lucide icon component for question types.

```javascript
getQuestionTypeIcon(type: string, props?: object): ReactElement
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | `string` | **Required** | Question type identifier |
| `props` | `object` | `{}` | Props to pass to icon component |

#### Examples

```jsx
// Basic usage
{getQuestionTypeIcon('mcq_single')}

// With custom size
{getQuestionTypeIcon('essay', { size: 24 })}

// With custom className
{getQuestionTypeIcon('true_false', { 
  className: 'text-blue-500' 
})}

// In a list
{questions.map(q => (
  <div key={q.id}>
    {getQuestionTypeIcon(q.type, { size: 20 })}
    <span>{q.title}</span>
  </div>
))}
```

#### Icon Mapping

| Type | Icon |
|------|------|
| `mcq_single` | CheckCircle |
| `mcq_multiple` | CheckSquare |
| `fill_blank` | Edit3 |
| `matching` | Link |
| `true_false` | Check |
| `short_answer` | FileText |
| `essay` | File |
| `file_upload` | Upload |
| `drag_drop` | Move |
| `hotspot` | MapPin |
| `ordering` | ListOrdered |
| `numeric` | Hash |
| `matrix` | Grid |
| `rating_scale` | Star |
| Unknown | HelpCircle |

#### Dark Mode Support

Icons automatically include dark mode compatible classes:

```javascript
// Automatic dark mode support
className="text-slate-700 dark:text-slate-200"
```

---

### `formatQuestionType()`

Alternative formatter for question types (legacy support).

```javascript
formatQuestionType(type: string): string
```

#### Examples

```javascript
formatQuestionType('mcq_multiple');  // "Multiple Choice (Multiple)"
formatQuestionType('mcq_single');    // "Multiple Choice (Single)"
formatQuestionType('true_false');    // "True/False"
formatQuestionType('fill_blank');    // "Fill in the Blank"
```

---

## Difficulty Helpers

### `getDifficultyColor()`

Returns Tailwind CSS classes for difficulty badges with dark mode support.

```javascript
getDifficultyColor(difficulty: string): string
```

#### Examples

```jsx
// Basic usage
<span className={getDifficultyColor('easy')}>
  Easy
</span>

// With Badge component
<Badge className={getDifficultyColor(question.difficulty)}>
  {question.difficulty}
</Badge>

// In a card
<div className={`p-4 rounded ${getDifficultyColor('hard')}`}>
  Hard Question
</div>
```

#### Color Mappings

| Difficulty | Light Mode | Dark Mode |
|-----------|-----------|-----------|
| `beginner`, `easy` | Green | Green (darker) |
| `medium` | Yellow | Yellow (darker) |
| `hard`, `expert` | Red | Red (darker) |
| Unknown | Gray | Gray (darker) |

---

### `getDifficultyVariant()`

Returns variant names for Badge component based on difficulty.

```javascript
getDifficultyVariant(difficulty: string): string
```

#### Examples

```jsx
import { Badge } from '@/components/ui/badge';

<Badge variant={getDifficultyVariant('easy')}>
  Easy
</Badge>

<Badge variant={getDifficultyVariant('medium')}>
  Medium
</Badge>

<Badge variant={getDifficultyVariant('hard')}>
  Hard
</Badge>
```

#### Variant Mappings

| Difficulty | Variant |
|-----------|---------|
| `easy`, `beginner`, `basic` | `default` |
| `medium`, `intermediate`, `moderate` | `secondary` |
| `hard`, `difficult`, `expert`, `advanced` | `destructive` |
| Unknown | `default` |

---

## Date & Time Helpers

### `formatTime()`

Formats seconds into MM:SS format.

```javascript
formatTime(seconds: number): string
```

#### Examples

```javascript
formatTime(65);    // "1:05"
formatTime(125);   // "2:05"
formatTime(3661);  // "61:01"
formatTime(0);     // "0:00"

// In a timer component
<div className="timer">
  {formatTime(timeRemaining)}
</div>
```

---

### `formatDate()`

Formats date string to localized short date.

```javascript
formatDate(dateString: string): string
```

#### Examples

```javascript
formatDate('2024-03-15');           // "Mar 15, 2024"
formatDate('2024-12-25T10:30:00');  // "Dec 25, 2024"

// In a table
<td>{formatDate(quiz.created_at)}</td>
```

---

### `formateTimeByDate()`

Formats date string to localized time only.

```javascript
formateTimeByDate(dateString: string): string
```

#### Examples

```javascript
formateTimeByDate('2024-03-15T14:30:00');  // "02:30 PM"
formateTimeByDate('2024-03-15T09:00:00');  // "09:00 AM"

// Display start time
<span>Starts at: {formateTimeByDate(quiz.start_time)}</span>
```

---

### `formatDateTime()`

Formats date string to full localized date and time.

```javascript
formatDateTime(dateString: string): string
```

#### Examples

```javascript
formatDateTime('2024-03-15T14:30:00');  
// "Mar 15, 2024, 02:30 PM"

// In a timeline
{events.map(event => (
  <div key={event.id}>
    <span>{event.title}</span>
    <time>{formatDateTime(event.timestamp)}</time>
  </div>
))}
```

---

### `formatDateTimeLocal()`

Formats Date object to HTML datetime-local input format.

```javascript
formatDateTimeLocal(date: Date): string
```

#### Examples

```jsx
import { useState } from 'react';

function ScheduleForm() {
  const [startDate, setStartDate] = useState(new Date());
  
  return (
    <input
      type="datetime-local"
      value={formatDateTimeLocal(startDate)}
      onChange={(e) => setStartDate(new Date(e.target.value))}
    />
  );
}

// Pre-fill with current time
<input
  type="datetime-local"
  defaultValue={formatDateTimeLocal(new Date())}
/>

// Set minimum date to now
<input
  type="datetime-local"
  min={formatDateTimeLocal(new Date())}
/>
```

---

## Number Helpers

### `formatNumber()`

Formats numbers with locale-aware decimal places.

```javascript
formatNumber(number: number, decimals?: number): string
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `number` | `number` | **Required** | Number to format |
| `decimals` | `number` | `2` | Number of decimal places |

#### Examples

```javascript
formatNumber(1234.5);        // "1,234.50"
formatNumber(1234.567);      // "1,234.57"
formatNumber(1234.567, 0);   // "1,235"
formatNumber(1234.567, 3);   // "1,234.567"

// Display score
<span>Score: {formatNumber(score)}%</span>

// Currency display
<span>${formatNumber(price)}</span>

// Statistics
<div>
  Average: {formatNumber(average, 1)}
</div>
```

---

## Code Generation

### `generateRandomCode()`

Generates random alphanumeric code.

```javascript
generateRandomCode(length?: number): string
```

#### Examples

```javascript
generateRandomCode();      // "A3F9K2L8" (8 chars)
generateRandomCode(6);     // "B2X9K1"
generateRandomCode(12);    // "A3F9K2L8M4N7"

// Generate quiz code
const quizCode = generateRandomCode(6);

// Generate unique identifier
const sessionId = generateRandomCode(16);

// Generate access codes
function createAccessCodes(count) {
  return Array.from({ length: count }, () => 
    generateRandomCode(8)
  );
}
```

---

## Status Badge Helpers

### `getQuizStatusBadge()`

Returns styled status badge component for quiz statuses.

```javascript
getQuizStatusBadge(status: number): ReactElement
```

#### Examples

```jsx
// Basic usage
{getQuizStatusBadge(1)}  // Active badge
{getQuizStatusBadge(3)}  // Completed badge

// In a quiz list
{quizzes.map(quiz => (
  <div key={quiz.id}>
    <h3>{quiz.title}</h3>
    {getQuizStatusBadge(quiz.status)}
  </div>
))}
```

#### Status Mappings

| Status Code | Label | CSS Class |
|------------|-------|-----------|
| `1` | Active | `status-running` |
| `2` | Scheduled | `status-scheduled` |
| `3` | Completed | `status-completed` |
| `4` | Paused | `status-paused` |
| `5` | Expired | `status-expired` |
| `6` | Live | `status-live` |
| Other | Unknown | `status-unknown` |

#### Required CSS

```css
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-running { 
  background: #dcfce7; 
  color: #166534; 
}

.status-scheduled { 
  background: #dbeafe; 
  color: #1e40af; 
}

.status-completed { 
  background: #f3f4f6; 
  color: #374151; 
}

.status-paused { 
  background: #fef3c7; 
  color: #92400e; 
}

.status-expired { 
  background: #fee2e2; 
  color: #991b1b; 
}

.status-live { 
  background: #fecaca; 
  color: #b91c1c; 
}
```

---

### `getStatusBadge()`

Returns participant status badge with icon.

```javascript
getStatusBadge(status: string): ReactElement
```

#### Examples

```jsx
{getStatusBadge('completed')}
{getStatusBadge('in_progress')}
{getStatusBadge('started')}

// In participant list
{participants.map(p => (
  <div key={p.id}>
    <span>{p.name}</span>
    {getStatusBadge(p.status)}
  </div>
))}
```

#### Status Types

- `completed` - Green badge with CheckCircle icon
- `in_progress` - Blue badge with Play icon
- `started` - Yellow badge with Clock icon
- Default - Gray badge with Eye icon

---

### `getTimerColor()`

Returns dynamic color classes for timer based on remaining time.

```javascript
getTimerColor(timeRemaining: number, darkMode?: boolean): string
```

#### Examples

```jsx
function Timer({ timeRemaining }) {
  const isDark = document.documentElement.classList.contains('dark');
  
  return (
    <div className={`timer ${getTimerColor(timeRemaining, isDark)}`}>
      {formatTime(timeRemaining)}
    </div>
  );
}

// Automatic dark mode detection
<div className={getTimerColor(seconds, 
  window.matchMedia('(prefers-color-scheme: dark)').matches
)}>
  {formatTime(seconds)}
</div>
```

#### Color Rules

| Time Remaining | Color |
|---------------|-------|
| ≤ 10 seconds | Red (urgent) |
| ≤ 30 seconds | Amber (warning) |
| > 30 seconds | Emerald (safe) |

---

## Color Utilities

### `connectionColors()`

Returns color scheme object for visual connections (matching questions).

```javascript
connectionColors(hash?: number): object
```

#### Returns

```javascript
{
  border: string,  // Tailwind border classes
  bg: string,      // Tailwind background classes
  line: string,    // Hex color for light mode
  darkLine: string // Hex color for dark mode
}
```

#### Examples

```jsx
// Get color for index
const colors = connectionColors(0);  // Blue colors
const colors = connectionColors(3);  // Red colors

// Use in matching question
function MatchingPair({ index, left, right }) {
  const colors = connectionColors(index);
  
  return (
    <div className={`border-2 ${colors.border} ${colors.bg}`}>
      <span>{left}</span>
      <svg>
        <line stroke={colors.line} />
      </svg>
      <span>{right}</span>
    </div>
  );
}

// Draw connection line
const isDark = document.documentElement.classList.contains('dark');
const colors = connectionColors(pairIndex);
ctx.strokeStyle = isDark ? colors.darkLine : colors.line;
```

#### Available Colors

12 distinct color schemes: Blue, Green, Purple, Red, Pink, Indigo, Teal, Cyan, Emerald, Sky, Rose, Slate

---

### `hashString()`

Creates deterministic hash from string (for consistent color assignment).

```javascript
hashString(value: any): number
```

#### Examples

```javascript
hashString('user@example.com');  // 1234567890
hashString('test');              // 987654321
hashString(null);                // 0

// Consistent color for email
const userColor = connectionColors(hashString(user.email));

// Stable background color
const bgIndex = hashString(category.name) % 5;
```

---

### `getMatchingConnectionColor()`

Gets deterministic color for matching question connections.

```javascript
getMatchingConnectionColor(leftKey: string, rightKey: string): object
```

#### Examples

```jsx
function MatchingQuestion({ pairs }) {
  return (
    <div>
      {pairs.map(pair => {
        const colors = getMatchingConnectionColor(
          pair.left, 
          pair.right
        );
        
        return (
          <div key={pair.id} className={colors.border}>
            <span>{pair.left}</span>
            <span>{pair.right}</span>
          </div>
        );
      })}
    </div>
  );
}

// Draw connection with consistent color
const colors = getMatchingConnectionColor('Apple', 'Fruit');
drawLine(colors.line);
```

---

## Avatar Helpers

### `getAvatarUrl()`

Generates consistent avatar URL from email using DiceBear API.

```javascript
getAvatarUrl(email: string): string
```

#### Examples

```jsx
// Basic usage
<img 
  src={getAvatarUrl('user@example.com')} 
  alt="Avatar" 
/>

// With fallback
<img 
  src={getAvatarUrl(user.email)} 
  alt={user.name}
  onError={(e) => e.target.src = '/default-avatar.png'}
/>

// In user list
{users.map(user => (
  <div key={user.id}>
    <img 
      src={getAvatarUrl(user.email)} 
      className="w-10 h-10 rounded-full"
    />
    <span>{user.name}</span>
  </div>
))}

// Profile picture
<div className="avatar">
  <img src={getAvatarUrl(currentUser.email)} />
</div>
```

#### Features

- ✅ Deterministic (same email = same avatar)
- ✅ Uses lorelei avatar style
- ✅ Email normalized (lowercase, trimmed)
- ✅ No authentication required

---

### `getAvatarNumber()`

Generates number (1-70) from email for avatar selection.

```javascript
getAvatarNumber(email: string): number
```

#### Examples

```javascript
getAvatarNumber('user@example.com');  // 42 (1-70)

// Select from predefined avatars
const avatarNum = getAvatarNumber(user.email);
const avatar = `/avatars/avatar-${avatarNum}.png`;

// Color selection
const colors = ['red', 'blue', 'green', /* ... */];
const colorIndex = (getAvatarNumber(email) - 1) % colors.length;
```

---

## Text Helpers

### `firstWords()`

Truncates text to specified number of words with ellipsis.

```javascript
firstWords(text: string, count?: number): string
```

#### Examples

```javascript
firstWords('The quick brown fox jumps', 3);
// "The quick brown…"

firstWords('Short text', 10);
// "Short text" (no truncation)

firstWords('', 5);
// ""

// Truncate descriptions
<p className="preview">
  {firstWords(article.content, 20)}
</p>

// Card preview
{posts.map(post => (
  <div key={post.id}>
    <h3>{post.title}</h3>
    <p>{firstWords(post.body, 15)}</p>
  </div>
))}
```

---

## Answer Rendering

### `renderAnswer()`

Renders user answer with correct answer comparison for quiz responses.

```javascript
renderAnswer(response: object): ReactElement
```

#### Response Object Structure

```javascript
{
  question: {
    id: number,
    type: string,
    options: array,
    question_data: object
  },
  user_answer: any,
  correct_answer: any,
  is_correct: boolean
}
```

#### Examples

```jsx
// Basic usage
{responses.map(response => (
  <div key={response.id}>
    <h4>{response.question.title}</h4>
    {renderAnswer(response)}
  </div>
))}

// In results page
function QuizResults({ participant }) {
  return (
    <div>
      {participant.responses.map(response => (
        <div className="question-result">
          <div className="question-text">
            {response.question.question_text}
          </div>
          {renderAnswer(response)}
        </div>
      ))}
    </div>
  );
}
```

#### Supported Question Types

##### Single Choice (mcq_single)

```jsx
// Shows selected option with correct/incorrect indicator
// Shows correct answer if wrong
```

##### Multiple Choice (mcq_multiple)

```jsx
// Shows all selected options
// Highlights correct/incorrect selections
// Shows all correct answers if wrong
```

##### Text Input / Fill in the Blank

```jsx
// Shows user's text answer
// Shows correct answer if wrong
```

##### Matching

```jsx
// Shows all matching pairs
// Highlights correct/incorrect matches
// Shows correct pairs for wrong matches
```

##### True/False

```jsx
// Shows selected option
// Shows correct answer if wrong
```

#### Features

- ✅ Handles missing/undefined data gracefully
- ✅ Dark mode compatible
- ✅ Color-coded correct/incorrect answers
- ✅ Shows correct answers for wrong responses
- ✅ Supports nested question data structures
- ✅ Fallback for unknown question types

---

## Data Utilities

### `getUniqueByEmail()`

Filters array to unique participants by email.

```javascript
getUniqueByEmail(participants?: array): array
```

#### Examples

```javascript
const participants = [
  { email: 'user@test.com', name: 'John' },
  { email: 'user@test.com', name: 'John Doe' },
  { email: 'jane@test.com', name: 'Jane' }
];

getUniqueByEmail(participants);
// [
//   { email: 'user@test.com', name: 'John' },
//   { email: 'jane@test.com', name: 'Jane' }
// ]

// Remove duplicate submissions
const uniqueParticipants = getUniqueByEmail(allParticipants);

// Count unique users
const uniqueCount = getUniqueByEmail(submissions).length;

// Filter before export
const exportData = getUniqueByEmail(data);
```

---

## Complete Integration Examples

### Question Type Display

```jsx
import { 
  getTypeLabel, 
  getQuestionTypeIcon, 
  getDifficultyColor 
} from '@/lib/helpers';

function QuestionCard({ question }) {
  return (
    <div className="question-card">
      <div className="flex items-center gap-2">
        {getQuestionTypeIcon(question.type, { size: 20 })}
        <span className="font-medium">
          {getTypeLabel(question.type)}
        </span>
      </div>
      
      <p className="question-text">
        {question.question_text}
      </p>
      
      <div className={`badge ${getDifficultyColor(question.difficulty)}`}>
        {question.difficulty}
      </div>
    </div>
  );
}
```

### Quiz Timer Component

```jsx
import { formatTime, getTimerColor } from '@/lib/helpers';
import { useEffect, useState } from 'react';

function QuizTimer({ duration }) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const isDark = document.documentElement.classList.contains('dark');
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className={`timer-display ${getTimerColor(timeRemaining, isDark)}`}>
      <Clock size={16} />
      <span className="font-mono">
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
}
```

### Quiz Results Display

```jsx
import { 
  renderAnswer, 
  formatNumber, 
  getStatusBadge 
} from '@/lib/helpers';

function QuizResults({ participant }) {
  const scorePercent = (participant.score / participant.total_points) * 100;
  
  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Quiz Results</h1>
        {getStatusBadge(participant.status)}
      </div>
      
      <div className="score-display">
        <span className="score">{formatNumber(scorePercent)}%</span>
        <span className="points">
          {participant.score} / {participant.total_points}
        </span>
      </div>
      
      <div className="answers">
        {participant.responses.map(response => (
          <div key={response.id} className="answer-card">
            <h3>{response.question.question_text}</h3>
            {renderAnswer(response)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Matching Question Display

```jsx
import { 
  getMatchingConnectionColor, 
  connectionColors 
} from '@/lib/helpers';

function MatchingQuestion({ pairs, userMatches }) {
  return (
    <div className="matching-container">
      <div className="left-column">
        {pairs.map((pair, idx) => {
          const colors = connectionColors(idx);
          return (
            <div 
              key={pair.left}
              className={`matching-item ${colors.border} ${colors.bg}`}
            >
              {pair.left}
            </div>
          );
        })}
      </div>
      
      <svg className="connections">
        {Object.entries(userMatches).map(([left, right]) => {
          const colors = getMatchingConnectionColor(left, right);
          return (
            <line 
              key={`${left}-${right}`}
              stroke={colors.line}
              strokeWidth={2}
            />
          );
        })}
      </svg>
      
      <div className="right-column">
        {pairs.map(pair => (
          <div key={pair.right} className="matching-item">
            {pair.right}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### User Avatar Component

```jsx
import { getAvatarUrl } from '@/lib/helpers';

function UserAvatar({ user, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  return (
    <div className="relative">
      <img
        src={getAvatarUrl(user.email)}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover`}
        onError={(e) => {
          e.target.src = '/default-avatar.png';
        }}
      />
      {user.is_online && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}
```

---

## TypeScript Support

```typescript
// Type definitions
interface QuestionType {
  value: string;
  label: string;
}

interface Response {
  id: number;
  question: Question;
  user_answer: any;
  correct_answer: any;
  is_correct: boolean;
}

interface Question {
  id: number;
  type: string;
  question_text: string;
  options?: Option[];
  question_data?: any;
}

interface Option {
  id: number;
  option_text: string;
  is_correct: boolean;
}

// Usage with types
const label: string = getTypeLabel(type);
const icon: ReactElement = getQuestionTypeIcon(type, props);
const color: string = getDifficultyColor(difficulty);
```

---

## Best Practices

### ✅ Do's

```javascript
// Use appropriate formatters
const displayDate = formatDate(quiz.created_at);
const displayTime = formatTime(seconds);

// Handle null/undefined safely
const label = getTypeLabel(question?.type);
const unique = getUniqueByEmail(participants || []);

// Memoize expensive operations
const renderedAnswer = useMemo(() => 
  renderAnswer(response), 
  [response]
);

// Use consistent styling
<Badge className={getDifficultyColor(difficulty)}>
  {difficulty}
</Badge>
```

### ❌ Don'ts

```javascript
// Don't format dates manually
const date = new Date().toLocaleDateString(); // Use formatDate()

// Don't hardcode icon mappings
if (type === 'mcq') return <CheckCircle />; // Use getQuestionTypeIcon()

// Don't skip null checks
renderAnswer(response.question.options[0]); // May crash

// Don't mix color utilities
className="bg-green-500" // Use getDifficultyColor() for consistency
```

---

## Dependencies

- `lucide-react` - Icon components
- `@/components/ui/badge` - Badge component for status display

---

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Supports dark mode via CSS
- ✅ Locale-aware formatting (uses browser locale)
- ✅ Responsive SVG rendering