import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Log.scss';
import CardRef from './CardRef';
import ScrollToBottom from 'react-scroll-to-bottom';
import classNames from 'classnames';
import Markdown from 'react-markdown';
import { isPlainObject } from 'lodash';
import { subscribe } from '../../util/api';
import { Tile, Param, Resource, Tag, MegaCredit } from '../assets/Assets';

/**
 * The chat log/game history
 */
@inject('logStore', 'boardStore')
@observer
export default class Log extends Component {
  msg = React.createRef()

  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    };

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();

        if (this.state.msg) {
          props.logStore.postLog({
            player: 1,
            body: this.state.msg
          });
          this.setState({ msg: '' });
        }
      }
    });
  }

  componentDidMount() {
    this.props.logStore.fetchLogs();
    this.eventSource = subscribe('log/stream', log => {
      this.props.logStore.log = this.props.logStore.log.concat(log);
    });
  }

  onChange = () => this.setState({ msg: this.msg.current.value });

  renderMsgBody(body) {
    return (Array.isArray(body) ? body : [body]).map((msg, i) => {
      if (isPlainObject(msg)) {
        if (msg.player) {
          return <span key={i} className={`strong player-${msg.player}`}>Frank</span>;
        } else if (msg.tile) {
          return <Tile key={i} name={msg.tile} />;
        } else if (msg.param) {
          return <Param key={i} name={msg.param} />;
        } else if (msg.standardProject) {
          return <span key={i} className="standard-project">{msg.standardProject}</span>;
        } else if (msg.resource) {
          return <Resource key={i} name={msg.resource} />;
        } else if (msg.tag) {
          return <Tag key={i} name={msg.tag} />;
        } else if (msg.megaCredit !== undefined) {
          return <MegaCredit key={i} value={msg.megaCredit} />;
        } else {
          return <CardRef key={i} type={Object.keys(msg)[0]} card={Object.values(msg)[0]} />;
        }
      } else {
        return <Markdown key={i} className="log-inline" source={msg} plugins={[require('remark-external-links')]} />;
      }
    });
  }

  render() {
    const { logStore, boardStore } = this.props;

    return (
      <div className="log" onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <ScrollToBottom className="msgs" followButtonClassName="follow-button">
          {boardStore.players && boardStore.players.length && logStore.log.map((msg, i) => (
            <div key={i} className={classNames('msg', { system: msg.system })}>
              <span className={classNames('strong', `player-${msg.player}`)}>{boardStore.players[msg.player - 1].name}</span>{msg.system ? '' : ': '}{this.renderMsgBody(msg.body)}
            </div>
          ))}
        </ScrollToBottom>
        <div className="form">
          <textarea placeholder="Message..." onChange={this.onChange} ref={this.msg} value={this.state.msg} />
        </div>
      </div>
    );
  }
}