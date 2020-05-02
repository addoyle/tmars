import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import HoverIntent from './HoverIntent';
import classnames from 'classnames';
import './Tooltip.scss';

const Tooltip = ({ msg, direction, children }) => {
  const [shown, setShown] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const tooltipRef = useRef(null);

  const positionTooltip = target => {
    let left = 0,
      top = 0;

    if (direction === 'bottom') {
      top = target.offsetTop + target.offsetHeight + 12;
      left =
        target.offsetLeft +
        target.offsetWidth / 2 -
        tooltipRef.current.offsetWidth / 2;
    }

    setTop(top);
    setLeft(left);
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
          'left-edge': left < 8,
          'top-edge': top < 8
        })}
        style={{
          left: Math.max(left, 8),
          top: Math.max(top, 8)
        }}
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
