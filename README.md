# 🌍 Wanderlust – Travel Recommendation Web Application

A modern, responsive travel recommendation web application that allows users to explore beaches, temples, and countries with beautiful imagery and detailed descriptions.

---

## 📁 Project Structure

```
travel-recommendation-web-app/
├── index.html          ← Home page (hero, search, default recommendations)
├── about.html          ← About Us page (team, mission, values)
├── contact.html        ← Contact Us page (form, company info)
├── css/
│   └── style.css       ← All styling (variables, layouts, animations, responsive)
├── js/
│   └── script.js       ← Search logic, navigation, contact form handler
├── images/
│   ├── hero-bg.jpg     ← Hero background image
│   ├── bondi1.jpg      ← Bondi Beach image 1
│   ├── bondi2.jpg      ← Bondi Beach image 2
│   ├── maldives1.jpg   ← Maldives image 1
│   ├── maldives2.jpg   ← Maldives image 2
│   ├── angkor1.jpg     ← Angkor Wat image 1
│   ├── angkor2.jpg     ← Angkor Wat image 2
│   ├── borobudur1.jpg  ← Borobudur image 1
│   ├── borobudur2.jpg  ← Borobudur image 2
│   ├── japan1.jpg      ← Japan image 1
│   ├── japan2.jpg      ← Japan image 2
│   ├── italy1.jpg      ← Italy image 1
│   └── italy2.jpg      ← Italy image 2
└── README.md
```

---

## 🚀 Features

- **3-page layout**: Home, About Us, Contact Us
- **Fixed glassmorphic navbar** that shrinks on scroll
- **Search system** with category-matching logic
- **Dynamic results grid** with 2 images per destination card
- **Clear button** that resets search and restores defaults
- **Cross-page search** — searching on About/Contact redirects to Home
- **Contact form** with validation and success toast notification
- **Responsive design** — works on mobile, tablet, and desktop
- **Smooth animations** — fade-in, hover card lift, button scale
- **Custom scrollbar** styling
- **Footer** with links, social icons, and newsletter form

---

## 🔎 Search Keywords

| Input | Results |
|---|---|
| `beach` or `beaches` | Bondi Beach, Maldives |
| `temple` or `temples` | Angkor Wat, Borobudur |
| `country` or `countries` | Japan, Italy |
| `japan` | Japan |
| `italy` | Italy |
| `cambodia` | Angkor Wat |
| `indonesia` | Borobudur |
| `australia` | Bondi Beach |
| `maldives` | Maldives |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Color | `#0f172a` (Deep Navy) |
| Secondary Color | `#0284c7` (Ocean Blue) |
| Accent Color | `#f59e0b` (Sunlit Gold) |
| Typography | Inter + Outfit (Google Fonts) |
| Border Radius | 8px – 20px range |
| Transitions | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 🛠️ Technology Stack

- **HTML5** – Semantic markup
- **Vanilla CSS** – Custom properties, CSS Grid, Flexbox, Keyframe animations
- **Vanilla JavaScript** – No frameworks or dependencies
- **Google Fonts** – Inter & Outfit typefaces
- **Image Sources** – AI-generated (hero + beaches) + Unsplash (temples + countries)

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full desktop layout |
| `≤ 768px` | Mobile menu drawer, stacked grids |
| `≤ 480px` | Single-column layout |

---

## 🏁 How to Run

Simply open `index.html` in any modern browser. No build step or server required.

```
Double-click index.html
```

---

## 📄 Pages Overview

### Home (`index.html`)
- Hero banner with tagline and scroll CTA
- Search bar (categories or destination name)
- Dynamic search results grid
- Default popular destinations showcase
- Full footer

### About Us (`about.html`)
- Page hero banner
- Mission statement and company philosophy
- Live statistics (10k+ travelers, 45+ countries)
- Team member cards (John Doe, Sarah Jenkins, David Chen)
- Core values section

### Contact Us (`contact.html`)
- Page hero banner
- Two-column layout (info panel + form)
- Company email, phone, address
- Social media links
- Contact form with client-side validation
- Toast notification on submission

---

*Built with ❤️ by the Wanderlust Team · 2026*
