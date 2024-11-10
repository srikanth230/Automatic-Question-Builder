// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Firebase configuration (Updated)
const firebaseConfig = {
    apiKey: "AIzaSyDrqXRzIzjeiFqQj0SqHIJxuTVYWG5KRPU",
    authDomain: "qbuildtrainer.firebaseapp.com",
    databaseURL: "https://qbuildtrainer-default-rtdb.firebaseio.com", // Update this if needed
    projectId: "qbuildtrainer",
    storageBucket: "qbuildtrainer.appspot.com",
    messagingSenderId: "562060924818",
    appId: "1:562060924818:web:ea4e19b36e85f2df69134b",
    measurementId: "G-23DGNFXT4T"
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

    localStorage.setItem("loggedInEmail", email);

    // Check if the email exists by attempting to log in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User successfully logged in
            const user = userCredential.user;
            console.log("User exists and logged in successfully:", user);

            // Redirect to the welcome page or dashboard
            window.location.href = "TrainerOTP.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // If error is due to no user found, ask them to contact admin
            if (errorCode === 'auth/user-not-found') {
                alert('No account found with this email. Please contact the admin.');
            } else if (errorCode === 'auth/wrong-password') {
                alert('Incorrect password. Please try again.');
            } else {
                console.error('Error during login:', error);
                alert(`Error: ${errorMessage} (Code: ${errorCode})`);
            }
        });
});
