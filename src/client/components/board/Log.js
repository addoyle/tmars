import React, { Component } from 'react';
import './Log.scss';
import ScrollToBottom from 'react-scroll-to-bottom';

export default class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({ msg: this.refs.msg.value });
  }

  render() {
    return (
      <div className="log">
        <ScrollToBottom className="msgs" followButtonClassName="follow-button">
          {this.props.log.map((msg, i) => (
            <div className={`msg ${msg.system ? 'system' : ''}`}>
              <span key={i} className={`strong player-${msg.player}`}>{msg.name}</span>{msg.system ? '' : ': '}{msg.body}
            </div>
          ))}
        </ScrollToBottom>
        <div className="form">
          <textarea placeholder="Message..." onChange={this.onChange} ref="msg" />
        </div>
      </div>
    );
  }
}
