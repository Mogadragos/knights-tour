export class Knight {
  ctx;

  nbCellWidth;
  nbCellHeight;
  cellSize;

  currentI;
  currentJ;

  img;

  nextPositions;

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

    this.currentI = 0;
    this.currentJ = 0;

    this.nextPositions = [];

    this.updateNextPositions();
  }

  updateNextPositions() {
    this.nextPositions[0] = { i: this.currentI - 2, j: this.currentJ - 1 };
    this.nextPositions[1] = { i: this.currentI - 1, j: this.currentJ - 2 };
    this.nextPositions[2] = { i: this.currentI + 1, j: this.currentJ - 2 };
    this.nextPositions[3] = { i: this.currentI + 2, j: this.currentJ - 1 };
    this.nextPositions[4] = { i: this.currentI + 2, j: this.currentJ + 1 };
    this.nextPositions[5] = { i: this.currentI + 1, j: this.currentJ + 2 };
    this.nextPositions[6] = { i: this.currentI - 1, j: this.currentJ + 2 };
    this.nextPositions[7] = { i: this.currentI - 2, j: this.currentJ + 1 };
  }

  setImage(img) {
    this.image = img;
  }

  move(i, j) {
    this.currentI = i;
    this.currentJ = j;
    this.updateNextPositions();
    this.render();
  }

  render() {
    this.ctx.drawImage(
      this.image,
      this.currentI * this.cellSize,
      this.currentJ * this.cellSize,
      this.cellSize,
      this.cellSize
    );
  }
}
