/* =========================================================
   SYED MOHIB ABBAS — PORTFOLIO
   Static GitHub Pages version
   Static GitHub Pages version.
========================================================= */

const root = document.documentElement;

/* =========================================================
   THEME
========================================================= */

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light" || savedTheme === "dark") {
  root.dataset.theme = savedTheme;
}

function updateThemeButton() {
  if (!themeToggle) return;

  const light = root.dataset.theme === "light";

  themeToggle.setAttribute("aria-pressed", String(light));
  themeToggle.setAttribute(
    "aria-label",
    light ? "Switch to dark theme" : "Switch to light theme"
  );

  const icon = themeToggle.querySelector(".theme-icon");
  if (icon) icon.textContent = light ? "☾" : "☼";
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  root.dataset.theme =
    root.dataset.theme === "light" ? "dark" : "light";

  localStorage.setItem("portfolio-theme", root.dataset.theme);

  const icon = themeToggle.querySelector(".theme-icon");

  if (icon) {
    icon.style.transform = "rotate(180deg) scale(.65)";

    setTimeout(() => {
      icon.style.transform = "";
      updateThemeButton();
    }, 220);
  }
});

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  if (!nav) return;

  const open = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   NAVIGATION OBSERVER
========================================================= */

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach(section => navObserver.observe(section));
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(element => revealObserver.observe(element));
} else {
  revealItems.forEach(element => element.classList.add("visible"));
}

/* =========================================================
   MODAL SYSTEM
========================================================= */

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  if (!document.querySelector(".modal.open")) {
    document.body.classList.remove("modal-open");
  }
}

document.querySelectorAll(".modal-close, .modal-backdrop").forEach(el => {
  el.addEventListener("click", () => {
    closeModal(el.closest(".modal"));
  });
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  document.querySelectorAll(".modal.open").forEach(closeModal);
});

const hireMeButton = document.getElementById("hireMeButton");
const hireModal = document.getElementById("hireModal");
hireMeButton?.addEventListener("click", () => openModal(hireModal));

document.querySelectorAll(".social").forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.remove("is-looping");
    void icon.offsetWidth;
    icon.classList.add("is-looping");
  });
});

/* =========================================================
   PRESS / TAP ANIMATION
========================================================= */

const pressSelector =
  ".btn, .text-button, .card-link, .filter, .skill-action, " +
  ".certificate-action, .social, .tool-action, .back-top";

document.addEventListener("pointerdown", event => {
  const target = event.target.closest(pressSelector);
  if (target) target.classList.add("pressed");
});

document.addEventListener("pointerup", event => {
  const target = event.target.closest(pressSelector);
  if (!target) return;

  setTimeout(() => target.classList.remove("pressed"), 120);
});

document.addEventListener("pointercancel", event => {
  const target = event.target.closest(pressSelector);
  if (target) target.classList.remove("pressed");
});

/* =========================================================
   SERVICE FILTERS
========================================================= */

const filters = document.querySelectorAll(".filter");
const serviceCards = document.querySelectorAll(".service-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");

    const selected = filter.dataset.filter;

    serviceCards.forEach(card => {
      const hidden =
        selected !== "all" &&
        card.dataset.category !== selected;

      card.classList.toggle("is-hidden", hidden);
    });
  });
});

/* =========================================================
   TOOL LINKS
   Official links open in a new tab.
========================================================= */

const toolLinks = {
  "Photoshop": "https://www.adobe.com/products/photoshop.html",
  "Illustrator": "https://www.adobe.com/products/illustrator.html",
  "Canva": "https://www.canva.com/",
  "Premiere Pro": "https://www.adobe.com/products/premiere.html",
  "Meta Ads": "https://www.facebook.com/business/ads",
  "Google Tools": "https://ads.google.com/"
};

document.querySelectorAll(".tool-action").forEach(button => {
  button.setAttribute("title", "Open official website");

  button.addEventListener("click", () => {
    const name = button.dataset.tool;
    const url = toolLinks[name];

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });

  button.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    button.click();
  });
});

/* =========================================================
   FILE VIEWER
========================================================= */

const fileViewerModal = document.getElementById("fileViewerModal");
const fileViewerTitle = document.getElementById("fileViewerTitle");
const fileViewerBody = document.getElementById("fileViewerBody");
const fileOpenExternal = document.getElementById("fileOpenExternal");

function showFilePlaceholder(title, path, kind = "FILE") {
  if (!fileViewerBody) return;

  fileViewerBody.innerHTML = `
    <div class="file-placeholder">
      <span class="mini-icon">${kind === "CERTIFICATE" ? "▣" : "FILE"}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>
        Placeholder is ready. Add your real file at:
        <br><b>${escapeHtml(path)}</b>
      </small>
    </div>
  `;

  if (fileOpenExternal) {
    fileOpenExternal.href = path;
    fileOpenExternal.style.display = "inline-flex";
    fileOpenExternal.textContent = "Open original ↗";
  }
}

function openFileViewer(url, fileName = "Portfolio file", kind = "FILE") {
  if (!fileViewerModal || !fileViewerBody) return;

  if (fileViewerTitle) {
    fileViewerTitle.textContent = fileName;
  }

  fileViewerBody.innerHTML = "";

  if (!url) {
    showFilePlaceholder(fileName, "Add your file path here", kind);
    openModal(fileViewerModal);
    return;
  }

  if (fileOpenExternal) {
    fileOpenExternal.href = url;
    fileOpenExternal.style.display = "inline-flex";
  }

  const lower = url.toLowerCase();

  if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(lower)) {
    const image = document.createElement("img");

    image.className = "file-preview-image";
    image.src = url;
    image.alt = fileName;

    image.onerror = () => {
      showFilePlaceholder(fileName, url, kind);
    };

    fileViewerBody.appendChild(image);
  } else if (/\.pdf$/i.test(lower)) {
    const frame = document.createElement("iframe");

    frame.className = "file-preview-frame";
    frame.src = url;
    frame.title = fileName;

    frame.onerror = () => {
      showFilePlaceholder(fileName, url, kind);
    };

    fileViewerBody.appendChild(frame);
  } else {
    fileViewerBody.innerHTML = `
      <div class="file-placeholder">
        <strong>${escapeHtml(fileName)}</strong>
        <small>Use the Open original button to view this document.</small>
      </div>
    `;
  }

  openModal(fileViewerModal);
}

/* =========================================================
   SERVICE DETAILS
   These are local placeholders. Replace/add real work files
   in the HTML service-media blocks when ready.
========================================================= */

const serviceDescriptions = {
  "YouTube Thumbnails":
    "Eye-catching thumbnail designs for YouTube videos and channels.",
  "Logo Design":
    "Professional logo concepts and brand identity work.",
  "Passport Size Photo Editing":
    "Clean, professional and high-quality photo editing.",
  "YouTube Automation":
    "Channel workflow, production support and repeatable content systems.",
  "Social Media Designs":
    "Posts, banners and creative assets for social platforms.",
  "SEO Optimization":
    "On-page SEO, keyword research and search visibility support."
};

document.querySelectorAll(".service-card").forEach(card => {
  const button = card.querySelector(".card-link");

  button?.addEventListener("click", event => {
    event.preventDefault();

    const title =
      card.querySelector("h3")?.textContent?.trim() || "Service";

    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const resources = document.getElementById("modalResources");

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = title;

    if (modalText) {
      modalText.textContent =
        serviceDescriptions[title] ||
        "Portfolio work and information for this service.";
    }

    if (resources) {
      resources.innerHTML = `
        <div class="file-placeholder">
          <strong>ADD YOUR WORK HERE</strong>
          <small>
            Add your project image, PDF or portfolio link in this service's
            HTML block. The card layout will keep the media area at the same size.
          </small>
        </div>
      `;
    }

    openModal(modal);
  });
});

/* =========================================================
   SKILL CARDS
========================================================= */

document.querySelectorAll(".skill-action").forEach(card => {
  card.addEventListener("click", () => {
    const title =
      card.querySelector("h3")?.textContent?.trim() || "Skill";

    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const resources = document.getElementById("modalResources");

    if (!modal) return;

    if (modalTitle) modalTitle.textContent = title;

    if (modalText) {
      modalText.textContent =
        card.dataset.skillDescription ||
        "Portfolio samples and links for this skill.";
    }

    if (resources) {
      resources.innerHTML = `
        <div class="file-placeholder">
          <strong>ADD PORTFOLIO LINK / SAMPLE</strong>
          <small>
            Add your real portfolio URL or local sample file here later.
          </small>
        </div>
      `;
    }

    openModal(modal);
  });

  card.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    card.click();
  });
});

/* =========================================================
   CERTIFICATES
   Click a certificate → real file if present, otherwise a
   clean placeholder explaining exactly where to add it.
========================================================= */

const certificateCards = document.querySelectorAll(".certificate-action");

certificateCards.forEach(card => {
  card.addEventListener("click", () => {
    const title =
      card.dataset.certificate ||
      card.querySelector("b")?.textContent?.trim() ||
      "Certificate";

    const file =
      card.dataset.file ||
      "";

    openFileViewer(file, title, "CERTIFICATE");
  });

  card.addEventListener("keydown", event => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    card.click();
  });
});

const viewCertificates = document.getElementById("viewCertificates");

viewCertificates?.addEventListener("click", () => {
  const modal = document.getElementById("certificateModal");
  const gallery = document.getElementById("certificateGallery");

  if (!modal || !gallery) return;

  gallery.innerHTML = "";

  certificateCards.forEach(card => {
    const title =
      card.dataset.certificate ||
      card.querySelector("b")?.textContent?.trim() ||
      "Certificate";

    const file = card.dataset.file || "";

    const item = document.createElement("button");
    item.type = "button";
    item.className = "certificate-placeholder";
    item.innerHTML = `
      <span>CERTIFICATE</span>
      <small>${escapeHtml(title)}</small>
      <small>Tap to open</small>
    `;

    item.addEventListener("click", () => {
      closeModal(modal);
      openFileViewer(file, title, "CERTIFICATE");
    });

    gallery.appendChild(item);
  });

  openModal(modal);
});

/* =========================================================
   CV
========================================================= */

const downloadCV = document.getElementById("downloadCV");

downloadCV?.addEventListener("click", () => {
  const cvPath = "assets/documents/Syed-Mohib-Abbas-CV.pdf";

  const link = document.createElement("a");
  link.href = cvPath;
  link.download = "Syed-Mohib-Abbas-CV.pdf";
  link.target = "_blank";
  link.rel = "noopener";

  document.body.appendChild(link);
  link.click();
  link.remove();
});

/* =========================================================
   LEARN MORE
========================================================= */

const learnMore = document.getElementById("learnMore");

learnMore?.addEventListener("click", () => {
  const modal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const resources = document.getElementById("modalResources");

  if (!modal) return;

  if (modalTitle) modalTitle.textContent = "About Me";

  if (modalText) {
    modalText.textContent =
      "Graphic design, digital marketing and SEO work focused on practical, clean and useful results.";
  }

  if (resources) {
    resources.innerHTML = `
      <div class="file-placeholder">
        <strong>PORTFOLIO PROFILE</strong>
        <small>
          Replace this section with any additional profile document,
          introduction PDF or portfolio link you want to show.
        </small>
      </div>
    `;
  }

  openModal(modal);
});

/* =========================================================
   BACK TO TOP
========================================================= */

const backTop = document.querySelector(".back-top");

window.addEventListener(
  "scroll",
  () => {
    if (!backTop) return;

    backTop.classList.toggle("show", window.scrollY > 500);
  },
  { passive: true }
);

backTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================================================
   HELPER
========================================================= */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   SERVICE IMAGE AUTO-LOADER
   If you create the path stored in data-image-slot, the
   image is loaded automatically. Otherwise the placeholder
   remains visible.
========================================================= */

document.querySelectorAll(".service-media[data-image-slot]").forEach(media => {
  const path = media.dataset.imageSlot;

  if (!path) return;

  const image = new Image();

  image.className = "service-image";
  image.alt = "Portfolio work";
  image.src = path;

  image.onload = () => {
    media.innerHTML = "";
    media.appendChild(image);
  };

  image.onerror = () => {
    /* Keep the HTML placeholder visible. */
  };
});

/* =========================================================
   READY
========================================================= */

document.body.classList.add("js-ready");
console.log("Portfolio initialized — static GitHub Pages mode.");
