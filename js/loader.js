/**
 * Loading Overlay - Replicates Next.js LoadingOverlay component
 * Shows brand logo with rotating rings and inspiring quotes
 */

(function () {
    'use strict';

    const messages = [
        "Innovation differs between a leader and a follower.",
        "The best way to predict the future is to invent it.",
        "Technology is best when it brings people together.",
        "Simplicity is the ultimate sophistication.",
        "Growth is never by mere chance; it is the result of forces working together.",
        "Empowering the future through technology.",
        "Building robust solutions for complex problems."
    ];

    let messageIndex = 0;
    let messageInterval;
    let isLoading = true;

    // Create and inject loading overlay HTML
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <!-- Brand Logo & Spinner Container -->
                <div class="loading-spinner-container">
                    <!-- Outer Rotating Ring -->
                    <div class="loading-ring loading-ring-outer"></div>
                    
                    <!-- Inner Counter-Rotating Ring -->
                    <div class="loading-ring loading-ring-inner"></div>
                    
                    <!-- Logo -->
                    <div class="loading-logo-wrapper">
                        <img src="assets/images/umti-20tech-transparent-20-20only-20logo.png" 
                             alt="UMTI Tech" 
                             class="loading-logo">
                    </div>
                </div>

                <!-- Loading Indicator -->
                <div class="loading-bar-container">
                    <div class="loading-bar"></div>
                </div>

                <!-- Inspiring Quotes -->
                <div class="loading-message-container">
                    <p class="loading-message" id="loading-message">"${messages[0]}"</p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        return overlay;
    }

    // Rotate messages
    function rotateMessage() {
        const messageElement = document.getElementById('loading-message');
        if (!messageElement) return;

        // Fade out
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            messageElement.textContent = `"${messages[messageIndex]}"`;

            // Fade in
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 500);
    }

    // Hide loading overlay
    function hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (!overlay) return;

        clearInterval(messageInterval);
        isLoading = false;

        // Fade out
        overlay.style.opacity = '0';

        setTimeout(() => {
            overlay.remove();
        }, 300);
    }

    // Initialize
    function init() {
        // Create overlay immediately
        const overlay = createLoadingOverlay();

        // Start message rotation
        messageInterval = setInterval(rotateMessage, 3000);

        // Minimum display time (1 second) then wait for page load
        const minDisplayTime = 1000;
        const startTime = Date.now();

        function checkAndHide() {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime >= minDisplayTime) {
                hideLoadingOverlay();
            } else {
                setTimeout(hideLoadingOverlay, minDisplayTime - elapsedTime);
            }
        }

        // Hide when page is fully loaded
        if (document.readyState === 'complete') {
            checkAndHide();
        } else {
            window.addEventListener('load', checkAndHide);
        }
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
