import React, { Component } from 'react';
import './Board.scss';
import Field from './Field';
import Players from './Players';
import Log from './Log';
import GlobalParameters from './GlobalParameters';
import StandardProjects from './StandardProjects';
import CardDrawer from './CardDrawer';
import { Param } from '../assets/Assets';

const nonFocusingKeys = new Set(['Control', 'Shift', 'Alt', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Tab',
  'CapsLock', 'PageUp', 'PageDown', 'Home', 'End', 'Insert', 'NumLock', 'Meta', 'Pause', 'ScrollLock', 'Escape',
  'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);
export default class Board extends Component {
  board = React.createRef()
  log = React.createRef()
  field = React.createRef();
  params = React.createRef();
  standardProjects = React.createRef();
  players = React.createRef();

  handDrawer = React.createRef();
  activeDrawer = React.createRef();
  automatedDrawer = React.createRef();
  eventDrawer = React.createRef();
  drawers = [this.handDrawer, this.activeDrawer, this.automatedDrawer, this.eventDrawer];

  constructor(props) {
    super(props);

    this.state = {
      turn: 2,
      dragging: false,
      highlights: false,
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
      ]
    };

    // Handle if dragging leaves the browser window
    document.addEventListener('mouseout', e => {
      e = e ? e : window.event;
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        this.setState({dragging: false});
      }
    }, false);

    // Handle keydown shortcuts
    document.addEventListener('keydown', e => {
      if (navigator.userAgent.indexOf('Mac OS X' >= 0) && e.metaKey || e.ctrlKey) {
        this.setState({ highlights: true });

        // Hide/show hand
        if (e.key === 'h') { e.preventDefault(); this.handDrawer.current.toggleCollapse(); }
        // Hide/show Actives
        if (e.key === 'a') { e.preventDefault(); this.activeDrawer.current.toggleCollapse(); }
        // Hide/show Automated
        if (e.key === 'u') { e.preventDefault(); this.automatedDrawer.current.toggleCollapse(); }
        // Hide/show Events
        if (e.key === 'e') { e.preventDefault(); this.eventDrawer.current.toggleCollapse(); }
        // Hide/show Standard Projects
        if (e.key === 'p') { e.preventDefault(); this.standardProjects.current.toggleCollapse(); }
        // Hide/show players
        if (+e.key >= 1 && +e.key <= this.state.players.length) { e.preventDefault(); this.players.current.toggleStats(+e.key - 1)(); }

        // Unfocus chat
        if (e.key !== 'Control') {
          this.log.current.msg.current.blur();
        }
      }
      // If a letter is pressed, grab focus to chat
      else if (!nonFocusingKeys.has(e.key))  {
        this.log.current.msg.current.focus();
      }
    }, false);

    // Handle keyup
    document.addEventListener('keyup', () => this.setState({ highlights: false }));
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
      <div className={`board ${this.state.dragging ? 'dragging' : ''} ${this.state.highlights ? 'highlights': ''}`}
          onMouseDown={this.startDragging}
          onMouseUp={this.stopDragging}
          onMouseMove={this.drag}
          ref={this.board}>
        <Players players={this.state.players} turn={this.state.turn} ref={this.players} />
        <Field ref={this.field} />
        <GlobalParameters
          temperature={this.state.params.temp}
          oxygen={this.state.params.oxygen}
          ocean={this.state.params.ocean}
          generation={this.state.params.generation}
          ref={this.params} />
        <StandardProjects ref={this.standardProjects} />

        <CardDrawer
          cards={['X01', 'X02', 'X03', 'X04', 'X05', 'X06', 'X07', 'X08', 'X09', 'X10', 'X11', 'X12']}
          type="hand"
          tab={<>
            <Param name="card back" />
            <Param name="card back" />
            <Param name="card back" />
            <span><span className="highlight">H</span>and</span>
          </>}
          collapse={false}
          ref={this.handDrawer}
          drawers={this.drawers}
        />
        <CardDrawer
          cards={[
            {card: '212', resources: { type: 'animal', value: 2 }}, 
            {card: '035', resources: { type: 'microbe', value: 3 }},
            {card: '028', resources: { type: 'fighter', value: 1 }}
          ]} 
          type="active"
          tab={<>
            <Param name="card active" />
            <span><span className="highlight">A</span>ctive</span>
          </>}
          ref={this.activeDrawer}
          drawers={this.drawers}
        />
        <CardDrawer
          cards={['165', '088', '211', '159']}
          type="automated"
          tab={<>
            <Param name="card automated" />
            <span>A<span className="highlight">u</span>tomated</span>
          </>}
          ref={this.automatedDrawer}
          drawers={this.drawers}
        />
        <CardDrawer
          cards={[]} 
          type="event"
          tab={<>
            <Param name="card event" />
            <span><span className="highlight">E</span>vent</span>
          </>}
          ref={this.eventDrawer}
          drawers={this.drawers}
        />

        <Log log={this.props.log} ref={this.log} />
      </div>
    );
  }
}
