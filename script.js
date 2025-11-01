// Image Error Handler
function handleImageError(img) {
    // Try alternative paths/formats
    const currentSrc = img.src;
    const altPaths = [
        './images/profile.jpeg',
        './images/profile.jpg',
        './images/profile.png',
        'images/profile.jpeg',
        'images/profile.jpg',
        'images/profile.png',
        'https://raw.githubusercontent.com/DhileepKumarN/portfolio/main/images/profile.jpg',
        'https://raw.githubusercontent.com/DhileepKumarN/portfolio/main/images/profile.png'
    ];
    
    // Check if we've already tried all paths
    const triedPaths = img.dataset.triedPaths ? JSON.parse(img.dataset.triedPaths) : [];
    triedPaths.push(currentSrc);
    
    let nextPath = null;
    for (let path of altPaths) {
        if (!triedPaths.includes(path)) {
            nextPath = path;
            break;
        }
    }
    
    if (nextPath) {
        img.dataset.triedPaths = JSON.stringify(triedPaths);
        img.src = nextPath;
        return;
    }
    
    // Final fallback to placeholder
    img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'280\' height=\'350\'%3E%3Crect fill=\'%23f0f0f0\' width=\'280\' height=\'350\'/%3E%3Ctext fill=\'%23666\' font-family=\'Arial, sans-serif\' font-size=\'48\' font-weight=\'bold\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\'%3EDK%3C/text%3E%3C/svg%3E';
    img.onerror = null; // Prevent infinite loop
}

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon visibility based on current theme
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(90deg) scale(0.5)';
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0deg) scale(1)';
        themeToggle.style.transform = 'rotate(360deg)';
    } else {
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0deg) scale(1)';
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-90deg) scale(0.5)';
        themeToggle.style.transform = 'rotate(0deg)';
    }
    
    // Reset transform after animation
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 400);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Handle home section
    if (window.pageYOffset < 100) {
        current = 'home';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Set initial active link

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .achievement-card, .skill-category, .project-card, .timeline-item, .company-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project Details Data
const projectDetails = {
    'myntra-1': {
        title: 'User Category Affluence Score Pipeline',
        description: 'Engineered an end-to-end data pipeline using Databricks, PySpark, Golang and Apache Airflow to model and calculate a composite User Category Affluence score from diverse transactional data sources, running daily.',
        details: [
            'Applied complex prioritization logic to determine the optimal affluence level for each user and product category',
            'Stored the final low-latency data in a newly provisioned Aerospike database',
            'Integrated the processed affluence data into the search and recommendation engine via gRPC calls',
            'Significantly improved product relevance by prioritizing higher-priced items for users demonstrating high purchasing affinity in specific product categories',
            'The solution runs daily and handles diverse transactional data sources efficiently'
        ],
        technologies: ['Go', 'PySpark', 'DataBricks', 'Apache Airflow', 'Aerospike', 'gRPC', 'MongoDB']
    },
    'myntra-2': {
        title: 'Redis Cluster Scaling & Optimization',
        description: 'Resolved a critical production issue by scaling a Redis cluster that was experiencing 99% memory utilization.',
        details: [
            'Scaled Redis cluster from 6 to 8 masters to handle increased load',
            'Managed serial hash slot migration ensuring zero data loss',
            'Applied n-regular graph algorithms to achieve optimal cluster balancing',
            'Immediately reduced memory usage from 99% to a stable 67% across all nodes',
            'Improved system reliability and prevented potential service outages'
        ],
        technologies: ['Redis', 'Graph Algorithms', 'Cluster Management', 'System Optimization']
    },
    'myntra-3': {
        title: 'Real-time Clickstream Data Pipeline',
        description: 'Developed a real-time data pipeline using Scala on Databricks to process Apache Kafka clickstream events, capturing user activity from Myntra ads on Instagram.',
        details: [
            'Implemented recency logic to filter necessary fields and cap the Top 30 recent product clicks',
            'Stored feature data in Aerospike for low-latency retrieval',
            'Integrated with Recommendation API using Java',
            'Built data enrichment service to fetch product metadata',
            'Powered personalized product carousel on app homepage',
            'Successfully expanded across homepage and multiple key pages, significantly driving cross-page user engagement'
        ],
        technologies: ['Scala', 'Apache Kafka', 'DataBricks', 'Aerospike', 'Java', 'REST APIs']
    },
    'myntra-4': {
        title: 'Dream Room Inspirations Widget',
        description: 'Developed and launched the Dream Room Inspirations widget, integrating multiple services to deliver annotated, AI-generated room images for product discovery.',
        details: [
            'Integrated multiple services to deliver annotated, AI-generated room images',
            'Resolved critical bugs during integrated testing and UAT',
            'Implemented dynamic, clickable annotation points for enhanced product exploration',
            'Resulted in a 7%+ increase in Home category orders',
            'Ensured seamless user experience across all platforms'
        ],
        technologies: ['AI Integration', 'Frontend Development', 'Backend Services', 'Testing', 'UAT']
    },
    'myntra-5': {
        title: 'MongoDB Read Optimization',
        description: 'Optimized MongoDB read operations on the Profile service by implementing logic to redirect reads from primary to secondary nodes for specific endpoints.',
        details: [
            'Implemented logic to redirect reads from primary to secondary nodes for specific endpoints',
            'Ensured no read-write anomalies while maintaining consistency',
            'Improved database performance and reduced load on primary servers',
            'Enhanced system reliability by maintaining correctness in read operations',
            'Improved overall system efficiency without compromising data integrity'
        ],
        technologies: ['MongoDB', 'Database Optimization', 'System Architecture', 'Performance Tuning']
    },
    'myntra-6': {
        title: 'CTR Computation Logic Correction',
        description: 'Corrected the click-through rate (CTR) computation logic by modifying queries on DataBricks to calculate hourly average CTR for business units.',
        details: [
            'Modified queries on DataBricks for accurate CTR calculations',
            'Implemented hourly average CTR computation for business units',
            'Covered units like men\'s wear, kids wear, women\'s wear, etc.',
            'Improved data accuracy for analytics and reporting',
            'Enhanced decision-making capabilities for business units'
        ],
        technologies: ['DataBricks', 'SQL', 'Data Analytics', 'Business Intelligence']
    },
    'myntra-7': {
        title: 'Load Testing for EORS 24 Sale',
        description: 'Conducted load testing for critical services during Myntra\'s EORS 24 sale, MBB and BFF sales.',
        details: [
            'Performed comprehensive load testing for Campaign, Profile, and Location Services',
            'Tested during high-traffic events: EORS 24 sale, MBB and BFF sales',
            'Documented testing results and performance metrics',
            'Achieved minimal downtime during peak traffic',
            'Maintained service reliability and user experience during critical sales periods'
        ],
        technologies: ['Load Testing', 'Performance Testing', 'System Monitoring', 'Reliability Engineering']
    },
    'myntra-8': {
        title: 'Legacy Service Migration',
        description: 'Migrated legacy service from Java 8 to 17, Spring Boot 1.5.3 to 3.0.13, Gradle 3.3 to 7.6.2, and MongoDB 4 to 6.',
        details: [
            'Migrated from Java 8 to Java 17',
            'Upgraded Spring Boot from 1.5.3 to 3.0.13',
            'Updated Gradle from 3.3 to 7.6.2',
            'Migrated MongoDB from version 4 to 6',
            'Ensured compatibility during transition from CentOS 7 (end of life) to Ubuntu',
            'Maintained system security and support with latest versions',
            'Zero downtime migration with thorough testing'
        ],
        technologies: ['Java', 'Spring Boot', 'Gradle', 'MongoDB', 'Migration', 'Ubuntu', 'System Administration']
    },
    'oyo-1': {
        title: 'Vacation Home Pricing Fix',
        description: 'Identified and resolved a critical issue with the pricing component for vacation homes, where it was frequently omitted due to a logic error.',
        details: [
            'Identified root cause of pricing component omission',
            'Ensured accurate addition of all necessary price components',
            'Improved synchronization of proper pricing data across major OTA platforms',
            'Integrated with Booking.com, Airbnb, and Expedia',
            'Resulted in monthly savings of $3,000',
            'Effectively reduced financial burn and prevented revenue loss',
            'Significantly improved overall system reliability'
        ],
        technologies: ['Java', 'Spring Boot', 'Pricing Logic', 'OTA Integration', 'Bug Fixing']
    },
    'oyo-2': {
        title: 'Google Meta Platform Integration',
        description: 'Managed hotel pricing integration with Google\'s Meta platform, ensuring accuracy via Kafka and cron jobs.',
        details: [
            'Integrated hotel pricing with Google\'s Meta platform',
            'Ensured data accuracy through Kafka event streaming',
            'Implemented cron jobs for scheduled price updates',
            'Proactively resolved price mismatches',
            'Maintained high performance and data consistency',
            'Enhanced visibility on Google platform'
        ],
        technologies: ['Kafka', 'Cron Jobs', 'API Integration', 'Data Synchronization', 'Google APIs']
    },
    'oyo-3': {
        title: 'OYO Wizard Subscription System',
        description: 'Investigated and resolved user issues related to OYO wizard subscription activation and referral campaigns.',
        details: [
            'Investigated subscription activation issues',
            'Fixed referral campaign bugs',
            'Ensured customer payments/subscriptions were correctly processed',
            'Verified accurate reflection of transactions',
            'Improved user experience and trust',
            'Maintained payment system integrity'
        ],
        technologies: ['Java', 'Payment Processing', 'Subscriptions', 'Bug Resolution', 'User Support']
    },
    'oyo-4': {
        title: 'International Cashback System',
        description: 'Extended OYO Rupees (OR) cashback system to Indonesian and Malaysian users, expanding the existing system which was previously only applicable to Indian users.',
        details: [
            'Extended cashback system to Indonesian and Malaysian markets',
            'Added widgets to show specific cashback offers for these countries',
            'Adapted system to local requirements and regulations',
            'Maintained consistency with existing Indian system',
            'Successfully launched in new markets',
            'Enabled multi-region cashback functionality'
        ],
        technologies: ['Java', 'Multi-region Support', 'Widgets', 'Frontend', 'Backend Services']
    },
    'oyo-5': {
        title: 'Promotional Campaign - Free OYO Rupees',
        description: 'Developed and launched a promotional campaign that provided 100 free OYO rupees to Indian users with zero previous bookings.',
        details: [
            'Developed promotional campaign system from scratch',
            'Integrated necessary APIs from across multiple services',
            'Ensured seamless implementation and user experience',
            'Implemented logic to prevent duplicate credits',
            'Campaign investment: ₹4,00,000',
            'Resulted in notable 10% increase in user base',
            'Successfully expanded to Indonesia with similar results',
            'Enabled one-time credit per eligible user'
        ],
        technologies: ['Java', 'Spring Boot', 'API Integration', 'Campaign Management', 'Payment Systems']
    },
    'oyo-6': {
        title: 'Automated Widget Expiration System',
        description: 'Developed and implemented a cron job to automate the daily retrieval of expiring section items and widgets from MongoDB.',
        details: [
            'Automated daily retrieval of expiring items from MongoDB',
            'Implemented cron job for scheduled execution',
            'Enhanced efficiency of alert management',
            'Reduced manual monitoring efforts significantly',
            'Improved system maintainability',
            'Prevented stale data issues'
        ],
        technologies: ['Cron Jobs', 'MongoDB', 'Automation', 'System Administration', 'Scheduled Tasks']
    },
    'oyo-7': {
        title: 'On-Call Support & Bug Resolution',
        description: 'Served as on-call engineer for a month, addressing and resolving critical bugs and API response errors of microservices.',
        details: [
            'Month-long on-call duty for production systems',
            'Addressed critical bugs in microservices',
            'Resolved API response errors promptly',
            'Ensured minimal downtime',
            'Maintained service reliability',
            'Collaborated with multiple teams for quick resolutions',
            'Documented incidents and resolutions',
            'Improved system monitoring and alerting'
        ],
        technologies: ['Microservices', 'Debugging', 'System Reliability', 'Incident Management', 'Production Support']
    }
};

// Modal Functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

// Open modal when project card is clicked
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            modalBody.innerHTML = `
                <div class="modal-header">
                    <h3>${project.title}</h3>
                    <div class="modal-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="modal-details">
                    <p><strong>Description:</strong> ${project.description}</p>
                    <h4 style="color: var(--text-dark); margin-top: 1.5rem; margin-bottom: 1rem;">Key Details:</h4>
                    <ul>
                        ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            `;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    if (e.key === 'Escape' && certificateModal.classList.contains('show')) {
        certificateModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Certificate Modal Functionality
const certificateModal = document.getElementById('certificateModal');
const certificateModalBody = document.getElementById('certificateModalBody');
const certificateClose = document.querySelector('.certificate-close');

// Certificate data - Add your certificate image URLs here
const certificateData = {
    'Make it Happen Award': {
        image: 'https://drive.google.com/uc?export=view&id=1JHOKZNN1DZhLog1zDRi1VyasgXXsUoSG',
        year: '2024',
        event: 'Myntra Quarterly R&R Awards',
        downloadLink: 'https://drive.google.com/file/d/1JHOKZNN1DZhLog1zDRi1VyasgXXsUoSG/view'
    },
    'Chess Tournament Winner': {
        images: [
            'https://drive.google.com/uc?export=view&id=1TKE8mE0_gVc6KIzaL2XBVlseMftIK1HE',
            'https://drive.google.com/uc?export=view&id=1oaTon2GGkMkaGYk4HYLCtytk8cyEZJq_'
        ],
        year: '2024',
        event: 'Myntra Olympics 2024',
        downloadLinks: [
            'https://drive.google.com/file/d/1TKE8mE0_gVc6KIzaL2XBVlseMftIK1HE/view',
            'https://drive.google.com/file/d/1oaTon2GGkMkaGYk4HYLCtytk8cyEZJq_/view'
        ]
    }
};

function openCertificateModal(title, year, event) {
    const certificate = certificateData[title] || { image: '', images: [], year: year, event: event, downloadLink: '', downloadLinks: [] };
    
    document.getElementById('certificateModalTitle').textContent = title;
    document.getElementById('certificateModalEvent').textContent = event;
    document.getElementById('certificateModalYear').textContent = `Year: ${certificate.year}`;
    
    const imgElement = document.getElementById('certificateModalImg');
    const placeholder = document.getElementById('certificateModalPlaceholder');
    const downloadBtn = document.getElementById('certificateModalLink');
    const modalImageContainer = document.querySelector('.certificate-modal-image');
    
    // Handle single image (backward compatible) or multiple images
    const images = certificate.images || (certificate.image ? [certificate.image] : []);
    
    if (images.length > 0) {
        // Clear previous content
        modalImageContainer.innerHTML = '';
        
        images.forEach((imageUrl, index) => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${title} - Image ${index + 1}`;
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.marginBottom = index < images.length - 1 ? '1rem' : '0';
            img.style.borderRadius = '10px';
            modalImageContainer.appendChild(img);
        });
        
        placeholder.style.display = 'none';
    } else {
        // Keep placeholder if no images
        if (!imgElement.parentNode.contains(placeholder)) {
            modalImageContainer.appendChild(placeholder);
        }
        placeholder.style.display = 'block';
        if (imgElement.parentNode) {
            imgElement.remove();
        }
    }
    
    // Handle download links (prefer downloadLinks array, fallback to downloadLink)
    const downloadLinks = certificate.downloadLinks || (certificate.downloadLink ? [certificate.downloadLink] : []);
    
    if (downloadLinks.length > 0) {
        // For multiple links, use the first one (or we could create multiple buttons)
        downloadBtn.href = downloadLinks[0];
        downloadBtn.style.display = 'inline-flex';
    } else {
        downloadBtn.style.display = 'none';
    }
    
    certificateModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close certificate modal
certificateClose.addEventListener('click', () => {
    certificateModal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close certificate modal when clicking outside
certificateModal.addEventListener('click', (e) => {
    if (e.target === certificateModal) {
        certificateModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});
