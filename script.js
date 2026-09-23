const skillData = {
  design: {
    number: "01",
    title: "Graphic Designing",
    description:
      "Clean, purposeful visual design for digital platforms, channels and everyday brand needs.",
    areas: [
      "YouTube Thumbnails",
      "Logo Design",
      "Photo Editing",
      "Social Media Graphics",
      "Basic Brand Visuals"
    ]
  },

  marketing: {
    number: "02",
    title: "Digital Marketing",
    description:
      "Practical digital promotion focused on useful content, social presence and campaign support.",
    areas: [
      "Social Media",
      "Content Planning",
      "Campaign Support",
      "Audience Research",
      "Digital Promotion"
    ]
  },

  seo: {
    number: "03",
    title: "SEO",
    description:
      "Search-focused work covering practical on-page improvements, keyword research and content visibility.",
    areas: [
      "Keyword Research",
      "On-page SEO",
      "Content SEO",
      "Basic Technical SEO",
      "Search Visibility"
    ]
  }
};


/* =========================================
   SKILLS TABS
========================================= */

const skillTabs = document.querySelectorAll(".skill-tab");
const skillPanel = document.querySelector("#skillPanel");

function renderSkill(key) {
  const data = skillData[key];

  skillPanel.innerHTML = `
    <div class="skill-panel-main">
      <span class="number">${data.number}</span>

      <h3>${data.title}</h3>

      <p>${data.description}</p>
    </div>

    <div class="skill-subareas">
      ${data.areas
        .map(area => `<span>${area}</span>`)
        .join("")}
    </div>
  `;

  skillPanel.animate(
    [
      {
        opacity: 0.35,
        transform: "translateY(5px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 280,
      easing: "ease-out"
    }
  );
}


skillTabs.forEach(tab => {
  tab.addEventListener("click", () => {

    skillTabs.forEach(item => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    renderSkill(tab.dataset.skill);
  });
});


/* =========================================
   SERVICE FILTERS
========================================= */

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");

filters.forEach(filter => {

  filter.addEventListener("click", () => {

    filters.forEach(item => {
      item.classList.remove("active");
    });

    filter.classList.add("active");

    const category = filter.dataset.filter;

    cards.forEach(card => {

      const show =
        category === "all" ||
        card.dataset.category === category;

      card.style.display = show ? "flex" : "none";

    });

  });

});


/* =========================================
   SERVICE DETAIL MODAL
========================================= */

const modal = document.querySelector("#workModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDetail = document.querySelector("#modalDetail");
const modalTags = document.querySelector("#modalTags");

const serviceButtons =
  document.querySelectorAll(".work-open");


serviceButtons.forEach(button => {

  button.addEventListener("click", () => {

    modalTitle.textContent =
      button.dataset.title;

    modalDetail.textContent =
      button.dataset.detail;

    modalTags.innerHTML =
      button.dataset.tags
        .split(",")
        .map(tag => `<span>${tag.trim()}</span>`)
        .join("");

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

  });

});


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "modal-open"
  );

}


document
  .querySelectorAll("[data-close-modal]")
  .forEach(item => {

    item.addEventListener(
      "click",
      closeModal
    );

  });


/* Close modal with ESC */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle =
  document.querySelector(".menu-toggle");

const nav =
  document.querySelector(".nav");


menuToggle.addEventListener(
  "click",
  () => {

    const isOpen =
      nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  }
);


/* Close mobile menu after clicking link */

document
  .querySelectorAll(".nav-link")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


/* =========================================
   ACTIVE NAVIGATION ON SCROLL
========================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


const sectionObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navLinks.forEach(link => {

            link.classList.toggle(

              "active",

              link.getAttribute("href") ===
              `#${entry.target.id}`

            );

          });

        }

      });

    },

    {
      rootMargin:
        "-35% 0px -55% 0px"
    }

  );


sections.forEach(section => {

  sectionObserver.observe(section);

});


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.08
    }

  );


document
  .querySelectorAll(".reveal")
  .forEach(item => {

    revealObserver.observe(item);

  });


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
  document.querySelector("#year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
