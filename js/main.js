document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // ==========================================
    // DATA: INTERNSHIPS
    // ==========================================
    const internships = [
        {
            id: "UMTI-AI-001",
            title: "AI Engineering Intern",
            department: "Artificial Intelligence",
            duration: "8 Weeks",
            location: "Remote / Hybrid",
            description: "Work on developing and fine-tuning state-of-the-art machine learning models for real-world applications.",
            requirements: ["Basic knowledge of Python", "Understanding of ML algorithms", "Problem-solving mindset"],
        },
        {
            id: "UMTI-GENAI-002",
            title: "Generative AI Intern",
            department: "AI Research",
            duration: "8 Weeks",
            location: "Remote",
            description: "Explore Large Language Models (LLMs), prompt engineering, and building generative AI solutions.",
            requirements: ["Familiarity with OpenAI/Groq APIs", "Python proficiency", "Creative thinking"],
        },
        {
            id: "UMTI-PY-003",
            title: "Python Backend Intern",
            department: "Software Engineering",
            duration: "6 Weeks",
            location: "Remote",
            description: "Build robust backend systems, APIs, and microservices using Python frameworks like FastAPI and Flask.",
            requirements: ["Strong Python skills", "Basic understanding of REST APIs", "Database knowledge"],
        },
        {
            id: "UMTI-NLP-004",
            title: "NLP Research Intern",
            department: "Artificial Intelligence",
            duration: "8 Weeks",
            location: "Remote",
            description: "Focus on Natural Language Processing tasks, text classification, and sentiment analysis.",
            requirements: ["Experience with NLTK/Spacy", "Python programming", "Data preprocessing skills"],
        },
        {
            id: "UMTI-CV-005",
            title: "Computer Vision Intern",
            department: "AI Engineering",
            duration: "6 Weeks",
            location: "Hybrid",
            description: "Develop computer vision models for image recognition, object detection, and visual analytics.",
            requirements: ["OpenCV basics", "Python/C++", "Understanding of CNNs"],
        },
        {
            id: "UMTI-DATA-006",
            title: "Data Science Intern",
            department: "Data Analytics",
            duration: "6 Weeks",
            location: "Remote",
            description: "Analyze large datasets, extract insights, and build predictive models to drive business decisions.",
            requirements: ["Pandas & NumPy", "Statistical analysis", "Data visualization tools"],
        }
    ];

    // ==========================================
    // LOGIC: INTERNSHIP PAGE
    // ==========================================
    const verifyBtn = document.getElementById('verify-btn');
    const internshipGrid = document.getElementById('internship-grid');

    if (internshipGrid) {
        // Render Internships
        internshipGrid.innerHTML = internships.map((intern, index) => `
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 hover:-translate-y-1 transition-transform duration-300 animate-[fadeIn_0.5s_ease-out_forwards]" style="animation-delay: ${index * 0.05}s; opacity: 0">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-2xl font-bold mb-2">${intern.title}</h3>
                        <p class="text-blue-600 font-semibold">${intern.department}</p>
                    </div>
                    <span class="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Open</span>
                </div>

                <div class="space-y-3 mb-6">
                    <div class="flex items-center gap-2 text-gray-600">
                        <i data-lucide="clock" class="w-5 h-5"></i>
                        <span>Duration: ${intern.duration}</span>
                    </div>
                    <div class="flex items-center gap-2 text-gray-600">
                        <i data-lucide="map-pin" class="w-5 h-5"></i>
                        <span>${intern.location}</span>
                    </div>
                </div>

                <p class="text-gray-600 mb-6 leading-relaxed">${intern.description}</p>

                <div class="mb-6">
                    <h4 class="font-semibold mb-2">Requirements:</h4>
                    <ul class="space-y-1">
                        ${intern.requirements.map(req => `
                            <li class="text-sm text-gray-600 flex items-start gap-2">
                                <span class="text-blue-600 mt-1">•</span>
                                ${req}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <button
                  onclick="window.open('https://forms.gle/7kPpRmVxhDFd1nH98', '_blank')"
                  class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                >
                  Apply Now
                </button>
            </div>
        `).join('');
        lucide.createIcons();
    }

    if (verifyBtn) {
        const input = document.getElementById('intern-id-input');
        const resultContainer = document.getElementById('verification-result');

        const handleVerify = () => {
            const searchId = input.value.trim().toLowerCase();
            let resultHtml = '';

            if (!searchId) {
                renderError("Please enter a valid Intern ID");
                return;
            }

            const idMatch = searchId.match(/umti-intern-26b(\d+)/);

            if (idMatch) {
                const idNumber = parseInt(idMatch[1]);
                if (idNumber >= 1 && idNumber <= 500) {
                    renderSuccess(searchId.toUpperCase());
                } else {
                    renderError("Verified But status is Pending", "This ID is not currently enrolled or has not completed the program yet. Please verify the ID or contact support.");
                }
            } else {
                renderError("Invalid ID Format", "Please enter a valid Intern ID");
            }
        };

        const renderError = (title, message = "Please check the ID and try again.") => {
            resultContainer.innerHTML = `
                <div class="mt-6 p-8 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl shadow-lg animate-[fadeIn_0.3s_ease-out]">
                    <div class="flex items-start gap-4">
                        <i data-lucide="x-circle" class="w-10 h-10 text-red-600 flex-shrink-0 mt-1"></i>
                        <div class="flex-1">
                            <h3 class="font-bold text-2xl text-red-900 mb-3">${title}</h3>
                            <p class="text-red-700 leading-relaxed mb-4">${message}</p>
                            <div class="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-red-200">
                                <p class="text-sm text-gray-700">
                                    <span class="font-semibold">Need assistance?</span> Contact us at
                                    <a href="mailto:umtitechsolutions@gmail.com" class="text-blue-600 hover:underline font-semibold">umtitechsolutions@gmail.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            resultContainer.classList.remove('hidden');
            lucide.createIcons();
        };

        const renderSuccess = (id) => {
            resultContainer.innerHTML = `
                <div class="mt-6 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg animate-[fadeIn_0.3s_ease-out]">
                    <div class="flex items-start gap-4 mb-6">
                        <i data-lucide="check-circle-2" class="w-12 h-12 text-green-600 flex-shrink-0"></i>
                        <div class="flex-1">
                            <h3 class="font-bold text-3xl text-green-900 mb-2">Past Completed Internship Program</h3>
                            <div class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-300">
                                <span class="text-sm text-gray-600">Intern ID:</span>
                                <span class="font-bold text-green-700">${id}</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200 mb-4">
                        <h4 class="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                             <div class="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                            Performance Summary
                        </h4>
                        <p class="text-gray-800 leading-relaxed text-lg">
                            This internee has successfully attended all classes and done all tasks and projects during their tenure with UMTI Tech Solutions.
                        </p>
                    </div>

                    <div class="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                        <p class="text-sm text-gray-600 mb-1">Status</p>
                        <p class="font-bold text-green-700 text-lg">✓ Verified & Completed</p>
                    </div>

                    <div class="mt-4 p-4 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-200">
                        <p class="text-sm text-blue-900">
                            <span class="font-semibold">✉ Verification Queries:</span> Contact us at
                            <a href="mailto:umtitechsolutions@gmail.com" class="text-blue-600 hover:underline font-semibold">umtitechsolutions@gmail.com</a>
                        </p>
                    </div>
                </div>
            `;
            resultContainer.classList.remove('hidden');
            lucide.createIcons();
        };

        verifyBtn.addEventListener('click', handleVerify);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleVerify();
        });
    }

    // ==========================================
    // DATA: BLOGS
    // ==========================================
    const blogPosts = [
        {
            slug: "ai-transformation-2025",
            title: "How AI is Transforming Business Operations in 2025",
            excerpt: "Discover how artificial intelligence is revolutionizing the way companies operate, from automation to predictive analytics.",
            fullContent: `Artificial Intelligence has become the cornerstone of modern business operations in 2025. Companies worldwide are leveraging AI to streamline processes, enhance decision-making, and create unprecedented value for their customers.

<strong>The Rise of Intelligent Automation</strong><br><br>
Today's AI systems go far beyond simple task automation. Machine learning algorithms can now predict customer behavior, optimize supply chains in real-time, and even generate creative content that resonates with target audiences. At UMTI Tech Solutions, we've helped dozens of businesses implement AI solutions that have reduced operational costs by up to 40% while improving service quality.<br><br>

<strong>Predictive Analytics Revolutionizes Decision Making</strong><br><br>
Business leaders no longer need to rely solely on historical data and intuition. Modern AI-powered predictive analytics can forecast market trends, identify potential risks, and suggest optimal strategies with remarkable accuracy. Our clients have reported 60% improvement in forecasting accuracy after implementing our AI analytics solutions.<br><br>

<strong>Natural Language Processing in Customer Service</strong><br><br>
AI chatbots and virtual assistants have evolved dramatically. They can now understand context, detect emotions, and provide personalized responses that feel genuinely human. This technology is available 24/7, handles multiple languages, and learns from every interaction to continuously improve.<br><br>

<strong>The Competitive Advantage</strong><br><br>
Companies that embrace AI today are positioning themselves as tomorrow's market leaders. Those who hesitate risk being left behind in an increasingly competitive landscape. The question is no longer "Should we adopt AI?" but rather "How quickly can we integrate AI into our operations?"<br><br>

At UMTI Tech Solutions, we specialize in making AI accessible and practical for businesses of all sizes. Contact us to learn how we can help transform your operations with cutting-edge AI technology.`,
            author: "Muhammad Awais Laal",
            date: "January 15, 2025",
            readTime: "8 min read",
            category: "Artificial Intelligence",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "web-development-trends",
            title: "Top Web Development Trends to Watch in 2025",
            excerpt: "Stay ahead of the curve with the latest web development technologies, frameworks, and best practices.",
            fullContent: `The web development landscape continues to evolve at neckbreak speed. As we navigate through 2025, several trends are reshaping how we build and experience the web.  

<strong>Server Components Take Center Stage</strong><br><br>  
React Server Components and similar technologies are revolutionizing how we think about rendering. By shifting more work to the server, we're creating faster, more efficient web applications that provide better user experiences while reducing client-side JavaScript bloat.<br><br>  

<strong>Edge Computing Goes Mainstream</strong><br><br>  
Edge computing is no longer a futuristic concept—it's here and changing the game. By processing data closer to users, we're achieving unprecedented speeds and responsiveness. Applications that once seemed impossible are now reality.<br><br>  

<strong>AI-Assisted Development</strong><br><br>  
AI coding assistants have become invaluable tools for developers. They're not replacing developers but amplifying their capabilities, helping them write better code faster and catch bugs before they become problems.<br><br>  

<strong>Progressive Web Apps Mature</strong><br><br>  
PWAs have reached a new level of sophistication. With improved offline capabilities, push notifications, and native-like performance, they're becoming the preferred choice for many businesses looking to reach users across all platforms.<br><br>  

<strong>TypeScript Dominance</strong><br><br>  

TypeScript has essentially become the standard for serious web development. Its strong typing system catches errors early and makes large codebases more maintainable. If you're not using TypeScript yet, 2025 is the year to start.<br><br>  

<strong>WebAssembly Expands Its Reach</strong><br><br>  
WebAssembly is bringing near-native performance to web applications. We're seeing it used for everything from image processing to full-fledged gaming experiences running directly in the browser.<br><br>  

At UMTI Tech Solutions, we stay at the forefront of these trends, ensuring our clients' projects leverage the latest and most effective technologies.`,
            author: "Aamir Shaheen",
            date: "January 12, 2025",
            readTime: "6 min read",
            category: "Web Development",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "digital-marketing-strategies",
            title: "Effective Digital Marketing Strategies for Small Businesses",
            excerpt: "Learn proven digital marketing tactics that help small businesses compete with larger competitors.",
            fullContent: `Small businesses face unique challenges in the digital marketing landscape. However, with the right strategies, they can compete effectively with much larger competitors.<br><br>
    
        <strong>Understanding Your Audience Deeply</strong><br><br>
        The foundation of any successful marketing strategy is knowing exactly who your customers are. Use analytics tools, conduct surveys, and engage directly with your audience to build detailed customer personas. This knowledge informs every other decision you make.<br><br>
    
        <strong>Content Marketing That Converts</strong><br><br>
        Quality content establishes your authority and builds trust. Blog posts, videos, infographics—choose formats that resonate with your audience. The key is consistency and value. Every piece of content should solve a problem or answer a question your audience has.<br><br>
    
        <strong>Social Media With Strategy</strong><br><br>
        Don't try to be everywhere. Choose 2-3 platforms where your audience actually spends time and focus your efforts there. Post consistently, engage authentically, and use platform-specific features to maximize reach.<br><br>
    
        <strong>Email Marketing Still Works</strong><br><br>
        Despite predictions of its demise, email marketing continues to deliver impressive ROI. Build your list organically, segment your audience, and personalize your messages. Automation tools make this easier than ever.<br><br>
    
        <strong>Local SEO for Local Businesses</strong><br><br>
        If you serve a local market, optimizing for local search is crucial. Claim your Google Business Profile, encourage reviews, and ensure your NAP (Name, Address, Phone) information is consistent across the web.<br><br>
    
        <strong>Paid Advertising With Precision</strong><br><br>
        Platforms like Google Ads and Facebook Ads offer powerful targeting options. Start small, test different approaches, and scale what works. The key is tracking ROI meticulously.<br><br>
    
        <strong>Analytics and Continuous Improvement</strong><br><br>
        Use tools like Google Analytics to understand what's working and what isn't. Digital marketing is iterative—constantly test, measure, and refine your approach.<br><br>
    
        UMTI Tech Solutions offers comprehensive digital marketing services tailored for small businesses. Let us help you grow your online presence and reach your target customers effectively.`,
            author: "Farooq Amras",
            date: "January 10, 2025",
            readTime: "7 min read",
            category: "Digital Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "cybersecurity-best-practices",
            title: "Essential Cybersecurity Best Practices for 2025",
            excerpt: "Protect your business from cyber threats with these critical security measures and protocols.",
            fullContent: `Cybersecurity has become a critical concern for businesses of all sizes in 2025. With cyber threats evolving rapidly, protecting your digital assets is no longer optional—it's essential for survival.<br><br>

    <strong>The Current Threat Landscape</strong><br><br>
    Ransomware attacks have increased by 150% in the past year. Phishing attempts are more sophisticated than ever, using AI to create convincing fake emails and websites. Data breaches cost companies an average of $4.5 million per incident. The stakes have never been higher.<br><br>

    <strong>Multi-Factor Authentication is Non-Negotiable</strong><br><br>
    Passwords alone are no longer sufficient. Implementing multi-factor authentication (MFA) across all systems reduces the risk of unauthorized access by 99.9%. It's one of the most effective security measures you can implement today.<br><br>

    <strong>Regular Security Audits and Updates</strong><br><br>
    Outdated software is a hacker's best friend. Regular security audits identify vulnerabilities before they can be exploited. Automated patch management ensures your systems are always up to date with the latest security fixes.<br><br>

    <strong>Employee Training and Awareness</strong><br><br>
    Human error remains the weakest link in cybersecurity. Regular training sessions help employees recognize phishing attempts, practice safe browsing habits, and understand their role in maintaining security.<br><br>

    <strong>Data Encryption and Backup</strong><br><br>
    Encrypt sensitive data both in transit and at rest. Maintain regular, tested backups stored in multiple locations. In case of a ransomware attack, having clean backups can save your business.<br><br>

    <strong>Zero Trust Architecture</strong><br><br>
    Implement a zero trust security model where every access request is verified, regardless of where it originates. This approach significantly reduces the attack surface and limits potential damage from breaches.<br><br>

    <strong>Incident Response Planning</strong><br><br>
    Have a detailed incident response plan ready. When (not if) a security incident occurs, a well-prepared response can minimize damage and reduce recovery time.<br><br>

    At UMTI Tech Solutions, we provide comprehensive cybersecurity services to protect your business from evolving threats. Contact us for a free security assessment.`,
            author: "Imran Ahmed",
            date: "January 8, 2025",
            readTime: "9 min read",
            category: "Cybersecurity",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "mobile-app-development-guide",
            title: "Complete Guide to Mobile App Development",
            excerpt: "From concept to launch, learn everything you need to know about building successful mobile applications.",
            fullContent: `Mobile apps have become essential for businesses looking to engage customers and streamline operations. Building a successful app requires careful planning, the right technology choices, and a focus on user experience.<br><br>
  
      <strong>Choosing the Right Development Approach</strong><br><br>
      Native development offers the best performance and access to device features. Cross-platform frameworks like React Native and Flutter allow you to build for both iOS and Android with a single codebase, saving time and money. The choice depends on your specific requirements and budget.<br><br>
  
      <strong>Understanding Your Users</strong><br><br>
      Successful apps start with deep user research. What problems are you solving? How do users currently handle these tasks? What features are truly essential? User personas and journey mapping help ensure you build something people actually want to use.<br><br>
  
      <strong>Designing for Mobile-First Experience</strong><br><br>
      Mobile screens are small, and attention spans are shorter. Design for thumb-friendly navigation, use clear visual hierarchy, and minimize the number of steps to complete key actions. Every tap should have a purpose.<br><br>
  
      <strong>Performance Optimization</strong><br><br>
      Users expect apps to load instantly and respond immediately to every interaction. Optimize images, minimize API calls, implement caching strategies, and test on real devices with varying network conditions.<br><br>
  
      <strong>App Store Optimization</strong><br><br>
      Getting discovered in app stores is challenging. Craft compelling descriptions, use relevant keywords, create eye-catching screenshots, and encourage satisfied users to leave reviews. ASO is ongoing work, not a one-time task.<br><br>
  
      <strong>Analytics and Iteration</strong><br><br>
      Instrument your app to track user behavior, identify pain points, and measure engagement. Use this data to continuously improve the experience. The best apps are never "finished"—they evolve based on user feedback.<br><br>
  
      <strong>Security and Privacy</strong><br><br>
      Protect user data with encryption, secure authentication, and compliance with regulations like GDPR. Be transparent about data collection and give users control over their information.<br><br>
  
      UMTI Tech Solutions specializes in creating beautiful, functional mobile applications. From initial concept to App Store launch, we guide you through every step of the development process.`,
            author: "Sultan Ahmad",
            date: "January 5, 2025",
            readTime: "10 min read",
            category: "Mobile Development",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "cloud-computing-benefits",
            title: "Why Your Business Needs Cloud Computing",
            excerpt: "Explore the benefits of cloud computing and how it can transform your business operations and reduce costs.",
            fullContent: `Cloud computing has revolutionized how businesses operate, offering flexibility, scalability, and cost savings that traditional infrastructure simply cannot match.<br><br>

      <strong>Cost Efficiency</strong><br><br>
      Eliminate expensive hardware purchases and maintenance costs. Pay only for the resources you actually use. Cloud providers handle upgrades, security patches, and infrastructure management, freeing your team to focus on core business activities.<br><br>
  
      <strong>Scalability on Demand</strong><br><br>
      Scale resources up during peak times and down during quiet periods. Launch new servers in minutes instead of weeks. This flexibility is crucial for businesses with variable workloads or rapid growth plans.<br><br>
  
      <strong>Enhanced Collaboration</strong><br><br>
      Team members can access files and applications from anywhere with internet connectivity. Real-time collaboration tools enable seamless teamwork across different locations and time zones.<br><br>
  
      <strong>Disaster Recovery and Business Continuity</strong><br><br>
      Cloud-based backup and disaster recovery solutions are more affordable and reliable than traditional methods. Your data is replicated across multiple data centers, ensuring availability even if one location experiences issues.<br><br>
  
      <strong>Automatic Updates</strong><br><br>
      Cloud services are continuously updated with the latest features and security patches. You benefit from improvements without managing complex upgrade processes or experiencing downtime.<br><br>
  
      <strong>Global Reach</strong><br><br>
      Deploy applications close to your users with data centers worldwide. Reduce latency and improve user experience regardless of geographic location.<br><br>
  
      <strong>Security and Compliance</strong><br><br>
      Major cloud providers invest heavily in security measures that most individual businesses couldn't afford. They offer compliance certifications for various industry standards and regulations.<br><br>
  
      <strong>Environmental Benefits</strong><br><br>
      Cloud computing is more energy-efficient than traditional data centers. Shared resources and optimized infrastructure reduce overall carbon footprint.<br><br>
  
      UMTI Tech Solutions helps businesses migrate to the cloud smoothly and efficiently. We assess your needs, recommend appropriate solutions, and manage the entire transition process.`,
            author: "Muhammad Awais Laal",
            date: "January 3, 2025",
            readTime: "6 min read",
            category: "Cloud Computing",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "ui-ux-design-principles",
            title: "Modern UI/UX Design Principles That Convert",
            excerpt: "Master the art of creating user interfaces that not only look beautiful but also drive conversions.",
            fullContent: `User interface and user experience design are critical factors that determine whether users love your product or abandon it. Great design is invisible—it just works.<br><br>
            <strong>User-Centered Design Philosophy</strong><br><br>
            Start with empathy. Understand your users' goals, frustrations, and context. Every design decision should be validated against real user needs, not assumptions or personal preferences.<br><br>
            <strong>Visual Hierarchy Guides Attention</strong><br><br>
            Use size, color, contrast, and spacing to direct users' attention to the most important elements first. A clear visual hierarchy reduces cognitive load and makes interfaces intuitive.<br><br>
            <strong>Consistency Builds Trust</strong><br><br>
            Maintain consistent patterns, terminology, and styling throughout your application. Users shouldn't have to relearn how to interact with different sections of your product.<br><br>
            <strong>Responsive and Adaptive Design</strong><br><br>
            Designs must work seamlessly across devices and screen sizes. Consider touch targets, readable text sizes, and appropriate information density for each context.<br><br>
            <strong>Loading and Feedback</strong><br><br>
            Never leave users wondering what's happening. Provide immediate feedback for actions, show loading states, and communicate errors clearly with actionable solutions.<br><br>
            <strong>Accessibility is Essential</strong><br><br>
            Design for everyone, including users with disabilities. Proper contrast ratios, keyboard navigation, screen reader support, and alt text aren't optional—they're fundamental requirements.<br><br>
            <strong>Micro-interactions Add Delight</strong><br><br>
            Small animations and transitions make interfaces feel responsive and alive. They provide feedback, guide attention, and add personality to your product.<br><br>
            UMTI Tech Solutions creates user interfaces that combine aesthetic excellence with conversion-focused functionality.`,
            author: "Aamir Shaheen",
            date: "December 30, 2024",
            readTime: "7 min read", category: "UI/UX Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1464&q=80"
        },
        {
            slug: "e-commerce-success-strategies",
            title: "Building a Successful E-commerce Business in 2025",
            excerpt: "Learn the strategies and tools needed to launch and grow a profitable online store.",
            fullContent: `E-commerce continues to grow rapidly, but competition is fierce. Success requires more than just setting up a store—it demands strategy, optimization, and relentless focus on customer experience.<br><br>
            <strong>Platform Selection Matters</strong><br><br>
            Choose an e-commerce platform that fits your needs and budget. Shopify offers simplicity, WooCommerce provides flexibility, and custom solutions offer ultimate control. Consider factors like scalability, payment options, and integration capabilities.<br><br>
            <strong>Product Photography and Descriptions</strong><br><br>
            High-quality images from multiple angles are essential. Videos demonstrating products in use build confidence. Write detailed, benefit-focused descriptions that answer common questions and address objections.<br><br>
            <strong>Streamlined Checkout Process</strong><br><br>
            Every additional step in checkout increases abandonment rates. Offer guest checkout, multiple payment options, and transparent shipping costs. Auto-fill and save features improve conversion rates.<br><br>
            <strong>Mobile Optimization</strong><br><br>
            Over 70% of e-commerce traffic comes from mobile devices. Ensure your store loads quickly, images are optimized, and checkout works flawlessly on smartphones.<br><br>
            <strong>Customer Reviews and Social Proof</strong><br><br>
            Authentic reviews build trust and improve conversion rates. Display them prominently and respond to both positive and negative feedback professionally.<br><br>
            <strong>Personalization and Recommendations</strong><br><br>
            Use browsing history and purchase data to recommend relevant products. Personalized experiences increase average order value and customer satisfaction.<br><br>
            <strong>Abandoned Cart Recovery</strong><br><br>
            Implement email sequences to recover abandoned carts. Offer limited-time discounts or address common concerns about shipping and returns.<br><br>
            UMTI Tech Solutions builds high-converting e-commerce platforms tailored to your business needs.`,
            author: "Farooq Amras",
            date: "December 28, 2024",
            readTime: "8 min read", category: "E-commerce", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "machine-learning-business",
            title: "Implementing Machine Learning in Your Business",
            excerpt: "Practical guide to integrating machine learning solutions that solve real business problems.",
            fullContent: `Machine learning is no longer exclusively for tech giants. Businesses of all sizes can leverage ML to automate processes, gain insights, and create competitive advantages.<br><br>

    <strong>Start with Clear Business Problems</strong><br><br>
    Don't implement ML because it's trendy. Identify specific problems where ML can add value: customer churn prediction, demand forecasting, fraud detection, or personalization. Clear objectives guide successful projects.<br><br>

    <strong>Data is the Foundation</strong><br><br>
    ML models are only as good as the data they're trained on. Ensure you have sufficient, clean, relevant data. Often, the data preparation phase takes 80% of the project time.<br><br>

    <strong>Choose the Right Algorithms</strong><br><br>
    Different problems require different approaches. Classification, regression, clustering, and deep learning each have appropriate use cases. Start simple before moving to complex models.<br><br>

    <strong>Model Training and Validation</strong><br><br>
    Split data into training and testing sets. Use cross-validation to ensure models generalize well. Monitor for overfitting and underfitting. Iteration is key to improvement.<br><br>

    <strong>Deployment and Monitoring</strong><br><br>
    ML models need ongoing monitoring in production. Performance can degrade as data distributions change. Implement systems to detect issues and retrain models regularly.<br><br>

    <strong>Ethical Considerations</strong><br><br>
    Be aware of bias in training data and model predictions. Ensure transparency in how decisions are made. Consider privacy implications and regulatory requirements.<br><br>

    <strong>Start Small, Scale Gradually</strong><br><br>
    Begin with pilot projects that demonstrate value. Learn from these experiences before committing to large-scale ML implementations.<br><br>

    UMTI Tech Solutions helps businesses implement practical machine learning solutions that deliver measurable results.`,
            author: "Muhammad Awais Laal",
            date: "December 25, 2024",
            readTime: "9 min read",
            category: "Machine Learning",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "software-development-lifecycle",
            title: "Understanding the Software Development Lifecycle",
            excerpt: "A comprehensive overview of SDLC phases and best practices for successful project delivery.",
            fullContent: `The Software Development Lifecycle (SDLC) provides a structured approach to building software that meets requirements, stays on budget, and delivers value to users.<br><br>

    <strong>Planning and Requirements Gathering</strong><br><br>
    Define project scope, objectives, and success criteria. Gather detailed requirements from stakeholders. Document functional and non-functional requirements clearly. Good planning prevents costly changes later.<br><br>

    <strong>Design and Architecture</strong><br><br>
    Create technical specifications and system architecture. Design database schemas, API structures, and user interfaces. Consider scalability, security, and maintainability from the start.<br><br>

    <strong>Development and Implementation</strong><br><br>
    Write clean, maintainable code following best practices and coding standards. Use version control, conduct code reviews, and write automated tests. Break work into manageable sprints or iterations.<br><br>

    <strong>Testing and Quality Assurance</strong><br><br>
    Test at multiple levels: unit tests, integration tests, system tests, and user acceptance tests. Identify and fix bugs before deployment. Automated testing increases confidence and speeds releases.<br><br>

    <strong>Deployment and Release</strong><br><br>
    Use CI/CD pipelines for automated, reliable deployments. Have rollback plans ready. Deploy to staging environments before production. Communicate changes to stakeholders.<br><br>

    <strong>Maintenance and Support</strong><br><br>
    Monitor applications in production. Respond quickly to issues. Gather user feedback and plan enhancements. Regular updates keep software secure and relevant.<br><br>

    <strong>Choosing the Right SDLC Model</strong><br><br>
    Waterfall works for well-defined projects with stable requirements. Agile suits projects needing flexibility. DevOps emphasizes automation and collaboration. Choose based on your project's specific needs.<br><br>

    UMTI Tech Solutions follows proven SDLC methodologies to deliver software projects on time and within budget.`,
            author: "Sultan Ahmad",
            date: "December 22, 2024",
            readTime: "8 min read",
            category: "Software Development",
            image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
        },
        {
            slug: "blockchain-revolution",
            title: "Blockchain Technology: Beyond Cryptocurrency",
            excerpt: "Discover how blockchain is revolutionizing industries from supply chain to healthcare.",
            fullContent: `Blockchain technology extends far beyond Bitcoin and cryptocurrencies. Its potential to create transparent, tamper-proof records is transforming numerous industries.<br><br>

    <strong>Supply Chain Transparency</strong><br><br>
    Track products from manufacture to delivery with immutable records. Verify authenticity, prevent counterfeiting, and ensure ethical sourcing. Major retailers and manufacturers are already implementing blockchain solutions.<br><br>

    <strong>Healthcare Records Management</strong><br><br>
    Securely share patient data between healthcare providers while maintaining privacy. Patients control who accesses their information. Reduce administrative costs and improve care coordination.<br><br>

    <strong>Smart Contracts</strong><br><br>
    Automate contract execution when predefined conditions are met. Eliminate intermediaries, reduce costs, and increase trust. Applications range from insurance claims to real estate transactions.<br><br>

    <strong>Digital Identity Verification</strong><br><br>
    Create secure, portable digital identities that users control. Reduce identity theft and streamline verification processes. Particularly valuable in regions with limited access to traditional identity systems.<br><br>

    <strong>Intellectual Property Protection</strong><br><br>
    Register and prove ownership of creative works. Automate royalty payments. Create transparent records of ownership transfers. Artists and creators gain more control over their work.<br><br>

    <strong>Voting Systems</strong><br><br>
    Enable secure, transparent, verifiable voting. Increase accessibility while reducing fraud concerns. Several countries are piloting blockchain-based voting systems.<br><br>

    <strong>Challenges and Considerations</strong><br><br>
    Blockchain isn't a solution for everything. Consider scalability limitations, energy consumption, regulatory uncertainty, and the complexity of implementation. Evaluate whether blockchain truly adds value for your use case.<br><br>

    UMTI Tech Solutions helps businesses explore practical blockchain applications and implement solutions that deliver real value.`,
            author: "Imran Ahmed",
            date: "December 20, 2024",
            readTime: "7 min read",
            category: "Blockchain",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "agile-project-management",
            title: "Mastering Agile Project Management for Tech Teams",
            excerpt: "Learn how to implement agile methodologies effectively in your development projects.",
            fullContent: `Agile methodologies have become the standard for software development, offering flexibility and faster delivery compared to traditional waterfall approaches.<br><br>

    <strong>Core Agile Principles</strong><br><br>
    Prioritize working software over comprehensive documentation. Welcome changing requirements. Deliver value frequently. Collaborate closely with stakeholders. These principles guide all agile practices.<br><br>

    <strong>Scrum Framework Essentials</strong><br><br>
    Organize work into sprints (typically 2 weeks). Hold daily standups to synchronize efforts. Sprint planning sets goals, sprint reviews demonstrate progress, and retrospectives drive continuous improvement.<br><br>

    <strong>Kanban for Flow Optimization</strong><br><br>
    Visualize work on boards. Limit work in progress to prevent bottlenecks. Focus on flow efficiency rather than individual utilization. Kanban works well for teams handling continuous streams of work.<br><br>

    <strong>User Stories and Backlog Management</strong><br><br>
    Write user stories from the customer's perspective. Prioritize based on value and dependencies. Groom the backlog regularly to keep it relevant and manageable.<br><br>

    <strong>Estimation and Velocity Tracking</strong><br><br>
    Use story points or t-shirt sizing for relative estimation. Track velocity to improve predictability. Avoid treating estimates as commitments—they're planning tools.<br><br>

    <strong>Cross-Functional Teams</strong><br><br>
    Agile teams include all skills needed to deliver features completely. Reduce handoffs and dependencies. Foster T-shaped skills where team members have depth in one area but can contribute broadly.<br><br>

    <strong>Stakeholder Collaboration</strong><br><br>
    Regular demos keep stakeholders engaged and informed. Quick feedback loops prevent building the wrong thing. Transparency builds trust and alignment.<br><br>

    <strong>Common Pitfalls to Avoid</strong><br><br>
    Don't do "agile theater"—following practices without embracing principles. Avoid skipping retrospectives. Don't let daily standups become status reports. Remember that agile is about delivering value, not following processes rigidly.<br><br>

    UMTI Tech Solutions coaches teams in adopting agile practices that work for their specific context and culture.`,
            author: "Farooq Amras",
            date: "December 18, 2024",
            readTime: "6 min read",
            category: "Project Management",
            image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "data-analytics-insights",
            title: "Turning Data into Actionable Business Insights",
            excerpt: "Harness the power of data analytics to make informed decisions and drive growth.",
            fullContent: `Data analytics transforms raw data into insights that drive better business decisions. Companies that effectively leverage analytics gain significant competitive advantages.<br><br>

    <strong>Define Clear Questions</strong><br><br>
    Start with specific business questions you want to answer. What drives customer churn? Which marketing channels deliver the best ROI? How can we optimize inventory? Clear questions focus analytical efforts.<br><br>

    <strong>Data Collection and Integration</strong><br><br>
    Gather data from all relevant sources: CRM systems, web analytics, transaction databases, social media, and external datasets. Integration creates a complete picture.<br><br>

    <strong>Data Quality is Critical</strong><br><br>
    Garbage in, garbage out. Invest in data cleaning and validation. Establish data governance practices. Quality data is the foundation of reliable insights.<br><br>

    <strong>Descriptive Analytics</strong><br><br>
    Understand what happened and why. Use dashboards and reports to monitor key metrics. Identify trends and patterns. This is where most organizations start.<br><br>

    <strong>Predictive Analytics</strong><br><br>
    Forecast future outcomes based on historical patterns. Predict customer behavior, demand, equipment failures, and more. Machine learning models power predictive analytics.<br><br>

    <strong>Prescriptive Analytics</strong><br><br>
    Recommend specific actions to achieve desired outcomes. Optimization algorithms suggest the best course of action considering constraints and objectives.<br><br>

    <strong>Data Visualization</strong><br><br>
    Effective visualizations communicate insights quickly. Choose the right chart types for your data. Interactive dashboards enable self-service exploration.<br><br>

    <strong>Building Data Literacy</strong><br><br>
    Train teams to interpret data and use analytics tools. Data-driven culture requires widespread analytical skills, not just specialized data scientists.<br><br>

    <strong>Real-Time Analytics</strong><br><br>
    Process and analyze data as it's generated. Enable immediate responses to events. Real-time analytics powers personalization, fraud detection, and operational monitoring.<br><br>

    UMTI Tech Solutions implements analytics solutions that turn your data into actionable insights and competitive advantages.`,
            author: "Aamir Shaheen",
            date: "December 15, 2024",
            readTime: "8 min read",
            category: "Data Analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "api-development-best-practices",
            title: "RESTful API Development: Best Practices and Patterns",
            excerpt: "Build robust, scalable APIs that power modern applications with these proven techniques.",
            fullContent: `APIs are the backbone of modern software architecture. Well-designed APIs enable integration, support multiple clients, and scale effectively.<br><br>

    <strong>RESTful Design Principles</strong><br><br>
    Use HTTP methods appropriately: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal. Design resource-oriented URLs. Return appropriate status codes. These conventions make APIs intuitive.<br><br>

    <strong>Versioning Strategy</strong><br><br>
    Plan for evolution from the start. URL versioning (/v1/users) is simple and explicit. Header-based versioning is more elegant but less visible. Choose one approach and be consistent.<br><br>

    <strong>Authentication and Authorization</strong><br><br>
    Implement robust security from day one. OAuth 2.0 is the standard for API authentication. Use JWT tokens for stateless authentication. Implement role-based access control (RBAC) for fine-grained permissions.<br><br>

    <strong>Rate Limiting and Throttling</strong><br><br>
    Protect your API from abuse and ensure fair resource allocation. Communicate limits clearly through headers. Provide meaningful error messages when limits are exceeded.<br><br>

    <strong>Comprehensive Documentation</strong><br><br>
    Document every endpoint, parameter, response format, and error code. Include examples of requests and responses. Interactive documentation (like Swagger/OpenAPI) allows developers to test APIs directly.<br><br>

    <strong>Error Handling</strong><br><br>
    Return clear, actionable error messages. Use consistent error response formats. Include error codes that clients can programmatically handle. Never expose internal implementation details in errors.<br><br>

    <strong>Pagination and Filtering</strong><br><br>
    Don't return massive datasets in single responses. Implement cursor-based or offset pagination. Allow filtering and sorting through query parameters. This improves performance and user experience.<br><br>

    <strong>Caching Strategies</strong><br><br>
    Use HTTP caching headers appropriately. Implement ETags for conditional requests. Consider CDN caching for static responses. Proper caching dramatically improves performance and reduces server load.<br><br>

    <strong>Testing and Monitoring</strong><br><br>
    Write automated tests for all endpoints. Monitor API performance, error rates, and usage patterns. Set up alerts for anomalies. Continuous monitoring ensures reliability.<br><br>

    UMTI Tech Solutions designs and implements enterprise-grade APIs that are secure, scalable, and developer-friendly.`,
            author: "Sultan Ahmad",
            date: "December 12, 2024",
            readTime: "9 min read",
            category: "API Development",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "remote-work-productivity",
            title: "Maximizing Productivity in Remote Tech Teams",
            excerpt: "Strategies and tools for managing distributed teams effectively in the modern workplace.",
            fullContent: `Remote work has become permanent for many tech teams. Success requires intentional strategies for communication, collaboration, and culture building.<br><br>

    <strong>Communication Over-Documentation</strong><br><br>
    Write things down. Document decisions, processes, and context. Asynchronous communication allows team members across time zones to stay informed and contribute effectively.<br><br>

    <strong>Right Tools for Collaboration</strong><br><br>
    Use video conferencing for face-to-face connections. Chat platforms for quick questions. Project management tools for transparency. Code repositories for collaboration. Choose tools that integrate well.<br><br>

    <strong>Structured Meeting Practices</strong><br><br>
    Have clear agendas. Start and end on time. Record meetings for those who can't attend. Follow up with written summaries. Respect people's time and attention.<br><br>

    <strong>Clear Expectations and Goals</strong><br><br>
    Define outcomes, not hours worked. Set clear deadlines and deliverables. Use OKRs or similar frameworks to align efforts. Autonomy requires clarity about what success looks like.<br><br>

    <strong>Building Team Culture Remotely</strong><br><br>
    Schedule virtual coffee chats. Celebrate wins publicly. Create channels for non-work conversations. Occasional in-person gatherings strengthen relationships.<br><br>

    <strong>Work-Life Balance</strong><br><br>
    Encourage healthy boundaries. Respect working hours across time zones. Model good behavior from leadership. Prevent burnout through reasonable expectations.<br><br>

    <strong>Onboarding Remote Employees</strong><br><br>
    Structured onboarding is even more critical remotely. Assign buddies. Create comprehensive documentation. Schedule regular check-ins. Make new hires feel welcome and supported.<br><br>

    <strong>Security Considerations</strong><br><br>
    Implement VPNs, secure authentication, and device management. Train team members on security best practices. Remote work expands the attack surface—security must adapt.<br><br>

    <strong>Measuring Productivity</strong><br><br>
    Focus on outcomes and output, not activity. Use metrics that matter: features shipped, bugs fixed, customer satisfaction. Trust your team to do good work.<br><br>

    UMTI Tech Solutions operates as a fully distributed team and helps other organizations transition to effective remote work practices.`,
            author: "Muhammad Awais Laal",
            date: "December 10, 2024",
            readTime: "7 min read",
            category: "Remote Work",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "seo-optimization-2025",
            title: "Advanced SEO Strategies for 2025",
            excerpt: "Stay ahead in search rankings with the latest SEO techniques and algorithm updates.",
            fullContent: `Search engine optimization continues to evolve. The strategies that worked last year may be less effective today. Here's what's working in 2025.<br><br>

    <strong>User Experience Signals</strong><br><br>
    Google increasingly prioritizes user experience. Core Web Vitals matter: page load speed, interactivity, visual stability. Mobile-first design is non-negotiable. Sites that provide excellent experiences rank higher.<br><br>

    <strong>Content Quality and Depth</strong><br><br>
    Thin content doesn't cut it anymore. Create comprehensive resources that thoroughly cover topics. Answer related questions. Provide unique insights. Quality beats quantity every time.<br><br>

    <strong>E-E-A-T: Experience, Expertise, Authority, Trust</strong><br><br>
    Demonstrate expertise through credentials and track record. Build authority with backlinks from reputable sources. Show experience through first-hand knowledge. Establish trust with transparency and accuracy.<br><br>

    <strong>Semantic Search and Topic Clusters</strong><br><br>
    Search engines understand context and intent. Organize content into topic clusters with pillar pages and supporting content. Internal linking reinforces relationships and relevance.<br><br>

    <strong>Featured Snippets and Position Zero</strong><br><br>
    Structure content to capture featured snippets. Use clear headings, lists, and tables. Answer questions concisely. Position zero drives significant traffic without users clicking through.<br><br>

    <strong>Video and Multi-Format Content</strong><br><br>
    Video content ranks well and engages users. Transcribe videos for accessibility and SEO. Use images, infographics, and interactive elements. Diverse content types appeal to different learning preferences.<br><br>

    <strong>Local SEO for Local Businesses</strong><br><br>
    Optimize Google Business Profile completely. Encourage and respond to reviews. Ensure NAP consistency. Create location-specific content. Local pack results drive significant traffic for local searches.<br><br>

    <strong>Technical SEO Foundations</strong><br><br>
    Ensure proper indexing with XML sitemaps. Use structured data markup. Fix crawl errors. Optimize site architecture. Technical issues can prevent even great content from ranking.<br><br>

    <strong>Link Building in 2025</strong><br><br>
    Quality over quantity. Earn links through valuable content, original research, and genuine relationships. Guest posting still works when done authentically. Avoid link schemes—they're not worth the risk.<br><br>

    UMTI Tech Solutions provides comprehensive SEO services that improve visibility, drive qualified traffic, and generate leads.`,
            author: "Farooq Amras",
            date: "December 8, 2024",
            readTime: "8 min read",
            category: "SEO",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
        },
        {
            slug: "devops-culture",
            title: "Building a Strong DevOps Culture in Your Organization",
            excerpt: "Transform your development and operations with DevOps practices that accelerate delivery.",
            fullContent: `DevOps is more than tools and automation—it's a cultural transformation that breaks down silos between development and operations teams.<br><br>

    <strong>Shared Responsibility</strong><br><br>
    Developers own code in production. Operations understand application architecture. Shared on-call duties create empathy and drive quality. Everyone cares about reliability.<br><br>

    <strong>Continuous Integration and Deployment</strong><br><br>
    Automate builds, tests, and deployments. Integrate frequently to catch issues early. Deploy small changes regularly rather than risky big-bang releases. Automation reduces errors and accelerates delivery.<br><br>

    <strong>Infrastructure as Code</strong><br><br>
    Manage infrastructure through version-controlled code. Terraform, CloudFormation, and similar tools make infrastructure reproducible and consistent. Eliminate configuration drift and manual errors.<br><br>

    <strong>Monitoring and Observability</strong><br><br>
    Instrument applications comprehensively. Monitor metrics, logs, and traces. Set up meaningful alerts. Use observability to understand system behavior and debug issues quickly.<br><br>

    <strong>Blameless Postmortems</strong><br><br>
    When incidents occur, focus on what went wrong, not who was at fault. Document learnings and implement improvements. Psychological safety encourages honesty and continuous improvement.<br><br>

    <strong>Collaboration Tools and Practices</strong><br><br>
    Use chat ops for visibility. Document runbooks and procedures. Create feedback loops between teams. Communication reduces friction and speeds resolution.<br><br>

    <strong>Security Integration (DevSecOps)</strong><br><br>
    Shift security left in the development process. Automate security scanning. Treat security as everyone's responsibility, not just a separate team's concern.<br><br>

    <strong>Metrics That Matter</strong><br><br>
    Track deployment frequency, lead time, mean time to recovery, and change failure rate. These four key metrics from the DORA research predict organizational performance.<br><br>

    <strong>Starting the Transformation</strong><br><br>
    Begin with pilot projects. Demonstrate value through quick wins. Invest in training. Change culture gradually through consistent reinforcement of values and practices.<br><br>

    UMTI Tech Solutions helps organizations adopt DevOps practices that improve speed, reliability, and team collaboration.`,
            author: "Imran Ahmed",
            date: "December 5, 2024",
            readTime: "8 min read",
            category: "DevOps",
            image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1488&q=80"
        },
        {
            slug: "progressive-web-apps",
            title: "Progressive Web Apps: The Future of Mobile Experience",
            excerpt: "Learn why PWAs are becoming the preferred choice for modern web applications.",
            fullContent: `Progressive Web Apps combine the best of web and mobile applications, offering app-like experiences through web browsers with improved performance and capabilities.<br><br>

    <strong>What Makes a PWA</strong><br><br>
    PWAs are reliable, fast, and engaging. They work offline, load instantly, and feel like native apps. Service workers cache assets and enable offline functionality. Web app manifests make them installable.<br><br>

    <strong>Performance Benefits</strong><br><br>
    PWAs load faster than traditional websites. Aggressive caching strategies reduce data usage. Pre-caching critical resources ensures instant load times on repeat visits. Users perceive them as much faster than regular websites.<br><br>

    <strong>Offline Functionality</strong><br><br>
    Service workers intercept network requests and serve cached content when offline. Synchronize data when connectivity returns. Users can continue working regardless of network conditions.<br><br>

    <strong>Installability</strong><br><br>
    Users can add PWAs to their home screens without app stores. No need to download large native apps. Updates happen automatically when users visit. This reduces friction significantly.<br><br>

    <strong>Push Notifications</strong><br><br>
    Re-engage users with timely, relevant notifications. Drive repeat visits and conversions. Implement notifications thoughtfully to avoid annoying users.<br><br>

    <strong>App-Like Experience</strong><br><br>
    Full-screen mode hides browser UI. Smooth animations and gestures feel native. Access device features like camera, geolocation, and sensors through web APIs.<br><br>

    <strong>Cross-Platform Compatibility</strong><br><br>
    Write once, run everywhere. PWAs work across devices and platforms. Reduce development costs compared to maintaining separate native apps.<br><br>

    <strong>SEO Benefits</strong><br><br>
    Unlike native apps, PWAs are indexable by search engines. Get discovered through organic search. Link directly to specific content.<br><br>

    <strong>Implementation Considerations</strong><br><br>
    Start with a responsive web app. Add a service worker for offline support. Create a web app manifest. Implement HTTPS (required for PWAs). Test across browsers and devices.<br><br>

    <strong>Real-World Success</strong><br><br>
    Major companies report significant improvements after launching PWAs: increased engagement, better conversion rates, reduced development costs. Twitter, Pinterest, and Uber have successful PWAs.<br><br>

    UMTI Tech Solutions specializes in building progressive web apps that deliver exceptional user experiences across all devices.`,
            author: "Aamir Shaheen",
            date: "December 3, 2024",
            readTime: "7 min read",
            category: "Progressive Web Apps",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "custom-ai-agents-2026",
            title: "Transforming Business with Custom AI Agents in 2026",
            excerpt: "Learn how enterprise AI agents are revolutionizing customer service and operational efficiency in modern businesses.",
            fullContent: `Enterprise AI agents are the next evolution in business automation. In 2026, these intelligent systems will handle everything from complex supply chain logistics to high-touch customer support with minimal human intervention.<br><br>
            <strong>The New Employee: AI Agents</strong><br><br>
            Autonomous AI agents are not just simple scripts; they are persistent, goal-oriented entities that can reason, plan, and execute tasks across multiple platforms. At UMTI Tech, we help businesses build custom AI agents that integrate seamlessly with their existing CRM and ERP systems.<br><br>
            <strong>Cost Reduction and Scalability</strong><br><br>
            A single AI agent can process thousands of inquiries simultaneously, 24/7, without fatigue. This allows businesses to scale their operations without significantly increasing headcount. Our clients have seen up to 70% reduction in support costs after implementing our custom agent solutions.`,
            author: "Muhammad Awais Laal",
            date: "January 15, 2026",
            readTime: "10 min read",
            category: "AI Solutions",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "scalable-saas-trends-2026",
            title: "Top 10 Web Development Trends for Scalable SaaS Platforms",
            excerpt: "Exploring the shift towards headless CMS, serverless architecture, and edge computing for next-gen web apps.",
            fullContent: `Building a SaaS platform in 2026 requires a focus on extreme scalability and global performance. The move towards serverless and edge-first development is no longer optional for companies aiming for a worldwide audience.<br><br>
            <strong>Headless is the New Standard</strong><br><br>
            Decoupling the frontend from the backend allows for ultimate flexibility. Whether you're delivering content to a web app, a mobile app, or an IoT device, the headless approach ensures a unified source of truth and faster iteration speeds.`,
            author: "Yasir Abbas",
            date: "January 12, 2026",
            readTime: "6 min read",
            category: "Web Development",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "nextjs-ecommerce-performance",
            title: "Building High-Performance E-commerce Stores with Next.js",
            excerpt: "How to optimize your online store for maximum speed and SEO dominance using modern front-end frameworks.",
            fullContent: `In the world of e-commerce, every millisecond counts. A slow-loading site is a direct leak in your revenue funnel. Next.js 15+ has introduced features that make it the undisputed king of high-performance retail platforms.<br><br>
            <strong>Static Generation vs Server Rendering</strong><br><br>
            Leveraging Incremental Static Regeneration (ISR) allows you to have the speed of a static site with the dynamic updates of a server-rendered one. This is perfect for product pages where inventory changes frequently but the layout remains static.`,
            author: "Misha",
            date: "January 10, 2026",
            readTime: "8 min read",
            category: "Web Development",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "advanced-nlp-chatbots-2026",
            title: "The Future of NLP: Advanced Chatbots for Global Enterprises",
            excerpt: "Deep dive into natural language processing and its impact on cross-border communication and support.",
            fullContent: `Natural Language Processing has leaped forward with the arrival of ultra-large multilingual models. Modern chatbots can now handle nuances, sarcasm, and complex technical queries in over 100 languages with near-human accuracy.<br><br>
            <strong>Breaking the Language Barrier</strong><br><br>
            For global enterprises, the ability to provide instantaneous support in a customer's native tongue is a massive competitive advantage. UMTI Tech's custom NLP pipelines ensure that your brand voice remains consistent across all markets.`,
            author: "Muhammad Saqib Qureshi",
            date: "January 08, 2026",
            readTime: "7 min read",
            category: "AI Solutions",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "azure-cloud-migration-guide",
            title: "Cloud Migration Strategies: Moving from Legacy to Azure",
            excerpt: "A step-by-step guide to secure cloud migration for large-scale enterprise data and applications.",
            fullContent: `Migrating legacy infrastructure to Microsoft Azure is a complex but rewarding journey. It's about more than just moving files; it's about re-architecting for the cloud-native era.<br><br>
            <strong>The 5 R's of Migration</strong><br><br>
            Whether you choose to Rehost, Refactor, Rearchitect, Rebuild, or Replace, having a clear roadmap is essential for minimizing downtime and ensuring data integrity during the transition.`,
            author: "Amir Shaheen",
            date: "January 05, 2026",
            readTime: "9 min read",
            category: "Cloud Computing",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "digital-transformation-startups-2026",
            title: "Digital Transformation: A Practical Guide for Modern Startups",
            excerpt: "Bridging the gap between traditional business models and the digital-first era with smart tech choices.",
            fullContent: `Startups in 2026 are born in the cloud, but legacy thinking can still hold them back. True digital transformation is about culture as much as it is about software.<br><br>
            <strong>Agility as a Competitive Edge</strong><br><br>
            By adopting DevOps from day one and leveraging AI for internal processes, modern startups can out-compete established giants who are bogged down by technical debt and old-school management hierarchies.`,
            author: "Sarah",
            date: "January 02, 2026",
            readTime: "7 min read",
            category: "Strategy",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "predictive-analytics-roi-2026",
            title: "Maximizing ROI with Predictive Analytics and Big Data",
            excerpt: "How data-driven decision making is becoming the cornerstone of successful marketing and finance.",
            fullContent: `Decisions based on gut feeling are a thing of the past. In 2026, predictive analytics allows businesses to see around corners and anticipate market shifts before they happen.<br><br>
            <strong>Turning Data into Gold</strong><br><br>
            By synthesizing vast amounts of customer data, businesses can predict churn, optimize pricing in real-time, and target marketing spend with pinpoint accuracy, leading to massive improvements in ROI.`,
            author: "Altaf Malkani",
            date: "December 28, 2025",
            readTime: "8 min read",
            category: "AI Solutions",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "cybersecurity-compliance-2026",
            title: "Modern Cybersecurity: Protecting Your Enterprise Data in 2026",
            excerpt: "Essential security protocols and compliance standards every business must follow to prevent breaches.",
            fullContent: `As threats become more sophisticated, cybersecurity compliance has moved from a checklist to a core business requirement. Zero-trust architecture is now the baseline for any serious enterprise.<br><br>
            <strong>Beyond the Firewall</strong><br><br>
            Modern security is about identity, data encryption, and continuous monitoring. UMTI Tech provides end-to-end security audits to ensure your business stays ahead of potential attackers and regulatory requirements.`,
            author: "UMTI Tech Team",
            date: "December 25, 2025",
            readTime: "9 min read",
            category: "Security",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "low-code-enterprise-adoption",
            title: "The Rise of Low-Code Solutions in Enterprise Development",
            excerpt: "Evaluating the benefits and trade-offs of low-code platforms for rapid application prototyping.",
            fullContent: `Low-code platforms are empowering 'citizen developers' and helping IT teams clear their backlogs faster than ever. However, the key to success is knowing when to use low-code and when to stick to custom engineering.<br><br>
            <strong>Accelerating Innovation</strong><br><br>
            By using low-code for internal tools and rapid prototyping, businesses can test ideas in weeks instead of months, reserving their expensive engineering talent for high-impact, customer-facing core products.`,
            author: "Misha",
            date: "December 22, 2025",
            readTime: "6 min read",
            category: "Development",
            image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
        },
        {
            slug: "multi-channel-digital-presence",
            title: "Scaling Your Digital Presence: A Multi-Channel Strategy",
            excerpt: "How to maintain consistent branding and high engagement across web, mobile, and social platforms.",
            fullContent: `Your customers are everywhere, and your brand needs to be too. A successful digital presence in 2026 requires a seamless experience across all touchpoints, from your high-performance website to niche social platforms.<br><br>
            <strong>Ubiquity with Consistency</strong><br><br>
            It's not just about being on every platform; it's about telling the same story in a way that fits each medium. UMTI Tech helps you craft a unified digital strategy that drives growth and builds long-term brand equity.`,
            author: "Sarah",
            date: "December 18, 2025",
            readTime: "7 min read",
            category: "Marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "ai-driven-cx-strategies",
            title: "AI-Driven Customer Experience: The Next Frontier",
            excerpt: "Personalizing customer journeys with real-time AI insights and automated feedback loops.",
            fullContent: `The era of generic marketing is over. Predictive AI now allows brands to anticipate customer needs before the customer even realizes they have them. This is the new standard for customer experience (CX).<br><br>
            <strong>hyper-Personalization at Scale</strong><br><br>
            By analyzing behavior in real-time, AI can tailor every interaction to the individual user, leading to higher satisfaction, increased loyalty, and significantly better conversion rates across the board.`,
            author: "Muhammad Saqib Qureshi",
            date: "December 15, 2025",
            readTime: "8 min read",
            category: "AI Solutions",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "responsive-design-accessibility-2026",
            title: "Responsive Web Design: More than just Breakpoints",
            excerpt: "Principles of fluid design and accessibility for a truly inclusive user experience on all devices.",
            fullContent: `Modern responsive design is about more than just fitting content onto a phone screen. It's about accessibility, performance, and providing a premium experience for every user, regardless of their device or ability.<br><br>
            <strong>Inclusive by Design</strong><br><br>
            At UMTI Tech, we believe that the web should be for everyone. Our design process integrates accessibility from day one, ensuring that your site is usable, readable, and stunning for all visitors.`,
            author: "Misha",
            date: "December 12, 2025",
            readTime: "7 min read",
            category: "Design",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1464&q=80"
        },
        {
            slug: "fine-tuning-llms-business",
            title: "Fine-Tuning LLMs for Niche Business Applications",
            excerpt: "Customizing large language models to handle specialized terminology and complex industry domain knowledge.",
            fullContent: `While general-purpose AI is impressive, niche business applications require specialized knowledge. Fine-tuning models on your own proprietary data is the key to unlocking true AI value for your enterprise.<br><br>
            <strong>Expertise as a Service</strong><br><br>
            Whether it's legal, medical, or highly technical engineering domains, a fine-tuned LLM can provide insights and assistance that far surpass general models, making it an indispensable tool for your expert teams.`,
            author: "Muhammad Saqib Qureshi",
            date: "December 08, 2025",
            readTime: "9 min read",
            category: "AI Research",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "mobile-app-performance-optimization-2026",
            title: "Mobile App Performance: Optimization for 2026 Hardware",
            excerpt: "Cutting down load times and battery consumption in cross-platform mobile applications.",
            fullContent: `With users increasingly demanding instant gratification, mobile app performance is more critical than ever. In 2026, optimization is about more than just fast loading; it's about efficient resource usage and battery conservation.<br><br>
            <strong>Fluidity as a Feature</strong><br><br>
            A high-performance app feels like an extension of the user's hand. By optimizing every frame and minimizing background processes, UMTI Tech builds mobile experiences that are as smooth as they are powerful.`,
            author: "UMTI Tech Team",
            date: "December 05, 2025",
            readTime: "8 min read",
            category: "Mobile",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1472&q=80"
        },
        {
            slug: "agile-remote-teams-best-practices",
            title: "Agile Development in Distributed Remote Teams",
            excerpt: "Mastering the art of remote collaboration with the right project management tools and rituals.",
            fullContent: `Remote work is here to stay, and Agile must evolve to meet the needs of distributed teams. Success in 2026 is about asynchronous communication, radical transparency, and the right digital tooling.<br><br>
            <strong> rituals for a Digital Workplace</strong><br><br>
            By adapting Scrum or Kanban to a remote-first mindset, teams can maintain high velocity and strong culture without needing to be in the same physical space. UMTI Tech is a living laboratory for these practices.`,
            author: "Sarah",
            date: "December 01, 2025",
            readTime: "7 min read",
            category: "Management",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "serverless-content-apps-benefits",
            title: "The Power of Serverless for Dynamic Content Apps",
            excerpt: "Why serverless computing is the best choice for unpredictable traffic and high-demand web services.",
            fullContent: `Managing servers is a thing of the past for modern content applications. Serverless architecture allows you to scale from zero to millions of users instantly, without worrying about infrastructure management or over-provisioning.<br><br>
            <strong>Focus on the Code, Not the Server</strong><br><br>
            Serverless functions allow developers to focus purely on business logic, leading to faster development cycles and lower operational costs. It's the ultimate tool for companies that need to move fast and stay lean.`,
            author: "Yasir Abbas",
            date: "November 28, 2025",
            readTime: "6 min read",
            category: "Development",
            image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
        },
        {
            slug: "blockchain-supply-chain-transparency-2026",
            title: "Blockchain for Supply Chain Transparency and Trust",
            excerpt: "Leveraging decentralized ledgers to eliminate fraud and improve audits in global logistics.",
            fullContent: `Trust is the currency of the global supply chain, and blockchain is the technology that secures it. In 2026, ends-to-end visibility from raw materials to the final consumer is no longer a luxury—it's an expectation.<br><br>
            <strong>The Immutable Record</strong><br><br>
            By using decentralized ledgers, every participant in the supply chain can verify the origin and journey of a product, reducing fraud, improving traceability, and building deep trust with the modern ethical consumer.`,
            author: "UMTI Tech Team",
            date: "November 25, 2025",
            readTime: "8 min read",
            category: "Fintech",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "headless-commerce-retail-future",
            title: "Headless Commerce: Building the Future of Online Retail",
            excerpt: "Decoupling the front-end for ultimate design freedom and lightning-fast shopping experiences.",
            fullContent: `Traditional e-commerce platforms can be rigid and slow. Headless commerce breaks these chains by separating the backend shopping engine from the frontend user interface, allowing for bespoke, lightning-fast retail experiences.<br><br>
            <strong>Frontend Freedom</strong><br><br>
            With a headless approach, you can build a storefront that perfectly matches your brand identity, using whatever technology stack you prefer, all while leveraging powerful, battle-tested e-commerce backends.`,
            author: "Misha",
            date: "November 22, 2025",
            readTime: "6 min read",
            category: "E-commerce",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        },
        {
            slug: "cv-healthcare-diagnosis-ai",
            title: "Computer Vision in Healthcare: Improving Diagnosis",
            excerpt: "How AI-powered image analysis is helping doctors detect diseases with higher accuracy.",
            fullContent: `Computer vision is becoming a critical tool in modern medicine. By analyzing X-rays, MRIs, and CT scans, AI systems can spot anomalies that human eyes might miss, leading to earlier detection and better patient outcomes.<br><br>
            <strong>Augmenting Human Expertise</strong><br><br>
            AI isn't here to replace doctors; it's here to give them superpowers. By handling the initial screening and highlighting areas of concern, AI allows medical professionals to focus their expertise where it's needed most.`,
            author: "Altaf Malkani",
            date: "November 18, 2025",
            readTime: "9 min read",
            category: "AI Solutions",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
        },
        {
            slug: "full-stack-javascript-permanence",
            title: "Full-Stack JavaScript: One Language to Rule the Web",
            excerpt: "The staying power of React and Node.js in the modern technology stack for full-stack engineers.",
            fullContent: `Despite the rise of new languages, JavaScript remains the dominant force in web development. The ability to use the same language across the entire stack—from the database to the browser—provides unmatched efficiency and developer productivity.<br><br>
            <strong>A Unified Ecosystem</strong><br><br>
            The massive community and wealth of libraries around Node.js and React make it the safest and most powerful choice for businesses of all sizes, from rapid prototypes to massive enterprise systems.`,
            author: "Amir Shaheen",
            date: "November 15, 2025",
            readTime: "7 min read",
            category: "Development",
            image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
        },
        {
            slug: "seo-voice-search-ai-optimization",
            title: "SEO Strategies for Voice Search and AI Assistants",
            excerpt: "Optimizing your content for natural language queries and AI-driven search results.",
            fullContent: `As more users talk to their devices instead of typing, SEO is shifting towards natural language and conversational queries. Optimizing for "near me" and complex verbal questions is the new frontier of search.<br><br>
            <strong>Conversational Content is King</strong><br><br>
            AI assistants like Wixen and Gemini are looking for clear, direct answers to verbal questions. Structuring your content with an FAQ-first mindset is essential for winning the voice search battle in 2026.`,
            author: "UMTI Tech Team",
            date: "November 12, 2025",
            readTime: "8 min read",
            category: "SEO",
            image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80"
        }
    ];

    // ==========================================
    // ADVANCED SEO: INTERNAL LINKER (Silk Road Pattern)
    // ==========================================
    function applyInternalLinking(content) {
        if (!content) return "";
        const keywords = [
            { term: /AI Solutions/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" },
            { term: /Artificial Intelligence/gi, link: "index.html#about", class: "text-blue-600 font-bold hover:underline" },
            { term: /Web Development/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" },
            { term: /Mobile Development/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" },
            { term: /Digital Marketing/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" },
            { term: /SEO/gi, link: "index.html#service-directory", class: "text-blue-600 font-bold hover:underline" },
            { term: /custom software/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" },
            { term: /UMTI Tech/gi, link: "index.html", class: "text-blue-600 font-bold hover:underline" },
            { term: /IT consulting/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" },
            { term: /cloud solutions/gi, link: "index.html#services", class: "text-blue-600 font-bold hover:underline" }
        ];

        let linkedContent = content;
        keywords.forEach(item => {
            let replaced = false;
            linkedContent = linkedContent.replace(item.term, (match) => {
                if (!replaced) {
                    replaced = true;
                    return `<a href="${item.link}" class="${item.class}">${match}</a>`;
                }
                return match;
            });
        });
        return linkedContent;
    }


    // ==========================================
    // BLOG RENDER LOGIC
    // ==========================================
    const blogGrid = document.getElementById('blog-grid');
    if (blogGrid) {
        // Render all posts
        blogGrid.innerHTML = blogPosts.map((post, index) => `
            <article class="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer" onclick="openBlogModal('${post.slug}')">
                <div class="relative h-48 overflow-hidden">
                    <img src="${post.image}" alt="${post.category}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">${post.category}</div>
                </div>
                <div class="p-6">
                    <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3 h-3"></i> ${post.date}</span>
                        <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${post.readTime}</span>
                    </div>
                    <h2 class="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">${post.title}</h2>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-3">${post.excerpt}</p>
                    <div class="flex items-center justify-between mt-auto">
                        <div class="flex items-center gap-2">
                             <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">${post.author.split(' ').map(n => n[0]).join('')}</div>
                            <span class="text-xs font-medium text-gray-700">${post.author}</span>
                        </div>
                    </div>
                </div>
            </article>
        `).join('');
        lucide.createIcons();
    }

    // ==========================================
    // BLOG MODAL LOGIC
    // ==========================================
    window.openBlogModal = (slug) => {
        const post = blogPosts.find(p => p.slug === slug);
        if (!post) return;

        // Create Modal HTML
        const modalHtml = `
            <div id="blog-modal" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeBlogModal()"></div>
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-[fadeIn_0.3s_ease-out]">
                    <button onclick="closeBlogModal()" class="absolute top-4 right-4 p-2 bg-white/20 hover:bg-gray-100 rounded-full transition-colors z-20">
                        <i data-lucide="x" class="w-6 h-6 text-gray-800"></i>
                    </button>
                    
                    <div class="relative h-64 md:h-96">
                        <img src="${post.image}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                             <div class="flex gap-2 mb-4">
                                <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">${post.category}</span>
                            </div>
                            <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">${post.title}</h1>
                            <div class="flex items-center gap-6 text-white/80 text-sm">
                                <span class="flex items-center gap-2"><i data-lucide="user" class="w-4 h-4"></i> ${post.author}</span>
                                <span class="flex items-center gap-2"><i data-lucide="calendar" class="w-4 h-4"></i> ${post.date}</span>
                                <span class="flex items-center gap-2"><i data-lucide="clock" class="w-4 h-4"></i> ${post.readTime}</span>
                            </div>
                        </div>
                    </div>

                    <div class="p-8 md:p-12">
                        <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                            ${applyInternalLinking(post.fullContent).replace(/\n\n/g, '<br><br>')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Inject and Animate
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstElementChild);
        document.body.style.overflow = 'hidden';
        lucide.createIcons();
    };

    window.closeBlogModal = () => {
        const modal = document.getElementById('blog-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    };

    // ==========================================
    // DATA DEFINITIONS
    // ==========================================
    const heroSlides = [
        {
            pillText: "AI-Powered Business Scaling",
            pillIcon: "sparkles",
            titleLine1: "AI Software That",
            titleLine2: "Drives Measurable Growth",
            titleGradient: "from-blue-600 via-purple-600 to-pink-600",
            description: "We build AI-driven products that boost revenue, cut costs, and accelerate time-to-market — trusted by startups and enterprises alike.",
            primaryBtn: "Get a Free Technical Audit",
            primaryLink: "#contact",
            secondaryBtn: "View Portfolio",
            secondaryLink: "#portfolio",
            image: "assets/images/hero-20section-20character.png",
            bgGradient: "from-blue-50/50 via-purple-50/30 to-pink-50/50"
        },
        {
            pillText: "Scale Globally",
            pillIcon: "globe",
            titleLine1: "Launch Secure,",
            titleLine2: "Enterprise-Grade Platforms",
            titleGradient: "from-emerald-600 via-teal-600 to-cyan-600",
            description: "From AI agents to complex management systems — secure, scalable solutions that power international growth and operational efficiency.",
            primaryBtn: "Our Services",
            primaryLink: "#services",
            secondaryBtn: "View Portfolio",
            secondaryLink: "#portfolio",
            image: "assets/images/hero-slide-2.png",
            bgGradient: "from-emerald-50/50 via-teal-50/30 to-cyan-50/50"
        },
        {
            pillText: "Expert-Led Delivery",
            pillIcon: "book-open",
            titleLine1: "Product Teams",
            titleLine2: "That Ship Results",
            titleGradient: "from-amber-600 via-orange-600 to-red-600",
            description: "Experienced teams combining product thinking and engineering craft to deliver measurable outcomes and lasting value.",
            primaryBtn: "See Our Work",
            primaryLink: "#portfolio",
            secondaryBtn: "Meet The Team",
            secondaryLink: "#team",
            image: "assets/images/hero-slide-3.png",
            bgGradient: "from-amber-50/50 via-orange-50/30 to-red-50/50"
        }
    ];

    // Preload hero images so transitions don't wait on network
    (function preloadHeroImages() {
        heroSlides.forEach(s => {
            if (s && s.image) {
                const i = new Image();
                i.src = s.image;
            }
        });
    })();

    const teamMembers = [
        {
            name: "Muhammad Awais Laal",
            role: "Founder & CEO",
            bio: "Visionary leader with 3+ years of experience in software and education, dedicated to empowering communities.",
            image: "assets/images/muhammad_awais.png"
        },
        {
            name: "Altaf Malkani",
            role: "Senior AI Developer",
            bio: "Expert AI Developer specializing in scalable machine learning solutions, NLP, and intelligent agents.",
            image: "assets/images/altaf.jpg"
        },
        {
            name: "Muhammad Saqib Qureshi",
            role: "AI Team Lead",
            bio: "AI Team Lead driving innovation in artificial intelligence and leading the technical team towards excellence.",
            image: "assets/images/muhammad-saqib-qureshi.jpg"
        },
        {
            name: "Habib Ur rahman Kakar",
            role: "Projects manager",
            bio: "Experienced project manager ensuring timely and efficient delivery of complex technical projects.",
            image: "assets/images/habib.png"
        },

        {
            name: "Misha",
            role: "Web Developer",
            bio: "Expert web developer crafting beautiful, responsive, and high-performance websites using modern technologies.",
            image: "assets/images/Misha.jpeg"
        },
        {
            name: "Sarah",
            role: "Operations Director",
            bio: "Ensuring smooth operational excellence and delivery of high-quality solutions to our global clients.",
            image: "assets/images/sarah-ops.png"
        }
    ];


    const testimonials = [
        { name: "Darie Zamp", role: "Facebook Review", text: "تعامل احترافي وسرعة في الإنجاز. الموقع الذي طوروه لنا يعمل بكفاءة عالية على جميع الأجهزة والمتصفحات.", rating: 5, image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Ela Canp", role: "Facebook Review", text: "شركة Umti Tech Solutions قدمت لنا موقعاً إلكترونياً احترافياً بتصميم عصري وسريع الاستجابة. التعامل معهم كان مريح جداً وخدمتهم ما بعد التسليم ممتازة.", rating: 5, image: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Dolina Amrja", role: "Facebook Review", text: "Happy with your amazing service, thanks.", rating: 5, image: "https://randomuser.me/api/portraits/women/3.jpg" },
        { name: "Umesha Sler", role: "Facebook Review", text: "I need a BI Chat Bot. Is this service available?", rating: 5, image: "https://randomuser.me/api/portraits/men/4.jpg" },
        { name: "Zuak Ami", role: "Facebook Review", text: "Very satisfied with UMTI.", rating: 5, image: "https://randomuser.me/api/portraits/men/5.jpg" },
        { name: "Sid Wara", role: "Facebook Review", text: "UMTI Tech Solutions transformed our outdated website into a professional business hub. Fast load times, SEO-ready, and visually appealing—exactly what we needed to grow online.", rating: 5, image: "https://randomuser.me/api/portraits/men/6.jpg" },
        { name: "Amea Brro", role: "Facebook Review", text: "Unforgettable personality and great work. Thanks, and looking forward to working together again.", rating: 5, image: "https://randomuser.me/api/portraits/women/7.jpg" },
        { name: "Kait Zomb", role: "Facebook Review", text: "Really appreciate your work.", rating: 5, image: "https://randomuser.me/api/portraits/men/8.jpg" },
        { name: "Desea Dewa", role: "Facebook Review", text: "I rarely use Facebook, but I came here specially to review you. It was and will be a mind-blowing experience with the UMTI team.", rating: 5, image: "https://randomuser.me/api/portraits/women/9.jpg" },
        { name: "Cranchi Yougart", role: "Facebook Review", text: "Amazing work, no words to thank you. You did a great job and helped me in my business.", rating: 5, image: "https://randomuser.me/api/portraits/men/10.jpg" },
        { name: "Ela Wvae", role: "Facebook Review", text: "Started as a test project and turned into a long-term collaboration because of the trust and amazing work. Thanks.", rating: 5, image: "https://randomuser.me/api/portraits/women/11.jpg" },
        { name: "Sarah Khan", role: "Facebook Review", text: "Thanks for your kind help.", rating: 5, image: "https://randomuser.me/api/portraits/women/12.jpg" },
        { name: "Emersion Isabelli", role: "Facebook Review", text: "Thank you LinkedIn for helping me find UMTI. They are awesome.", rating: 5, image: "https://randomuser.me/api/portraits/women/13.jpg" },
        { name: "Zahxi Bmo", role: "Facebook Review", text: "It was a fantastic experience with this Pakistani software company. Looking forward to a long journey together.", rating: 5, image: "https://randomuser.me/api/portraits/men/14.jpg" },
        { name: "Frea Werd", role: "Facebook Review", text: "I am fully satisfied with their services. They helped me create my dream plumbing website.", rating: 5, image: "https://randomuser.me/api/portraits/women/15.jpg" },
        { name: "Alexa Rue", role: "Facebook Review", text: "They turned my idea into a fully functional e-commerce store in record time. Everything works perfectly—from payments to shipping.", rating: 5, image: "https://randomuser.me/api/portraits/women/16.jpg" },
        { name: "Emelia Eve", role: "Facebook Review", text: "UMTI Tech Solutions built an AI chatbot for my business and it’s been a total game-changer. My customers get instant replies, and my sales have noticeably increased.", rating: 5, image: "https://randomuser.me/api/portraits/women/17.jpg" }
    ];

    // ==========================================
    // HERO SLIDER LOGIC
    // ==========================================
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        let currentHeroIndex = 0;
        const heroPillText = document.getElementById('hero-pill-text');
        const heroTitleGradient = document.getElementById('hero-title-gradient');
        const heroTitle2 = document.getElementById('hero-title-2');
        const heroDesc = document.getElementById('hero-desc');
        const heroBtnPrimary = document.getElementById('hero-btn-primary');
        const heroBtnSecondary = document.getElementById('hero-btn-secondary');
        const heroImg = document.getElementById('hero-img');
        const heroContent = document.getElementById('hero-content');
        const heroImgContainer = document.getElementById('hero-img-container');

        function updateHero(index) {
            const slide = heroSlides[index];

            // update dots if present
            if (heroDots) {
                refreshHeroDots(index);
            }

            // slide out left
            heroContent.style.transition = 'transform 0.5s ease, opacity 0.5s';
            heroImgContainer.style.transition = 'transform 0.5s ease, opacity 0.5s';

            heroContent.style.transform = 'translateX(-100%)';
            heroContent.style.opacity = '0';
            heroImgContainer.style.transform = 'translateX(-100%) scale(0.98)';
            heroImgContainer.style.opacity = '0';

            setTimeout(() => {
                // Update Content
                heroSection.className = `min-h-[50vh] md:min-h-[85vh] pt-48 pb-8 md:pt-48 md:pb-8 relative overflow-hidden flex items-center transition-colors duration-700 bg-gradient-to-br ${slide.bgGradient}`;
                heroPillText.textContent = slide.pillText;
                heroTitleGradient.className = `bg-gradient-to-r ${slide.titleGradient} bg-clip-text text-transparent`;
                heroTitleGradient.textContent = slide.titleLine1;
                heroTitle2.textContent = slide.titleLine2;
                heroDesc.textContent = slide.description;
                heroBtnPrimary.className = `group px-8 py-4 bg-gradient-to-r ${slide.titleGradient} text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center justify-center gap-2`;
                heroBtnPrimary.href = slide.primaryLink;
                heroBtnPrimary.innerHTML = `${slide.primaryBtn} <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>`;
                heroBtnSecondary.textContent = slide.secondaryBtn;
                heroBtnSecondary.href = slide.secondaryLink;
                // load image into an offscreen loader first to avoid flashes
                const loaderImg = new Image();
                loaderImg.src = slide.image;
                loaderImg.onload = () => {
                    heroImg.src = slide.image;
                    heroImg.className = `relative z-10 drop-shadow-2xl origin-center transition-transform duration-700 ${index === 2 ? "scale-150" : "scale-125"}`;

                    lucide.createIcons();

                    // position offscreen right
                    heroContent.style.transition = 'none';
                    heroImgContainer.style.transition = 'none';
                    heroContent.style.transform = 'translateX(100%)';
                    heroImgContainer.style.transform = 'translateX(100%) scale(0.98)';
                    heroContent.style.opacity = '0';
                    heroImgContainer.style.opacity = '0';

                    // force reflow
                    void heroContent.offsetWidth;

                    // slide in
                    heroContent.style.transition = 'transform 0.5s ease, opacity 0.5s';
                    heroImgContainer.style.transition = 'transform 0.5s ease, opacity 0.5s';
                    heroContent.style.transform = 'translateX(0)';
                    heroContent.style.opacity = '1';
                    heroImgContainer.style.transform = 'translateX(0) scale(1)';
                    heroImgContainer.style.opacity = '1';
                };
            }, 500); // wait for slide-out
        }

        setInterval(() => {
            currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
            updateHero(currentHeroIndex);
        }, 7000);
    }

    // Hero navigation helpers (arrows, dots, swipe)
    const heroPrev = document.getElementById('hero-prev');
    const heroNext = document.getElementById('hero-next');
    const heroDots = document.getElementById('hero-dots');

    function refreshHeroDots(active = 0) {
        if (!heroDots) return;
        heroDots.innerHTML = heroSlides.map((_, i) =>
            `<div class="w-2.5 h-2.5 rounded-full bg-white/50 cursor-pointer ${i === active ? 'bg-white' : ''}" data-index="${i}"></div>`
        ).join('');
        heroDots.querySelectorAll('div').forEach(d => {
            d.addEventListener('click', () => {
                currentHeroIndex = parseInt(d.dataset.index);
                updateHero(currentHeroIndex);
            });
        });
    }

    if (heroPrev) {
        heroPrev.addEventListener('click', () => {
            currentHeroIndex = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
            updateHero(currentHeroIndex);
        });
    }
    if (heroNext) {
        heroNext.addEventListener('click', () => {
            currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
            updateHero(currentHeroIndex);
        });
    }
    if (heroDots) {
        refreshHeroDots();
    }

    // simple swipe support
    let touchStartX = 0;
    heroSection.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    heroSection.addEventListener('touchend', e => {
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (delta > 50) {
            currentHeroIndex = (currentHeroIndex - 1 + heroSlides.length) % heroSlides.length;
            updateHero(currentHeroIndex);
        } else if (delta < -50) {
            currentHeroIndex = (currentHeroIndex + 1) % heroSlides.length;
            updateHero(currentHeroIndex);
        }
    });

    // ==========================================
    // TEAM CAROUSEL
    // ==========================================
    const teamTrack = document.getElementById('team-track');
    if (teamTrack) {
        let currentTeamIndex = 0;

        // Render Team
        teamTrack.innerHTML = teamMembers.map(member => {
            const linkedinUrl = member.name === "Muhammad Awais Laal"
                ? "https://www.linkedin.com/in/muhammad-awais-laal-2a3450324/"
                : "https://www.linkedin.com/company/umti-tech-solutions";
            return `
            <div class="px-4 shrink-0 w-full md:w-1/2 lg:w-1/3">
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 text-center h-full hover:-translate-y-2 transition-transform duration-300">
                    <div class="relative w-32 h-32 mx-auto mb-6">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50"></div>
                        <img src="${member.image}" alt="${member.name}" class="object-cover rounded-full border-4 border-white shadow-xl relative z-10 w-full h-full">
                    </div>
                    <h3 class="text-xl font-bold mb-2">${member.name}</h3>
                    <p class="text-blue-600 font-semibold mb-4">${member.role}</p>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6">${member.bio}</p>
                    <div class="flex justify-center gap-3">
                        <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors group" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="#" class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors group" aria-label="X (Twitter)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        `; }).join('');
        lucide.createIcons();

        function updateTeamCarousel() {
            // slide one card at a time regardless of viewport size
            const slide = teamTrack.children[0];
            if (!slide) return;
            const slideWidth = slide.getBoundingClientRect().width;
            const containerWidth = teamTrack.parentElement.getBoundingClientRect().width;
            const percent = (slideWidth / containerWidth) * 100;
            teamTrack.style.transform = `translateX(-${currentTeamIndex * percent}%)`;
        }

        document.getElementById('team-next').addEventListener('click', () => {
            currentTeamIndex = (currentTeamIndex + 1) % teamMembers.length;
            updateTeamCarousel();
        });

        document.getElementById('team-prev').addEventListener('click', () => {
            currentTeamIndex = (currentTeamIndex - 1 + teamMembers.length) % teamMembers.length;
            updateTeamCarousel();
        });

        setInterval(() => {
            currentTeamIndex = (currentTeamIndex + 1) % teamMembers.length;
            updateTeamCarousel();
        }, 5000);

        // recalc slide position when window resizes
        window.addEventListener('resize', updateTeamCarousel);
    }


    // ==========================================
    // TESTIMONIALS CAROUSEL
    // ==========================================
    const testiTrack = document.getElementById('testimonials-track');
    if (testiTrack) {
        let currentTestiIndex = 0;

        testiTrack.innerHTML = testimonials.map(t => `
            <div class="min-w-full px-4">
                <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="relative w-16 h-16"><img src="${t.image}" class="rounded-full object-cover w-full h-full"></div>
                        <div><h4 class="font-bold text-lg">${t.name}</h4><p class="text-gray-600 text-sm">${t.role}</p></div>
                    </div>
                    <div class="flex gap-1 mb-4 text-yellow-400">
                        ${Array(t.rating).fill('<i data-lucide="star" class="w-5 h-5 fill-current"></i>').join('')}
                    </div>
                    <p class="text-gray-700 text-lg leading-relaxed italic">"${t.text}"</p>
                </div>
            </div>
        `).join('');
        const testiDots = document.getElementById('testi-dots');
        if (testiDots) {
            testiDots.innerHTML = testimonials.map((_, i) => `<div class="w-2.5 h-2.5 rounded-full bg-blue-200 cursor-pointer transition-all duration-300 ${i === 0 ? 'bg-blue-600 scale-125' : ''}" data-index="${i}"></div>`).join('');

            testiDots.querySelectorAll('div').forEach(dot => {
                dot.addEventListener('click', () => {
                    currentTestiIndex = parseInt(dot.dataset.index);
                    updateTesti();
                });
            });
        }

        function updateTesti() {
            testiTrack.style.transform = `translateX(-${currentTestiIndex * 100}%)`;
            if (testiDots) {
                testiDots.querySelectorAll('div').forEach((dot, i) => {
                    if (i === currentTestiIndex) {
                        dot.classList.add('bg-blue-600', 'scale-125');
                        dot.classList.remove('bg-blue-200');
                    } else {
                        dot.classList.remove('bg-blue-600', 'scale-125');
                        dot.classList.add('bg-blue-200');
                    }
                });
            }
        }

        document.getElementById('testi-next').addEventListener('click', () => {
            currentTestiIndex = (currentTestiIndex + 1) % testimonials.length;
            updateTesti();
        });
        document.getElementById('testi-prev').addEventListener('click', () => {
            currentTestiIndex = (currentTestiIndex - 1 + testimonials.length) % testimonials.length;
            updateTesti();
        });

        // Auto-loop testimonials
        setInterval(() => {
            currentTestiIndex = (currentTestiIndex + 1) % testimonials.length;
            updateTesti();
        }, 5000);
    }

    // ==========================================
    // HEADER SCROLL & MOBILE MENU
    // ==========================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.className = "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-2 bg-white shadow-xl";
        } else {
            header.className = "fixed top-10 left-0 right-0 z-50 transition-all duration-500 py-3 bg-white/90 mt-4 mx-4 sm:mx-8 rounded-2xl border border-slate-100 shadow-sm";
        }
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu-overlay');
    const mobileClose = document.getElementById('mobile-menu-close');

    function toggleMenu() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
        } else {
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => mobileMenu.classList.add('hidden'), 300);
        }
    }
    mobileBtn.addEventListener('click', toggleMenu);
    mobileClose.addEventListener('click', toggleMenu);
    document.querySelectorAll('#mobile-menu-overlay a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // ==========================================
    // LANGUAGE SELECTOR
    // ==========================================
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langIndicator = document.getElementById('lang-indicator');
    const currentLangText = document.getElementById('current-lang-text');
    const currentLangTextMobile = document.getElementById('current-lang-text-mobile');
    const langArrow = document.getElementById('lang-arrow');
    const langs = {
        'en': { name: 'English', label: 'English' },
        'ar': { name: 'Arabic', label: 'العربية' },
        'zh-CN': { name: 'Chinese', label: '中文' }
    };
    let currentLang = 'en';

    // 1. Initialize Google Translate
    window.googleTranslateElementInit = () => {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,ar,zh-CN',
            autoDisplay: false
        }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    // 2. Cookie Check
    const cookies = document.cookie.split(';');
    const googtrans = cookies.find(c => c.trim().startsWith('googtrans='));
    if (googtrans) {
        const parts = googtrans.split('/');
        const langCode = parts[parts.length - 1];
        if (langs[langCode]) {
            currentLang = langCode;
            updateLangUI(langCode);
        }
    }

    // 3. UI Toggle
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !langDropdown.classList.contains('opacity-0');
        if (isOpen) {
            langDropdown.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
            langArrow.classList.remove('rotate-180');
        } else {
            langDropdown.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
            langArrow.classList.add('rotate-180');
        }
    });

    document.addEventListener('click', () => {
        langDropdown.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
        langArrow.classList.remove('rotate-180');
    });

    // 4. Change Language
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const langCode = btn.dataset.lang;
            changeLanguage(langCode);
        });
    });

    function changeLanguage(langCode) {
        // Set Cookies
        document.cookie = `googtrans=/en/${langCode}; path=/`;
        document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/`;

        // Trigger Google Translate
        const select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = langCode;
            select.dispatchEvent(new Event('change'));
        } else {
            // Reload if widget not ready
            setTimeout(() => window.location.reload(), 100);
        }

        updateLangUI(langCode);
    }

    function updateLangUI(langCode) {
        currentLang = langCode;
        if (langs[langCode]) {
            currentLangText.textContent = langs[langCode].name;
            currentLangTextMobile.textContent = langCode.toUpperCase().split('-')[0];
        }

        // Update Buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.dataset.lang;
            const check = btn.querySelector('.check-icon');
            const subtext = btn.querySelector('span[class*="uppercase"]');

            if (btnLang === langCode) {
                btn.className = "lang-btn w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-all duration-200 bg-blue-600 text-white shadow-md";
                check.classList.remove('hidden');
                subtext.className = "text-[10px] uppercase tracking-wide text-blue-200";
            } else {
                btn.className = "lang-btn w-full text-left px-4 py-3 rounded-xl text-sm flex items-center justify-between transition-all duration-200 hover:bg-blue-50 text-slate-600 hover:text-blue-600";
                check.classList.add('hidden');
                subtext.className = "text-[10px] uppercase tracking-wide text-slate-400";
            }
        });

        // Indicator
        if (langCode !== 'en') {
            langIndicator.classList.remove('hidden');
        } else {
            langIndicator.classList.add('hidden');
        }
    }


    // ==========================================
    // CHATBOT
    // ==========================================
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        if (chatbotWindow.classList.contains('hidden')) {
            chatbotWindow.classList.remove('hidden');
            setTimeout(() => {
                chatbotWindow.classList.remove('opacity-0', 'scale-90', 'translate-y-20');
            }, 10);
            if (chatbotMessages.children.length === 0) {
                setTimeout(() => addMessage("Hello! I'm Wixen, UMTI Tech Assistant. How can I help you today? 🦊", 'assistant'), 300);
            }
        } else {
            closeChatbot();
        }
    });

    function closeChatbot() {
        chatbotWindow.classList.add('opacity-0', 'scale-90', 'translate-y-20');
        setTimeout(() => chatbotWindow.classList.add('hidden'), 300);
    }

    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    if (chatbotCloseBtn) chatbotCloseBtn.addEventListener('click', closeChatbot);

    // Enter to Send
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            chatbotSend.click();
        }
    });

    function addMessage(text, role) {
        const div = document.createElement('div');
        div.className = `flex gap-2 ${role === 'assistant' ? "justify-start" : "justify-end"} mb-4`;
        div.innerHTML = `
            ${role === 'assistant' ? '<div class="w-8 h-8 flex-shrink-0"><img src="assets/images/gemini-generated-image-4xg4k44xg4k44xg4.png" class="rounded-full bg-white p-1 border border-gray-200 w-8 h-8 object-cover"></div>' : ''}
            <div class="max-w-[75%] p-3 rounded-2xl ${role === 'assistant' ? "bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-md"}">
                <p class="text-sm leading-relaxed">${text}</p>
            </div>
        `;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showThinking() {
        const div = document.createElement('div');
        div.id = 'chatbot-thinking';
        div.className = 'flex gap-2 justify-start mb-4';
        div.innerHTML = `
            <div class="w-8 h-8 flex-shrink-0">
                <img src="assets/images/gemini-generated-image-4xg4k44xg4k44xg4.png" class="rounded-full bg-white p-1 border border-gray-200 w-8 h-8 object-cover">
            </div>
            <div class="max-w-[75%] p-4 rounded-2xl bg-white text-gray-800 rounded-bl-none shadow-md border border-gray-200 flex items-center gap-1.5">
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-typing"></div>
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-typing [animation-delay:0.2s]"></div>
                <div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-typing [animation-delay:0.4s]"></div>
            </div>
        `;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideThinking() {
        const thinking = document.getElementById('chatbot-thinking');
        if (thinking) thinking.remove();
    }

    chatbotSend.addEventListener('click', async () => {
        const text = chatbotInput.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        chatbotInput.value = '';

        showThinking();
        const startTime = Date.now();

        try {
            // Primary: Attempt to use the backend API
            const fetchPromise = fetch('/api/chatbot/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    conversation_history: []
                })
            });

            const response = await fetchPromise;

            if (!response.ok) throw new Error('Backend service unavailable');

            const data = await response.json();
            hideThinking();
            addMessage(data.response || "I'm having trouble connecting right now. 🦊", 'assistant');
        } catch (error) {
            console.warn('Backend chat failed, initiating fallback:', error);

            // Ensure API_CONFIG is loaded
            if (typeof window.API_CONFIG === 'undefined') {
                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'js/api-config.js';
                    script.onload = resolve;
                    script.onerror = resolve;
                    document.head.appendChild(script);
                });
            }


            // Secondary Fallback: Direct Groq API Call from browser
            const apiKey = window.API_CONFIG ? window.API_CONFIG.getGroqKey() : null;
            if (apiKey) {
                try {
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
                        content: "You are Wixen, the professional and highly intelligent AI Assistant for UMTI Tech. You represent a premium enterprise software and AI solutions company. Your goal is to be exceptionally helpful, articulate, and warmly invite users to collaborate with UMTI Tech for AI, Web, and Mobile solutions. Keep responses under 50 words. Do not use markdown. Start with an engaging, friendly tone."
                                },
                                { role: "user", content: text }
                            ],
                            temperature: 0.7,
                            max_tokens: 500
                        })
                    });

                    if (!groqResponse.ok) throw new Error('Groq API direct call failed');

                    const groqData = await groqResponse.json();
                    const aiReply = groqData.choices[0].message.content;
                    hideThinking();
                    addMessage(aiReply, 'assistant');
                } catch (fallbackError) {
                    console.error('Fallback chat error:', fallbackError);
                    try {
                        const systemPrompt = "You are Wixen, the professional and highly intelligent AI Assistant for UMTI Tech. You represent a premium enterprise software and AI solutions company. Your goal is to be exceptionally helpful, articulate, and warmly invite users to collaborate with UMTI Tech for AI, Web, and Mobile solutions. Keep responses under 50 words. Do not use markdown. Start with an engaging, friendly tone.";
                        const fullPrompt = encodeURIComponent(`${systemPrompt}\nUser: ${text}\nAssistant:`);
                        const polResponse = await fetch(`https://text.pollinations.ai/prompt/${fullPrompt}?json=false`);
                        if (!polResponse.ok) throw new Error('Pollinations failed');
                        const aiReply = await polResponse.text();
                        hideThinking();
                        addMessage(aiReply.trim(), 'assistant');
                    } catch (polError) {
                        hideThinking();
                        console.error('Pollinations error:', polError);
                        addMessage(getWixenMockResponse(text), 'assistant');
                    }
                }
            } else {
                try {
                    const systemPrompt = "You are Wixen, the professional and highly intelligent AI Assistant for UMTI Tech. You represent a premium enterprise software and AI solutions company. Your goal is to be exceptionally helpful, articulate, and warmly invite users to collaborate with UMTI Tech for AI, Web, and Mobile solutions. Keep responses under 50 words. Do not use markdown. Start with an engaging, friendly tone.";
                    const fullPrompt = encodeURIComponent(`${systemPrompt}\nUser: ${text}\nAssistant:`);
                    const polResponse = await fetch(`https://text.pollinations.ai/prompt/${fullPrompt}?json=false`);
                    if (!polResponse.ok) throw new Error('Pollinations failed');
                    const aiReply = await polResponse.text();
                    hideThinking();
                    addMessage(aiReply.trim(), 'assistant');
                } catch (polError) {
                    hideThinking();
                    console.error('Pollinations error:', polError);
                    addMessage(getWixenMockResponse(text), 'assistant');
                }
            }
        }
    });

    function getWixenMockResponse(text) {
        const lower = text.toLowerCase();
        if (lower.includes('service') || lower.includes('do you do') || lower.includes('what do you offer')) {
            return "At UMTI Tech, we specialize in AI solutions, web development, and enterprise software. How can we help your business scale? 🦊";
        }
        if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
            return "Our pricing is tailored to your specific needs. Please use the contact form to schedule a free consultation so we can give you an accurate quote! 🦊";
        }
        if (lower.includes('contact') || lower.includes('meet') || lower.includes('schedule')) {
            return "You can reach us via the contact form on this site, or schedule a meeting directly below. We'd love to hear from you! 🦊";
        }
        if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            return "Hello there! I'm Wixen. How can UMTI Tech assist you today? 🦊";
        }
        return "I'm Wixen, UMTI Tech's assistant! I'm here to ensure you have a great experience. Could you provide a little more detail so I can assist you better? 🦊";
    }

    // ==========================================
    // POPUP & FORMS
    // ==========================================
    const popup = document.getElementById('collab-popup');
    if (popup) {
        const popupClose = document.getElementById('collab-close');
        const popupDismiss = document.getElementById('collab-dismiss');

        // Discount Message Injection - Target h2 or .text-3xl
        const popupHeader = popup.querySelector('h2');
        if (popupHeader) {
            const discountMsg = document.createElement('div');
            discountMsg.className = "mt-4 p-3 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-xl text-amber-800 text-sm font-bold animate-bounce";
            discountMsg.innerHTML = "🎁 Special Offer: Avail 10% discount before ending of this month in all services!";
            popupHeader.parentNode.insertBefore(discountMsg, popupHeader.nextSibling);
        }

        setTimeout(() => {
            // popup.classList.remove('hidden');
            // setTimeout(() => popup.classList.remove('opacity-0'), 10);
        }, 5000); // 5s delay

        function closePopup() {
            popup.classList.add('opacity-0');
            setTimeout(() => popup.classList.add('hidden'), 300);
        }
        popupClose.addEventListener('click', closePopup);
        popupDismiss.addEventListener('click', closePopup);
    }

    // Review Stars
    const starContainer = document.getElementById('star-rating');
    if (starContainer) {
        let currentRating = 0;
        starContainer.innerHTML = [1, 2, 3, 4, 5].map(i => `<button type="button" data-val="${i}" class="star-btn transition-transform hover:scale-125"><i data-lucide="star" class="w-10 h-10 text-gray-300 pointer-events-none"></i></button>`).join('');
        lucide.createIcons();

        starContainer.querySelectorAll('.star-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentRating = parseInt(btn.dataset.val);
                updateStars();
            });
            btn.addEventListener('mouseenter', () => updateStars(parseInt(btn.dataset.val)));
            btn.addEventListener('mouseleave', () => updateStars(currentRating));
        });

        function updateStars(rating = currentRating) {
            starContainer.querySelectorAll('.star-btn').forEach(btn => {
                const val = parseInt(btn.dataset.val);
                const icon = btn.querySelector('svg'); // Lucide replaces i with svg
                if (icon) {
                    if (val <= rating) {
                        icon.classList.add('fill-yellow-400', 'text-yellow-400');
                        icon.classList.remove('text-gray-300');
                    } else {
                        icon.classList.remove('fill-yellow-400', 'text-yellow-400');
                        icon.classList.add('text-gray-300');
                    }
                }
            });
        }
    }

    // Form Submissions
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('reviewForm').classList.add('hidden');
            document.getElementById('reviewSuccess').classList.remove('hidden');
        });
    }


    const schedulerForm = document.getElementById('schedulerForm');
    if (schedulerForm) {
        schedulerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(schedulerForm);
            const name = formData.get('name') || 'Customer';
            const email = formData.get('email') || 'Not provided';
            const message = formData.get('message') || 'Interested in a meeting';
            const date = formData.get('date') || 'Preferred date not selected';
            const time = formData.get('time') || 'Preferred time not selected';
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

            const whatsappMsg = encodeURIComponent(`Hi UMTI Tech, I'd like to schedule a meeting.\nName: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time} (${timezone})\nMessage: ${message}`);
            window.location.href = `https://wa.me/923438688284?text=${whatsappMsg}`;
        });

        // Also handle the button click directly for immediate redirect if the user doesn't want to fill the form
        const submitBtn = schedulerForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                // If the form is valid, the submit event will fire. 
                // If it's NOT valid, the browser might block it, so we force redirect if requested.
                // However, the user said "no need form is filled of not filled".
                // So we can just redirect immediately here and prevent default.
                e.preventDefault();
                schedulerForm.dispatchEvent(new Event('submit'));
            });
        }
    }

    // ==========================================
    // CORE WEB VITALS: DYNAMIC PERFORMANCE
    // ==========================================
    (function optimizeAssets() {
        // Ensure all images have loading="lazy" unless they are high priority
        document.querySelectorAll('img:not([fetchpriority="high"])').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });

        // Dynamic Alt Tag Fixer (SEO Safety Net)
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', 'UMTI Tech Solution - Enterprise AI & Software');
        });
    })();

});

