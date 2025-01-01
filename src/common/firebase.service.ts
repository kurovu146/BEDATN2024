import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = JSON.parse(process.env.FIREBASE_CONFIG || '{}');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'free-to-earn-80166.appspot.com', // Thay bằng bucket của bạn
});

export const firebaseStorage = admin.storage().bucket();