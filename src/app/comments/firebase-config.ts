interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
}

const PROJECT_NAME = 'angular-firebase-auth0';

export const FIREBASE: FirebaseConfig = {
  apiKey: 'AIzaSyCxGpJVfu4mqCKE4qGelsw1jo7AzlB841o',
  authDomain: `${PROJECT_NAME}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_NAME}.firebaseio.com`,
  projectId: PROJECT_NAME,
  storageBucket: `${PROJECT_NAME}.appspot.com`,
  messagingSenderId: '986008863457'
};
