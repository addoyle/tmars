import React, { Component } from 'react';
import './Log.scss';
import ScrollToBottom from 'react-scroll-to-bottom';

/**
 * The chat log/game history
 */
export default class Log extends Component {
  msg = React.createRef()

  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      log: props.log
    };

    document.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();

        if (this.state.msg) {
          // TODO: Send to server
          this.setState({ log: this.state.log.concat({
            name: 'Andy',
            player: 1,
            body: this.state.msg
          }), msg: '' });
        }
      }
    });
  }

  onChange = () => this.setState({ msg: this.msg.current.value });

  render() {
    return (
      <div className="log" onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <ScrollToBottom className="msgs" followButtonClassName="follow-button">
          {this.state.log.map((msg, i) => (
            <div key={i} className={`msg ${msg.system ? 'system' : ''}`}>
              <span className={`strong player-${msg.player}`}>{msg.name}</span>{msg.system ? '' : ': '}{msg.body}
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
