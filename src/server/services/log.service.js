import Service, { sse, push } from './Service';
import Log from '../models/log.model.js';

@sse
class LogService {
  log = [
    new Log(1, 'this is cool', false),
    new Log(1, [' played ', {project: '032'}, '.']),
    new Log(1, ' placed a **City**.'),
    new Log(5, ['\'s ', {project: '038'}, ' effect was activated.']),
    new Log(1, ' bought a **City** standard project.'),
    new Log(1, ' placed a **City**.'),
    new Log(5, ['\'s ', {project: '038'}, ' effect was activated.']),
    new Log(3, 'andy you suck at this game', false),
    new Log(2, ' claimed the **Builder** milestone.'),
    new Log(2, ' skipped.'),
    new Log(3, ' passed.'),
    new Log(4, ' funded the **Banker** award.'),
    new Log(4, ' converted heat to **Raise Temperature**.'),
    new Log(2, 'suck it colin', false),
    new Log(5, 'colin is a sucktion cup', false),
    new Log(2, 'stfu adrian and play your turn', false),
    new Log(5, ' converted plants to place a **Greenery** and **Raise Oxygen**.'),
    new Log(5, ' placed a **Greenery**.'),
    new Log(5, [' used an action on ', {project: '033'}, ' to add one **Microbe** resource to this card.']),
    new Log(1, [' played ', {project: '018'}, '.']),
    new Log(1, [' played ', {project: '039'}, '.']),
    new Log(1, [' took **8** plants from ', {player: 2}, '!']),
    new Log(2, 'it\s fine. idgaf', false),
    new Log(2, [' played ', {project: '120'}, '.']),
    new Log(2, ' placed a **City**.'),
    new Log(5, ['\'s ', {project: '038'}, ' effect was activated.']),
    new Log(2, [' played ', {project: '187'}, '.'])
  ];

  @push
  pushLog(log) {
    this.log.push(log);
  }
}

export default Service(LogService, { sse: true });