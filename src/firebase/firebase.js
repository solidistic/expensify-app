import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default };

// db.ref("expenses").on("child_changed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// db.ref("expenses").on("child_added", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// db.ref("expenses").on("value", snapshot => {
//   const expenses = [];
//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });
//   console.log(expenses);
// });

// db.ref("expenses").push({
//   description: "Rent",
//   note: "This months rent",
//   amount: 797000,
//   createdAt: 201390
// });

// db.ref().on("value", snapshot => {
//   const response = snapshot.val();
//   console.log(
//     `${response.name} is ${response.job.title} at ${response.job.company}.`
//   );
// }, e => {
//   console.log("Error fetching the data", e);
// });

// db.ref("location")
//   .once("value")
//   .then(snapshot => {
//     console.log(snapshot.val());
//   })
//   .catch(e => {
//     console.log(e);
//   });

// db.ref()
//   .set({
//     name: "Janne Mulari",
//     age: 29,
//     stressLevel: 4,
//     job: {
//       title: "Software developer",
//       company: "Google"
//     },
//     location: {
//       city: "Kajaani",
//       country: "Finland"
//     }
//   })
//   .catch(e => console.log("Cannot connect to firebase database", e));

// db.ref().update({
//   stressLevel: 9,
//   "job/company": "Amazon",
//   "location/city": "Helsinki"
// });

// db.ref()
//   .remove()
//   .then(() => {
//     console.log("isSingle removed");
//   })
//   .catch(e => {
//     console.log("Error occurred", e);
//   });
