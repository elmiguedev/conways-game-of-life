import { Scene } from "phaser";
import World from "../entities/World";
import MainHud from "../hud/MainHud";

export default class MainScene extends Scene {
  private world: World;
  private timerDelay: number = 300;
  private timer: Phaser.Time.TimerEvent;
  private hud: MainHud;
  constructor() {
    super("MainScene");
  }

  create() {
    this.createWorld();
    this.createHud();
    this.createTimer();
    this.createInputs();
  }

  private createWorld() {
    this.world = new World(this, this.game.canvas.width, this.game.canvas.height);
  }

  private createHud() {
    this.scene.run("MainHud");
    this.hud = <MainHud>this.scene.get("MainHud");
    this.hud.setPaused(true);
    this.hud.setDelay(this.timerDelay);
  }

  private createInputs() {
    const nextKey = this.input.keyboard.addKey("right");
    nextKey.onDown = () => {
      this.world.changeState();
    }

    const increaseDelayKey = this.input.keyboard.addKey("up");
    increaseDelayKey.onDown = () => {
      this.timerDelay += 10;
      this.resetTimer();
      this.hud.setDelay(this.timerDelay);
    }

    const decreaseDelayKey = this.input.keyboard.addKey("down");
    decreaseDelayKey.onDown = () => {
      this.timerDelay -= 10;
      this.resetTimer();
      this.hud.setDelay(this.timerDelay);
    }

    const playKey = this.input.keyboard.addKey("space");
    playKey.onDown = () => {
      this.timer.paused = !this.timer.paused;
      this.hud.setPaused(this.timer.paused);
      this.hud.setDelay(this.timerDelay)
    }

    const infoKey = this.input.keyboard.addKey("i");
    infoKey.onDown = () => {
      this.hud.toggleVisible();
    }
  }

  private createTimer() {
    this.timer = this.time.addEvent({
      repeat: -1,
      delay: this.timerDelay,
      callback: () => {
        this.world.changeState();
      },
      paused: true
    })
  }

  private resetTimer() {
    Object.defineProperty(this.timer, "delay", {
      value: this.timerDelay
    });
  }

}
