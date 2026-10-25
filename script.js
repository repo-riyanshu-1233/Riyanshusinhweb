document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.getElementById("custom-cursor");
    const cursorBlur = document.getElementById("custom-cursor-blur");

    if (cursorDot && cursorBlur && window.innerWidth > 968) {
        window.addEventListener("mousemove", (event) => {
            const posX = event.clientX;
            const posY = event.clientY;

            cursorDot.style.transform = `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;

            cursorBlur.style.transform = `translate3d(${posX - 19}px, ${posY - 19}px, 0)`;
        });

        document.querySelectorAll("a, button, .project-card, .tab-btn").forEach((item) => {
            item.addEventListener("mouseenter", () => {
                cursorBlur.style.width = "55px";
                cursorBlur.style.height = "55px";
                cursorBlur.style.borderColor = "var(--primary-brand)";
                cursorBlur.style.backgroundColor = "rgba(128, 48, 64, 0.08)";
            });

            item.addEventListener("mouseleave", () => {
                cursorBlur.style.width = "38px";
                cursorBlur.style.height = "38px";
                cursorBlur.style.borderColor = "var(--accent-color)";
                cursorBlur.style.backgroundColor = "transparent";
            });
        });
    }

    const textLayers = document.querySelectorAll(".role-text-loop");

    let activeTextIndex = 0;

    function cycleRoles() {
        if (textLayers.length === 0) {
            return;
        }

        const currentLayer = textLayers[activeTextIndex];

        currentLayer.style.opacity = "0";

        currentLayer.style.transform = window.innerWidth <= 968
            ? "translate(-50%, -20px)"
            : "translateY(-20px)";

        setTimeout(() => {
            currentLayer.classList.remove("visible");

            activeTextIndex = (activeTextIndex + 1) % textLayers.length;

            const nextLayer = textLayers[activeTextIndex];

            nextLayer.style.transform = window.innerWidth <= 968
                ? "translate(-50%, 20px)"
                : "translateY(20px)";

            nextLayer.style.opacity = "0";

            nextLayer.classList.add("visible");

            void nextLayer.offsetWidth;

            nextLayer.style.opacity = "1";

            nextLayer.style.transform = window.innerWidth <= 968
                ? "translate(-50%, 0)"
                : "translateY(0)";
        }, 500);
    }

    if (textLayers.length > 0) {
        setInterval(cycleRoles, 2500);
    }

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");

                if (entry.target.id === "knowledge") {
                    animateProgressBars();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll(".fade-section").forEach((section) => {
        observer.observe(section);
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;

            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (event) {
            const hrefAttr = this.getAttribute("href");

            if (hrefAttr !== "#" && document.querySelector(hrefAttr)) {
                event.preventDefault();

                document.querySelector(hrefAttr).scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    createSecurityToastElement();

    const modal = document.getElementById("projectModal");

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    const emailButton = document.querySelector('.contact-box a[href^="mailto:"]');

    if (emailButton) {
        emailButton.addEventListener("click", async (event) => {
            event.preventDefault();

            try {
                await navigator.clipboard.writeText("riyanshusinh@gmail.com");

                emailButton.innerHTML = 'Email Copied <i class="fas fa-check"></i>';

                setTimeout(() => {
                    emailButton.innerHTML = 'Copy Email <i class="far fa-copy"></i>';
                }, 2000);
            } catch (error) {
                window.location.href = "mailto:riyanshusinh@gmail.com";
            }
        });
    }
});


function createSecurityToastElement() {
    if (!document.getElementById("security-toast")) {
        const toast = document.createElement("div");

        toast.id = "security-toast";
        toast.textContent = "Website is protected";

        document.body.appendChild(toast);
    }
}


function showSecurityToast() {
    const toast = document.getElementById("security-toast");

    if (toast) {
        toast.classList.add("show");

        clearTimeout(toast.hideTimeout);

        toast.hideTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 1500);
    }
}


document.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    showSecurityToast();
});


document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
        event.preventDefault();

        showSecurityToast();
    }

    if (event.ctrlKey && ["u", "s"].includes(event.key.toLowerCase())) {
        event.preventDefault();

        showSecurityToast();
    }

    if (event.key === "F12") {
        event.preventDefault();

        showSecurityToast();
    }
});


function animateProgressBars() {
    document.querySelectorAll(".progress-bar-fill").forEach((bar) => {
        const targetWidth = bar.getAttribute("data-width");

        bar.style.width = targetWidth;
    });
}


function switchTab(tab, btn) {
    const langTab = document.getElementById("lang-tab");
    const skillTab = document.getElementById("skill-tab");

    if (!langTab || !skillTab || !btn) {
        return;
    }

    document.querySelectorAll(".tab-btn").forEach((button) => {
        button.classList.remove("active");
    });

    btn.classList.add("active");

    if (tab === "lang") {
        skillTab.style.display = "none";
        langTab.style.display = "grid";

        animateProgressBars();
    } else {
        langTab.style.display = "none";
        skillTab.style.display = "grid";

        animateProgressBars();
    }
}


let activeItems = [];
let currentIndex = 0;


const projCards = document.querySelectorAll(".proj-card-item");
const certCards = document.querySelectorAll(".cert-card-item");


projCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        activeItems = Array.from(projCards);

        currentIndex = index;

        openModalFromActive();
    });
});


certCards.forEach((card, index) => {
    card.addEventListener("click", () => {
        activeItems = Array.from(certCards);

        currentIndex = index;

        openModalFromActive();
    });
});


function openModalFromActive() {
    if (activeItems.length === 0) {
        return;
    }

    updateModalContent();

    const modal = document.getElementById("projectModal");

    if (modal) {
        modal.classList.add("active");

        document.body.style.overflow = "hidden";
    }
}


function updateModalContent() {
    const card = activeItems[currentIndex];

    if (!card) {
        return;
    }

    document.getElementById("m-title").textContent =
        card.getAttribute("data-title") || "";

    document.getElementById("m-desc").textContent =
        card.getAttribute("data-desc") || "";

    document.getElementById("m-img").src =
        card.getAttribute("data-img") || "";

    const linkBtn = document.getElementById("m-link");
    const linkVal = card.getAttribute("data-link");

    if (linkVal && linkVal !== "#" && linkVal !== "null") {
        linkBtn.style.display = "inline-flex";
        linkBtn.href = linkVal;
        linkBtn.target = "_blank";
        linkBtn.rel = "noopener noreferrer";
    } else {
        linkBtn.style.display = "none";
        linkBtn.removeAttribute("href");
    }
}


function nextItem() {
    if (activeItems.length === 0) {
        return;
    }

    currentIndex = (currentIndex + 1) % activeItems.length;

    const modalBox = document.querySelector(".modal-box");

    if (!modalBox) {
        return;
    }

    modalBox.style.opacity = "0";

    setTimeout(() => {
        updateModalContent();

        modalBox.style.opacity = "1";
    }, 300);
}


function closeModal() {
    const modal = document.getElementById("projectModal");

    if (modal) {
        modal.classList.remove("active");

        document.body.style.overflow = "";
    }
}