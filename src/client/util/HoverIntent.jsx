import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Hover intent utility adds a delay to a hover action to ensure that the user
 * intended on the hover action instead of an accidental hover.
 */
class HoverIntent extends Component {
  constructor(props) {
    super(props);

    // Defaults
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
    this.el.removeEventListener(
      'mouseover',
      this.dispatchOver.bind(this),
      false
    );
    this.el.removeEventListener('mouseout', this.dispatchOut.bind(this), false);
  }

  /**
   * Put a delay on the hover action
   *
   * @param e onMouseOut event
   */
  delay(e) {
    if (this.timer) {
      this.timer = clearTimeout(this.timer);
    }
    this.hover = false;
    return this.props.onMouseOut.call(this.el, e);
  }

  /**
   * Tracks the mouse movement, used for onMouseMove
   *
   * @param e onMouseOver/onMouseOut event
   */
  tracker(e) {
    this.x = e.clientX;
    this.y = e.clientY;
  }

  /**
   * Compares the mouse location based on a sensitivity parameter. If the previous mouse movement was greater
   * than the mouse movement, then the user probably intended to issue the hover action
   *
   * @param e onMouseMove event
   */
  compare(e) {
    if (this.timer) {
      this.timer = clearTimeout(this.timer);
    }
    if (
      Math.abs(this.pX - this.x) + Math.abs(this.pY - this.y) <
      this.props.sensitivity
    ) {
      this.hover = true;
      return this.props.onMouseOver.call(this.el, e);
    } else {
      this.pX = this.x;
      this.pY = this.y;
      this.timer = setTimeout(
        () => this.compare(this.el, e),
        this.props.interval
      );
    }
  }

  /**
   * Handles the onMouseOver event
   *
   * @param e onMouseOver event
   */
  dispatchOver(e) {
    if (this.timer) {
      this.timer = clearTimeout(this.timer);
    }
    this.el.removeEventListener('mousemove', this.tracker.bind(this), false);
    if (!this.hover) {
      this.pX = e.clientX;
      this.pY = e.clientY;
      this.el.addEventListener('mousemove', this.tracker.bind(this), false);
      this.timer = setTimeout(
        () => this.compare(this.el, e),
        this.props.interval
      );
    }
  }

  /**
   * Handles the onMouseOut event
   *
   * @param e onMouseOut event
   */
  dispatchOut(e) {
    if (this.timer) {
      this.timer = clearTimeout(this.timer);
    }
    this.el.removeEventListener('mousemove', this.tracker.bind(this), false);
    if (this.hover) {
      this.timer = setTimeout(() => this.delay(this.el, e), this.props.timeout);
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: el => (this.el = el)
    });
  }
}

HoverIntent.defaultProps = {
  sensitivity: 7,
  interval: 100,
  timeout: 0
};

HoverIntent.propTypes = {
  children: PropTypes.node,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  sensitivity: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
  timeout: PropTypes.number.isRequired
};

export default HoverIntent;
