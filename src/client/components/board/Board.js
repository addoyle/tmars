import React, { Component } from 'react';
import './Board.scss';
import Field from './Field';
import Players from './Players';
import Log from './Log';
import GlobalParameters from './GlobalParameters';
import StandardProjects from './StandardProjects';
import Hand from './Hand';

export default class Board extends Component {
  board = React.createRef()
  log = React.createRef()
  field = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      turn: 2,
      dragging: false,
      params: {
        temp: -30,
        oxygen: 0,
        ocean: 9,
        generation: 1
      },
      players: [
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
          },
          passed: true
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

    // Handle key shortcuts
    const keydown = (e) => {
      if (navigator.userAgent.indexOf('Mac OS X' >= 0) && e.metaKey || e.ctrlKey) {
        // e.preventDefault();

        // TODO: Handle some stuff
      }

      this.log.current.msg.current.focus();
    };
    if (document.addEventListener) {
      document.addEventListener('keydown', keydown, false);
    } else if (document.attachEvent) {
      document.attachEvent('onkeydown', keydown);
    }
  }

  startDragging = () => this.setState({dragging: true});
  stopDragging = () => this.setState({dragging: false});
  drag = (e) => {
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
        <Field ref={this.field} />
        <GlobalParameters
          temperature={this.state.params.temp}
          oxygen={this.state.params.oxygen}
          ocean={this.state.params.ocean}
          generation={this.state.params.generation} />
        <StandardProjects />
        <Hand />
        <Log log={this.props.log} ref={this.log} />
      </div>
    );
  }
}
