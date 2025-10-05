import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp(
    {
      "projectId": "danotes-4b207",
      "appId": "1:404579548873:web:f0170cdc7bfcf018ba5718",
      "storageBucket": "danotes-4b207.firebasestorage.app",
      "apiKey": "AIzaSyAVp9oFa2FSRFVzDSfN5LKVl2f4P0Od2yI",
      "authDomain": "danotes-4b207.firebaseapp.com",
      "messagingSenderId": "404579548873"
    }))),
  importProvidersFrom(provideFirestore(() => getFirestore()))]
};
