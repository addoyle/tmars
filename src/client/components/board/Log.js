import React, { Component } from 'react';
import './Log.scss';

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
        <div className="msgs">
          {this.props.log.map((msg, i) => (
            <div className={`msg ${msg.system ? 'system' : ''}`}>
              <span key={i} className={`strong player-${msg.player}`}>{msg.name}</span>{msg.system ? '' : ': '}{msg.body}
            </div>
          ))}
        </div>
        <div className="form">
          <textarea placeholder="Message..." onChange={this.onChange} ref="msg" />
        </div>
      </div>
    );
  }
}
