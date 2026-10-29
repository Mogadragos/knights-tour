import { CONSTANTS } from "./Constants";

export class Game {
  // Canvas
  canvas;
  ctx;

  constructor() {
    /* ----- Generate canvas ----- */
    this.canvas = document.createElement("canvas");
    this.canvas.width = CONSTANTS.CANVAS_WIDTH;
    this.canvas.height = CONSTANTS.CANVAS_HEIGHT;
    this.canvas.style.cssText =
      "max-width: 100%; max-height: 100%; border: 1px solid black";
    document.body.style.cssText =
      "margin: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden;";
    document.body.appendChild(this.canvas);

    this.addElement("win", "Gagné !");
    this.addElement("lose", "Perdu...");

    this.ctx = this.canvas.getContext("2d");
  }

  start() {
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    this.ctx.save();
  }

  addElement(id, string) {
    const newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.style.cssText =
      "display: none; position: absolute; background-color: white; width: 300px; height: 300px; flex-direction: column; justify-content: center; align-items: center;";
    newDiv.appendChild(document.createTextNode(string));
    const button = document.createElement("button");
    button.appendChild(document.createTextNode("Recommencer"));
    button.addEventListener("click", () => {
      location.reload();
    });
    newDiv.appendChild(button);
    document.body.appendChild(newDiv);
  }
}
