/* Keyboard Events
---------------------------------------------------------------------------- */

const addKeyboardEvents = () => {
  
  const contentWrap = document.querySelector("[data-js-content]");
  const navObjects = document.querySelectorAll("[data-js-content] > *");
  const navObjectsArray = Array.from(navObjects);
  const currentFragment = window.location.hash;
  let currentNavObject = navObjectsArray.findIndex((element) => `#${element.id}` === currentFragment);

  const jump = (direction) => {
    if (direction === "up") {
      currentNavObject = currentNavObject === 0 ? 0 : currentNavObject - 1;
    } else if (direction === "down") {
      currentNavObject = currentNavObject === navObjectsArray.length ? currentNavObject : currentNavObject + 1;
    }

    if(!navObjectsArray[currentNavObject]) return;

    navObjectsArray[currentNavObject].scrollIntoView({ behavior: "smooth" });
    history.pushState("", "", `#${navObjectsArray[currentNavObject].id}`);
  };


  document.onkeydown = function (event) {

    switch (event.keyCode) {
      case 38:
        jump("up");
        break;

      case 40:
        jump("down");
        break;

      case 79:
        contentWrap.classList.toggle("is-overview");
        break;
    }
  };
};


/* Exports
############################################################################ */

export { addKeyboardEvents };