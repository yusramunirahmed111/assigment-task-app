// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQciTU9FfWQxTw-bq-qLSx-0giZt69hKw",
  authDomain: "authentication-9f1bd.firebaseapp.com",
  projectId: "authentication-9f1bd",
  storageBucket: "authentication-9f1bd.firebasestorage.app",
  messagingSenderId: "16574654487",
  appId: "1:16574654487:web:5fe664929ebf6619919452",
  measurementId: "G-DTZ6ZWDYEW",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const submit = document.getElementById("submit")
submit.addEventListener("click",function (event) {
  event.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert ("login successfully......")
      window.location.href="index.html"
      // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
  // ..
});
})