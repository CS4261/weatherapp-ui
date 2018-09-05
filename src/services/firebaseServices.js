import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDGGDw-FdZPWW1zpytpRW5qq0qxeySpfD4",
    authDomain: "weatherapp-4566a.firebaseapp.com",
    databaseURL: "https://weatherapp-4566a.firebaseio.com",
    projectId: "weatherapp-4566a",
    storageBucket: "weatherapp-4566a.appspot.com",
    messagingSenderId: "511465242225"
};
Firebase.initializeApp(config);
console.log("Initialized Firebase");
let database = null;
class FBServices  {
    constructor() {
        if (database === null) {
            this.db = Firebase.database()
        }
    }
}

const db = new FBServices().db;
export default db