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
      msg: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ msg: this.msg.current.value });
  }

  render() {
    return (
      <div className="log" onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <ScrollToBottom className="msgs" followButtonClassName="follow-button">
          {this.props.log.map((msg, i) => (
            <div className={`msg ${msg.system ? 'system' : ''}`}>
              <span key={i} className={`strong player-${msg.player}`}>{msg.name}</span>{msg.system ? '' : ': '}{msg.body}
            </div>
          ))}
        </ScrollToBottom>
        <div className="form">
          <textarea placeholder="Message..." onChange={this.onChange} ref={this.msg} />
        </div>
      </div>
    );
  }
}
