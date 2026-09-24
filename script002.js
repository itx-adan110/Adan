const root = document.documentElement;

/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL = "https://xfqmyqpdauiawmeculpj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_z97mwHP0wOGu6Qwp5U6tEA_pEKiAup5";

const SUPABASE_READY =
  SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("PASTE_") &&
  !SUPABASE_ANON_KEY.includes("PASTE_");

const sb =
  SUPABASE_READY && window.supabase
    ? window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      )
    : null;

/* =========================================================
   THEME
========================================================= */

const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

function updateThemeButton() {
  if (!themeToggle) return;

  const light = root.dataset.theme === "light";

  themeToggle.setAttribute(
    "aria-pressed",
    String(light)
  );

  themeToggle.setAttribute(
    "aria-label",
    light
      ? "Switch to dark theme"
      : "Switch to light theme"
  );

  const icon = themeToggle.querySelector(".theme-icon");

  if (icon) {
    icon.textContent = light ? "☾" : "☼";
  }
}

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  root.dataset.theme =
    root.dataset.theme === "light"
      ? "dark"
      : "light";

  localStorage.setItem(
    "portfolio-theme",
    root.dataset.theme
  );

  const icon =
    themeToggle.querySelector(".theme-icon");

  if (icon) {
    icon.style.transform =
      "rotate(180deg) scale(.65)";

    setTimeout(() => {
      icon.style.transform = "";
      updateThemeButton();
    }, 220);
  }
});

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
  document.querySelector(".menu-toggle");

const nav =
  document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  if (!nav) return;

  const open =
    nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(open)
  );
});

document
  .querySelectorAll(".nav-link")
  .forEach(link => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });

/* =========================================================
   NAVIGATION OBSERVER
========================================================= */

const sections = [
  ...document.querySelectorAll(
    "main section[id]"
  )
];

const navLinks = [
  ...document.querySelectorAll(".nav-link")
];

if ("IntersectionObserver" in window) {
  const navObserver =
    new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") ===
                `#${entry.target.id}`
            );
          });
        });
      },
      {
        rootMargin:
          "-35% 0px -55% 0px"
      }
    );

  sections.forEach(section =>
    navObserver.observe(section)
  );
}

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12
        }
      )
    : null;

document
  .querySelectorAll(".reveal")
  .forEach(element => {
    if (revealObserver) {
      revealObserver.observe(element);
    } else {
      element.classList.add("visible");
    }
  });

/* =========================================================
   SERVICE FILTERS
========================================================= */

const filters =
  document.querySelectorAll(".filter");

const serviceCards =
  document.querySelectorAll(
    ".service-card"
  );

filters.forEach(filter => {
  filter.addEventListener(
    "click",
    () => {
      filters.forEach(item =>
        item.classList.remove("active")
      );

      filter.classList.add("active");

      const selected =
        filter.dataset.filter;

      serviceCards.forEach(card => {
        const shouldHide =
          selected !== "all" &&
          card.dataset.category !==
            selected;

        card.classList.toggle(
          "is-hidden",
          shouldHide
        );
      });
    }
  );
});

/* =========================================================
   MODAL SYSTEM
========================================================= */

const modalIds = [
  "hireModal",
  "serviceModal",
  "certificateModal",
  "adminModal",
  "fileViewerModal"
];

const getModal = id =>
  document.getElementById(id);

function openModal(modal) {
  if (!modal) return;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "modal-open"
  );
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  if (
    !document.querySelector(
      ".modal.open"
    )
  ) {
    document.body.classList.remove(
      "modal-open"
    );
  }
}

document
  .querySelectorAll(
    ".modal-close, .modal-backdrop"
  )
  .forEach(element => {
    element.addEventListener(
      "click",
      () => {
        closeModal(
          element.closest(".modal")
        );
      }
    );
  });

document.addEventListener(
  "keydown",
  event => {
    if (event.key !== "Escape") return;

    modalIds.forEach(id => {
      closeModal(getModal(id));
    });
  }
);

/* =========================================================
   CONTENT DEFINITIONS
========================================================= */

const serviceDefinitions = [
  ["YouTube Thumbnails", "youtube"],
  ["Logo Design", "graphic"],
  [
    "Passport Size Photo Editing",
    "graphic"
  ],
  ["YouTube Automation", "youtube"],
  ["Social Media Designs", "marketing"],
  ["SEO Optimization", "seo"]
];

const skillDefinitions = [
  "Graphic Designing",
  "Digital Marketing",
  "SEO"
];

const toolDefinitions = [
  "Photoshop",
  "Illustrator",
  "Canva",
  "Premiere Pro",
  "Meta Ads",
  "Google Tools"
];

const serviceParentKeys =
  serviceDefinitions.map(
    ([title]) => title
  );

const skillParentKeys =
  skillDefinitions.map(
    title => `skill:${title}`
  );

const toolParentKeys =
  toolDefinitions.map(
    title => `tool:${title}`
  );

/* =========================================================
   BASIC HELPERS
========================================================= */

function setStatus(
  element,
  message,
  error = false
) {
  if (!element) return;

  element.textContent =
    message || "";

  element.classList.toggle(
    "error",
    error
  );
}

function safeUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(
      value,
      window.location.href
    );

    if (
      !["http:", "https:"].includes(
        url.protocol
      )
    ) {
      return "";
    }

    return url.href;
  } catch {
    return "";
  }
}

function fileUrl(path) {
  if (!sb || !path) return "";

  const result =
    sb.storage
      .from("portfolio-files")
      .getPublicUrl(path);

  return result?.data?.publicUrl || "";
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";

  const units = [
    "B",
    "KB",
    "MB",
    "GB"
  ];

  const index = Math.min(
    Math.floor(
      Math.log(bytes) /
        Math.log(1024)
    ),
    units.length - 1
  );

  return `${(
    bytes /
    Math.pow(1024, index)
  ).toFixed(index ? 1 : 0)} ${
    units[index]
  }`;
}

function slug(value) {
  return (
    String(value || "")
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /(^-|-$)/g,
        ""
      ) || "file"
  );
}

function makeId() {
  if (
    window.crypto &&
    typeof window.crypto.randomUUID ===
      "function"
  ) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

/* =========================================================
   PUBLIC SERVICE / RESOURCE DATA
========================================================= */

let remoteResources = [];
let remoteCertificates = [];

async function loadRemoteResources() {
  if (!sb) return [];

  const { data, error } = await sb
    .from("portfolio_resources")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    console.warn(
      "Resources could not be loaded:",
      error.message
    );
    return [];
  }

  remoteResources = data || [];
  return remoteResources;
}

async function loadRemoteCertificates() {
  if (!sb) return [];

  const { data, error } = await sb
    .from("portfolio_certificates")
    .select("*")
    .order("created_at", {
      ascending: false
    });

  if (error) {
    console.warn(
      "Certificates could not be loaded:",
      error.message
    );
    return [];
  }

  remoteCertificates = data || [];
  return remoteCertificates;
}

/* =========================================================
   RESOURCE VIEWER
========================================================= */

function openFileViewer(
  url,
  fileName = "Portfolio file"
) {
  const modal =
    document.getElementById(
      "fileViewerModal"
    );

  const title =
    document.getElementById(
      "fileViewerTitle"
    );

  const body =
    document.getElementById(
      "fileViewerBody"
    );

  const external =
    document.getElementById(
      "fileViewerExternal"
    );

  if (!modal || !body) {
    if (url) {
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
    }

    return;
  }

  if (title) {
    title.textContent = fileName;
  }

  if (external) {
    external.href = url || "#";
    external.style.display =
      url ? "inline-flex" : "none";
  }

  body.innerHTML = "";

  if (!url) {
    body.innerHTML = `
      <div class="file-preview-generic">
        <span>FILE</span>
        <strong>File unavailable</strong>
        <small>This file could not be opened.</small>
      </div>
    `;

    openModal(modal);
    return;
  }

  const lower =
    fileName.toLowerCase();

  if (
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(
      lower
    )
  ) {
    const image =
      document.createElement("img");

    image.className =
      "file-preview-image";

    image.src = url;
    image.alt = fileName;

    body.appendChild(image);
  } else if (
    /\.pdf$/i.test(lower)
  ) {
    const frame =
      document.createElement("iframe");

    frame.className =
      "file-preview-frame";

    frame.src = url;
    frame.title = fileName;

    body.appendChild(frame);
  } else {
    body.innerHTML = `
      <div class="file-viewer-generic">
        <strong>${fileName}</strong>
        <small>
          This file type is available through
          the Open File button.
        </small>
      </div>
    `;
  }

  openModal(modal);
}

/* =========================================================
   SERVICE RESOURCE VIEW
========================================================= */

function resourcesForParent(
  parentKey
) {
  return remoteResources.filter(
    item =>
      item.parent_key ===
      parentKey
  );
}

function renderResourceList(
  container,
  resources
) {
  if (!container) return;

  if (!resources.length) {
    container.innerHTML = `
      <div class="empty-state">
        No resources have been added yet.
      </div>
    `;

    return;
  }

  container.innerHTML =
    resources
      .map(item => {
        const url =
          item.file_url ||
          safeUrl(item.external_url);

        const name =
          item.file_name ||
          item.title ||
          "Resource";

        return `
          <article
            class="resource-card"
            data-resource-id="${item.id || ""}"
          >
            <div>
              <span class="resource-type">
                ${
                  item.resource_type ||
                  "RESOURCE"
                }
              </span>

              <h3>
                ${escapeHtml(
                  item.title ||
                    name
                )}
              </h3>

              <p>
                ${escapeHtml(
                  item.description ||
                    "Portfolio resource"
                )}
              </p>
            </div>

            <div class="resource-actions">
              ${
                url
                  ? `
                    <button
                      type="button"
                      class="resource-btn primary resource-open"
                      data-url="${escapeAttr(url)}"
                      data-name="${escapeAttr(name)}"
                    >
                      OPEN
                    </button>
                  `
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");

  container
    .querySelectorAll(
      ".resource-open"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        () => {
          openFileViewer(
            button.dataset.url,
            button.dataset.name
          );
        }
      );
    });
}

/* =========================================================
   SERVICE MODAL
========================================================= */

function openServiceModal(
  title,
  parentKey
) {
  const modal =
    document.getElementById(
      "serviceModal"
    );

  if (!modal) return;

  const titleElement =
    document.getElementById(
      "serviceModalTitle"
    );

  const description =
    document.getElementById(
      "serviceModalDescription"
    );

  const list =
    document.getElementById(
      "serviceResourceList"
    );

  if (titleElement) {
    titleElement.textContent =
      title;
  }

  if (description) {
    description.textContent =
      "Services, links and uploaded work related to this category.";
  }

  renderResourceList(
    list,
    resourcesForParent(
      parentKey
    )
  );

  openModal(modal);
}

/* =========================================================
   CERTIFICATE VIEW
========================================================= */

function renderCertificates(
  container
) {
  if (!container) return;

  if (!remoteCertificates.length) {
    container.innerHTML = `
      <div class="empty-state">
        No certificates uploaded yet.
      </div>
    `;

    return;
  }

  container.innerHTML =
    remoteCertificates
      .map(item => {
        const url =
          item.file_url ||
          "";

        return `
          <button
            type="button"
            class="certificate-file-card"
            data-url="${escapeAttr(url)}"
            data-name="${escapeAttr(
              item.title ||
                item.file_name ||
                "Certificate"
            )}"
          >
            <span class="mini-icon">
              ▣
            </span>

            <span>
              <b>
                ${escapeHtml(
                  item.title ||
                    item.file_name ||
                    "Certificate"
                )}
              </b>

              <small>
                ${
                  item.file_name ||
                  "Certificate document"
                }
              </small>
            </span>

            <span class="certificate-open">
              VIEW
            </span>
          </button>
        `;
      })
      .join("");

  container
    .querySelectorAll(
      ".certificate-file-card"
    )
    .forEach(card => {
      card.addEventListener(
        "click",
        () => {
          openFileViewer(
            card.dataset.url,
            card.dataset.name
          );
        }
      );
    });
}

/* =========================================================
   HTML SAFETY HELPERS
========================================================= */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll(
      "'",
      "&#039;"
    );
}

function escapeAttr(value) {
  return escapeHtml(value)
    .replaceAll("`", "&#096;");
}

/* =========================================================
   EXISTING SERVICE CARDS
========================================================= */

document
  .querySelectorAll(".service-card")
  .forEach(card => {
    const button =
      card.querySelector(
        ".card-link"
      );

    if (!button) return;

    button.addEventListener(
      "click",
      event => {
        event.preventDefault();

        const title =
          card.querySelector(
            "h3"
          )?.textContent
            ?.trim() ||
          "Service";

        const parentKey =
          card.dataset.parentKey ||
          title;

        openServiceModal(
          title,
          parentKey
        );
      }
    );
  });

/* =========================================================
   SKILL CARDS
========================================================= */

document
  .querySelectorAll(
    ".skill-action"
  )
  .forEach(card => {
    card.addEventListener(
      "click",
      () => {
        const title =
          card.querySelector(
            "h3"
          )?.textContent
            ?.trim() ||
          "Skill";

        const parentKey =
          card.dataset.parentKey ||
          `skill:${title}`;

        openServiceModal(
          title,
          parentKey
        );
      }
    );
  });

/* =========================================================
   CERTIFICATE SECTION
========================================================= */

const certificateContainer =
  document.querySelector(
    "#certificateGallery"
  );

if (
  certificateContainer &&
  sb
) {
  loadRemoteCertificates()
    .then(() => {
      renderCertificates(
        certificateContainer
      );
    });
}

/* =========================================================
   HIRE ME POPUP
========================================================= */

const hireMeButton = document.getElementById("hireMeButton");
const hireModal = document.getElementById("hireModal");

hireMeButton?.addEventListener("click", () => {
  openModal(hireModal);
});

/* =========================================================
   CERTIFICATE GALLERY BUTTON
========================================================= */

const viewCertificates = document.getElementById("viewCertificates");
const certificateModal = document.getElementById("certificateModal");

viewCertificates?.addEventListener("click", async () => {
  if (sb) {
    await loadRemoteCertificates();
  }
  renderCertificates(document.getElementById("certificateGallery"));
  openModal(certificateModal);
});

/* =========================================================
   SOCIAL ICON LOOP
========================================================= */

document.querySelectorAll(".social").forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.remove("is-looping");
    void icon.offsetWidth;
    icon.classList.add("is-looping");
  });
});

/* =========================================================
   LOAD ONLINE RESOURCES
========================================================= */

if (sb) {
  loadRemoteResources()
    .then(() => {
      document
        .querySelectorAll(
          ".service-card"
        )
        .forEach(card => {
          const title =
            card.querySelector(
              "h3"
            )?.textContent
              ?.trim();

          if (!title) return;

          const key =
            card.dataset.parentKey ||
            title;

          const count =
            resourcesForParent(
              key
            ).length;

          if (count) {
            card.dataset.resourceCount =
              String(count);
          }
        });
    });
}

/* =========================================================
   BACK TO TOP
========================================================= */

const backTop =
  document.querySelector(
    ".back-top"
  );

window.addEventListener(
  "scroll",
  () => {
    if (!backTop) return;

    backTop.classList.toggle(
      "show",
      window.scrollY > 500
    );
  },
  {
    passive: true
  }
);

backTop?.addEventListener(
  "click",
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);

/* =========================================================
   CARD PRESS ANIMATION
========================================================= */

document.addEventListener(
  "pointerdown",
  event => {
    const target =
      event.target.closest(
        ".btn, .text-button, .card-link, .filter, .skill-action, .certificate-action, .resource-btn, .social, .tool-action"
      );

    if (!target) return;

    target.classList.add(
      "pressed"
    );
  }
);

document.addEventListener(
  "pointerup",
  event => {
    const target =
      event.target.closest(
        ".btn, .text-button, .card-link, .filter, .skill-action, .certificate-action, .resource-btn, .social, .tool-action"
      );

    if (!target) return;

    setTimeout(() => {
      target.classList.remove(
        "pressed"
      );
    }, 120);
  }
);




/* =========================================================
   AUTHENTICATION
========================================================= */

let currentUser = null;

async function getCurrentUser() {
  if (!sb) return null;

  const {
    data: { user },
    error
  } = await sb.auth.getUser();

  if (error) {
    console.warn(
      "Auth check:",
      error.message
    );
    return null;
  }

  currentUser = user || null;
  return currentUser;
}

/* =========================================================
   AUTH UI
========================================================= */

function showAdminLogin() {
  const modal =
    document.getElementById(
      "adminModal"
    );

  if (!modal) return;

  const loginPanel =
    document.getElementById(
      "adminLoginPanel"
    );

  const managerPanel =
    document.getElementById(
      "adminManagerPanel"
    );

  loginPanel?.removeAttribute(
    "hidden"
  );

  managerPanel?.setAttribute(
    "hidden",
    ""
  );

  openModal(modal);
}

function showAdminManager() {
  const modal =
    document.getElementById(
      "adminModal"
    );

  if (!modal) return;

  const loginPanel =
    document.getElementById(
      "adminLoginPanel"
    );

  const managerPanel =
    document.getElementById(
      "adminManagerPanel"
    );

  loginPanel?.setAttribute(
    "hidden",
    ""
  );

  managerPanel?.removeAttribute(
    "hidden"
  );

  openModal(modal);

  loadManagerData();
}

/* =========================================================
   ADMIN BUTTON
========================================================= */

const adminTrigger =
  document.querySelector(
    ".admin-trigger"
  );

adminTrigger?.addEventListener(
  "click",
  async () => {
    if (!sb) {
      alert(
        "Supabase is not connected yet. Check your URL and publishable key."
      );
      return;
    }

    const user =
      await getCurrentUser();

    if (user) {
      showAdminManager();
    } else {
      showAdminLogin();
    }
  }
);

/* =========================================================
   LOGIN
========================================================= */

const loginForm =
  document.getElementById(
    "adminLoginForm"
  );

loginForm?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    if (!sb) {
      setStatus(
        document.getElementById(
          "adminAuthStatus"
        ),
        "Supabase is not connected.",
        true
      );

      return;
    }

    const email =
      document.getElementById(
        "adminEmail"
      )?.value
        ?.trim();

    const password =
      document.getElementById(
        "adminPassword"
      )?.value || "";

    const status =
      document.getElementById(
        "adminAuthStatus"
      );

    if (!email || !password) {
      setStatus(
        status,
        "Enter your email and password.",
        true
      );

      return;
    }

    setStatus(
      status,
      "Signing in..."
    );

    const {
      data,
      error
    } = await sb.auth.signInWithPassword(
      {
        email,
        password
      }
    );

    if (error) {
      setStatus(
        status,
        error.message,
        true
      );

      return;
    }

    currentUser =
      data.user;

    setStatus(
      status,
      "Login successful."
    );

    setTimeout(() => {
      showAdminManager();
    }, 300);
  }
);

/* =========================================================
   CREATE ACCOUNT
========================================================= */

const signupForm =
  document.getElementById(
    "adminSignupForm"
  );

signupForm?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    if (!sb) return;

    const email =
      document.getElementById(
        "signupEmail"
      )?.value
        ?.trim();

    const password =
      document.getElementById(
        "signupPassword"
      )?.value || "";

    const status =
      document.getElementById(
        "adminSignupStatus"
      );

    if (
      !email ||
      password.length < 8
    ) {
      setStatus(
        status,
        "Use a valid email and at least 8 characters for the password.",
        true
      );

      return;
    }

    setStatus(
      status,
      "Creating account..."
    );

    const {
      data,
      error
    } = await sb.auth.signUp({
      email,
      password
    });

    if (error) {
      setStatus(
        status,
        error.message,
        true
      );

      return;
    }

    currentUser =
      data.user || null;

    setStatus(
      status,
      data.session
        ? "Account created successfully."
        : "Account created. Check your email if confirmation is required."
    );
  }
);

/* =========================================================
   GOOGLE LOGIN
========================================================= */

const googleLogin =
  document.getElementById(
    "googleLogin"
  );

googleLogin?.addEventListener(
  "click",
  async () => {
    if (!sb) return;

    const status =
      document.getElementById(
        "adminAuthStatus"
      );

    setStatus(
      status,
      "Opening Google login..."
    );

    const {
      error
    } =
      await sb.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            window.location.href
        }
      });

    if (error) {
      setStatus(
        status,
        error.message,
        true
      );
    }
  }
);

/* =========================================================
   LOGOUT
========================================================= */

const logoutButton =
  document.getElementById(
    "adminLogout"
  );

logoutButton?.addEventListener(
  "click",
  async () => {
    if (!sb) return;

    const {
      error
    } = await sb.auth.signOut();

    if (error) {
      console.warn(
        "Logout:",
        error.message
      );

      return;
    }

    currentUser = null;

    closeModal(
      document.getElementById(
        "adminModal"
      )
    );

    window.location.reload();
  }
);

/* =========================================================
   AUTH STATE
========================================================= */

if (sb) {
  sb.auth.onAuthStateChange(
    (_event, session) => {
      currentUser =
        session?.user || null;
    }
  );
}

/* =========================================================
   FILE UPLOAD
========================================================= */

async function uploadPortfolioFile(
  file,
  folder = "portfolio"
) {
  if (!sb) {
    throw new Error(
      "Supabase is not connected."
    );
  }

  if (!file) {
    throw new Error(
      "Please choose a file."
    );
  }

  const maxSize =
    25 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error(
      "File is larger than 25 MB."
    );
  }

  const extension =
    file.name.includes(".")
      ? file.name
          .split(".")
          .pop()
          .toLowerCase()
      : "file";

  const filePath =
    `${folder}/${Date.now()}-${makeId()}-${slug(
      file.name.replace(
        /\.[^/.]+$/,
        ""
      )
    )}.${extension}`;

  const {
    error
  } = await sb.storage
    .from("portfolio-files")
    .upload(
      filePath,
      file,
      {
        cacheControl:
          "3600",
        upsert: false,
        contentType:
          file.type ||
          "application/octet-stream"
      }
    );

  if (error) {
    throw error;
  }

  return {
    path: filePath,
    url: fileUrl(filePath),
    name: file.name,
    size: file.size,
    type: file.type
  };
}

/* =========================================================
   SAVE RESOURCE
========================================================= */

async function saveResource({
  title,
  parentKey,
  description,
  externalUrl,
  file
}) {
  if (!sb) {
    throw new Error(
      "Supabase is not connected."
    );
  }

  const user =
    await getCurrentUser();

  if (!user) {
    throw new Error(
      "Please login first."
    );
  }

  let uploaded = null;

  if (file) {
    uploaded =
      await uploadPortfolioFile(
        file,
        "resources"
      );
  }

  const payload = {
    title:
      title?.trim() ||
      "Untitled Resource",

    parent_key:
      parentKey?.trim() ||
      "general",

    description:
      description?.trim() ||
      "",

    external_url:
      safeUrl(externalUrl) ||
      null,

    file_url:
      uploaded?.url ||
      null,

    file_path:
      uploaded?.path ||
      null,

    file_name:
      uploaded?.name ||
      null,

    resource_type:
      uploaded
        ? "FILE"
        : externalUrl
        ? "LINK"
        : "RESOURCE",

    created_by:
      user.id
  };

  const {
    error
  } = await sb
    .from("portfolio_resources")
    .insert(payload);

  if (error) {
    throw error;
  }

  await loadRemoteResources();

  return true;
}

/* =========================================================
   SAVE CERTIFICATE
========================================================= */

async function saveCertificate({
  title,
  file
}) {
  if (!sb) {
    throw new Error(
      "Supabase is not connected."
    );
  }

  const user =
    await getCurrentUser();

  if (!user) {
    throw new Error(
      "Please login first."
    );
  }

  if (!file) {
    throw new Error(
      "Choose a certificate file."
    );
  }

  const uploaded =
    await uploadPortfolioFile(
      file,
      "certificates"
    );

  const payload = {
    title:
      title?.trim() ||
      file.name,

    file_url:
      uploaded.url,

    file_path:
      uploaded.path,

    file_name:
      uploaded.name,

    mime_type:
      uploaded.type,

    created_by:
      user.id
  };

  const {
    error
  } = await sb
    .from("portfolio_certificates")
    .insert(payload);

  if (error) {
    throw error;
  }

  await loadRemoteCertificates();

  renderCertificates(
    document.querySelector(
      "#certificateGallery"
    )
  );

  return true;
}



/* =========================================================
   ADMIN MANAGER
========================================================= */

async function loadManagerData() {
  if (!sb) return;

  const user =
    await getCurrentUser();

  if (!user) return;

  const resources =
    await loadRemoteResources();

  const certificates =
    await loadRemoteCertificates();

  renderManagerResources(
    resources
  );

  renderManagerCertificates(
    certificates
  );
}

/* =========================================================
   MANAGER RESOURCE LIST
========================================================= */

function renderManagerResources(
  resources = []
) {
  const container =
    document.getElementById(
      "managerResourceList"
    );

  if (!container) return;

  if (!resources.length) {
    container.innerHTML = `
      <div class="empty-state">
        No resources uploaded yet.
      </div>
    `;
    return;
  }

  container.innerHTML =
    resources.map(item => `
      <article
        class="manager-item"
        data-id="${escapeAttr(
          item.id || ""
        )}"
      >
        <div>
          <strong>
            ${escapeHtml(
              item.title ||
              "Untitled"
            )}
          </strong>

          <small>
            ${escapeHtml(
              item.resource_type ||
              "RESOURCE"
            )}
          </small>
        </div>

        <button
          type="button"
          class="manager-delete"
          data-resource-id="${escapeAttr(
            item.id || ""
          )}"
        >
          DELETE
        </button>
      </article>
    `).join("");

  container
    .querySelectorAll(
      ".manager-delete"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        async () => {
          const id =
            button.dataset
              .resourceId;

          if (!id) return;

          const confirmed =
            window.confirm(
              "Delete this resource?"
            );

          if (!confirmed) return;

          await deleteResource(id);

          await loadManagerData();
        }
      );
    });
}

/* =========================================================
   MANAGER CERTIFICATE LIST
========================================================= */

function renderManagerCertificates(
  certificates = []
) {
  const container =
    document.getElementById(
      "managerCertificateList"
    );

  if (!container) return;

  if (!certificates.length) {
    container.innerHTML = `
      <div class="empty-state">
        No certificates uploaded yet.
      </div>
    `;
    return;
  }

  container.innerHTML =
    certificates.map(item => `
      <article
        class="manager-item"
        data-id="${escapeAttr(
          item.id || ""
        )}"
      >
        <div>
          <strong>
            ${escapeHtml(
              item.title ||
              item.file_name ||
              "Certificate"
            )}
          </strong>

          <small>
            ${escapeHtml(
              item.file_name ||
              "Certificate file"
            )}
          </small>
        </div>

        <button
          type="button"
          class="manager-delete certificate-delete"
          data-certificate-id="${escapeAttr(
            item.id || ""
          )}"
        >
          DELETE
        </button>
      </article>
    `).join("");

  container
    .querySelectorAll(
      ".certificate-delete"
    )
    .forEach(button => {
      button.addEventListener(
        "click",
        async () => {
          const id =
            button.dataset
              .certificateId;

          if (!id) return;

          const confirmed =
            window.confirm(
              "Delete this certificate?"
            );

          if (!confirmed) return;

          await deleteCertificate(
            id
          );

          await loadManagerData();
        }
      );
    });
}

/* =========================================================
   DELETE RESOURCE
========================================================= */

async function deleteResource(
  id
) {
  if (!sb) return;

  const user =
    await getCurrentUser();

  if (!user) {
    alert(
      "Please login first."
    );
    return;
  }

  const {
    data,
    error
  } = await sb
    .from(
      "portfolio_resources"
    )
    .select(
      "id,file_path"
    )
    .eq(
      "id",
      id
    )
    .maybeSingle();

  if (error) {
    alert(
      error.message
    );
    return;
  }

  if (data?.file_path) {
    await sb.storage
      .from(
        "portfolio-files"
      )
      .remove([
        data.file_path
      ]);
  }

  const result =
    await sb
      .from(
        "portfolio_resources"
      )
      .delete()
      .eq(
        "id",
        id
      );

  if (result.error) {
    alert(
      result.error.message
    );
    return;
  }

  await loadRemoteResources();
}

/* =========================================================
   DELETE CERTIFICATE
========================================================= */

async function deleteCertificate(
  id
) {
  if (!sb) return;

  const user =
    await getCurrentUser();

  if (!user) {
    alert(
      "Please login first."
    );
    return;
  }

  const {
    data,
    error
  } = await sb
    .from(
      "portfolio_certificates"
    )
    .select(
      "id,file_path"
    )
    .eq(
      "id",
      id
    )
    .maybeSingle();

  if (error) {
    alert(
      error.message
    );
    return;
  }

  if (data?.file_path) {
    await sb.storage
      .from(
        "portfolio-files"
      )
      .remove([
        data.file_path
      ]);
  }

  const result =
    await sb
      .from(
        "portfolio_certificates"
      )
      .delete()
      .eq(
        "id",
        id
      );

  if (result.error) {
    alert(
      result.error.message
    );
    return;
  }

  await loadRemoteCertificates();

  renderCertificates(
    document.querySelector(
      "#certificateGallery"
    )
  );
}

/* =========================================================
   RESOURCE FORM
========================================================= */

const resourceForm =
  document.getElementById(
    "resourceForm"
  );

resourceForm?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const status =
      document.getElementById(
        "resourceFormStatus"
      );

    const title =
      document.getElementById(
        "resourceTitle"
      )?.value || "";

    const parentKey =
      document.getElementById(
        "resourceParent"
      )?.value || "";

    const description =
      document.getElementById(
        "resourceDescription"
      )?.value || "";

    const externalUrl =
      document.getElementById(
        "resourceExternalUrl"
      )?.value || "";

    const file =
      document.getElementById(
        "resourceFile"
      )?.files?.[0] ||
      null;

    try {
      setStatus(
        status,
        "Saving resource..."
      );

      await saveResource({
        title,
        parentKey,
        description,
        externalUrl,
        file
      });

      setStatus(
        status,
        "Resource saved successfully."
      );

      resourceForm.reset();

      await loadManagerData();
    } catch (error) {
      console.error(error);

      setStatus(
        status,
        error.message ||
          "Could not save resource.",
        true
      );
    }
  }
);

/* =========================================================
   CERTIFICATE FORM
========================================================= */

const certificateForm =
  document.getElementById(
    "certificateForm"
  );

certificateForm?.addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    const status =
      document.getElementById(
        "certificateFormStatus"
      );

    const title =
      document.getElementById(
        "certificateTitle"
      )?.value || "";

    const file =
      document.getElementById(
        "certificateFile"
      )?.files?.[0] ||
      null;

    try {
      setStatus(
        status,
        "Uploading certificate..."
      );

      await saveCertificate({
        title,
        file
      });

      setStatus(
        status,
        "Certificate uploaded successfully."
      );

      certificateForm.reset();

      await loadManagerData();
    } catch (error) {
      console.error(error);

      setStatus(
        status,
        error.message ||
          "Could not upload certificate.",
        true
      );
    }
  }
);

/* =========================================================
   INITIALIZATION
========================================================= */

(async function initPortfolio() {
  try {
    if (sb) {
      await getCurrentUser();

      await Promise.all([
        loadRemoteResources(),
        loadRemoteCertificates()
      ]);

      renderCertificates(
        document.querySelector(
          "#certificateGallery"
        )
      );
    }

    document.body.classList.add(
      "js-ready"
    );

    console.log(
      "Portfolio initialized successfully."
    );
  } catch (error) {
    console.error(
      "Portfolio initialization error:",
      error
    );
  }
})();
