/**
 * Loosi Portal Chatbot
 * Happy, funny, and helpful assistant for logged-in users.
 */

const PortalChatbot = {
    init() {
        this.render();
        this.setupEventListeners();
    },

    render() {
        if (document.getElementById('loosi-chatbot')) return;

        const container = document.createElement('div');
        container.id = 'loosi-chatbot';
        container.innerHTML = `
            <!-- Loosi Toggle -->
            <div id="loosi-toggle" class="fixed bottom-6 right-6 z-[9999] cursor-pointer w-14 h-14 rounded-full shadow-2xl flex items-center justify-center bg-white border-2 border-orange-500 overflow-hidden hover:scale-110 transition-transform duration-300">
                <div class="text-2xl">🤖</div>
            </div>

            <!-- Loosi Window -->
            <div id="loosi-window" class="fixed bottom-24 right-6 z-[9999] w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 hidden opacity-0 translate-y-10 transition-all duration-300 transform origin-bottom-right">
                <div class="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="relative w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-inner">🤖</div>
                            <div>
                                <h3 class="font-bold">Loosi</h3>
                                <p class="text-xs text-orange-100 italic">Portal Helper ✨</p>
                            </div>
                        </div>
                        <button id="loosi-close" class="text-white/80 hover:text-white transition-colors">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>

                <div id="loosi-messages" class="h-64 overflow-y-auto p-4 space-y-4 bg-orange-50/30 flex flex-col scrollbar-hide">
                    <div class="flex gap-2 justify-start">
                        <div class="max-w-[85%] p-3 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm border border-orange-100">
                            <p class="text-sm leading-relaxed">Beep boop! I'm Loosi! Happy to see you! How can I help you in your portal today? 🧡</p>
                        </div>
                    </div>
                </div>

                <div class="p-4 border-t border-gray-100 bg-white">
                    <div class="flex gap-2">
                        <input id="loosi-input" type="text" placeholder="Ask Loosi..." class="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm">
                        <button id="loosi-send" class="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                            <i data-lucide="send" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(container);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    },

    setupEventListeners() {
        const toggle = document.getElementById('loosi-toggle');
        const windowEl = document.getElementById('loosi-window');
        const closeBtn = document.getElementById('loosi-close');
        const input = document.getElementById('loosi-input');
        const sendBtn = document.getElementById('loosi-send');

        toggle.addEventListener('click', () => {
            if (windowEl.classList.contains('hidden')) {
                windowEl.classList.remove('hidden');
                setTimeout(() => windowEl.classList.remove('opacity-0', 'translate-y-10'), 10);
            } else {
                this.closeWindow();
            }
        });

        closeBtn.addEventListener('click', () => this.closeWindow());

        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    },

    closeWindow() {
        const windowEl = document.getElementById('loosi-window');
        if (!windowEl) return;
        windowEl.classList.add('opacity-0', 'translate-y-10');
        setTimeout(() => windowEl.classList.add('hidden'), 300);
    },

    async sendMessage() {
        const input = document.getElementById('loosi-input');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        input.value = '';

        this.showThinking();

        const userRole = localStorage.getItem('user_role') || localStorage.getItem('umti_user_role') || 'user';

        try {
            const rolePrefix = userRole ? `${userRole.toLowerCase()}_` : '';
            const token = localStorage.getItem(`${rolePrefix}umti_token`) ||
                localStorage.getItem('umti_token') ||
                localStorage.getItem('umti_access_token');

            const fetchPromise = fetch('/api/chatbot/loosi/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify({ message: text })
            });

            const response = await fetchPromise;

            if (!response.ok) throw new Error('Backend unavailable');

            const data = await response.json();
            this.hideThinking();
            this.addMessage(data.response || "Beep boop! I tripped over a wire! 🤖", 'assistant');
        } catch (error) {
            console.warn('Backend unavailable, trying fallback...', error);
            
            // Ensure API_CONFIG is loaded
            if (typeof window.API_CONFIG === 'undefined') {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'js/api-config.js';
                    script.onload = resolve;
                    script.onerror = resolve; // Continue even if it fails
                    document.head.appendChild(script);
                });
            }

            // Fallback to Groq API using encoded key
            const apiKey = window.API_CONFIG ? window.API_CONFIG.getLmsGroqKey() : null;
            if (apiKey) {
                try {
                    const userRole = localStorage.getItem('user_role') || 'user';
                    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`
                        },
                        body: JSON.stringify({
                            model: "llama-3.1-8b-instant",
                            messages: [
                                {
                                    role: "system",
                                    content: `You are Loosi, the UMTI Tech LMS AI Assistant. You are currently talking to a ${userRole}. You are an incredibly cheerful, funny, slightly goofy, and highly enthusiastic robot assistant! You MUST always start your response with "Beep boop! 🤖" and use emojis frequently. Keep responses under 50 words.`
                                },
                                { role: "user", content: text }
                            ],
                            temperature: 0.7,
                            max_tokens: 500
                        })
                    });

                    if (!groqResponse.ok) throw new Error('Groq API failed');
                    const groqData = await groqResponse.json();
                    const aiReply = groqData.choices[0].message.content;
                    this.hideThinking();
                    this.addMessage(aiReply, 'assistant');
                } catch (fbError) {
                    console.error('Fallback failed:', fbError);
                    try {
                        const systemPrompt = `You are Loosi, the UMTI Tech LMS AI Assistant. You are talking to a ${userRole}. You are a cheerful, funny, goofy, enthusiastic robot assistant! You MUST always start your response with "Beep boop! 🤖" and use emojis. Keep responses under 50 words. Do not use markdown.`;
                        const fullPrompt = encodeURIComponent(`${systemPrompt}\nUser: ${text}\nLoosi:`);
                        const polResponse = await fetch(`https://text.pollinations.ai/prompt/${fullPrompt}?json=false`);
                        if (!polResponse.ok) throw new Error('Pollinations failed');
                        const aiReply = await polResponse.text();
                        this.hideThinking();
                        this.addMessage(aiReply.trim(), 'assistant');
                    } catch (polError) {
                        console.error('Pollinations error:', polError);
                        this.hideThinking();
                        this.addMessage(this.getLoosiMockResponse(text, userRole), 'assistant');
                    }
                }
            } else {
                try {
                    const systemPrompt = `You are Loosi, the UMTI Tech LMS AI Assistant. You are talking to a ${userRole}. You are a cheerful, funny, goofy, enthusiastic robot assistant! You MUST always start your response with "Beep boop! 🤖" and use emojis. Keep responses under 50 words. Do not use markdown.`;
                    const fullPrompt = encodeURIComponent(`${systemPrompt}\nUser: ${text}\nLoosi:`);
                    const polResponse = await fetch(`https://text.pollinations.ai/prompt/${fullPrompt}?json=false`);
                    if (!polResponse.ok) throw new Error('Pollinations failed');
                    const aiReply = await polResponse.text();
                    this.hideThinking();
                    this.addMessage(aiReply.trim(), 'assistant');
                } catch (polError) {
                    console.error('Pollinations error:', polError);
                    this.hideThinking();
                    this.addMessage(this.getLoosiMockResponse(text, userRole), 'assistant');
                }
            }
        }
    },

    getLoosiMockResponse(text, role) {
        const lower = text.toLowerCase();
        if (role === 'admin') {
            if (lower.includes('user') || lower.includes('manage')) return "Beep boop! 🤖 You can manage all system users in the Users tab. Need help finding a specific record?";
            return "Beep boop! 🤖 Hello Admin! I'm here to help you monitor system activity and manage the portal efficiently!";
        } else if (role === 'student') {
            if (lower.includes('course') || lower.includes('class')) return "Beep boop! 🤖 Your enrolled courses are in the Courses section. Keep up the good work!";
            if (lower.includes('attendance')) return "Beep boop! 🤖 You can check your attendance records from the dashboard. Don't be late!";
            return "Beep boop! 🤖 Hi Student! Ready to learn today? I can help you navigate your assignments and courses!";
        } else if (role === 'client') {
            if (lower.includes('project')) return "Beep boop! 🤖 Your project milestones are tracking perfectly. Check the Projects tab for details!";
            if (lower.includes('invoice') || lower.includes('pay')) return "Beep boop! 🤖 Your recent invoices are available in the Invoices section.";
            return "Beep boop! 🤖 Welcome Client! I'm here to provide quick updates on your projects and deliverables.";
        } else if (role === 'employee') {
            if (lower.includes('task')) return "Beep boop! 🤖 Check your assigned tasks on the dashboard. Let's get things done!";
            return "Beep boop! 🤖 Hello Team Member! Need help finding your project tasks today?";
        } else if (role === 'intern') {
            if (lower.includes('train') || lower.includes('learn')) return "Beep boop! 🤖 Your training modules are ready. Good luck!";
            return "Beep boop! 🤖 Hi Intern! I'm Loosi, ready to help you with your daily tasks and learning path!";
        }
        return "Beep boop! 🤖 I'm your friendly portal assistant! How can I help you navigate today?";
    },

    addMessage(text, role) {
        const messages = document.getElementById('loosi-messages');
        const div = document.createElement('div');
        div.className = `flex gap-2 ${role === 'assistant' ? "justify-start" : "justify-end"}`;

        div.innerHTML = `
            ${role === 'assistant' ? '<div class="w-8 h-8 flex-shrink-0 bg-white rounded-full border border-orange-100 flex items-center justify-center text-xs shadow-inner">🤖</div>' : ''}
            <div class="max-w-[85%] p-3 rounded-2xl ${role === 'assistant' ? "bg-white text-gray-800 rounded-bl-none shadow-sm border border-orange-100" : "bg-orange-500 text-white rounded-br-none shadow-md"}">
                <p class="text-sm leading-relaxed">${text}</p>
            </div>
        `;

        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    },

    showThinking() {
        const messages = document.getElementById('loosi-messages');
        const div = document.createElement('div');
        div.id = 'loosi-thinking';
        div.className = 'flex gap-2 justify-start mb-4';
        div.innerHTML = `
            <div class="w-8 h-8 flex-shrink-0 bg-white rounded-full border border-orange-100 flex items-center justify-center text-xs shadow-inner">🤖</div>
            <div class="max-w-[75%] p-4 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-sm border border-orange-100 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-typing"></div>
                <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-typing [animation-delay:0.2s]"></div>
                <div class="w-1.5 h-1.5 bg-orange-400 rounded-full animate-typing [animation-delay:0.4s]"></div>
            </div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    },

    hideThinking() {
        const thinking = document.getElementById('loosi-thinking');
        if (thinking) thinking.remove();
    }
};

window.PortalChatbot = PortalChatbot;
