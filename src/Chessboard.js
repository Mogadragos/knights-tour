import { CONSTANTS } from "./Constants";

export class Chessboard {
  ctx;

  nbCellWidth;
  nbCellHeight;
  cellSize;

  cellColors;

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} nbCellWidth
   * @param {number} nbCellHeight
   * @param {number} cellSize
   */
  constructor(ctx, nbCellWidth, nbCellHeight, cellSize) {
    this.ctx = ctx;

    this.nbCellWidth = nbCellWidth;
    this.nbCellHeight = nbCellHeight;
    this.cellSize = cellSize;

    this.cellsData = [];

    let white = true;
    for (let i = 0; i < this.nbCellWidth; i++) {
      this.cellsData[i] = [];
      for (let j = 0; j < this.nbCellHeight; j++) {
        this.cellsData[i][j] = {
          baseColor: white ? "#FFFFFF" : "#000000",
          checked: false,
          activable: false,
        };
        white = !white;
      }
      white = !white;
    }
  }

  render() {
    for (let i = 0; i < this.nbCellWidth; i++) {
      for (let j = 0; j < this.nbCellHeight; j++) {
        this.renderCell(i, j);
      }
    }
  }

  renderCell(i, j, color = this.cellsData[i][j].baseColor) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      i * this.cellSize,
      j * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }

  checkCell(i, j) {
    const cell = this.cellsData[i][j];
    cell.checked = true;
    this.renderCell(i, j, CONSTANTS.CHECKED_COLOR);
  }

  toggleActivable(state, i, j) {
    if (
      i > -1 &&
      i < this.nbCellWidth &&
      j > -1 &&
      j < this.nbCellHeight &&
      !this.cellsData[i][j].checked
    ) {
      this.cellsData[i][j].activable = state;
      this.ctx.fillStyle = state
        ? CONSTANTS.ACTIVABLE_COLOR
        : this.cellsData[i][j].baseColor;
      this.ctx.fillRect(
        i * this.cellSize,
        j * this.cellSize,
        this.cellSize,
        this.cellSize
      );
      return true;
    }
    return false;
  }
}
