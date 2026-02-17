// ========================================
// REALMART - UI Utilities Module
// ========================================

/**
 * Show loading spinner
 * @param {string} elementId - ID of container for spinner
 */
function showLoadingSpinner(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
    }
}

/**
 * Hide loading spinner
 * @param {string} elementId - ID of container for spinner
 */
function hideLoadingSpinner(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * Show notification toast
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds (default 3000)
 */
function showNotification(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after duration
    setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Create toast container if it doesn't exist
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1100;
        max-width: 300px;
    `;
    document.body.appendChild(container);
    return container;
}

/**
 * Show modal dialog
 * @param {string} title - Modal title
 * @param {string} content - Modal content (HTML)
 * @param {array} buttons - Array of {label, callback, type} objects
 */
function showModal(title, content, buttons = []) {
    // Create modal if doesn't exist
    let modal = document.getElementById('customModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'customModal';
        modal.className = 'modal hidden';
        document.body.appendChild(modal);
    }
    
    // Build modal content
    let buttonsHTML = '';
    buttons.forEach(btn => {
        buttonsHTML += `<button class="btn-${btn.type || 'primary'}" data-action="${btn.label}">${btn.label}</button>`;
    });
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${title}</h2>
            <div>${content}</div>
            <div class="flex gap-2 mt-3">
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Attach button handlers
    buttons.forEach(btn => {
        const button = modal.querySelector(`[data-action="${btn.label}"]`);
        if (button && btn.callback) {
            button.addEventListener('click', () => {
                btn.callback();
                hideModal();
            });
        }
    });
    
    // Close button handler
    modal.querySelector('.modal-close').addEventListener('click', hideModal);
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
}

/**
 * Hide modal dialog
 */
function hideModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Show confirmation dialog
 * @param {string} message - Confirmation message
 * @param {function} onConfirm - Callback when confirmed
 * @param {function} onCancel - Callback when cancelled
 */
function showConfirm(message, onConfirm, onCancel) {
    showModal('Confirm', message, [
        {
            label: 'Yes',
            callback: onConfirm,
            type: 'primary'
        },
        {
            label: 'Cancel',
            callback: onCancel,
            type: 'secondary'
        }
    ]);
}

/**
 * Format market card HTML
 * @param {object} market - Market object
 * @returns {string} HTML string
 */
function formatMarketCard(market) {
    const imageUrl = market.imageUrl || 'https://via.placeholder.com/300x200?text=Market';
    const statusClass = market.isOpen ? 'open' : 'closed';
    const statusText = market.isOpen ? 'Open Now' : 'Closed';
    
    return `
        <div class="market-card" onclick="window.location.href='market-details.html?id=${market.id}'">
            <div class="market-card-image">
                <img src="${imageUrl}" alt="${market.name}" onerror="this.parentElement.innerHTML='🏪'">
            </div>
            <div class="market-card-body">
                <div class="market-card-title">${market.name}</div>
                <div class="market-card-meta">
                    <span>📍 ${market.city}, ${market.state}</span>
                    <span class="market-status ${statusClass}">${statusText}</span>
                </div>
                <div class="market-card-meta">
                    <span>📞 ${market.phone || 'N/A'}</span>
                </div>
                <p style="font-size: 14px; color: #666; margin: 8px 0;">${market.description ? market.description.substring(0, 80) + '...' : 'No description'}</p>
                <div class="market-card-action">
                    <div style="color: var(--primary-color); font-weight: 600; font-size: 14px;">View Details →</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Format schedule display as table
 * @param {object} schedule - Schedule object
 * @returns {string} HTML table string
 */
function formatScheduleTable(schedule) {
    if (!schedule) {
        return '<p>No schedule available</p>';
    }
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    let html = '<table class="schedule-table"><thead><tr><th>Day</th><th>Hours</th></tr></thead><tbody>';
    
    days.forEach((day, idx) => {
        const hours = schedule[day] || 'Closed';
        html += `<tr><td>${dayLabels[idx]}</td><td>${formatTimeRange(hours)}</td></tr>`;
    });
    
    html += '</tbody></table>';
    
    if (schedule.specialNotes) {
        html += `<div class="alert alert-info"><strong>Note:</strong> ${schedule.specialNotes}</div>`;
    }
    
    return html;
}

/**
 * Disable button and show loading state
 * @param {HTMLElement} button - Button element
 * @param {string} loadingText - Text to show while loading
 */
function setButtonLoading(button, loadingText = 'Loading...') {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.classList.add('loading');
}

/**
 * Reset button to normal state
 * @param {HTMLElement} button - Button element
 */
function resetButtonLoading(button) {
    button.disabled = false;
    button.textContent = button.dataset.originalText || 'Submit';
    button.classList.remove('loading');
}

/**
 * Disable form inputs
 * @param {HTMLElement} form - Form element
 * @param {boolean} disabled - True to disable, false to enable
 */
function setFormDisabled(form, disabled = true) {
    const inputs = form.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
        input.disabled = disabled;
    });
}

/**
 * Clear form fields
 * @param {HTMLElement} form - Form element
 */
function clearForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

/**
 * Validate email address
 * @param {string} email - Email address
 * @returns {boolean}
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {object} {isValid, strength, message}
 */
function validatePassword(password) {
    const checks = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /\d/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password)
    };
    
    const passedChecks = Object.values(checks).filter(Boolean).length;
    let strength = 'weak';
    
    if (passedChecks >= 4) strength = 'strong';
    else if (passedChecks >= 3) strength = 'medium';
    
    return {
        isValid: passedChecks >= 3,
        strength,
        checks
    };
}

/**
 * Toggle element visibility
 * @param {string} elementId - Element ID
 * @param {boolean} show - True to show, false to hide, undefined to toggle
 */
function toggleElement(elementId, show) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    if (show === undefined) {
        element.classList.toggle('hidden');
    } else if (show) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

/**
 * Add CSS class with animation
 * @param {HTMLElement} element - DOM element
 * @param {string} className - Class name to add
 * @param {number} duration - Duration in ms (default 300)
 */
function addClassWithAnimation(element, className, duration = 300) {
    element.classList.add(className);
    
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default USD)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Format date for display
 * @param {Date} date - Date object
 * @param {string} format - Format string (default 'short')
 * @returns {string} Formatted date
 */
function formatDateDisplay(date, format = 'short') {
    const options = {
        short: { year: 'numeric', month: 'short', day: 'numeric' },
        long: { year: 'numeric', month: 'long', day: 'numeric' },
        full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    };
    
    return new Intl.DateTimeFormat('en-US', options[format]).format(date);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Resolves when copied
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied to clipboard!', 'success', 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        showNotification('Failed to copy to clipboard', 'error');
    }
}

/**
 * Smooth scroll to element
 * @param {string} elementId - Element ID
 * @param {number} offset - Offset from top (default 0)
 */
function smoothScrollTo(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
        top,
        behavior: 'smooth'
    });
}

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {function} Debounced function
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {function} Throttled function
 */
function throttle(func, limit = 300) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

console.log('UI Utilities module loaded');
