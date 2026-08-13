# MyBoard architecture

## Frontend
React/Vite owns UI state and presentation. Firebase client SDK handles authentication,
Firestore reads/writes and Storage uploads.

## Backend
Express exposes authenticated REST endpoints. Firebase Admin verifies Firebase ID tokens
and provides trusted server-side Firestore access. AI provider credentials belong here.

## Firebase
- Authentication: users
- Firestore: structured application records
- Storage: PDFs, documents, images, videos and recordings

## Data collections
users, subjects, timetable, assignments, activities, grades, memorandum, papers,
attendance, quizzes, library, settings, recordings, videos

## Security
The frontend never receives Firebase Admin credentials. User-owned records are scoped by
ownerId. Review the rules before production deployment.
