document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       1. Smooth Scroll for Navigation Links
    ========================================== */
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    /* =========================================
       2. Scroll Reveal Animation
    ========================================== */
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.15 };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => appearOnScroll.observe(fader));

    /* =========================================
       3. Dark Mode Toggle (with persistence)
    ========================================== */
    const toggleBtn = document.getElementById("darkModeToggle");

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            if (toggleBtn) toggleBtn.textContent = "☀ Light Mode";
        } else {
            document.body.classList.remove("dark-mode");
            if (toggleBtn) toggleBtn.textContent = "🌙 Dark Mode";
        }
    }

    // Load saved theme on page load
    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "dark");

    // Toggle on button click
    if (toggleBtn) {
        toggleBtn.addEventListener("click", function () {
            const isDark = !document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            applyTheme(isDark);
        });
    }

    /* =========================================
       4. Navbar Active Link Highlight on Scroll
    ========================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active-link");
            }
        });
    });

});
