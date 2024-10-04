const passwordInput = document.getElementById('password');
const passwordStrengthIndicator = document.getElementById('password-strength-indicator');
const passwordCriteria = document.getElementById('password-criteria');
const passwordSuggestions = document.getElementById('password-suggestions');

passwordInput.addEventListener('input', evaluatePasswordStrength);

function evaluatePasswordStrength() {
    const password = passwordInput.value;
    let strengthLevel = 'Weak';
    let criteriaMet = 0;

    // Check password length
    if (password.length >= 8) {
        criteriaMet++;
    }

    // Check for uppercase and lowercase letters
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
        criteriaMet++;
    }

    // Check for numbers
    if (/\d/.test(password)) {
        criteriaMet++;
    }

    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        criteriaMet++;
    }

    // Determine password strength level
    if (criteriaMet === 4) {
        strengthLevel = 'Strong';
    } else if (criteriaMet >= 2) {
        strengthLevel = 'Medium';
    }

    // Update password strength indicator
    updatePasswordStrengthIndicator(strengthLevel);

    // Update password criteria checkmarks
    updatePasswordCriteria(password);

    // Provide suggestions for improvement
    provideSuggestions(password, strengthLevel);
}

function updatePasswordStrengthIndicator(strengthLevel) {
    // Update the progress bar or color-coded indicator
    // For example, you can use a CSS gradient to display the strength level
    passwordStrengthIndicator.style.background = `linear-gradient(to right, ${getStrengthColor(strengthLevel)} 100%)`;
    passwordStrengthIndicator.textContent = `Password strength: ${strengthLevel}`;
}

function updatePasswordCriteria(password) {
    // Update the password criteria checkmarks
    const criteriaList = [
        { label: 'At least 8 characters long', test: password.length >= 8 },
        { label: 'Includes uppercase and lowercase letters', test: /[A-Z]/.test(password) && /[a-z]/.test(password) },
        { label: 'Includes numbers', test: /\d/.test(password) },
        { label: 'Includes special characters', test: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) }
    ];

    passwordCriteria.innerHTML = '';
    criteriaList.forEach((criterion) => {
        const checkbox = document.createElement('div');
        checkbox.textContent = criterion.label;
        checkbox.className = criterion.test ? 'checked' : 'unchecked';
        passwordCriteria.appendChild(checkbox);
    });
}

function provideSuggestions(password, strengthLevel) {
    // Provide suggestions for improvement
    if (strengthLevel === 'Weak') {
        const suggestions = [];
        if (password.length < 8) {
            suggestions.push('Add more characters to reach a minimum of 8');
        }
        if (!/[A-Z]/.test(password)) {
            suggestions.push('Add an uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            suggestions.push('Add a lowercase letter');
        }
        if (!/\d/.test(password)) {
            suggestions.push('Add a number');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            suggestions.push('Add a special character');
        }
        passwordSuggestions.innerHTML = '';
        suggestions.forEach(( suggestion) => {
            const suggestionElement = document.createElement('div');
            suggestionElement.textContent = suggestion;
            passwordSuggestions.appendChild(suggestionElement);
        });
    } else {
        passwordSuggestions.innerHTML = '';
    }
}

function getStrengthColor(strengthLevel) {
    switch (strengthLevel) {
        case 'Weak':
            return '#ff9999';
        case 'Medium':
            return '#ffff99';
        case 'Strong':
            return '#99ff99';
        default:
            return '#ccc';
    }
}