import { Scene } from "phaser";

export default class Cell {
    private scene: Scene;
    private x: number;
    private y: number;
    private alive: boolean;
    private shape: Phaser.GameObjects.Rectangle;
    private color: number = 0xffffff;
    private neighbors: Cell[] = [];
    private nextState: boolean = false;


    constructor(scene: Scene, x: number, y: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.alive = false;

        this.createCellGraphics();
        this.checkColor();
    }

    private createCellGraphics() {
        this.shape = this.scene.add.rectangle(
            this.x,
            this.y,
            8,
            8,
            this.color,
            1
        ).setOrigin(0);
        this.shape.setInteractive();
        this.shape.on("pointerdown", () => {
            this.setAlive(!this.alive);
        });
        this.shape.on("pointermove", (pointer) => {
            if (pointer.isDown) {
                this.setAlive(true);
            }
        });
    }

    private checkColor() {
        if (this.alive) {
            this.shape.setFillStyle(this.color, 1);
        } else {
            this.shape.setFillStyle(this.color, 0);
        }
    }

    public setAlive(alive: boolean) {
        this.alive = alive;
        this.checkColor();
    }

    public isAlive() {
        return this.alive;
    }

    public checkNextState() {
        const alive = this.neighbors.filter(c => c.isAlive());
        if (this.alive) {
            if (alive.length === 2 || alive.length === 3) {
                this.nextState = true;
            } else {
                this.nextState = false;
            }
        } else {
            if (alive.length === 3) {
                this.nextState = true;
            } else {
                this.nextState = false;
            }
        }
    }

    public changeState() {
        this.setAlive(this.nextState);
    }

    public addNeighbor(cell: Cell) {
        this.neighbors.push(cell);
    }

}