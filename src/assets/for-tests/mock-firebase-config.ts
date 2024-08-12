import { initializeApp } from 'firebase/app';

export const mockFirebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "mock-auth-domain",
  projectId: "mock-project-id",
  storageBucket: "mock-storage-bucket",
  messagingSenderId: "mock-messaging-sender-id",
  appId: "mock-app-id"
};

export const initializeMockFirebase = () => {
  initializeApp(mockFirebaseConfig);
};