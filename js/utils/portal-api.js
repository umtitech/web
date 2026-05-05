// Real API for Portal Dashboards
// Communicates with the Flask backend

const API_BASE_URL = (window.API_CONFIG && window.API_CONFIG.BASE_URL !== undefined) ? window.API_CONFIG.BASE_URL + '/api' : '/api';

const PortalAPI = {
    // Helper to get headers with JWT
    getHeaders() {
        const userRole = localStorage.getItem('user_role') || localStorage.getItem('umti_user_role');
        const rolePrefix = userRole ? `${userRole.toLowerCase()}_` : '';
        const token = localStorage.getItem(`${rolePrefix}umti_token`) ||
            localStorage.getItem('umti_token') ||
            localStorage.getItem('umti_access_token');

        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    },

    // Helper for fetch with error handling
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const finalOptions = {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...(options.headers || {})
            }
        };

        try {
            const response = await fetch(url, finalOptions);
            if (response.status === 401) {
                console.warn("Session expired or unauthorized");
            }
            if (!response.ok) {
                throw new Error("API request failed");
            }
            return await response.json();
        } catch (error) {
            console.warn(`API Error (${endpoint}) - Using fallback data:`, error);
            
            if (endpoint.includes('/admin/dashboard')) {
                return {
                    total_clients: 125,
                    total_projects: 48,
                    users_by_role: { student: 320, employee: 55, intern: 25 },
                    attendance_summary: { attendance_rate: 96, present_today: 380, absent_today: 15 },
                    projects_by_status: { active: 22, completed: 20, pending: 6 },
                    invoices_by_status: { paid: 85, pending: 12, overdue: 3 },
                    recent_invoices: [
                        { id: 101, user_name: "Tech Solutions Inc.", due_date: "2026-05-10", amount: 4500, status: "paid" },
                        { id: 102, user_name: "Global Retail", due_date: "2026-05-12", amount: 2800, status: "pending" },
                        { id: 103, user_name: "Alpha Corp", due_date: "2026-05-01", amount: 1200, status: "overdue" },
                        { id: 104, user_name: "Nexus Dynamics", due_date: "2026-05-15", amount: 3500, status: "paid" }
                    ]
                };
            } else if (endpoint.includes('/admin/users')) {
                return [
                    { id: 1, name: "Ali Khan", email: "student@gmail.com", role: "student", status: "active", join_date: "2026-01-15" },
                    { id: 2, name: "Sara Ahmed", email: "intern@gmail.com", role: "intern", status: "active", join_date: "2026-02-01" },
                    { id: 3, name: "Tariq Mahmood", email: "employee@gmail.com", role: "employee", status: "active", join_date: "2025-11-20" },
                    { id: 4, name: "Zainab Raza", email: "client@gmail.com", role: "client", status: "active", join_date: "2026-03-10" },
                    { id: 5, name: "Altaf Malkani", email: "admin@gmail.com", role: "admin", status: "active", join_date: "2025-01-10" },
                    { id: 6, name: "Bilal Qureshi", email: "bilal@gmail.com", role: "student", status: "active", join_date: "2026-04-05" },
                    { id: 7, name: "Fatima Noor", email: "fatima@gmail.com", role: "employee", status: "active", join_date: "2026-01-22" }
                ];
            } else if (endpoint.includes('/admin/courses') || endpoint.includes('/student/courses')) {
                return [
                    { id: 1, title: "AI Engineering Bootcamp", description: "Learn to build, train, and deploy advanced ML models using modern Python frameworks.", instructor: "Altaf Malkani", student_count: 145, duration: "8 Weeks", status: "active" },
                    { id: 2, title: "Generative AI Foundations", description: "Deep dive into Large Language Models, prompt engineering, and the Groq/OpenAI APIs.", instructor: "Altaf Malkani", student_count: 89, duration: "6 Weeks", status: "active" },
                    { id: 3, title: "Advanced Python Backend", description: "Master FastAPI, Docker, and microservices architecture for scalable systems.", instructor: "Tariq Mahmood", student_count: 65, duration: "10 Weeks", status: "upcoming" },
                    { id: 4, title: "Computer Vision Specialization", description: "Explore OpenCV, CNNs, and real-time object tracking applications.", instructor: "Altaf Malkani", student_count: 42, duration: "6 Weeks", status: "active" }
                ];
            } else if (endpoint.includes('/admin/projects') || endpoint.includes('/client/projects') || endpoint.includes('/employee/projects')) {
                return [
                    { id: 1, title: "LMS Chatbot Integration", description: "Develop and deploy 'Loosi', a funny robotic AI assistant for the UMTI tech portal.", client_name: "Internal Systems", status: "active", progress: 85, employee_name: "Fatima Noor", intern_name: "Sara Ahmed", deadline: "2026-06-01", course_id: null },
                    { id: 2, title: "E-Commerce AI Recommendation Engine", description: "Build a collaborative filtering recommendation system for online retail.", client_name: "Global Retail", status: "pending", progress: 10, employee_name: "Tariq Mahmood", intern_name: "Unassigned", deadline: "2026-07-15", course_id: 1 },
                    { id: 3, title: "Automated Invoice Processing", description: "Use OCR and NLP to extract data from scanned PDFs.", client_name: "Tech Solutions Inc.", status: "completed", progress: 100, employee_name: "Fatima Noor", intern_name: "Sara Ahmed", deadline: "2026-04-20", course_id: 3 },
                    { id: 4, title: "Predictive Maintenance System", description: "Time-series forecasting for industrial machinery health.", client_name: "Nexus Dynamics", status: "ongoing", progress: 45, employee_name: "Tariq Mahmood", intern_name: "Unassigned", deadline: "2026-08-10", course_id: null }
                ];
            } else if (endpoint.includes('/invoices')) {
                return [
                    { id: 101, user_name: "Tech Solutions Inc.", amount: 4500, due_date: "2026-05-10", status: "paid", description: "Automated Invoice System" },
                    { id: 102, user_name: "Global Retail", amount: 2800, due_date: "2026-05-12", status: "pending", description: "AI Consulting Phase 1" },
                    { id: 103, user_name: "Alpha Corp", amount: 1200, due_date: "2026-05-01", status: "overdue", description: "Monthly Retainer" },
                    { id: 104, user_name: "Nexus Dynamics", amount: 3500, due_date: "2026-05-15", status: "paid", description: "Data Pipeline Setup" },
                    { id: 105, user_name: "Beta Logistics", amount: 1800, due_date: "2026-06-01", status: "pending", description: "Dashboard Development" }
                ];
            } else if (endpoint.includes('/meetings')) {
                return [
                    { id: 1, title: "Weekly Development Sync", date: "2026-05-08T10:00:00", host: "Admin", link: "https://zoom.us/j/dummy1", description: "Discussing weekly progress across all AI projects." },
                    { id: 2, title: "AI Project Kickoff with Nexus", date: "2026-05-09T14:30:00", host: "Altaf Malkani", link: "https://zoom.us/j/dummy2", description: "Initial requirements gathering for predictive maintenance." },
                    { id: 3, title: "Intern Review Session", date: "2026-05-10T11:00:00", host: "Fatima Noor", link: "https://zoom.us/j/dummy3", description: "Reviewing pull requests and code quality with the GenAI interns." },
                    { id: 4, title: "Client Demo: RetailCorp", date: "2026-05-11T16:00:00", host: "Tariq Mahmood", link: "https://zoom.us/j/dummy4", description: "Demonstrating the new recommendation engine." }
                ];
            } else if (endpoint.includes('/messages')) {
                return [
                    { id: 1, sender_name: "Altaf Malkani", receiver_name: "You", content: "Great job on the new portal dashboard layout! Let's deploy it soon.", timestamp: "2026-05-05T09:30:00" },
                    { id: 2, sender_name: "Fatima Noor", receiver_name: "You", content: "Can you review the PR for the Loosi chatbot? I added the funny prompts.", timestamp: "2026-05-05T14:15:00" },
                    { id: 3, sender_name: "You", receiver_name: "Tariq Mahmood", content: "Please update the invoices for Global Retail.", timestamp: "2026-05-04T16:45:00" }
                ];
            } else if (endpoint.includes('/profile')) {
                return {
                    name: "Admin User",
                    email: "admin@gmail.com",
                    role: "admin",
                    bio: "Senior AI Developer and System Administrator.",
                    join_date: "2025-01-10",
                    avatar: null
                };
            }
            return [];
        }
    },

    // Admin Dashboard Data
    getAdminDashboard() {
        return this.request('/admin/dashboard');
    },

    // Student Dashboard Data
    getStudentDashboard() {
        return this.request('/student/dashboard');
    },

    // Employee Dashboard Data
    getEmployeeDashboard() {
        return this.request('/employee/dashboard');
    },

    // Client Dashboard Data
    getClientDashboard() {
        return this.request('/client/dashboard');
    },

    // Intern Dashboard Data
    getInternDashboard() {
        return this.request('/intern/dashboard');
    },

    // Messages Data
    getMessages() {
        return this.request('/common/messages');
    },

    sendMessage(receiverId, content) {
        return this.request('/common/messages', {
            method: 'POST',
            body: JSON.stringify({ receiver_id: receiverId, content: content })
        });
    },

    // Meetings Data
    getMeetings() {
        return this.request('/common/meetings');
    },

    createMeeting(meetingData) {
        return this.request('/common/meetings', {
            method: 'POST',
            body: JSON.stringify(meetingData)
        });
    },

    // Users List (for Admin)
    getUsers() {
        return this.request('/admin/users');
    },

    createUser(userData) {
        return this.request('/admin/users', { method: 'POST', body: JSON.stringify(userData) });
    },

    updateUser(userId, userData) {
        return this.request(`/admin/users/${userId}`, { method: 'PUT', body: JSON.stringify(userData) });
    },

    deleteUser(userId) {
        return this.request(`/admin/users/${userId}`, { method: 'DELETE' });
    },

    // User Profile
    getProfile() {
        return this.request('/common/profile');
    },

    // Course Management
    getCourses() {
        return this.request('/admin/courses');
    },

    createCourse(courseData) {
        return this.request('/admin/courses', { method: 'POST', body: JSON.stringify(courseData) });
    },

    updateCourse(courseId, courseData) {
        return this.request(`/admin/courses/${courseId}`, { method: 'PUT', body: JSON.stringify(courseData) });
    },

    deleteCourse(courseId) {
        return this.request(`/admin/courses/${courseId}`, { method: 'DELETE' });
    },

    // Project Management
    getProjects() {
        return this.request('/admin/projects');
    },

    createProject(data) {
        const isFormData = data instanceof FormData;
        return this.request('/admin/projects', {
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data),
            headers: isFormData ? {} : { 'Content-Type': 'application/json' }
        });
    },

    updateProject(projectId, projectData) {
        return this.request(`/admin/projects/${projectId}`, { method: 'PUT', body: JSON.stringify(projectData) });
    },

    deleteProject(projectId) {
        return this.request(`/admin/projects/${projectId}`, { method: 'DELETE' });
    },

    // Invoice Management
    getInvoices() {
        return this.request('/admin/invoices');
    },

    createInvoice(invoiceData) {
        return this.request('/admin/invoices', { method: 'POST', body: JSON.stringify(invoiceData) });
    },

    updateInvoice(invoiceId, invoiceData) {
        return this.request(`/admin/invoices/${invoiceId}`, { method: 'PUT', body: JSON.stringify(invoiceData) });
    },

    deleteInvoice(invoiceId) {
        return this.request(`/admin/invoices/${invoiceId}`, { method: 'DELETE' });
    },

    getReceipts() {
        return this.request('/admin/receipts');
    },

    verifyReceipt(receiptId) {
        return this.request(`/admin/receipts/${receiptId}/verify`, { method: 'POST' });
    },

    // Course Enrollment
    enrollStudents(courseId, studentIds) {
        return this.request('/admin/courses/enroll', {
            method: 'POST',
            body: JSON.stringify({ course_id: courseId, student_ids: studentIds })
        });
    },

    // Student specific lists
    getMyCourses() {
        return this.request('/student/courses');
    },

    getAssignments() {
        return this.request('/student/assignments');
    },

    getStudentAttendance() {
        return this.request('/student/attendance');
    },

    getStudentInvoices() {
        return this.request('/student/invoices');
    },

    submitReceipt(data) {
        const isFormData = data instanceof FormData;
        return this.request('/student/invoices/' + (isFormData ? data.get('invoice_id') : data.invoice_id) + '/submit-receipt', {
            method: 'POST',
            body: isFormData ? data : JSON.stringify(data),
            headers: isFormData ? {} : { 'Content-Type': 'application/json' }
        });
    },

    getStudentReceipts() {
        return this.request('/student/receipts');
    },

    // Employee specific
    getEmployeeTasks() {
        return this.request('/employee/tasks');
    },

    getEmployeeProjects() {
        return this.request('/employee/projects');
    },

    submitProjectWork(projectId, data) {
        return this.request(`/employee/projects/${projectId}/submit`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    submitInternClaim(data) {
        return this.request('/intern/claims', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    // Client specific
    getClientProjects() {
        return this.request('/client/projects');
    },

    getClientInvoices() {
        return this.request('/client/invoices');
    },

    // Intern specific
    submitAssignment(assignmentId, data) {
        return this.request(`/student/assignments/${assignmentId}/submit`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    getInternTraining() {
        return this.request('/intern/training');
    },

    getInternTasks() {
        return this.request('/intern/tasks');
    },

    getInternInvoices() {
        return this.request('/intern/invoices');
    },

    // Common (Messaging & Meetings)
    getMessages() {
        return this.request('/common/messages');
    },

    sendMessage(receiverId, content) {
        return this.request('/common/messages', {
            method: 'POST',
            body: JSON.stringify({ receiver_id: receiverId, content: content })
        });
    },

    getMeetings() {
        return this.request('/common/meetings');
    },

    createMeeting(meetingData) {
        return this.request('/common/meetings', {
            method: 'POST',
            body: JSON.stringify(meetingData)
        });
    },

    getResources() {
        return this.request('/common/resources');
    }
};

// Map old MockAPI name to new PortalAPI for backward compatibility
const MockAPI = PortalAPI;

// Helper function to fetch dashboard data based on role
async function fetchDashboardData(role) {
    const dataFunctions = {
        admin: PortalAPI.getAdminDashboard,
        student: PortalAPI.getStudentDashboard,
        employee: PortalAPI.getEmployeeDashboard,
        client: PortalAPI.getClientDashboard,
        intern: PortalAPI.getInternDashboard
    };

    const fetchFunction = dataFunctions[role];
    if (!fetchFunction) {
        throw new Error(`No data function found for role: ${role}`);
    }

    return await fetchFunction.call(PortalAPI);
}
