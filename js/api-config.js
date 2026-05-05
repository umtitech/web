/**
 * API Configuration and Security
 * Stores obfuscated API keys for client-side fallback
 */

const API_CONFIG = {
    // API base URL - empty string means relative paths (production-ready)
    BASE_URL: "",
    // Encoded Groq API Key (Base64 encoded for basic obfuscation)
    // Used as a fallback when the backend is unavailable.
    g_k: "Z3NrX1BhWDYzUnBZdmVWRGpyQ2hSbXAzV0dkeWIzRlk0bE85bVNWR0NnanVXblI3MkN2VnZwaFQ=",
    // Encoded Groq API Key for LMS Chatbot
    lms_k: "Z3NrX1BhWDYzUnBZdmVWRGpyQ2hSbXAzV0dkeWIzRlk0bE85bVNWR0NnanVXblI3MkN2VnZwaFQ="
};

function getGroqKey() {
    try {
        // Simple Base64 decode
        return atob(API_CONFIG.g_k);
    } catch (e) {
        console.error("Failed to decode API key");
        return null;
    }
}

function getLmsGroqKey() {
    try {
        // Simple Base64 decode for LMS chatbot
        return atob(API_CONFIG.lms_k);
    } catch (e) {
        console.error("Failed to decode LMS API key");
        return null;
    }
}

window.API_CONFIG = {
    getGroqKey,
    getLmsGroqKey
};
