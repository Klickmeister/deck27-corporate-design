/* Observer
---------------------------------------------------------------------------- */

const addObserver = () => {
  const observedElements = document.querySelectorAll('[data-js-observe]');
  const options = { rootMargin: "0px", threshold: 0.6 };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in-view");
        const id = entry.target.id;
        const fragment = window.location.hash;
        if (fragment !== `#${id}`) history.pushState("", "", `#${id}`);
      } else {
        entry.target.classList.remove("is-in-view");
      }
    });
  }, options);

  observedElements.forEach(function (element) {
    observer.observe(element);
  });
}


/* Exports
############################################################################ */

export { addObserver };