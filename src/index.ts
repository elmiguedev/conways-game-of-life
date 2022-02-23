import { Game } from "phaser";
import MainHud from "./hud/MainHud";
import MainScene from "./scenes/MainScene";

new Game({
  width: window.innerWidth,
  height: window.innerHeight,
  render: {
    pixelArt: true
  },
  scene: [
    MainScene,
    MainHud
  ]
});
