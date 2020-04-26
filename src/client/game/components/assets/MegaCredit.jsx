import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Euro logo to display when no value is set
const euro = <span className="euro">&euro;</span>;

/**
 * MegaCredit
 *
 * @prop value  Value to display on MC icon
 * @prop anyone Boolean, true affects anyone (red border), otherwise false
 */
const MegaCredit = props => (
  <div className={classNames('mc', { anyone: props.anyone })}>
    <span className="value">
      {props.value === undefined ? euro : props.value}
    </span>
  </div>
);

MegaCredit.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  anyone: PropTypes.bool
};

export default MegaCredit;
