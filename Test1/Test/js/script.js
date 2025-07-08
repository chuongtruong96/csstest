// Update current time and UI based on login status
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'GMT',
        timeZoneName: 'short'
    };
    const timeString = now.toLocaleDateString('en-US', options).replace(',', ' |');
    
    // Get current user name or default to "Guest"
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    const userName = currentUser ? currentUser.name : 'Guest';
    
    // Update the entire greeting with current time
    const greetingElement = document.getElementById('greeting-time');
    if (greetingElement) {
        greetingElement.textContent = `Hello, ${userName} | ${timeString}`;
    }
    
    // Update UI based on login status
    updateAuthUI(currentUser);
}

// Update authentication UI elements
function updateAuthUI(currentUser) {
    // Desktop buttons only (mobile buttons removed)
    const desktopLoginBtn = document.querySelector('.actions .login-btn');
    const desktopSignupBtn = document.querySelector('.actions .open-account-btn');
    const desktopLogoutBtn = document.querySelector('.actions .logout-btn');
    
    if (currentUser) {
        // User is logged in - show logout, hide login/signup
        if (desktopLoginBtn) desktopLoginBtn.style.display = 'none';
        if (desktopSignupBtn) desktopSignupBtn.style.display = 'none';
        if (desktopLogoutBtn) desktopLogoutBtn.style.display = 'flex';
    } else {
        // User is not logged in - show login/signup, hide logout
        if (desktopLoginBtn) desktopLoginBtn.style.display = 'flex';
        if (desktopSignupBtn) desktopSignupBtn.style.display = 'flex';
        if (desktopLogoutBtn) desktopLogoutBtn.style.display = 'none';
    }
}

// Logout functionality
function logout() {
    // Remove current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Update the UI
    updateTime();
    
    // Show logout message
    alert('You have been logged out successfully!');
}

// Update time every minute
setInterval(updateTime, 60000);
updateTime(); // Initial call

// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Modal functionality
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchToRegister() {
    closeLoginModal();
    openRegisterModal();
}

function switchToLogin() {
    closeRegisterModal();
    openLoginModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === registerModal) {
        closeRegisterModal();
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Simple user storage (in real app, this would be server-side)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    // Update greeting if user is logged in (this will be handled by updateTime function)
    if (currentUser) {
        updateTime(); // This will show the user's name
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            updateTime(); // This will update the greeting with the user's name
            closeLoginModal();
            alert('Login successful!');
            loginForm.reset();
        } else {
            alert('Invalid email or password!');
        }
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        if (users.find(u => u.email === email)) {
            alert('Email already exists!');
            return;
        }
        
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        updateTime(); // This will update the greeting with the user's name
        closeRegisterModal();
        alert('Account created successfully!');
        registerForm.reset();
    });
});

// Language selector functionality
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('active');
}

function selectLanguage(langCode, langName) {
    // Update the displayed language
    const languageText = document.querySelector('.language-text');
    languageText.textContent = langName;
    
    // Close the dropdown
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.remove('active');
    
    // Store the selected language
    localStorage.setItem('selectedLanguage', JSON.stringify({code: langCode, name: langName}));
    
    // In a real app, this would trigger language change
    console.log(`Language changed to: ${langName} (${langCode})`);
}

// Close language dropdown when clicking outside
document.addEventListener('click', function(e) {
    const languageSelector = document.querySelector('.language-selector');
    const dropdown = document.getElementById('languageDropdown');
    
    if (languageSelector && !languageSelector.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Load saved language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = JSON.parse(localStorage.getItem('selectedLanguage'));
    if (savedLanguage) {
        const languageText = document.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = savedLanguage.name;
        }
    }
});