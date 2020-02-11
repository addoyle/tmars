import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './Board.scss';
import Field from './Field';
import Players from './players/Players';
import Log from './Log';
import GlobalParameters from './params/GlobalParameters';
import StandardProjects from './StandardProjects';
import CardDrawer from './CardDrawer';
import { Param } from '../assets/Assets';
import classNames from 'classnames';

const nonFocusingKeys = new Set(['Control', 'Shift', 'Alt', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'Tab',
  'CapsLock', 'PageUp', 'PageDown', 'Home', 'End', 'Insert', 'NumLock', 'Meta', 'Pause', 'ScrollLock', 'Escape',
  'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12']);

@inject('boardStore')
@observer
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
  corpDrawer = React.createRef();
  preludeDrawer = React.createRef();
  drawers = [this.handDrawer, this.activeDrawer, this.automatedDrawer, this.eventDrawer, this.corpDrawer, this.preludeDrawer];

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      highlights: false
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
        // Hide/show Corp
        if (e.key === 'r') { e.preventDefault(); this.corpDrawer.current.toggleCollapse(); }
        // Hide/show Standard Projects
        if (e.key === 'p') { e.preventDefault(); this.standardProjects.current.toggleCollapse(); }
        // Hide/show players
        if (+e.key >= 1 && +e.key <= this.props.boardStore.players.length) { e.preventDefault(); this.players.current.toggleStats(+e.key - 1)(); }

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
    this.props.boardStore.getPlayers();
  }

  render() {
    return (
      <div className={classNames('board', { dragging: this.state.dragging, highlights: this.state.highlights })}
          onMouseDown={this.startDragging}
          onMouseUp={this.stopDragging}
          onMouseMove={this.drag}
          ref={this.board}>
        <Players ref={this.players} />
        <Field ref={this.field} />
        <GlobalParameters ref={this.params} />
        <StandardProjects ref={this.standardProjects} />

        <CardDrawer
          cards={['P36', 'P37', 'P38', 'P39', 'P40', 'P41', 'P42']}
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
        <CardDrawer
          //cards={this.props.boardStore.players.length ? [this.props.boardStore.players[0].corp] : []}
          cards={['P01']}
          type="corp"
          tab={<>
            <Param name="card corp landscape" />
            <span>Co<span className="highlight">r</span>poration</span>
          </>}
          ref={this.corpDrawer}
          drawers={this.drawers}
        />
        <CardDrawer
          cards={['P33', 'P34', 'P35']}
          type="prelude"
          tab={<>
            <Param name="card prelude landscape" />
            <span>Prel<span className="highlight">u</span>des</span>
          </>}
          ref={this.preludeDrawer}
          drawers={this.drawers}
        />

        <Log ref={this.log} />
      </div>
    );
  }
}
