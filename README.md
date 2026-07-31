<div align="center">

# Notes

**A responsive Angular notes application with real-time Firebase Firestore synchronization.**

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=flat&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=flat&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-DD2C00?style=flat&logo=firebase&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=flat&logo=reactivex&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-C6538C?style=flat&logo=sass&logoColor=white)

[📂 Repository](https://github.com/EbubekirElicora/Notes)

</div>

---

## Overview

Notes is an Angular application for creating, editing, organizing and deleting personal notes. The project uses **Firebase Firestore** as its database and listens for real-time changes through Firestore snapshot subscriptions.

The application was built with Angular standalone components and demonstrates CRUD operations, dependency injection, typed interfaces, component communication, filtering and real-time data synchronization.

---

## Features

- Create new notes with a title and content
- Edit existing notes directly in the application
- Mark notes as favorites
- Filter between all notes and favorite notes
- Move notes to the trash
- Restore notes from the trash
- Permanently delete trashed notes
- Synchronize changes with Firebase Firestore in real time
- React automatically to added, modified and removed Firestore documents
- Limit note queries to 100 entries
- Responsive component-based interface

---

## Tech Stack

### Frontend

- Angular 17
- TypeScript 5.2
- HTML5
- SCSS
- Angular Forms
- Angular standalone components
- RxJS 7.8

### Database

- Firebase
- Cloud Firestore
- AngularFire 17

### Development tools

- Angular CLI
- npm
- Git
- GitHub
- Visual Studio Code

---

## Data Model

Each note follows the `Note` interface:

```typescript
export interface Note {
  id?: string;
  type: 'note' | 'trash';
  title: string;
  content: string;
  marked: boolean;
}
```

The fields are used as follows:

| Field | Description |
|---|---|
| `id` | Firestore document ID |
| `type` | Determines whether the item is a normal note or a trash item |
| `title` | Note title |
| `content` | Main note content |
| `marked` | Favorite status |

---

## Firestore Structure

The application uses two Firestore collections:

```text
notes/
trash/
```

Normal notes are stored in `notes`, while deleted notes are moved into `trash`.

Moving a note to the trash follows this process:

```text
Read note
   ↓
Change type to "trash"
   ↓
Create document in trash collection
   ↓
Delete original document from notes collection
```

Restoring a note uses the same process in reverse.

---

## Firestore Operations

The `NoteListService` is responsible for all database communication.

### Create

```typescript
addDoc(collectionReference, note);
```

### Read and subscribe

```typescript
onSnapshot(queryReference, snapshot => {
  // Update local note arrays
});
```

### Update

```typescript
updateDoc(documentReference, cleanNoteData);
```

### Delete

```typescript
deleteDoc(documentReference);
```

The application maintains three note lists:

```typescript
normalNotes: Note[] = [];
normalMarkedNotes: Note[] = [];
trashNotes: Note[] = [];
```

---

## Real-Time Synchronization

Firestore snapshot listeners keep the user interface synchronized with the database.

The application subscribes separately to:

- all normal notes
- favorite notes where `marked == true`
- all trash notes

The main notes query and favorites query are limited to 100 documents.

Document changes are detected as:

- `added`
- `modified`
- `removed`

This means updates can appear in the interface without manually refreshing the page.

---

## Main Components

### `AppComponent`

Combines the main application areas:

- header
- add-note dialog
- note list
- footer

It also controls whether the add-note dialog is open.

### `AddNoteDialogComponent`

Responsible for:

- collecting note title and content
- creating a new `Note` object
- storing the note in Firestore
- clearing and closing the dialog

New notes are created with:

```typescript
{
  type: 'note',
  title: this.title,
  content: this.content,
  marked: false
}
```

### `NoteListComponent`

Responsible for:

- displaying notes
- switching between normal notes and trash
- filtering between all notes and favorites
- requesting the correct list from `NoteListService`

### `NoteComponent`

Responsible for individual note interactions:

- edit mode
- save changes
- toggle favorite status
- move to trash
- restore from trash
- permanently delete

### `NoteListService`

Responsible for:

- Firestore dependency injection
- CRUD operations
- snapshot subscriptions
- favorite queries
- collection and document references
- mapping Firestore data to typed `Note` objects

---

## Project Structure

```text
Notes/
├── NOTEBOOK/
│   ├── src/
│   │   ├── app/
│   │   │   ├── add-note-dialog/
│   │   │   ├── firebase-services/
│   │   │   │   └── note-list.service.ts
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── interfaces/
│   │   │   │   └── note.interface.ts
│   │   │   ├── note-list/
│   │   │   │   └── note/
│   │   │   ├── app.component.html
│   │   │   └── app.component.ts
│   │   ├── environments/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

---

## Getting Started

### Requirements

- Node.js
- npm
- Angular CLI
- Firebase project with Cloud Firestore enabled

### Clone the repository

```bash
git clone https://github.com/EbubekirElicora/Notes.git
cd Notes/NOTEBOOK
```

### Install dependencies

```bash
npm install
```

### Configure Firebase

Add the Firebase project configuration to the Angular environment configuration used by the application.

Example structure:

```typescript
export const environment = {
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};
```

Do not commit private credentials or sensitive configuration values.

### Start the development server

```bash
npm start
```

Open:

```text
http://localhost:4200/
```

---

## Available Commands

```bash
npm start
```

Starts the Angular development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run watch
```

Builds continuously in development mode.

```bash
npm test
```

Runs unit tests through Karma and Jasmine.

---

## Usage

1. Open the application.
2. Create a new note through the add-note dialog.
3. Enter a title and note content.
4. Save the note to Firestore.
5. Mark important notes as favorites.
6. Switch between **All** and **Favorites**.
7. Open a note to edit its content.
8. Move a note to the trash when it is no longer needed.
9. Restore it or delete it permanently from the trash view.

---

## Learning Goals

This project demonstrates:

- Angular standalone components
- TypeScript interfaces
- Dependency injection
- Angular Forms
- Component input and output communication
- Service-based architecture
- Firestore CRUD operations
- Real-time snapshot listeners
- Firestore queries and filters
- State-based UI rendering
- Reusable components
- SCSS styling
- Separation of data and presentation logic

---

## Technical Notes

The current project uses separate Firestore collections for normal and deleted notes. Moving a note therefore creates a new document in the destination collection and deletes the original document.

For a larger production application, an alternative approach would be to retain a single collection and update only a status field. That could reduce document movement and simplify security rules and queries.

The cleanup method is currently named `ngonDestroy()`. Angular's lifecycle hook is case-sensitive and should normally be implemented as:

```typescript
ngOnDestroy(): void {
  this.unsubNotes();
  this.unsubTrash();
  this.unsubMarkedNotes();
}
```

The service should also implement `OnDestroy` to ensure the snapshot listeners are unsubscribed correctly.

---

## Possible Future Improvements

- Correctly implement the `OnDestroy` lifecycle hook
- Add authentication so notes belong to individual users
- Add protected Firestore security rules
- Store normal and deleted notes in one collection
- Add note search
- Add categories and tags
- Add sorting by title or creation date
- Add timestamps to notes
- Add confirmation before permanent deletion
- Add undo after moving a note to trash
- Add loading, empty and error states
- Add optimistic UI updates
- Add offline support
- Add drag-and-drop organization
- Add automated tests
- Add a deployed live demo

---

## Security Notice

This is an educational portfolio project. Before using it with personal or confidential information, the application should include:

- Firebase Authentication
- user-specific Firestore documents
- restrictive Firestore security rules
- validated input
- environment-based configuration
- suitable data-protection measures

Do not store sensitive personal information in an unsecured test database.

---

## Disclaimer

This project was created for educational and portfolio purposes to practise Angular and Firebase Firestore integration.
