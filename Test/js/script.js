// Basic dropdown functionality for navigation
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
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
        }
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

// Language selector dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageSelector && languageDropdown) {
        languageSelector.addEventListener('click', function(e) {
            e.preventDefault();
            languageDropdown.classList.toggle('active');
        });
        
        // Close language dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageSelector.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });
        
        // Handle language selection
        const languageLinks = languageDropdown.querySelectorAll('a');
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const languageText = this.textContent.trim();
                const languageTextElement = document.querySelector('.language-text');
                if (languageTextElement) {
                    languageTextElement.textContent = languageText;
                }
                languageDropdown.classList.remove('active');
            });
        });
    }
});

// Mobile burger menu functionality (basic structure for future implementation)
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    
    if (burger) {
        burger.addEventListener('click', function() {
            // Basic burger animation - can be expanded later
            this.classList.toggle('active');
        });
    }
});