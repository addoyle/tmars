import React, { Component } from 'react';

export default class HoverIntent extends Component {
  constructor(props) {
    super(props);

    this.x = 0;
    this.y = 0;
    this.pX = 0;
    this.pY = 0;
    this.hover = false;
    this.timer = null;
  }

  componentDidMount() {
    this.el.addEventListener('mouseover', this.dispatchOver.bind(this), false);
    this.el.addEventListener('mouseout', this.dispatchOut.bind(this), false);
  }
  componentWillUnmount() {
    this.el.removeEventListener('mouseover', this.dispatchOver.bind(this), false);
    this.el.removeEventListener('mouseout', this.dispatchOut.bind(this), false);
  }

  delay(e) {
    if (this.timer) { this.timer = clearTimeout(this.timer); }
    this.hover = false;
    return this.props.onMouseOut.call(this.el, e);
  }

  tracker(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  }

  compare(e) {
    if (this.timer) { this.timer = clearTimeout(this.timer); }
    if ((Math.abs(this.pX - this.x) + Math.abs(this.pY - this.y)) < this.props.sensitivity) {
      this.hover = true;
      return this.props.onMouseOver.call(this.el, e);
    } else {
      this.pX = this.x;
      this.pY = this.y;
      this.timer = setTimeout(() => this.compare(this.el, e), this.props.interval);
    }
  }

  dispatchOver(e) {
    if (this.timer) { this.timer = clearTimeout(this.timer); }
    this.el.removeEventListener('mousemove', this.tracker.bind(this), false);
    if (!this.hover) {
      this.pX = e.clientX;
      this.pY = e.clientY;
      this.el.addEventListener('mousemove', this.tracker.bind(this), false);
      this.timer = setTimeout(() => this.compare(this.el, e), this.props.interval);
    }
  }
  dispatchOut(e) {
    if (this.timer) { this.timer = clearTimeout(this.timer); }
    this.el.removeEventListener('mousemove', this.tracker.bind(this), false);
    if (this.hover) {
      this.timer = setTimeout(() => this.delay(this.el, e), this.props.timeout);
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: el => this.el = el
    })
  }
}

HoverIntent.defaultProps = {
  sensitivity: 7,
  interval: 100,
  timeout: 0
};
