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

    /* 3. INFINITE MULTI-ROLE LOOP ANIMATION ENGINE (FIXED) */
    const textLayers = document.querySelectorAll('.role-text');
    let activeTextIndex = 0;

    function cycleRoles() {
        const currentLayer = textLayers[activeTextIndex];
        
        // Outgoing slide down out of layout bounds
        currentLayer.style.opacity = '0';
        currentLayer.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentLayer.classList.remove('visible');
            
            // Clean index tracker handling reset checks infinitely
            activeTextIndex = (activeTextIndex + 1) % textLayers.length;
            
            const nextLayer = textLayers[activeTextIndex];
            // Ensure safe setup placement context prior to trigger instantiation
            nextLayer.style.transform = 'translateY(20px)';
            nextLayer.style.opacity = '0';
            nextLayer.classList.add('visible');
            
            // Force browser layout update processing tick frame
            void nextLayer.offsetWidth;
            
            nextLayer.style.opacity = '1';
            nextLayer.style.transform = 'translateY(0)';
        }, 500); // Transitions alignment match window
    }
    
    // Set looping speed interval mechanism
    setInterval(cycleRoles, 3000);
});

/* 4. OVERLAYS WINDOW INTERACTIVE DRIVERS */
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
