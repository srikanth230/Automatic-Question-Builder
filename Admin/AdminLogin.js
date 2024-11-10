// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Firebase configuration for qbuild-admin app
const firebaseConfig = {
    apiKey: "AIzaSyApNEfrUTurP8h3elk66LAMohpbJOHLoqI",
    authDomain: "qbuild-admin.firebaseapp.com",
    projectId: "qbuild-admin",
    storageBucket: "qbuild-admin.appspot.com",
    messagingSenderId: "892067066927",
    appId: "1:892067066927:web:c39cc552bcc73338c482da",
    measurementId: "G-53WD4YV52N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Handle form submission
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get the email and password from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Assume this happens after successful login
// This is fetched from the login form
    localStorage.setItem("loggedInEmail", email);  // Store the email in localStorage


    // Firebase Authentication: Check if the email is already registered (sign in)
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User successfully signed in
            const user = userCredential.user;

            // Redirect to the next page after successful login
            window.location.href = "AdminOTP.html";
        })
        .catch((error) => {
            // If user is not found or the password is wrong, handle the error
            const errorCode = error.code;

            if (errorCode === 'auth/user-not-found') {
                alert('This email is not registered. Please contact admin for assistance.');
            } else if (errorCode === 'auth/wrong-password') {
                alert('Incorrect password. Please try again.');
            } else {
                alert('ERROR : Please use valid mail id and password or else contact Admin');
            }
        });
});
