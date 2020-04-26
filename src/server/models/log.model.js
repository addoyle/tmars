export default class Log {
  player;
  body;
  system;

  constructor(player, body, system = true) {
    this.player = player;
    this.body = body;
    this.system = system;
  }
}
