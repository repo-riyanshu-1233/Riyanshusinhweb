document.addEventListener("DOMContentLoaded", () => {
    
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

        document.querySelectorAll("a, button, .click-card, .cert-card, #accordion-trigger, #work-accordion-trigger").forEach(item => {
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

    const revealElements = document.querySelectorAll(".reveal");
    const observerSettings = { root: null, threshold: 0.1, rootMargin: "0px 0px -40px 0px" };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                if(entry.target.id === 'languages') {
                    const progressFills = document.querySelectorAll('.progress-fill');
                    progressFills.forEach(bar => {
                        const percent = bar.getAttribute('data-percent');
                        bar.style.width = percent + "%";
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerSettings);

    revealElements.forEach(el => scrollObserver.observe(el));

    const textLayers = document.querySelectorAll('.role-text');
    let activeTextIndex = 0;

    function cycleRoles() {
        if (textLayers.length === 0) return;

        const currentLayer = textLayers[activeTextIndex];
        currentLayer.style.opacity = '0';
        
        if (window.innerWidth <= 968) {
            currentLayer.style.transform = 'translate3d(-50%, -20px, 0)';
        } else {
            currentLayer.style.transform = 'translateY(-20px)';
        }
        
        setTimeout(() => {
            currentLayer.classList.remove('visible');
            activeTextIndex = (activeTextIndex + 1) % textLayers.length;
            const nextLayer = textLayers[activeTextIndex];
            
            if (window.innerWidth <= 968) {
                nextLayer.style.transform = 'translate3d(-50%, 20px, 0)';
            } else {
                nextLayer.style.transform = 'translateY(20px)';
            }
            
            nextLayer.style.opacity = '0';
            nextLayer.classList.add('visible');
            
            void nextLayer.offsetWidth;
            
            nextLayer.style.opacity = '1';
            if (window.innerWidth <= 968) {
                nextLayer.style.transform = 'translate3d(-50%, 0, 0)';
            } else {
                nextLayer.style.transform = 'translateY(0)';
            }
        }, 500); 
    }
    
    if (textLayers.length > 0) { setInterval(cycleRoles, 3000); }

    const setupAccordion = (btnId, panelId, iconClass) => {
        const btn = document.getElementById(btnId);
        const panel = document.getElementById(panelId);
        const icon = document.querySelector(iconClass);

        if (btn && panel) {
            btn.addEventListener("click", () => {
                const isExpanded = panel.classList.toggle("expanded");
                if (icon) icon.classList.toggle("rotated", isExpanded);
                panel.style.maxHeight = isExpanded ? panel.scrollHeight + 300 + "px" : "0px";
            });
        }
    };
    setupAccordion("accordion-trigger", "accordion-panel", ".toggle-chevron:not(.work-chevron)");
    setupAccordion("work-accordion-trigger", "work-accordion-panel", ".work-chevron");

    let currentProjectIndex = 0;
    const projectCards = document.querySelectorAll('.click-card');
    
    projectCards.forEach((card, index) => {
        card.setAttribute('data-index', index);
        card.addEventListener('click', () => {
            currentProjectIndex = index;
            populateProjectModal();
            openSubpage(null, 'project-modal');
        });
    });

    function populateProjectModal() {
        const card = projectCards[currentProjectIndex];
        document.getElementById('modal-project-title').textContent = card.getAttribute('data-title');
        document.getElementById('modal-project-desc').textContent = card.getAttribute('data-desc');
        document.getElementById('modal-project-link').href = card.getAttribute('data-link');
    }

    const nextProjectBtn = document.getElementById('next-project-btn');
    if(nextProjectBtn) {
        nextProjectBtn.addEventListener('click', () => {
            const modalInner = document.getElementById('project-modal-inner');
            modalInner.style.transition = "opacity 0.3s ease";
            modalInner.style.opacity = "0";
            
            setTimeout(() => {
                currentProjectIndex = (currentProjectIndex + 1) % projectCards.length;
                populateProjectModal();
                modalInner.style.opacity = "1";
            }, 300);
        });
    }

    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            document.getElementById('modal-cert-title').textContent = card.getAttribute('data-title');
            document.getElementById('modal-cert-img').src = card.getAttribute('data-img');
            document.getElementById('modal-cert-desc').textContent = card.getAttribute('data-desc');
            openSubpage(null, 'cert-modal');
        });
    });

});

function openSubpage(event, id) {
    if (event) event.preventDefault();
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.style.display = 'flex';
        const innerContent = targetModal.querySelector('.modal-content');
        if(innerContent) innerContent.style.opacity = "1";
        
        setTimeout(() => {
            targetModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 20);
    }
}

function closeSubpage(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.classList.remove('active');
        setTimeout(() => {
            targetModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 500);
    }
}
