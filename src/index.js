import { KnightsTour } from "./KnightsTour";

(function () {
  let game = null;

  /* ------ Initialisation ------ */

  function init() {
    // Set body style
    document.documentElement.style.cssText =
      "margin: 0; width: 100%; height: 100%;";
    document.body.style.cssText =
      "margin: 0; height: 100%; display: flex; justify-content: center;";

    game = new KnightsTour();
  }

  init();

  game.init().then(() => {
    game.start();
  });
})();
