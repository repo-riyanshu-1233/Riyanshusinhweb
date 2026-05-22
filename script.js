document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. INTERACTIVE MOUSE TRACKER */
    const cursorDot = document.getElementById("custom-cursor");
    const cursorBlur = document.getElementById("custom-cursor-blur");

    if (cursorDot && cursorBlur && window.innerWidth > 968) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.transform = `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;
            
            cursorBlur.animate({
                transform: `translate3d(${posX - 19}px, ${posY - 19}px, 0)`
            }, { duration: 250, fill: "forwards" });
        });

        // Micro-link expanding effects
        document.querySelectorAll("a, button, .project-card").forEach(item => {
            item.addEventListener("mouseenter", () => {
                cursorBlur.style.width = "55px";
                cursorBlur.style.height = "55px";
                cursorBlur.style.borderColor = "var(--primary-brand)";
                cursorBlur.style.backgroundColor = "rgba(99, 102, 241, 0.05)";
            });
            item.addEventListener("mouseleave", () => {
                cursorBlur.style.width = "38px";
                cursorBlur.style.height = "38px";
                cursorBlur.style.borderColor = "var(--accent-color)";
                cursorBlur.style.backgroundColor = "transparent";
            });
        });
    }

    /* 2. PERSISTENT INTERSECTION OBSERVER ON SCROLL */
    const revealElements = document.querySelectorAll(".reveal");
    const observerSettings = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerSettings);

    revealElements.forEach(el => scrollObserver.observe(el));

    /* 3. MULTI-ROLE TEXT CYCLE ANIMATION */
    const textLayers = document.querySelectorAll('.role-text');
    let activeTextIndex = 0;

    function cycleRoles() {
        const currentLayer = textLayers[activeTextIndex];
        currentLayer.style.opacity = '0';
        currentLayer.style.transform = 'matrix(1, 0, 0, 1, 0, -15)';
        
        setTimeout(() => {
            currentLayer.classList.remove('visible');
            currentLayer.style.transform = ''; 
            
            activeTextIndex = (activeTextIndex + 1) % textLayers.length;
            
            const nextLayer = textLayers[activeTextIndex];
            nextLayer.classList.add('visible');
        }, 600);
    }
    setInterval(cycleRoles, 3000);
});

/* 4. MODALS MANAGEMENT ENGINE */
function openSubpage(event, id) {
    if(event) event.preventDefault();
    const targetModal = document.getElementById(id);
    if(targetModal) {
        targetModal.style.display = 'block';
        setTimeout(() => {
            targetModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 20);
    }
}

function closeModal(id) {
    closeSubpage(id);
}

// Fixed signature initialization logic matching clean markup hooks
function closeSubpage(id) {
    const targetModal = document.getElementById(id);
    if(targetModal) {
        targetModal.classList.remove('active');
        setTimeout(() => {
            targetModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 500);
    }
}
