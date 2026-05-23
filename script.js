document.addEventListener("DOMContentLoaded", () => {
    
    /* 1. KINETIC MOUSE FLUID INTERACTION */
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

        // Added trigger check for accordion buttons as well
        document.querySelectorAll("a, button, .project-card, #accordion-trigger").forEach(item => {
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

    /* 2. ON-SCROLL REVEAL (INTERSECTION OBSERVER) */
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

    /* 3. INFINITE MULTI-ROLE LOOP ANIMATION ENGINE */
    const textLayers = document.querySelectorAll('.role-text');
    let activeTextIndex = 0;

    function cycleRoles() {
        const currentLayer = textLayers[activeTextIndex];
        
        currentLayer.style.opacity = '0';
        
        // Mobile fallback tracking check
        if(window.innerWidth <= 968) {
            currentLayer.style.transform = 'translate3d(-50%, -20px, 0)';
        } else {
            currentLayer.style.transform = 'translateY(-20px)';
        }
        
        setTimeout(() => {
            currentLayer.classList.remove('visible');
            activeTextIndex = (activeTextIndex + 1) % textLayers.length;
            const nextLayer = textLayers[activeTextIndex];
            
            if(window.innerWidth <= 968) {
                nextLayer.style.transform = 'translate3d(-50%, 20px, 0)';
            } else {
                nextLayer.style.transform = 'translateY(20px)';
            }
            
            nextLayer.style.opacity = '0';
            nextLayer.classList.add('visible');
            
            void nextLayer.offsetWidth; // Repaint execution
            
            nextLayer.style.opacity = '1';
            if(window.innerWidth <= 968) {
                nextLayer.style.transform = 'translate3d(-50%, 0, 0)';
            } else {
                nextLayer.style.transform = 'translateY(0)';
            }
        }, 500); 
    }
    
    setInterval(cycleRoles, 3000);

    /* 4. DYNAMIC EXTENDABLE ACCORDION DRIVER (NEW ENGINE) */
    const accordionBtn = document.getElementById("accordion-trigger");
    const accordionPanel = document.getElementById("accordion-panel");
    const chevronIcon = document.querySelector(".toggle-chevron");

    if (accordionBtn && accordionPanel) {
        accordionBtn.addEventListener("click", () => {
            accordionPanel.classList.toggle("expanded");
            chevronIcon.classList.toggle("rotated");
            
            // Recalculate heights dynamically for active states
            if (accordionPanel.classList.contains("expanded")) {
                accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 100 + "px";
            } else {
                accordionPanel.style.maxHeight = "0px";
            }
        });
    }
});

/* 5. OVERLAYS WINDOW INTERACTIVE DRIVERS */
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
