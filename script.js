// TYPING ANIMATION
const roles = [
"Video Editor",
"Web Developer",
"Game Developer",
"Photographer",
"Videographer"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
    current = roles[i];

    if (isDeleting) {
        j--;
    } else {
        j++;
    }

    document.getElementById("typing").innerHTML =
        "I am " + current.substring(0, j);

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(type, 1000);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();

// PROJECT LINK
function openProject(link) {
    window.open(link, "_blank");
}

// GOOGLE DRIVE
function openDrive() {
    window.open("https://drive.google.com", "_blank");
}