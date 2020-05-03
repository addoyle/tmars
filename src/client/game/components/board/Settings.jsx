import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import './Settings.scss';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Tooltip from '../../../util/Tooltip';

const Settings = ({ gameStore }) => {
  const [shown, setShown] = useState(false);

  return (
    <div
      className={classnames('settings-wrapper', { shift: gameStore.drawer })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className={classnames('settings', { shown })}>
        <a href="/" className="row">
          <div className="icon">
            <FontAwesomeIcon icon="arrow-left" fixedWidth />
          </div>
          <div className="label">Back to Lobby</div>
        </a>
      </div>

      <div className="control" onClick={() => setShown(!shown)}>
        <Tooltip msg="Settings" direction="left">
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
