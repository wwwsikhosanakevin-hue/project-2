import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

let credential;
const servicePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (servicePath && fs.existsSync(path.resolve(servicePath))) {
  credential = admin.credential.cert(JSON.parse(fs.readFileSync(path.resolve(servicePath), 'utf8')));
} else {
  credential = admin.credential.applicationDefault();
}

if (!admin.apps.length) admin.initializeApp({ credential, storageBucket: process.env.FIREBASE_STORAGE_BUCKET });
export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export const adminAuth = admin.auth();
