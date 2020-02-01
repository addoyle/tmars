import { observable } from 'mobx';

export default class Board {
  @observable params = {
    temp: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1
  };
  
  @observable turn = 4;

  @observable players = [
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
}