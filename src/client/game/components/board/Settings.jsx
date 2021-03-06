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
  const player = gameStore.player;

  return (
    <div
      className={classnames('settings-wrapper', {
        shift: player?.ui.drawer,
        empty:
          player?.ui.drawer &&
          !player?.cards[player?.ui.drawer]?.length &&
          !(player?.ui.drawer === 'hand' && player?.cards.buy.length),
        buy: player?.ui.drawer === 'hand' && player?.cards.buy.length
      })}
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

        <div
          className="row a"
          onClick={() =>
            (gameStore.settings.simple = !gameStore.settings.simple)
          }
        >
          <div className="icon">
            <FontAwesomeIcon
              icon={gameStore.settings.simple ? 'toggle-on' : 'toggle-off'}
              fixedWidth
            />
          </div>
          <div className="label">Simple Graphics</div>
        </div>
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
    player: PropTypes.shape({
      cards: PropTypes.objectOf(PropTypes.array),
      ui: PropTypes.shape({
        drawer: PropTypes.string
      })
    }),
    settings: PropTypes.shape({
      simple: PropTypes.bool
    })
  })
};

export default inject('gameStore')(observer(Settings));
