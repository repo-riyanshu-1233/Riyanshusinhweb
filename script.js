Document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.getElementById("custom-cursor");
    const cursorBlur = document.getElementById("custom-cursor-blur");

    if (cursorDot && cursorBlur && window.innerWidth > 968) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.transform = `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;
            cursorBlur.animate({
                transform: `translate3d(${posX - 19}px, ${posY - 19}px, 0)`
            }, { duration: 150, fill: "forwards" });
        });

        document.querySelectorAll("a, button, .project-card, .tab-btn").forEach(item => {
            item.addEventListener("mouseenter", () => {
                cursorBlur.style.width = "55px";
                cursorBlur.style.height = "55px";
                cursorBlur.style.borderColor = "var(--primary-brand)";
                cursorBlur.style.backgroundColor = "rgba(139, 92, 246, 0.1)";
            });
            item.addEventListener("mouseleave", () => {
                cursorBlur.style.width = "38px";
                cursorBlur.style.height = "38px";
                cursorBlur.style.borderColor = "var(--accent-color)";
                cursorBlur.style.backgroundColor = "transparent";
            });
        });
    }

    const textLayers = document.querySelectorAll('.role-text-loop');
    let activeTextIndex = 0;
    
    function cycleRoles() {
        if (textLayers.length === 0) return;
        const currentLayer = textLayers[activeTextIndex];
        currentLayer.style.opacity = '0';
        currentLayer.style.transform = window.innerWidth <= 968 ? 'translate(-50%, -20px)' : 'translateY(-20px)';
        
        setTimeout(() => {
            currentLayer.classList.remove('visible');
            activeTextIndex = (activeTextIndex + 1) % textLayers.length;
            const nextLayer = textLayers[activeTextIndex];
            
            nextLayer.style.transform = window.innerWidth <= 968 ? 'translate(-50%, 20px)' : 'translateY(20px)';
            nextLayer.style.opacity = '0';
            nextLayer.classList.add('visible');
            void nextLayer.offsetWidth; 
            
            nextLayer.style.opacity = '1';
            nextLayer.style.transform = window.innerWidth <= 968 ? 'translate(-50%, 0)' : 'translateY(0)';
        }, 500); 
    }
    if (textLayers.length > 0) setInterval(cycleRoles, 2500); 

    const observerOptions = { root: null, threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                if(entry.target.id === 'knowledge') {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-section').forEach(section => {
        observer.observe(section);
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav a");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) current = section.getAttribute("id");
        });
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) link.classList.add("active");
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttr = this.getAttribute('href');
            if (hrefAttr !== '#' && document.querySelector(hrefAttr)) {
                e.preventDefault();
                document.querySelector(hrefAttr).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

function animateProgressBars() {
    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

function switchTab(tab, btn) {
    const langTab = document.getElementById('lang-tab');
    const skillTab = document.getElementById('skill-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if(tab === 'lang') {
        skillTab.style.opacity = '0';
        setTimeout(() => {
            skillTab.style.display = 'none';
            langTab.style.display = 'grid';
            langTab.style.opacity = '1';
            animateProgressBars();
        }, 200);
    } else {
        langTab.style.opacity = '0';
        setTimeout(() => {
            langTab.style.display = 'none';
            skillTab.style.display = 'grid';
            skillTab.style.opacity = '1';
            animateProgressBars();
        }, 200);
    }
}

let activeItems = [];
let currentIndex = 0;

const projCards = document.querySelectorAll('.proj-card-item');
const certCards = document.querySelectorAll('.cert-card-item');

projCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        activeItems = projCards;
        currentIndex = index;
        openModalFromActive();
    });
});

certCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        activeItems = certCards;
        currentIndex = index;
        openModalFromActive();
    });
});

function openModalFromActive() {
    updateModalContent();
    document.getElementById('projectModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalContent() {
    const card = activeItems[currentIndex];
    document.getElementById('m-title').textContent = card.getAttribute('data-title');
    document.getElementById('m-desc').textContent = card.getAttribute('data-desc');
    document.getElementById('m-img').src = card.getAttribute('data-img');
    
    const linkBtn = document.getElementById('m-link');
    const linkVal = card.getAttribute('data-link');
    
    // Fix: Proper link handling with setAttribute and fallback check
    if(linkVal && linkVal !== '#') {
        linkBtn.style.display = 'inline-flex';
        linkBtn.setAttribute('href', linkVal);
        linkBtn.setAttribute('target', '_blank');
    } else {
        linkBtn.style.display = 'none';
    }
}

function nextItem() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    const modalBox = document.querySelector('.modal-box');
    modalBox.style.opacity = '0';
    setTimeout(() => {
        updateModalContent();
        modalBox.style.opacity = '1';
    }, 300);
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}
