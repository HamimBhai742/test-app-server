import { initializeApp, cert, getApps, getApp, App } from 'firebase-admin/app';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

let firebaseApp: App | null = null;
let messaging: Messaging | null = null;

try {
  if (projectId && clientEmail && privateKey) {
    if (getApps().length === 0) {
      firebaseApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('✅ Firebase Admin SDK Initialized Successfully!');
    } else {
      firebaseApp = getApp();
    }
    messaging = getMessaging(firebaseApp);
  } else {
    console.warn('⚠️ Firebase environment variables missing. Firebase Admin SDK not initialized.');
  }
} catch (error) {
  console.error('❌ Firebase Admin SDK Initialization Error:', error);
}

export { messaging };
export default firebaseApp;
