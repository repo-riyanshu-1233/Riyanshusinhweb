document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.getElementById("custom-cursor");
    const cursorBlur = document.getElementById("custom-cursor-blur");

    if (cursorDot && cursorBlur && window.innerWidth > 968) {
        window.addEventListener("mousemove", (event) => {
            const posX = event.clientX;
            const posY = event.clientY;

            cursorDot.style.transform =
                `translate3d(${posX - 3}px, ${posY - 3}px, 0)`;

            cursorBlur.style.transform =
                `translate3d(${posX - 19}px, ${posY - 19}px, 0)`;
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
        if (!textLayers.length) {
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

    if (textLayers.length > 1) {
        setInterval(cycleRoles, 2500);
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appear");

                    if (entry.target.id === "knowledge") {
                        animateProgressBars();
                    }
                }
            });
        }, {
            root: null,
            threshold: 0.15
        });

        document.querySelectorAll(".fade-section").forEach((section) => {
            observer.observe(section);
        });
    } else {
        document.querySelectorAll(".fade-section").forEach((section) => {
            section.classList.add("appear");
        });
    }

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".sidebar-nav a");

    function updateActiveNavigation() {
        let current = "";

        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 150) {
                current = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (targetId && targetId !== "#") {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    createSecurityToastElement();

    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("m-title");
    const modalDescription = document.getElementById("m-desc");
    const modalImage = document.getElementById("m-img");
    const modalLink = document.getElementById("m-link");
    const modalBox = document.querySelector(".modal-box");

    let activeItems = [];
    let currentIndex = 0;

    function updateModalContent() {
        const card = activeItems[currentIndex];

        if (!card || !modalTitle || !modalDescription || !modalImage) {
            return;
        }

        modalTitle.textContent = card.dataset.title || "";
        modalDescription.textContent = card.dataset.desc || "";

        const imagePath = card.dataset.img || "";

        modalImage.src = imagePath;
        modalImage.alt = card.dataset.title || "Project preview";

        if (modalLink) {
            const linkValue = card.dataset.link || "";

            if (
                linkValue &&
                linkValue !== "#" &&
                linkValue !== "null"
            ) {
                modalLink.href = linkValue;
                modalLink.target = "_blank";
                modalLink.rel = "noopener noreferrer";
                modalLink.style.display = "inline-flex";
            } else {
                modalLink.removeAttribute("href");
                modalLink.style.display = "none";
            }
        }
    }

    function openModal(cards, index) {
        if (!modal || !cards.length) {
            return;
        }

        activeItems = cards;
        currentIndex = index;

        updateModalContent();

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) {
            return;
        }

        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    function nextItem() {
        if (!activeItems.length) {
            return;
        }

        currentIndex = (currentIndex + 1) % activeItems.length;

        if (modalBox) {
            modalBox.style.opacity = "0";
        }

        setTimeout(() => {
            updateModalContent();

            if (modalBox) {
                modalBox.style.opacity = "1";
            }
        }, 200);
    }

    const projectCards = Array.from(
        document.querySelectorAll(".proj-card-item")
    );

    const certificateCards = Array.from(
        document.querySelectorAll(".cert-card-item")
    );

    projectCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            openModal(projectCards, index);
        });
    });

    certificateCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            openModal(certificateCards, index);
        });
    });

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    window.closeModal = closeModal;
    window.nextItem = nextItem;

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    const emailButton = document.querySelector(
        '.contact-box a[href^="mailto:"]'
    );

    if (emailButton) {
        emailButton.addEventListener("click", async (event) => {
            event.preventDefault();

            const email = "riyanshusinh@gmail.com";

            try {
                if (!navigator.clipboard || !navigator.clipboard.writeText) {
                    throw new Error("Clipboard unavailable");
                }

                await navigator.clipboard.writeText(email);

                emailButton.innerHTML =
                    'Email Copied <i class="fas fa-check"></i>';

                setTimeout(() => {
                    emailButton.innerHTML =
                        'Copy Email <i class="far fa-copy"></i>';
                }, 2000);
            } catch (error) {
                window.location.href = `mailto:${email}`;
            }
        });
    }

    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        showSecurityToast();
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.ctrlKey &&
            ["c", "u", "s"].includes(event.key.toLowerCase())
        ) {
            event.preventDefault();
            showSecurityToast();
        }

        if (event.key === "F12") {
            event.preventDefault();
            showSecurityToast();
        }
    });
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

    if (!toast) {
        return;
    }

    toast.classList.add("show");

    clearTimeout(toast.hideTimeout);

    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 1500);
}


function animateProgressBars() {
    document.querySelectorAll(".progress-bar-fill").forEach((bar) => {
        bar.style.width = bar.getAttribute("data-width") || "0%";
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
        langTab.style.display = "grid";
        skillTab.style.display = "none";
    } else {
        langTab.style.display = "none";
        skillTab.style.display = "grid";
    }

    animateProgressBars();
}