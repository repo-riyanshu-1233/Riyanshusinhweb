let activeItems = [];
let currentIndex = 0;

function createSecurityToastElement() {
    if (!document.getElementById('security-toast')) {
        const toast = document.createElement('div');
        toast.id = 'security-toast';
        toast.textContent = 'Website is protected';
        document.body.appendChild(toast);
    }
}

function showSecurityToast() {
    const toast = document.getElementById('security-toast');
    if (toast) {
        toast.classList.add('show');
        clearTimeout(toast.hideTimeout);
        toast.hideTimeout = setTimeout(() => toast.classList.remove('show'), 1500);
    }
}

function animateProgressBars() {
    document.querySelectorAll('.progress-bar-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') || '0%';
    });
}

function switchTab(tab, btn) {
    const langTab = document.getElementById('lang-tab');
    const skillTab = document.getElementById('skill-tab');
    if (!langTab || !skillTab || !btn) return;

    document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));
    btn.classList.add('active');

    const showLanguages = tab === 'lang';
    const hideTab = showLanguages ? skillTab : langTab;
    const showTab = showLanguages ? langTab : skillTab;

    hideTab.style.opacity = '0';
    setTimeout(() => {
        hideTab.style.display = 'none';
        showTab.style.display = 'grid';
        showTab.style.opacity = '1';
        animateProgressBars();
    }, 200);
}

function openModalFromActive() {
    if (!activeItems.length || !activeItems[currentIndex]) return;
    updateModalContent();
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateModalContent() {
    const card = activeItems[currentIndex];
    if (!card) return;

    const title = document.getElementById('m-title');
    const desc = document.getElementById('m-desc');
    const img = document.getElementById('m-img');
    const linkBtn = document.getElementById('m-link');
    if (!title || !desc || !img || !linkBtn) return;

    title.textContent = card.getAttribute('data-title') || '';
    desc.textContent = card.getAttribute('data-desc') || '';
    img.src = card.getAttribute('data-img') || '';
    img.alt = card.getAttribute('data-title') || 'Portfolio item';

    const linkVal = (card.getAttribute('data-link') || '').trim();
    if (linkVal && linkVal !== '#' && linkVal.toLowerCase() !== 'null') {
        linkBtn.style.display = 'inline-flex';
        linkBtn.href = linkVal;
        linkBtn.target = '_blank';
        linkBtn.rel = 'noopener noreferrer';
    } else {
        linkBtn.style.display = 'none';
        linkBtn.removeAttribute('href');
    }
}

function nextItem() {
    if (!activeItems.length) return;
    currentIndex = (currentIndex + 1) % activeItems.length;
    const modalBox = document.querySelector('.modal-box');
    if (!modalBox) {
        updateModalContent();
        return;
    }
    modalBox.style.opacity = '0';
    setTimeout(() => {
        updateModalContent();
        modalBox.style.opacity = '1';
    }, 180);
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.getElementById('custom-cursor');
    const cursorBlur = document.getElementById('custom-cursor-blur');

    if (cursorDot && cursorBlur && window.innerWidth > 968) {
        window.addEventListener('mousemove', event => {
            const posX = event.clientX;
            const posY = event.clientY;
            cursorDot.style.transform = `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;
            cursorBlur.animate({ transform: `translate3d(${posX - 18}px, ${posY - 18}px, 0)` }, { duration: 150, fill: 'forwards' });
        });

        document.querySelectorAll('a, button, .project-card, .tab-btn').forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursorBlur.style.width = '52px';
                cursorBlur.style.height = '52px';
                cursorBlur.style.borderColor = 'var(--primary-brand)';
            });
            item.addEventListener('mouseleave', () => {
                cursorBlur.style.width = '36px';
                cursorBlur.style.height = '36px';
                cursorBlur.style.borderColor = 'rgba(242, 226, 205, 0.58)';
            });
        });
    }

    const textLayers = document.querySelectorAll('.role-text-loop');
    let activeTextIndex = 0;

    function cycleRoles() {
        if (!textLayers.length) return;
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

    if (textLayers.length) setInterval(cycleRoles, 2500);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    if (entry.target.id === 'knowledge') animateProgressBars();
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.15 });
        document.querySelectorAll('.fade-section').forEach(section => observer.observe(section));
    } else {
        document.querySelectorAll('.fade-section').forEach(section => section.classList.add('appear'));
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 160) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            const hrefAttr = this.getAttribute('href');
            if (hrefAttr && hrefAttr !== '#') {
                const target = document.querySelector(hrefAttr);
                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    const projectCards = document.querySelectorAll('.proj-card-item');
    const certificateCards = document.querySelectorAll('.cert-card-item');

    projectCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            activeItems = projectCards;
            currentIndex = index;
            openModalFromActive();
        });
    });

    certificateCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            activeItems = certificateCards;
            currentIndex = index;
            openModalFromActive();
        });
    });

    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeModal();
    });

    const emailButton = document.querySelector('.contact-box a[href^="mailto:"]');
    if (emailButton) {
        const originalEmailButtonHTML = emailButton.innerHTML;
        emailButton.addEventListener('click', async event => {
            event.preventDefault();
            try {
                await navigator.clipboard.writeText('riyanshusinh@gmail.com');
                emailButton.innerHTML = 'Email Copied <i class="fas fa-check"></i>';
                setTimeout(() => { emailButton.innerHTML = originalEmailButtonHTML; }, 2000);
            } catch (error) {
                window.location.href = 'mailto:riyanshusinh@gmail.com';
            }
        });
    }

    createSecurityToastElement();
});

document.addEventListener('contextmenu', event => {
    event.preventDefault();
    showSecurityToast();
});

document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && ['c', 'u', 's'].includes(key)) {
        event.preventDefault();
        showSecurityToast();
    }
    if (event.key === 'F12') {
        event.preventDefault();
        showSecurityToast();
    }
});
