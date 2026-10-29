/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Chessboard.js":
/*!***************************!*\
  !*** ./src/Chessboard.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Chessboard\": () => (/* binding */ Chessboard)\n/* harmony export */ });\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"./src/Constants.js\");\n\r\n\r\nclass Chessboard {\r\n  ctx;\r\n\r\n  nbCellWidth;\r\n  nbCellHeight;\r\n  cellSize;\r\n\r\n  cellColors;\r\n\r\n  /**\r\n   *\r\n   * @param {CanvasRenderingContext2D} ctx\r\n   * @param {number} nbCellWidth\r\n   * @param {number} nbCellHeight\r\n   * @param {number} cellSize\r\n   */\r\n  constructor(ctx, nbCellWidth, nbCellHeight, cellSize) {\r\n    this.ctx = ctx;\r\n\r\n    this.nbCellWidth = nbCellWidth;\r\n    this.nbCellHeight = nbCellHeight;\r\n    this.cellSize = cellSize;\r\n\r\n    this.cellsData = [];\r\n\r\n    let white = true;\r\n    for (let i = 0; i < this.nbCellWidth; i++) {\r\n      this.cellsData[i] = [];\r\n      for (let j = 0; j < this.nbCellHeight; j++) {\r\n        this.cellsData[i][j] = {\r\n          baseColor: white ? \"#FFFFFF\" : \"#000000\",\r\n          checked: false,\r\n          activable: false,\r\n        };\r\n        white = !white;\r\n      }\r\n      white = !white;\r\n    }\r\n  }\r\n\r\n  render() {\r\n    for (let i = 0; i < this.nbCellWidth; i++) {\r\n      for (let j = 0; j < this.nbCellHeight; j++) {\r\n        this.renderCell(i, j);\r\n      }\r\n    }\r\n  }\r\n\r\n  renderCell(i, j, color = this.cellsData[i][j].baseColor) {\r\n    this.ctx.fillStyle = color;\r\n    this.ctx.fillRect(\r\n      i * this.cellSize,\r\n      j * this.cellSize,\r\n      this.cellSize,\r\n      this.cellSize\r\n    );\r\n  }\r\n\r\n  checkCell(i, j) {\r\n    const cell = this.cellsData[i][j];\r\n    cell.checked = true;\r\n    this.renderCell(i, j, _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CHECKED_COLOR);\r\n  }\r\n\r\n  toggleActivable(state, i, j) {\r\n    if (\r\n      i > -1 &&\r\n      i < this.nbCellWidth &&\r\n      j > -1 &&\r\n      j < this.nbCellHeight &&\r\n      !this.cellsData[i][j].checked\r\n    ) {\r\n      this.cellsData[i][j].activable = state;\r\n      this.ctx.fillStyle = state\r\n        ? _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ACTIVABLE_COLOR\r\n        : this.cellsData[i][j].baseColor;\r\n      this.ctx.fillRect(\r\n        i * this.cellSize,\r\n        j * this.cellSize,\r\n        this.cellSize,\r\n        this.cellSize\r\n      );\r\n      return true;\r\n    }\r\n    return false;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://knights-tour/./src/Chessboard.js?");

/***/ }),

/***/ "./src/Constants.js":
/*!**************************!*\
  !*** ./src/Constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CONSTANTS\": () => (/* binding */ CONSTANTS)\n/* harmony export */ });\nconst CONSTANTS = {\r\n  CANVAS_WIDTH: 1000,\r\n  CANVAS_HEIGHT: 1000,\r\n  ACTIVABLE_COLOR: \"#ff0000\",\r\n  CHECKED_COLOR: \"#00ff00\",\r\n};\r\n\n\n//# sourceURL=webpack://knights-tour/./src/Constants.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"./src/Constants.js\");\n\r\n\r\nclass Game {\r\n  // Canvas\r\n  canvas;\r\n  ctx;\r\n\r\n  constructor() {\r\n    /* ----- Generate canvas ----- */\r\n    this.canvas = document.createElement(\"canvas\");\r\n    this.canvas.width = _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_WIDTH;\r\n    this.canvas.height = _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_HEIGHT;\r\n    this.canvas.style.cssText =\r\n      \"max-width: 100%; max-height: 100%; border: 1px solid black\";\r\n    document.body.style.cssText =\r\n      \"margin: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden;\";\r\n    document.body.appendChild(this.canvas);\r\n\r\n    this.addElement(\"win\", \"Gagné !\");\r\n    this.addElement(\"lose\", \"Perdu...\");\r\n\r\n    this.ctx = this.canvas.getContext(\"2d\");\r\n  }\r\n\r\n  start() {\r\n    this.render();\r\n  }\r\n\r\n  render() {\r\n    this.ctx.clearRect(0, 0, _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_WIDTH, _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_HEIGHT);\r\n    this.ctx.save();\r\n  }\r\n\r\n  addElement(id, string) {\r\n    const newDiv = document.createElement(\"div\");\r\n    newDiv.id = id;\r\n    newDiv.style.cssText =\r\n      \"display: none; position: absolute; background-color: white; width: 300px; height: 300px; flex-direction: column; justify-content: center; align-items: center;\";\r\n    newDiv.appendChild(document.createTextNode(string));\r\n    const button = document.createElement(\"button\");\r\n    button.appendChild(document.createTextNode(\"Recommencer\"));\r\n    button.addEventListener(\"click\", () => {\r\n      location.reload();\r\n    });\r\n    newDiv.appendChild(button);\r\n    document.body.appendChild(newDiv);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://knights-tour/./src/Game.js?");

/***/ }),

/***/ "./src/Knight.js":
/*!***********************!*\
  !*** ./src/Knight.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Knight\": () => (/* binding */ Knight)\n/* harmony export */ });\nclass Knight {\r\n  ctx;\r\n\r\n  nbCellWidth;\r\n  nbCellHeight;\r\n  cellSize;\r\n\r\n  currentI;\r\n  currentJ;\r\n\r\n  img;\r\n\r\n  nextPositions;\r\n\r\n  /**\r\n   *\r\n   * @param {CanvasRenderingContext2D} ctx\r\n   * @param {number} nbCellWidth\r\n   * @param {number} nbCellHeight\r\n   * @param {number} cellSize\r\n   */\r\n  constructor(ctx, nbCellWidth, nbCellHeight, cellSize) {\r\n    this.ctx = ctx;\r\n\r\n    this.nbCellWidth = nbCellWidth;\r\n    this.nbCellHeight = nbCellHeight;\r\n    this.cellSize = cellSize;\r\n\r\n    this.currentI = 0;\r\n    this.currentJ = 0;\r\n\r\n    this.nextPositions = [];\r\n\r\n    this.updateNextPositions();\r\n  }\r\n\r\n  updateNextPositions() {\r\n    this.nextPositions[0] = { i: this.currentI - 2, j: this.currentJ - 1 };\r\n    this.nextPositions[1] = { i: this.currentI - 1, j: this.currentJ - 2 };\r\n    this.nextPositions[2] = { i: this.currentI + 1, j: this.currentJ - 2 };\r\n    this.nextPositions[3] = { i: this.currentI + 2, j: this.currentJ - 1 };\r\n    this.nextPositions[4] = { i: this.currentI + 2, j: this.currentJ + 1 };\r\n    this.nextPositions[5] = { i: this.currentI + 1, j: this.currentJ + 2 };\r\n    this.nextPositions[6] = { i: this.currentI - 1, j: this.currentJ + 2 };\r\n    this.nextPositions[7] = { i: this.currentI - 2, j: this.currentJ + 1 };\r\n  }\r\n\r\n  setImage(img) {\r\n    this.image = img;\r\n  }\r\n\r\n  move(i, j) {\r\n    this.currentI = i;\r\n    this.currentJ = j;\r\n    this.updateNextPositions();\r\n    this.render();\r\n  }\r\n\r\n  render() {\r\n    this.ctx.drawImage(\r\n      this.image,\r\n      this.currentI * this.cellSize,\r\n      this.currentJ * this.cellSize,\r\n      this.cellSize,\r\n      this.cellSize\r\n    );\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://knights-tour/./src/Knight.js?");

/***/ }),

/***/ "./src/KnightsTour.js":
/*!****************************!*\
  !*** ./src/KnightsTour.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"KnightsTour\": () => (/* binding */ KnightsTour)\n/* harmony export */ });\n/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ \"./src/Constants.js\");\n/* harmony import */ var _Chessboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chessboard */ \"./src/Chessboard.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony import */ var _Knight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Knight */ \"./src/Knight.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass KnightsTour extends _Game__WEBPACK_IMPORTED_MODULE_2__.Game {\r\n  /**\r\n   *\r\n   * @param {number} nbCellWidth\r\n   * @param {number} nbCellHeight\r\n   * @param {number} cellSize\r\n   */\r\n  constructor(\r\n    nbCellWidth = 8,\r\n    nbCellHeight = nbCellWidth,\r\n    cellSize = _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_WIDTH / nbCellWidth\r\n  ) {\r\n    super();\r\n\r\n    this.canvas.addEventListener(\"pointerdown\", (e) => {\r\n      this.handlePointerdown(e);\r\n    });\r\n\r\n    this.canvas.addEventListener(\"pointermove\", (e) => {\r\n      this.handlePointermove(e);\r\n    });\r\n\r\n    // Game\r\n\r\n    this.canClick = false;\r\n\r\n    this.nbCellWidth = nbCellWidth;\r\n    this.nbCellHeight = nbCellHeight;\r\n    this.cellSize = cellSize;\r\n\r\n    this.moves = [];\r\n\r\n    // Entities\r\n\r\n    this.chessboard = new _Chessboard__WEBPACK_IMPORTED_MODULE_1__.Chessboard(\r\n      this.ctx,\r\n      nbCellWidth,\r\n      nbCellHeight,\r\n      cellSize\r\n    );\r\n\r\n    this.knight = new _Knight__WEBPACK_IMPORTED_MODULE_3__.Knight(this.ctx, nbCellWidth, nbCellHeight, cellSize);\r\n\r\n    // DOM\r\n\r\n    const button = document.createElement(\"button\");\r\n    button.style.cssText = \"position: absolute; left: 10px; top: 10px;\";\r\n    button.appendChild(document.createTextNode(\"Annuler le dernier mouvement\"));\r\n    button.addEventListener(\"click\", () => {\r\n      this.cancelLastMove();\r\n    });\r\n    document.body.appendChild(button);\r\n  }\r\n\r\n  cancelLastMove() {\r\n    if (this.moves.length > 0) {\r\n      const { i, j } = this.moves.pop();\r\n\r\n      for (const pos of this.knight.nextPositions) {\r\n        this.chessboard.toggleActivable(false, pos.i, pos.j);\r\n      }\r\n      this.chessboard.toggleActivable(\r\n        false,\r\n        this.knight.currentI,\r\n        this.knight.currentJ\r\n      );\r\n\r\n      this.chessboard.cellsData[i][j].checked = false;\r\n      this.chessboard.toggleActivable(false, i, j);\r\n\r\n      this.moveKnight(i, j);\r\n\r\n      document.getElementById(\"lose\").style.display = \"none\";\r\n      document.getElementById(\"win\").style.display = \"none\";\r\n    }\r\n  }\r\n\r\n  handlePointerdown(e) {\r\n    if (!this.canClick) return;\r\n\r\n    const { i, j } = this.getIJ(e);\r\n\r\n    this.updateKnight(i, j);\r\n  }\r\n\r\n  handlePointermove(e) {\r\n    const { i, j } = this.getIJ(e);\r\n\r\n    if (this.chessboard.cellsData[i][j].activable) {\r\n      this.canvas.style.cursor = \"pointer\";\r\n      this.canClick = true;\r\n    } else {\r\n      this.canvas.style.cursor = \"\";\r\n      this.canClick = false;\r\n    }\r\n  }\r\n\r\n  getMousePos(e) {\r\n    return {\r\n      x: Math.round(\r\n        ((e.pageX - this.canvas.offsetLeft) * _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_WIDTH) /\r\n          this.canvas.offsetWidth\r\n      ),\r\n      y: Math.round(\r\n        ((e.pageY - this.canvas.offsetTop) * _Constants__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.CANVAS_HEIGHT) /\r\n          this.canvas.offsetHeight\r\n      ),\r\n    };\r\n  }\r\n\r\n  getIJ(e) {\r\n    const { x, y } = this.getMousePos(e);\r\n\r\n    return {\r\n      i: (x - (x % this.cellSize)) / this.cellSize,\r\n      j: (y - (y % this.cellSize)) / this.cellSize,\r\n    };\r\n  }\r\n\r\n  checkKnight() {\r\n    for (const pos of this.knight.nextPositions) {\r\n      this.chessboard.toggleActivable(false, pos.i, pos.j);\r\n    }\r\n    this.chessboard.checkCell(this.knight.currentI, this.knight.currentJ);\r\n\r\n    this.moves.push({ i: this.knight.currentI, j: this.knight.currentJ });\r\n  }\r\n\r\n  moveKnight(i, j) {\r\n    this.knight.move(i, j);\r\n    let possiblePos = 0;\r\n    for (const pos of this.knight.nextPositions) {\r\n      if (this.chessboard.toggleActivable(true, pos.i, pos.j)) possiblePos++;\r\n    }\r\n\r\n    if (possiblePos < 1) {\r\n      let lose = false,\r\n        firstFound = false;\r\n      for (let i = 0; i < this.nbCellWidth; i++) {\r\n        for (let j = 0; j < this.nbCellHeight; j++) {\r\n          if (!this.chessboard.cellsData[i][j].checked) {\r\n            if (firstFound) {\r\n              lose = true;\r\n              break;\r\n            } else {\r\n              firstFound = true;\r\n            }\r\n          }\r\n        }\r\n      }\r\n      if (lose) {\r\n        document.getElementById(\"lose\").style.display = \"flex\";\r\n      } else {\r\n        document.getElementById(\"win\").style.display = \"flex\";\r\n      }\r\n    }\r\n  }\r\n\r\n  updateKnight(i, j) {\r\n    this.checkKnight();\r\n    this.moveKnight(i, j);\r\n  }\r\n\r\n  init() {\r\n    return new Promise((resolve) => {\r\n      const knightImg = new Image();\r\n      knightImg.onload = () => {\r\n        createImageBitmap(knightImg).then((img) => {\r\n          this.knight.setImage(img);\r\n          resolve();\r\n        });\r\n      };\r\n\r\n      knightImg.src = \"./assets/knight.webp\";\r\n    });\r\n  }\r\n\r\n  start() {\r\n    super.start();\r\n\r\n    this.moveKnight(0, 0);\r\n  }\r\n\r\n  render() {\r\n    super.render();\r\n\r\n    this.chessboard.render();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://knights-tour/./src/KnightsTour.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _KnightsTour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./KnightsTour */ \"./src/KnightsTour.js\");\n\r\n\r\n(function () {\r\n  let game = null;\r\n\r\n  /* ------ Initialisation ------ */\r\n\r\n  function init() {\r\n    // Set body style\r\n    document.documentElement.style.cssText =\r\n      \"margin: 0; width: 100%; height: 100%;\";\r\n    document.body.style.cssText =\r\n      \"margin: 0; height: 100%; display: flex; justify-content: center;\";\r\n\r\n    game = new _KnightsTour__WEBPACK_IMPORTED_MODULE_0__.KnightsTour();\r\n  }\r\n\r\n  init();\r\n\r\n  game.init().then(() => {\r\n    game.start();\r\n  });\r\n})();\r\n\n\n//# sourceURL=webpack://knights-tour/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;