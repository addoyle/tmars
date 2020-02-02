import Service from './Service';

class LogService {
  log = [
    { player: 1, body: 'this is cool' },
    { player: 1, body: [' played ', {project: '032'}, '.'], system: true },
    { player: 1, body: ' placed a **City**.', system: true },
    { player: 5, body: ['\'s ', {project: '038'}, ' effect was activated.'], system: true },
    { player: 1, body: ' bought a **City** standard project.', system: true },
    { player: 1, body: ' placed a **City**.', system: true },
    { player: 5, body: ['\'s ', {project: '038'}, ' effect was activated.'], system: true },
    { player: 3, body: 'andy you suck at this game' },
    { player: 2, body: ' claimed the **Builder** milestone.', system: true },
    { player: 2, body: ' skipped.', system: true },
    { player: 3, body: ' passed.', system: true },
    { player: 4, body: ' funded the **Banker** award.', system: true },
    { player: 4, body: ' converted heat to **Raise Temperature**.', system: true },
    { player: 2, body: 'suck it colin' },
    { player: 5, body: 'colin is a sucktion cup' },
    { player: 2, body: 'stfu adrian and play your turn' },
    { player: 5, body: ' converted plants to place a **Greenery** and **Raise Oxygen**.', system: true },
    { player: 5, body: ' placed a **Greenery**.', system: true },
    { player: 5, body: [' used an action on ', {project: '033'}, ' to add one **Microbe** resource to this card.'], system: true },
    { player: 1, body: [' played ', {project: '018'}, '.'], system: true },
    { player: 1, body: [' played ', {project: '039'}, '.'], system: true },
    { player: 1, body: [' took **8** plants from ', {player: 2}, '!'], system: true },
    { player: 2, body: 'it\s fine. idgaf' },
    { player: 2, body: [' played ', {project: '120'}, '.'], system: true },
    { player: 2, body: ' placed a **City**.', system: true },
    { player: 5, body: ['\'s ', {project: '038'}, ' effect was activated.'], system: true },
    { player: 2, body: [' played ', {project: '187'}, '.'], system: true },
  ];
  listeners = [];

  pushLog(log) {
    this.log.push(log);
    this.listeners.forEach(listener => {
      listener.write(`data: ${JSON.stringify(log)}\n\n`);
    });
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  dropListener(listener) {
    const i = this.listeners.indexOf(listener);
    if (i >= 0) {
      this.listeners.splice(i, 1);
    }
  }
}

export default Service(LogService);