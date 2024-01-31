import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAV4MZopj-aurtwROlEZQNs9eqqpUs2_vI',
	authDomain: 'todosapp-99a09.firebaseapp.com',
	projectId: 'todosapp-99a09',
	storageBucket: 'todosapp-99a09.appspot.com',
	messagingSenderId: '189002354689',
	appId: '1:189002354689:web:d213a0462b9ff47ebab000',
	databaseURL: 'https://todosapp-99a09-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
