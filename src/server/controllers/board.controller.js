const players = [
  {
    name: 'Andy',
    tr: 20,
    resources: {
      mc: 57,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    production: {
      mc: -2,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    tags: {
      building: 0,
      space: 0,
      power: 0,
      science: 0,
      jovian: 0,
      earth: 0,
      plant: 0,
      microbe: 0,
      animal: 0,
      city: 0,
      venus: 0,
      event: 0
    },
    tiles: {
      city: 0,
      greenery: 0,
      special: 0
    },
    corp: {
      name: 'CrediCor',
      number: '001'
    }
  },
  {
    name: 'Frank',
    tr: 20,
    resources: {
      mc: 40,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    production: {
      mc: -2,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    tags: {
      building: 0,
      space: 0,
      power: 0,
      science: 0,
      jovian: 0,
      earth: 0,
      plant: 0,
      microbe: 0,
      animal: 0,
      city: 0,
      venus: 0,
      event: 0
    },
    tiles: {
      city: 0,
      greenery: 0,
      special: 0
    },
    corp: {
      name: 'Tharsis Republic',
      number: '008'
    }
  },
  {
    name: 'Colin',
    tr: 20,
    resources: {
      mc: 38,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    production: {
      mc: 4,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    tags: {
      building: 0,
      space: 0,
      power: 0,
      science: 0,
      jovian: 0,
      earth: 0,
      plant: 0,
      microbe: 0,
      animal: 0,
      city: 0,
      venus: 0,
      event: 0
    },
    tiles: {
      city: 0,
      greenery: 0,
      special: 0
    },
    corp: {
      name: 'Mons Insurance',
      number: 'X01'
    }
  },
  {
    name: 'Larissa',
    tr: 20,
    resources: {
      mc: 23,
      st: 0,
      ti: 10,
      pl: 0,
      po: 0,
      he: 0
    },
    production: {
      mc: -2,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    tags: {
      building: 0,
      space: 0,
      power: 0,
      science: 0,
      jovian: 0,
      earth: 0,
      plant: 0,
      microbe: 0,
      animal: 0,
      city: 0,
      venus: 0,
      event: 0
    },
    tiles: {
      city: 0,
      greenery: 0,
      special: 0
    },
    corp: {
      name: 'PhoboLog',
      number: '007'
    },
    startingPlayer: true
  },
  {
    name: 'Adrian',
    tr: 20,
    resources: {
      mc: 30,
      st: 20,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    production: {
      mc: -2,
      st: 0,
      ti: 0,
      pl: 0,
      po: 0,
      he: 0
    },
    tags: {
      building: 0,
      space: 0,
      power: 0,
      science: 0,
      jovian: 0,
      earth: 0,
      plant: 0,
      microbe: 0,
      animal: 0,
      city: 0,
      venus: 0,
      event: 0
    },
    tiles: {
      city: 0,
      greenery: 0,
      special: 0
    },
    corp: {
      name: 'Interplanetary Cinematics',
      number: '005'
    }
  }
];

/**
 * Get players
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function getPlayers(req, res) {
  res.send(players);
}

/**
 * Post a log
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function playCard(req, res) {
  // TODO

  log.push(req.body);

  listeners.forEach(listener => {
    listener.write(`data: ${JSON.stringify(req.body)}\n\n`);
  })

  res.sendStatus(200);
}

/**
 * Stream the log feed
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function stream(req, res) {
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.flushHeaders();

  listeners.push(res);

  res.on('close', () => {
    if (listeners.indexOf(res >= 0)) {
      listeners.splice(listeners.indexOf(res), 1);
    }
    res.end();
  });
}