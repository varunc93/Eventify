import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyCaCXqQIY2K76NsKiMl9qwP_AkS14F_HMc",
   authDomain: "eventify-418a8.firebaseapp.com",
   databaseURL: "https://eventify-418a8.firebaseio.com",
   projectId: "eventify-418a8",
   storageBucket: "eventify-418a8.appspot.com",
   messagingSenderId: "819673372991"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)
export default firebase;