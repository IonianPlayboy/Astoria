import Firebase from "firebase";
const config = {
	apiKey: "AIzaSyAyeLXWj4BFuAlbmhbwy3ehVIrlg9VdozI",
	authDomain: "astoria-webdoc.firebaseapp.com",
	databaseURL: "https://astoria-webdoc.firebaseio.com",
	projectId: "astoria-webdoc",
	storageBucket: "astoria-webdoc.appspot.com",
	messagingSenderId: "206465159521"
};
export const firebaseApp = Firebase.initializeApp(config);
export const database = Firebase.database();
