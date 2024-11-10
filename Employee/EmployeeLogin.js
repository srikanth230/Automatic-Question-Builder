// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpyWNbX5VQ05k3z9aE_4GTIhFzLMLVAEQ",
    authDomain: "gokul-search.firebaseapp.com",
    databaseURL: "https://gokul-search-default-rtdb.firebaseio.com",
    projectId: "gokul-search",
    storageBucket: "gokul-search.appspot.com",
    messagingSenderId: "1062532158510",
    appId: "1:1062532158510:web:78fcf98ac7dff44cd57bbf",
    measurementId: "G-71JJT3TGSG"
};

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

    // Firebase Authentication: Check if the email exists and try to sign in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            const user = userCredential.user;

            // Store user info in Firebase Realtime Database
            set(ref(database, 'users/' + user.uid), {
                email: user.email,
                uid: user.uid,
                lastLogin: new Date().toISOString()
            })
            .then(() => {
                // Send verification email to the user
                if (!user.emailVerified) {
                    sendEmailVerification(user)
                        .then(() => {
                            alert('Verification email sent to ' + user.email);
                        })
                        .catch((error) => {
                            console.error('Error sending verification email:', error);
                            alert('Error sending verification email.');
                        });
                }

                // Inform the user of successful login
                alert('User logged in successfully! A verification email has been sent.');
                window.location.href = "EmployeeOTP.html";
            })
            .catch((error) => {
                console.error('Error saving user data:', error);
                alert('Error saving user data.');
            });
        })
        .catch((error) => {
            // Handle errors for incorrect username or password
            const errorCode = error.code;
            if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                alert('Incorrect username or password.');
            } else {
                const errorMessage = error.message;
                alert('Please contact admin');
            }
        });
});