import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import HoverIntent from './HoverIntent';
import classnames from 'classnames';
import './Tooltip.scss';

const Tooltip = ({ msg, direction, children }) => {
  const [shown, setShown] = useState(false);
  const [style, setStyle] = useState({});
  const tooltipRef = useRef(null);

  const positionTooltip = target => {
    let left, top, right, bottom;

    if (direction === 'bottom') {
      top = target.offsetTop + target.offsetHeight + 12;
      left =
        target.offsetLeft +
        target.offsetWidth / 2 -
        tooltipRef.current.offsetWidth / 2;
    } else if (direction === 'left') {
      top =
        target.offsetTop +
        target.offsetHeight / 2 -
        tooltipRef.current.offsetHeight / 2;
      right = target.offsetWidth + 12;
    }

    const style = {};
    if (left) {
      style.left = `${left}px`;
    }
    if (top) {
      style.top = `${top}px`;
    }
    if (right) {
      style.right = `${right}px`;
    }
    if (bottom) {
      style.bottom = `${bottom}px`;
    }

    setStyle(style);
  };

  return (
    <>
      <HoverIntent
        timeout={300}
        onMouseOver={e => {
          positionTooltip(e);
          setShown(true);
        }}
        onMouseOut={() => setShown(false)}
      >
        {children}
      </HoverIntent>
      <div
        className={classnames('tooltip', direction, {
          shown,
          'left-edge':
            tooltipRef.current &&
            tooltipRef.current.getBoundingClientRect().left < 8,
          'top-edge':
            tooltipRef.current &&
            tooltipRef.current.getBoundingClientRect().top < 8
        })}
        style={style}
        ref={tooltipRef}
      >
        {msg}
      </div>
    </>
  );
};

Tooltip.defaultProps = {
  direction: 'bottom'
};

Tooltip.propTypes = {
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
  direction: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  children: PropTypes.node.isRequired
};

export default Tooltip;
