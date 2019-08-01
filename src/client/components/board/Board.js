import React, { Component } from 'react';
import './Board.scss';
import Field from './Field';
import Players from './Players';
import Log from './Log';
import GlobalParameters from './GlobalParameters';
import StandardProjects from './StandardProjects';

export default class Board extends Component {
  board = React.createRef()

  constructor(props) {
    super(props);

    this.startDragging = this.startDragging.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.drag = this.drag.bind(this);

    this.state = {
      turn: 2,
      dragging: false,
      params: {
        temp: -14,
        oxygen: 10,
        ocean: 2,
        generation: 4
      },
      players: [
        {
          name: 'Andy',
          tr: 30,
          resources: {
            mc: 34,
            st: 1,
            ti: 2,
            pl: 7,
            po: 0,
            he: 12
          },
          production: {
            mc: 11,
            st: 0,
            ti: 2,
            pl: 3,
            po: 1,
            he: 4
          },
          tags: {
            building: 6,
            space: 3,
            power: 2,
            science: 4,
            jovian: 1,
            earth: 1,
            plant: 2,
            microbe: 1,
            animal: 0,
            city: 2,
            venus: 0,
            event: 4
          },
          corp: {
            name: 'CrediCor',
            number: '001'
          }
        },
        {
          name: 'Frank',
          tr: 32,
          resources: {
            mc: 44,
            st: 4,
            ti: 1,
            pl: 2,
            po: 4,
            he: 1
          },
          production: {
            mc: 12,
            st: 2,
            ti: 1,
            pl: 6,
            po: 4,
            he: 0
          },
          tags: {
            building: 4,
            space: 6,
            power: 3,
            science: 3,
            jovian: 4,
            earth: 0,
            plant: 3,
            microbe: 0,
            animal: 1,
            city: 4,
            venus: 0,
            event: 5
          },
          corp: {
            name: 'Tharsis Republic',
            number: '008'
          }
        },
        {
          name: 'Colin',
          tr: 29,
          resources: {
            mc: 42,
            st: 2,
            ti: 5,
            pl: 6,
            po: 1,
            he: 7
          },
          production: {
            mc: 9,
            st: 4,
            ti: 2,
            pl: 1,
            po: 1,
            he: 2
          },
          tags: {
            building: 7,
            space: 4,
            power: 2,
            science: 6,
            jovian: 0,
            earth: 2,
            plant: 1,
            microbe: 0,
            animal: 0,
            city: 1,
            venus: 0,
            event: 2
          },
          corp: {
            name: 'Mining Guild',
            number: '004'
          },
          passed: true
        },
        {
          name: 'Larissa',
          tr: 37,
          resources: {
            mc: 35,
            st: 10,
            ti: 8,
            pl: 9,
            po: 2,
            he: 2
          },
          production: {
            mc: 13,
            st: 4,
            ti: 0,
            pl: 4,
            po: 2,
            he: 0
          },
          tags: {
            building: 6,
            space: 3,
            power: 3,
            science: 4,
            jovian: 1,
            earth: 1,
            plant: 2,
            microbe: 2,
            animal: 1,
            city: 3,
            venus: 0,
            event: 2
          },
          corp: {
            name: 'PhoboLog',
            number: '007'
          },
          startingPlayer: true
        },
        {
          name: 'Adrian',
          tr: 40,
          resources: {
            mc: 39,
            st: 2,
            ti: 3,
            pl: 5,
            po: 3,
            he: 11
          },
          production: {
            mc: 8,
            st: 1,
            ti: 1,
            pl: 3,
            po: 3,
            he: 3
          },
          tags: {
            building: 4,
            space: 1,
            power: 1,
            science: 4,
            jovian: 2,
            earth: 1,
            plant: 1,
            microbe: 0,
            animal: 1,
            city: 2,
            venus: 0,
            event: 6
          },
          corp: {
            name: 'Interplanetary Cinematics',
            number: '005'
          }
        }
      ]
    };

    // Handle if dragging leaves the browser window
    const mouseleave = (e) => {
      e = e ? e : window.event;
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        this.setState({dragging: false});
      }
    };
    if (document.addEventListener) {
      document.addEventListener('mouseout', mouseleave, false);
    } else if (document.attachEvent) {
      document.attachEvent('onmouseout', mouseleave);
    }
  }

  startDragging() {
    this.setState({dragging: true});
  }

  stopDragging(e) {
    this.setState({dragging: false});
  }

  drag(e) {
    if (this.state.dragging) {
      window.scrollTo(window.scrollX - e.movementX, window.scrollY - e.movementY);
    }
  }

  componentDidMount() {
    window.scrollTo(
      (this.board.current.scrollWidth - window.innerWidth) / 2,
      (this.board.current.scrollHeight - window.innerHeight) / 2);
  }

  render() {
    // TODO: figure out onMouseMove outside of browser range
    return (
      <div className={`board ${this.state.dragging ? 'dragging' : ''}`}
          onMouseDown={this.startDragging}
          onMouseUp={this.stopDragging}
          onMouseMove={this.drag}
          ref={this.board}>
        <Players players={this.state.players} turn={this.state.turn} />
        <Field />
        <GlobalParameters
          temperature={this.state.params.temp}
          oxygen={this.state.params.oxygen}
          ocean={this.state.params.ocean}
          generation={this.state.params.generation} />
        <StandardProjects />
        <Log log={this.props.log} />
      </div>
    );
  }
}
