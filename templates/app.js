// Enhanced client-side validation and progressive enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cashback-form');
    const amountInput = document.getElementById('amount');
    const categorySelect = document.getElementById('category');
    const amountError = document.getElementById('amount-error');
    const recommendationCard = document.getElementById('recommendation-card');
    
    // Progressive enhancement - smooth show/hide of recommendation card
    if (recommendationCard) {
        // Add smooth entrance animation
        setTimeout(() => {
            recommendationCard.style.opacity = '1';
            recommendationCard.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Real-time validation for amount input
    amountInput.addEventListener('input', function() {
        validateAmount();
    });
    
    amountInput.addEventListener('blur', function() {
        validateAmount();
    });
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate amount
        if (!validateAmount()) {
            isValid = false;
        }
        
        // Validate category selection
        if (!categorySelect.value) {
            categorySelect.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            categorySelect.style.borderColor = '#e5e7eb';
        }
        
        if (!isValid) {
            e.preventDefault();
            
            // Scroll to first error
            const firstError = document.querySelector('.error-message.visible') || 
                              document.querySelector('input[style*="border-color: rgb(239, 68, 68)"], select[style*="border-color: rgb(239, 68, 68)"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } else {
            // Hide existing recommendation card smoothly before form submission
            if (recommendationCard) {
                recommendationCard.style.opacity = '0';
                recommendationCard.style.transform = 'translateY(-20px)';
            }
        }
    });
    
    // Reset category border color on change
    categorySelect.addEventListener('change', function() {
        this.style.borderColor = '#e5e7eb';
    });
    
    // Amount validation function
    function validateAmount() {
        const value = parseFloat(amountInput.value);
        let isValid = true;
        
        // Clear previous error state
        amountError.classList.remove('visible');
        amountInput.style.borderColor = '#e5e7eb';
        
        if (amountInput.value === '') {
            showAmountError('Amount is required');
            isValid = false;
        } else if (isNaN(value)) {
            showAmountError('Please enter a valid number');
            isValid = false;
        } else if (value < 0) {
            showAmountError('Amount cannot be negative');
            isValid = false;
        } else if (value === 0) {
            showAmountError('Amount must be greater than $0');
            isValid = false;
        } else if (value > 999999) {
            showAmountError('Amount seems too large');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show amount error with animation
    function showAmountError(message) {
        amountError.textContent = message;
        amountError.classList.add('visible');
        amountInput.style.borderColor = '#ef4444';
        
        // Add shake animation
        amountInput.style.animation = 'shake 0.3s ease-in-out';
        setTimeout(() => {
            amountInput.style.animation = '';
        }, 300);
    }
    
    // Add shake animation to CSS (inject it)
    const shakeCSS = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    
    // Inject the shake animation CSS
    const style = document.createElement('style');
    style.textContent = shakeCSS;
    document.head.appendChild(style);
    
    // Format amount input on blur (add commas for large numbers)
    amountInput.addEventListener('blur', function() {
        if (this.value && !isNaN(parseFloat(this.value))) {
            const value = parseFloat(this.value);
            if (value >= 1000) {
                // Format with commas but keep as valid number input
                this.setAttribute('data-formatted', value.toLocaleString());
            }
        }
    });
    
    // Add loading state to submit button
    form.addEventListener('submit', function(e) {
        if (form.checkValidity()) {
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Getting Recommendation...';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;
            
            // Reset button state after a delay (in case form submission fails)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
            }, 10000);
        }
    });
    
    // Add subtle hover effects to form elements
    const formElements = document.querySelectorAll('input, select');
    formElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.style.borderColor !== 'rgb(239, 68, 68)') {
                this.style.borderColor = '#d1d5db';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.style.borderColor !== 'rgb(239, 68, 68)') {
                this.style.borderColor = '#e5e7eb';
            }
        });
    });
});