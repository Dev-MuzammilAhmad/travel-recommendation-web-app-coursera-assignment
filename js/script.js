/* ==========================================================================
   Travel Recommendation App - JavaScript Controller
   ========================================================================== */

// 1. Predefined Destination Database
const destinations = [
    {
        id: "beach-bondi",
        name: "Bondi Beach, Australia",
        type: "beach",
        description: "Australia's most famous beach with golden sands, perfect surfing waves, and a vibrant coastal lifestyle. Walk along the scenic clifftop path or enjoy a swim in the ocean pool.",
        images: ["images/bondi1.jpg", "images/bondi2.jpg"],
        rating: 4.8,
        keywords: ["australia", "bondi", "beach", "sand", "surf", "ocean"]
    },
    {
        id: "beach-maldives",
        name: "The Maldives",
        type: "beach",
        description: "Pristine white sand beaches with crystal clear turquoise waters, private overwater villas, and rich marine life. The ultimate tropical luxury escape for relaxation.",
        images: ["images/maldives1.jpg", "images/maldives2.jpg"],
        rating: 5.0,
        keywords: ["maldives", "beach", "turquoise", "island", "villa", "snorkeling"]
    },
    {
        id: "temple-angkor",
        name: "Angkor Wat, Cambodia",
        type: "temple",
        description: "The largest religious monument in the world, built in the 12th century. A majestic ancient Khmer stone temple complex surrounded by reflective lotus ponds and lush jungle trees.",
        images: ["images/angkor1.jpg", "images/angkor2.jpg"],
        rating: 4.9,
        keywords: ["cambodia", "angkor", "wat", "temple", "ruins", "history", "ancient"]
    },
    {
        id: "temple-borobudur",
        name: "Borobudur, Indonesia",
        type: "temple",
        description: "A magnificent 9th-century Mahayana Buddhist temple in Java, Indonesia. Features hundreds of intricately carved stone reliefs and stupas rising above the misty tropical valley at sunrise.",
        images: ["images/borobudur1.jpg", "images/borobudur2.jpg"],
        rating: 4.7,
        keywords: ["indonesia", "borobudur", "temple", "buddhist", "java", "ancient", "stupa"]
    },
    {
        id: "country-japan",
        name: "Japan",
        type: "country",
        description: "An extraordinary land where ancient shrines and wooden temples meet futuristic neon skyscrapers, offering seasonal cherry blossoms, high-speed trains, and world-renowned sushi.",
        images: ["images/japan1.jpg", "images/japan2.jpg"],
        rating: 4.9,
        keywords: ["japan", "tokyo", "kyoto", "fuji", "temples", "sushi", "shrine", "cherry blossom"]
    },
    {
        id: "country-italy",
        name: "Italy",
        type: "country",
        description: "Rich in history, art, and legendary cuisine. Explore romantic canals in Venice, ancient Roman ruins, the picturesque Amalfi coast, and taste exquisite pasta and gelato.",
        images: ["images/italy1.jpg", "images/italy2.jpg"],
        rating: 4.9,
        keywords: ["italy", "rome", "venice", "florence", "ruins", "canals", "pizza", "pasta", "colosseum"]
    }
];

// Initialize Application once DOM loads
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initSearch();
    initContactForm();
});

/* ==========================================================================
   Navigation & Global UI Logic
   ========================================================================== */
function initNavigation() {
    // 1. Active Navigation Indicator
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");
    
    navLinks.forEach(link => {
        link.classList.remove("active"); // Clear any hardcoded active
        const linkHref = link.getAttribute("href");
        if (
            linkHref === pageName ||
            (pageName === "" && linkHref === "index.html") ||
            (pageName === "index" && linkHref === "index.html")
        ) {
            link.classList.add("active");
        }
    });

    // 2. Scroll Header Animation
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 3. Responsive Mobile Menu Toggle
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const navList = document.querySelector(".nav-links");
    
    if (menuToggle && navList) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navList.classList.toggle("active");
            const icon = menuToggle.querySelector(".hamburger-icon");
            if (icon) {
                icon.textContent = navList.classList.contains("active") ? "\u2715" : "\u2630";
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove("active");
                const icon = menuToggle.querySelector(".hamburger-icon");
                if (icon) icon.textContent = "\u2630";
            }
        });
    }
}

/* ==========================================================================
   Search Functionality
   ========================================================================== */
function initSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const clearBtn = document.getElementById("clear-btn");
    const searchResultsSection = document.getElementById("search-results-section");
    const searchResultsGrid = document.getElementById("search-results-grid");
    const searchTermsQuery = document.getElementById("search-query-display");
    const defaultSection = document.getElementById("default-recommendations");

    if (!searchInput) return;

    // Trigger search execution
    function executeSearch(query) {
        if (!query || query.trim() === "") {
            return;
        }

        const normalizedQuery = query.toLowerCase().trim();
        let matched = [];

        // 1. Category Matching Rule ("beach", "temple", "country")
        // If query is "beach" or "beaches" -> show all beaches
        if (normalizedQuery === "beach" || normalizedQuery === "beaches") {
            matched = destinations.filter(d => d.type === "beach");
        }
        // If query is "temple" or "temples" -> show all temples
        else if (normalizedQuery === "temple" || normalizedQuery === "temples") {
            matched = destinations.filter(d => d.type === "temple");
        }
        // If query is "country" or "countries" -> show all countries
        else if (normalizedQuery === "country" || normalizedQuery === "countries") {
            matched = destinations.filter(d => d.type === "country");
        }
        // 2. Keyword/Name general matching rule
        else {
            matched = destinations.filter(d => {
                return d.name.toLowerCase().includes(normalizedQuery) ||
                       d.description.toLowerCase().includes(normalizedQuery) ||
                       d.keywords.some(k => k.includes(normalizedQuery));
            });
        }

        // Render Results
        renderSearchResults(matched, query);
    }

    // Render cards to UI
    function renderSearchResults(results, query) {
        if (!searchResultsGrid) return;
        
        searchResultsGrid.innerHTML = "";
        
        if (searchTermsQuery) {
            searchTermsQuery.textContent = `"${query}"`;
        }

        if (results.length === 0) {
            searchResultsGrid.innerHTML = `
                <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <svg style="width: 64px; height: 64px; fill: var(--text-muted); margin-bottom: 16px;" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                    <h3 style="font-size: 1.5rem; margin-bottom: 8px;">No recommendations found</h3>
                    <p style="color: var(--text-muted); max-width: 450px; margin: 0 auto;">
                        We couldn't find matches for "${query}". Try searching for categories like <strong>"beach"</strong>, <strong>"temple"</strong> or specific destinations like <strong>"Japan"</strong> or <strong>"Italy"</strong>.
                    </p>
                </div>
            `;
        } else {
            results.forEach(d => {
                const card = document.createElement("div");
                card.className = "destination-card fade-in";
                card.innerHTML = `
                    <div class="card-images">
                        <span class="card-badge">${d.type}</span>
                        <img src="${d.images[0]}" alt="${d.name} view 1" loading="lazy">
                        <img src="${d.images[1]}" alt="${d.name} view 2" loading="lazy">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${d.name}</h3>
                        <p class="card-desc">${d.description}</p>
                        <div class="card-footer">
                            <span class="card-rating">
                                <i class="fas fa-star">⭐</i> ${d.rating.toFixed(1)}
                            </span>
                            <a href="#" class="card-link" onclick="event.preventDefault(); alert('Redirecting to booking details for ${d.name}!');">
                                Explore <i class="fas fa-arrow-right">→</i>
                            </a>
                        </div>
                    </div>
                `;
                searchResultsGrid.appendChild(card);
            });
        }

        // Show Results Section & hide default recommendations if present
        if (searchResultsSection) {
            searchResultsSection.style.display = "block";
            // Scroll smoothly to results
            searchResultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        
        if (defaultSection) {
            defaultSection.style.display = "none";
        }
    }

    // Reset Search
    function clearSearch() {
        searchInput.value = "";
        if (searchResultsSection) {
            searchResultsSection.style.display = "none";
        }
        if (defaultSection) {
            defaultSection.style.display = "block";
            defaultSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    // Bind Event Listeners
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value;
        const currentPath = window.location.pathname;
        const pageName = currentPath.split("/").pop();
        
        // If search is performed on secondary pages, redirect to Home with query param
        if (pageName !== "index.html" && pageName !== "" && pageName !== "index") {
            window.location.href = `index.html?search=${encodeURIComponent(query)}`;
        } else {
            executeSearch(query);
        }
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const query = searchInput.value;
            const currentPath = window.location.pathname;
            const pageName = currentPath.split("/").pop();
            
            if (pageName !== "index.html" && pageName !== "" && pageName !== "index") {
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            } else {
                executeSearch(query);
            }
        }
    });

    clearBtn.addEventListener("click", clearSearch);

    // Check for query parameters on load (handles redirects from about/contact)
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
        searchInput.value = searchParam;
        executeSearch(searchParam);
        
        // Clear param from URL to keep address bar clean
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById("travel-contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Inputs
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        // Simple validation check
        if (!name || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }

        // Animated response (Create custom notification element)
        showNotification(`Thank you, ${name}! Your travel query has been received. We will contact you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

function showNotification(message) {
    // Check if notification already exists, if not create one
    let toast = document.getElementById("custom-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "custom-toast";
        toast.className = "notification";
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <span class="notification-icon">✔️</span>
        <span class="notification-text">${message}</span>
    `;

    // Trigger reflow & show
    toast.classList.add("show");

    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}
