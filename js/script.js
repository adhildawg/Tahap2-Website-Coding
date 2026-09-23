(function () {
  "use strict";

  function closeMobileMenuOnLinkClick() {
    var navCollapseEl = document.getElementById("primaryNav");
    if (!navCollapseEl || typeof bootstrap === "undefined") return;

    var links = navCollapseEl.querySelectorAll(".nav-link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        if (navCollapseEl.classList.contains("show")) {
          var collapseInstance = bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
          collapseInstance.hide();
        }
      });
    });
  }

  function setupScrollSpy() {
    var sections = document.querySelectorAll("main [id]");
    var navLinks = document.querySelectorAll(".site-navbar .nav-link");
    if (sections.length === 0 || navLinks.length === 0 || !("IntersectionObserver" in window)) return;

    var linkBySectionId = {};
    navLinks.forEach(function (link) {
      var targetId = link.getAttribute("href").replace("#", "");
      linkBySectionId[targetId] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = linkBySectionId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(function (section) { observer.observe(section); });
  }

  function playOneTimeReveal() {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var revealEls = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || revealEls.length === 0) return;

    revealEls.forEach(function (el, index) {
      window.setTimeout(function () {
        el.classList.add("is-visible");
      }, 90 * index);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    closeMobileMenuOnLinkClick();
    setupScrollSpy();
    playOneTimeReveal();
  });
})();
