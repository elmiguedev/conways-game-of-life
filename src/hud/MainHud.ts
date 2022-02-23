import { Scene } from "phaser";

export default class MainHud extends Scene {
    private pausedText: Phaser.GameObjects.Text;
    private delayText: Phaser.GameObjects.Text;
    private container: Phaser.GameObjects.Group;

    constructor() {
        super("MainHud");
    }

    create() {
        this.createHudContainer();
        this.createInfo();
        this.createDelayText();
        this.createPausedText();
    }

    private createHudContainer() {
        this.container = this.add.group();
    }

    private createInfo() {
        this.container.add(this.add.text(10, 10, "Click on screen to add/remove cells"));
        this.container.add(this.add.text(10, 30, "Press [RIGHT] key to advance one iteration"));
        this.container.add(this.add.text(10, 50, "Press [SPACE] to play simulation"));
        this.container.add(this.add.text(10, 70, "Press [UP] or [DOWN] key to increase/decrease delay"));
        this.container.add(this.add.text(10, 90, "Press [i] key to show/hide info"));
    }

    private createDelayText() {
        this.delayText = this.add.text(0, 0, "Delay:      ");
        this.delayText.setPosition(
            this.game.canvas.width - this.delayText.displayWidth - 4,
            30
        );
        this.container.add(this.delayText);
    }

    private createPausedText() {
        this.pausedText = this.add.text(
            this.game.canvas.width,
            10,
            "- paused -");
        this.pausedText.setPosition(
            this.game.canvas.width - this.pausedText.displayWidth - 4,
            10
        );
        this.container.add(this.pausedText);

    }

    setPaused(paused: boolean) {
        if (this.pausedText)
            this.pausedText.setText(paused ? "- paused -" : "");
    }

    setDelay(delay: number) {
        if (this.delayText) {
            this.delayText.setText(`Delay: ${delay}`);
        }
    }

    toggleVisible() {
        this.container.toggleVisible();
    }
}