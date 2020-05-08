import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './Settings.scss';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const Settings = ({ gameStore }) => {
  const [shown, setShown] = useState(false);

  return (
    <div
      className={classnames('settings-wrapper', { shift: gameStore.drawer })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className={classnames('settings', { shown })}>
        <Link to="/" className="row">
          <div className="icon">
            <FontAwesomeIcon icon="arrow-left" fixedWidth />
          </div>
          <div className="label">Back to Lobby</div>
        </Link>
      </div>

      <div className="control" onClick={() => setShown(!shown)}>
        <Tooltip arrow title="Settings" placement="left">
          <span>
            <FontAwesomeIcon icon="cog" />
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

Settings.propTypes = {
  gameStore: PropTypes.shape({
    drawer: PropTypes.string
  })
};

export default inject('gameStore')(observer(Settings));
