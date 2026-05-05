// Portal Layout Component
// Handles sidebar mobile menu toggle, dynamic sidebar rendering, and common UI interactions

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the layout
    initLayout();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show-mobile');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.remove('show-mobile');
                }
            }
        });
    }
});

/**
 * Initializes the portal layout (sidebar, header, icons)
 */
function initLayout() {
    if (typeof Auth === 'undefined') return;

    const user = Auth.getCurrentUser();
    if (!user) return;

    // 1. Render Sidebar
    renderDynamicSidebar(user.role);

    // 2. Update Header Info
    const initialEl = document.getElementById('headerInitial') || document.getElementById('userInitial');
    const nameEl = document.getElementById('headerName') || document.getElementById('userName');
    const emailEl = document.getElementById('headerEmail') || document.getElementById('userEmail');

    if (initialEl) initialEl.textContent = Auth.getUserDisplayName().charAt(0).toUpperCase();
    if (nameEl) nameEl.textContent = Auth.getUserDisplayName();
    if (emailEl) emailEl.textContent = user.email;

    // 3. Initialize lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 4. Initialize Loosi Chatbot
    if (typeof PortalChatbot !== 'undefined') {
        PortalChatbot.init();
    } else {
        // Dynamically load chatbot script if not present
        const script = document.createElement('script');
        script.src = 'js/components/portal-chatbot.js';
        script.onload = () => {
            if (typeof PortalChatbot !== 'undefined') PortalChatbot.init();
        };
        document.head.appendChild(script);
    }
}

/**
 * Renders the sidebar based on user role
 */
function renderDynamicSidebar(role) {
    const sidebarNav = document.getElementById('dynamicSidebar') || document.querySelector('#sidebar nav');
    if (!sidebarNav) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const sidebarLinks = {
        admin: [
            { name: 'Dashboard', icon: 'layout-dashboard', href: 'admin-dashboard.html' },
            { name: 'Users', icon: 'users', href: 'admin-users.html' },
            { name: 'Courses', icon: 'book-open', href: 'admin-courses.html' },
            { name: 'Projects', icon: 'briefcase', href: 'admin-projects.html' },
            { name: 'Invoices', icon: 'file-text', href: 'admin-invoices.html' },
            { name: 'Meetings', icon: 'video', href: 'admin-meetings.html' }
        ],
        student: [
            { name: 'Dashboard', icon: 'layout-dashboard', href: 'student-dashboard.html' },
            { name: 'Courses', icon: 'book-open', href: 'courses.html' },
            { name: 'Assignments', icon: 'clipboard-list', href: 'assignments.html' },
            { name: 'Resources', icon: 'folder-open', href: 'resources.html' },
            { name: 'Attendance', icon: 'calendar', href: 'attendance.html' },
            { name: 'Invoices', icon: 'receipt', href: 'student-invoices.html' },
            { name: 'Meetings', icon: 'video', href: 'meetings.html' }
        ],
        employee: [
            { name: 'Dashboard', icon: 'layout-dashboard', href: 'employee-dashboard.html' },
            { name: 'Tasks', icon: 'clipboard-list', href: 'employee-tasks.html' },
            { name: 'Projects', icon: 'briefcase', href: 'employee-projects.html' },
            { name: 'Meetings', icon: 'video', href: 'meetings.html' }
        ],
        client: [
            { name: 'Dashboard', icon: 'layout-dashboard', href: 'client-dashboard.html' },
            { name: 'Projects', icon: 'briefcase', href: 'client-projects.html' },
            { name: 'Invoices', icon: 'file-text', href: 'client-invoices.html' },
            { name: 'Meetings', icon: 'video', href: 'meetings.html' }
        ],
        intern: [
            { name: 'Dashboard', icon: 'layout-dashboard', href: 'intern-dashboard.html' },
            { name: 'Training', icon: 'book-open', href: 'intern-training.html' },
            { name: 'Tasks', icon: 'clipboard-list', href: 'intern-tasks.html' },
            { name: 'Payments', icon: 'receipt', href: 'intern-invoices.html' },
            { name: 'Meetings', icon: 'video', href: 'meetings.html' }
        ],
    };

    const commonLinks = [
        { name: 'Messages', icon: 'message-square', href: 'messages.html' },
        { name: 'Profile', icon: 'user-circle', href: 'profile.html' }
    ];

    const links = [...(sidebarLinks[role] || []), ...commonLinks];

    sidebarNav.innerHTML = links.map(link => `
        <a href="${link.href}" class="portal-nav-link ${currentPath === link.href ? 'active' : ''}">
            <i data-lucide="${link.icon}" class="w-5 h-5"></i><span>${link.name}</span>
        </a>
    `).join('');
}
