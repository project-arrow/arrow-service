import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';

export class FirebaseConfigurer {
  private getFirebaseConfig(): FirebaseOptions {
    return {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    };
  }

  getFirebaseApp(): FirebaseApp {
    return initializeApp(this.getFirebaseConfig());
  }
}
