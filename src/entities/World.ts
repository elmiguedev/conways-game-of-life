import { Scene } from "phaser";
import Cell from "./Cell";

export default class World {
    private cells: Cell[][];
    private scene: Scene;
    private width: number;
    private height: number;
    private cellSize: number = 8;

    constructor(scene: Scene, width: number, height: number) {
        this.scene = scene;
        this.width = width / this.cellSize;
        this.height = height / this.cellSize;
        this.createCells();
        this.setNeighbors();
    }

    changeState() {
        this.checkCellsState();
        this.changeCellsState();
    }

    private createCells() {
        this.cells = [];
        for (let row = 0; row < this.height; row++) {
            this.cells[row] = []
            for (let col = 0; col < this.width; col++) {
                const x = col * this.cellSize;
                const y = row * this.cellSize;

                this.cells[row][col] = new Cell(this.scene, x, y);
            }
        }
    }

    private setNeighbors() {
        this.iterateCells((cell, row, col) => {
            if (row - 1 >= 0 && col - 1 >= 0 && row + 1 < this.height && col + 1 < this.width) {
                cell.addNeighbor(this.cells[row - 1][col - 1]);
                cell.addNeighbor(this.cells[row - 1][col]);
                cell.addNeighbor(this.cells[row - 1][col + 1]);
                cell.addNeighbor(this.cells[row][col - 1]);
                cell.addNeighbor(this.cells[row][col + 1]);
                cell.addNeighbor(this.cells[row + 1][col - 1]);
                cell.addNeighbor(this.cells[row + 1][col]);
                cell.addNeighbor(this.cells[row + 1][col + 1]);
            }
        })
    }

    private checkCellsState() {
        this.iterateCells((cell: Cell) => {
            cell.checkNextState();
        })
    }

    private changeCellsState() {
        this.iterateCells((cell: Cell) => {
            cell.changeState();
        })
    }

    private iterateCells(callback) {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const cell: Cell = this.cells[row][col];
                callback(cell, row, col);
            }
        }
    }

}