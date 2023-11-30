import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyC76ODNijrF2ASptAmtgwq0_SdYEgWdlA0',
	authDomain: 'exampledata-3a98a.firebaseapp.com',
	databaseURL: 'https://exampledata-3a98a-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'exampledata-3a98a',
	storageBucket: 'exampledata-3a98a.appspot.com',
	messagingSenderId: '304761247769',
	appId: '1:304761247769:web:956875d0d2ccbdb4dcb288'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
