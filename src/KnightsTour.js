import { CONSTANTS } from "./Constants";

import { Chessboard } from "./Chessboard";
import { Game } from "./Game";
import { Knight } from "./Knight";

export class KnightsTour extends Game {
  /**
   *
   * @param {number} nbCellWidth
   * @param {number} nbCellHeight
   * @param {number} cellSize
   */
  constructor(
    nbCellWidth = 8,
    nbCellHeight = nbCellWidth,
    cellSize = CONSTANTS.CANVAS_WIDTH / nbCellWidth
  ) {
    super();

    this.canvas.addEventListener("pointerdown", (e) => {
      this.handlePointerdown(e);
    });

    this.canvas.addEventListener("pointermove", (e) => {
      this.handlePointermove(e);
    });

    // Game

    this.canClick = false;

    this.nbCellWidth = nbCellWidth;
    this.nbCellHeight = nbCellHeight;
    this.cellSize = cellSize;

    this.moves = [];

    // Entities

    this.chessboard = new Chessboard(
      this.ctx,
      nbCellWidth,
      nbCellHeight,
      cellSize
    );

    this.knight = new Knight(this.ctx, nbCellWidth, nbCellHeight, cellSize);

    // DOM

    const button = document.createElement("button");
    button.style.cssText = "position: absolute; left: 10px; top: 10px;";
    button.appendChild(document.createTextNode("Annuler le dernier mouvement"));
    button.addEventListener("click", () => {
      this.cancelLastMove();
    });
    document.body.appendChild(button);
  }

  cancelLastMove() {
    if (this.moves.length > 0) {
      const { i, j } = this.moves.pop();

      for (const pos of this.knight.nextPositions) {
        this.chessboard.toggleActivable(false, pos.i, pos.j);
      }
      this.chessboard.toggleActivable(
        false,
        this.knight.currentI,
        this.knight.currentJ
      );

      this.chessboard.cellsData[i][j].checked = false;
      this.chessboard.toggleActivable(false, i, j);

      this.moveKnight(i, j);

      document.getElementById("lose").style.display = "none";
      document.getElementById("win").style.display = "none";
    }
  }

  handlePointerdown(e) {
    if (!this.canClick) return;

    const { i, j } = this.getIJ(e);

    this.updateKnight(i, j);
  }

  handlePointermove(e) {
    const { i, j } = this.getIJ(e);

    if (this.chessboard.cellsData[i][j].activable) {
      this.canvas.style.cursor = "pointer";
      this.canClick = true;
    } else {
      this.canvas.style.cursor = "";
      this.canClick = false;
    }
  }

  getMousePos(e) {
    return {
      x: Math.round(
        ((e.pageX - this.canvas.offsetLeft) * CONSTANTS.CANVAS_WIDTH) /
          this.canvas.offsetWidth
      ),
      y: Math.round(
        ((e.pageY - this.canvas.offsetTop) * CONSTANTS.CANVAS_HEIGHT) /
          this.canvas.offsetHeight
      ),
    };
  }

  getIJ(e) {
    const { x, y } = this.getMousePos(e);

    return {
      i: (x - (x % this.cellSize)) / this.cellSize,
      j: (y - (y % this.cellSize)) / this.cellSize,
    };
  }

  checkKnight() {
    for (const pos of this.knight.nextPositions) {
      this.chessboard.toggleActivable(false, pos.i, pos.j);
    }
    this.chessboard.checkCell(this.knight.currentI, this.knight.currentJ);

    this.moves.push({ i: this.knight.currentI, j: this.knight.currentJ });
  }

  moveKnight(i, j) {
    this.knight.move(i, j);
    let possiblePos = 0;
    for (const pos of this.knight.nextPositions) {
      if (this.chessboard.toggleActivable(true, pos.i, pos.j)) possiblePos++;
    }

    if (possiblePos < 1) {
      let lose = false,
        firstFound = false;
      for (let i = 0; i < this.nbCellWidth; i++) {
        for (let j = 0; j < this.nbCellHeight; j++) {
          if (!this.chessboard.cellsData[i][j].checked) {
            if (firstFound) {
              lose = true;
              break;
            } else {
              firstFound = true;
            }
          }
        }
      }
      if (lose) {
        document.getElementById("lose").style.display = "flex";
      } else {
        document.getElementById("win").style.display = "flex";
      }
    }
  }

  updateKnight(i, j) {
    this.checkKnight();
    this.moveKnight(i, j);
  }

  init() {
    return new Promise((resolve) => {
      const knightImg = new Image();
      knightImg.onload = () => {
        createImageBitmap(knightImg).then((img) => {
          this.knight.setImage(img);
          resolve();
        });
      };

      knightImg.src = "./assets/knight.webp";
    });
  }

  start() {
    super.start();

    this.moveKnight(0, 0);
  }

  render() {
    super.render();

    this.chessboard.render();
  }
}
