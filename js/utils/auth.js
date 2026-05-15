// Authentication Utility
// Handles role-based authentication and session management

const Auth = {
    // Check if user is authenticated
    isAuthenticated() {
        const userRole = localStorage.getItem('user_role') || localStorage.getItem('umti_user_role');
        if (!userRole) return false;

        const rolePrefix = `${userRole}_`;
        const token = localStorage.getItem(`${rolePrefix}umti_token`) || localStorage.getItem('umti_token');
        const sessionActive = localStorage.getItem('umti_session_active');

        return !!token && sessionActive === 'true';
    },

    // Get current user info
    getCurrentUser() {
        const role = localStorage.getItem('user_role') || localStorage.getItem('umti_user_role');
        const rolePrefix = role ? `${role}_` : '';

        return {
            email: localStorage.getItem('umti_user_email'),
            role: role,
            token: localStorage.getItem(`${rolePrefix}umti_token`) || localStorage.getItem('umti_token'),
            loginTime: localStorage.getItem('umti_login_time'),
            info: JSON.parse(localStorage.getItem('user_info') || '{}')
        };
    },

    // Check if user has specific role
    hasRole(role) {
        const userRole = localStorage.getItem('umti_user_role');
        return userRole === role;
    },

    // Protect page - redirect to login if not authenticated
    protectPage(requiredRole = null) {
        if (!this.isAuthenticated()) {
            window.location.href = 'gateway.html';
            return false;
        }

        if (requiredRole && !this.hasRole(requiredRole)) {
            window.location.href = 'gateway.html';
            return false;
        }

        return true;
    },

    // Logout user
    logout() {
        const roles = ['admin', 'student', 'employee', 'client', 'intern'];
        roles.forEach(role => {
            localStorage.removeItem(`${role}_umti_token`);
            localStorage.removeItem(`${role}_user_role`);
        });

        localStorage.removeItem('user_role');
        localStorage.removeItem('umti_token');
        localStorage.removeItem('umti_user_email');
        localStorage.removeItem('umti_user_role');
        localStorage.removeItem('umti_session_active');
        localStorage.removeItem('umti_login_time');
        localStorage.removeItem('user_info');
        window.location.href = 'gateway.html';
    },

    // Get dashboard URL for role
    getDashboardUrl(role = null) {
        const userRole = role || localStorage.getItem('umti_user_role');
        const dashboards = {
            admin: 'admin-dashboard.html',
            student: 'student-dashboard.html',
            employee: 'employee-dashboard.html',
            client: 'client-dashboard.html',
            intern: 'intern-dashboard.html'
        };
        return dashboards[userRole] || 'gateway.html';
    },

    // Get user display name (capitalize role)
    getUserDisplayName() {
        const user = this.getCurrentUser();
        if (!user.role) return 'User';
        return user.role.charAt(0).toUpperCase() + user.role.slice(1);
    },

    // Format email for display (first part before @)
    getDisplayEmail() {
        const user = this.getCurrentUser();
        if (!user.email) return '';
        return user.email.split('@')[0];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
