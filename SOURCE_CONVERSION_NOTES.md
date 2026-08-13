# Conversion notes

The supplied source was a single HTML document containing the MyBoard UI, CSS and browser
JavaScript. It includes the sidebar modules, login/register UI, library subjects, whiteboard,
CRUD-style tables, grades chart, AI helper, session/video features, quiz and settings.

This project separates those concerns into React components and Firebase/Express services.
The original source's simulated/local operations are replaced where appropriate with
Firebase Authentication, Firestore and Storage.

Source attachment: Pasted text.txt
