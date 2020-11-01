export default class Log {
  player;
  body;
  system;
  opts;

  constructor(player, body, system = true, opts) {
    this.player = player;
    this.body = body;
    this.system = system;
    this.opts = opts;
  }
}
