document.addEventListener('DOMContentLoaded', function() {
    function validatePassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
    
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const validLength = password.length >= 8;
        const passwordsMatch = password === confirmPassword;
    
        let errorMessage = "";
        if (!validLength) errorMessage = "Password must be at least 8 characters long.";
        if (!hasLetter) errorMessage += " Must contain at least one letter.";
        if (!hasDigit) errorMessage += " Must contain at least one digit.";
        
        if (!passwordsMatch) {
            errorMessage += " Passwords do not match.";
            confirmPasswordError.textContent = " Passwords do not match.";
        } else {
            confirmPasswordError.textContent = "";
        }
    
        if (errorMessage) {
            passwordError.textContent = errorMessage;
            passwordError.style.display = 'block';
            confirmPasswordError.style.display = 'block';
            document.getElementById('password').classList.add('is-invalid');
            document.getElementById('confirm_password').classList.add('is-invalid');
        } else {
            passwordError.style.display = 'none';
            confirmPasswordError.style.display = 'none';
            document.getElementById('password').classList.remove('is-invalid');
            document.getElementById('confirm_password').classList.remove('is-invalid');
        }
    }
    

    function validateEmail() {
        const email = document.getElementById('email').value;
        const emailError = document.getElementById('emailError');
        const localPart = email.split('@')[0];

        if (localPart.length < 6) {
            emailError.textContent = "Email must have at least 6 letters before the '@'.";
            emailError.style.display = 'block';
            document.getElementById('email').classList.add('is-invalid');
        } else {
            emailError.style.display = 'none';
            document.getElementById('email').classList.remove('is-invalid');
        }
    }

    function validateUsername() {
        const username = document.getElementById('username').value;
        const usernameError = document.getElementById('usernameError');
        
        const isValidStart = /^[a-zA-Z\d]/.test(username);
        const isValidLength = username.length >= 6;

        let errorMessage = "";
        if (!isValidStart) errorMessage = "Username must start with a letter or digit.";
        if (!isValidLength) errorMessage += " Username must be at least 6 characters long.";

        if (errorMessage) {
            usernameError.textContent = errorMessage;
            usernameError.style.display = 'block';
            document.getElementById('username').classList.add('is-invalid');
        } else {
            usernameError.style.display = 'none';
            document.getElementById('username').classList.remove('is-invalid');
        }
    }

    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirm_password').addEventListener('input', validatePassword);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('username').addEventListener('input', validateUsername);

    document.querySelector('form').addEventListener('submit', function(event) {
        validatePassword();
        validateEmail();
        validateUsername();

        const isFormInvalid = document.querySelectorAll('.is-invalid').length > 0;
        if (isFormInvalid) {
            event.preventDefault();
        }
    });
});
