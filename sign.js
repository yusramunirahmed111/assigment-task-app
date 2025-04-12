// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDhA7UvfqRB5Kgp_Eg5Hv3S9nrVeOxhE1g",
    authDomain: "signup-5afce.firebaseapp.com",
    projectId: "signup-5afce",
    storageBucket: "signup-5afce.firebasestorage.app",
    messagingSenderId: "573548830757",
    appId: "1:573548830757:web:2eb08731ca57d3a21c5fcc",
    measurementId: "G-MSDQHM08B4"
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
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert ("sign up successfully......")
      window.location.href="login.html"
      // ...
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  alert(errorMessage)
  // ..
});
})