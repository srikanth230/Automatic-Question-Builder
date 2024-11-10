const step2 = document.querySelector(".step2"),
    verifyEmail = document.getElementById("verifyEmail"),
    inputs = document.querySelectorAll(".otp-group input"),
    verifyButton = document.querySelector(".verifyButton");
let OTP = "";

// Fetch email from previous login (assumed it's stored in localStorage)
let emailAddress = localStorage.getItem("loggedInEmail");
verifyEmail.innerText = emailAddress;

window.addEventListener("load", () => {
    emailjs.init("kZZZcRq2dtIKEK-R9");
    step2.style.display = "block"; // Directly show OTP step
    sendOTP(); // Automatically send OTP on load
});

// Function to generate and send OTP
const sendOTP = () => {
    OTP = generateOTP(); // Generate random 4-digit OTP
    let templateParameter = {
        from_name: "QBUILD",
        OTP: OTP,
        message: "Your OTP code",
        reply_to: emailAddress,
    };

    emailjs.send("service_wlb1oif", "template_bv9jrqf", templateParameter).then(
        (res) => {
            console.log("OTP sent successfully");
        },
        (err) => {
            console.log("Error sending OTP", err);
        }
    );
};

// Generate random 4-digit OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

// Handling OTP inputs
inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '').substr(0, 1); // Restrict to single digit

        // Move to the next input automatically
        if (this.value !== "" && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        // Verify OTP automatically if all inputs are filled
        if (inputs[0].value && inputs[1].value && inputs[2].value && inputs[3].value) {
            verifyOTP();
        }
    });

    // Allow moving back to the previous input on "Backspace"
    input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

// Verify OTP
const verifyOTP = () => {
    let enteredOTP = Array.from(inputs).map(input => input.value).join('');

    if (OTP == enteredOTP) {
        
        window.location.href = "./Dashboard1.html"; // Replace with the actual next page URL
    } else {
        alert("Invalid OTP. Please try again.");
        // Optionally, shake the button to indicate error
        verifyButton.classList.add("error-shake");
        setTimeout(() => verifyButton.classList.remove("error-shake"), 1000);
    }
};

// Resend OTP if needed
function resendOTP() {
    sendOTP();
    alert("A new OTP has been sent to your email.");
}
