import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './StandardProjects.scss';
import {
  Param,
  MegaCredit,
  Tile,
  Resource,
  Production
} from '../assets/Assets';
import classNames from 'classnames';

/**
 * Single standard project
 */
const StandardProject = inject('gameStore')(
  observer(props => {
    const player = props.gameStore.player;

    const [chooserOpen, openChooser] = useState(false);

    const canUse = Array.isArray(props.cost)
      ? player?.resources.megacredit >= props.cost[0] ||
        player?.resources[props.cost[1]] >= (player?.rates[props.cost[1]] || 8)
      : isNaN(props.cost)
      ? player?.cards.hand.length
      : player?.resources.megacredit >= props.cost;

    const action = () => {
      if (!canUse || props.gameStore.turn !== player?.number) {
        return;
      }

      if (Array.isArray(props.cost)) {
        openChooser(!chooserOpen);
      } else {
        props.gameStore.standardProject(props.name);
      }
    };

    return (
      <div className="row">
        <div className="cell">
          {Array.isArray(props.cost) ? (
            <>
              <div className="resources middle text-right p-rel stack-bottom">
                <span>{player?.rates[props.cost[1]] || 8}</span>
                <Resource name={props.cost[1]} />
              </div>
              <div className="resources middle text-right p-rel">
                <span className="sub small">OR</span>
                <MegaCredit value={props.cost[0]} modified={props.modified} />
              </div>
            </>
          ) : !isNaN(props.cost) ? (
            <div className="resources middle text-right">
              <MegaCredit value={props.cost} modified={props.modified} />
            </div>
          ) : (
            props.cost
          )}
        </div>
        <div className="cell middle">
          <div className="resources middle">
            <span className="arrow" />
          </div>
        </div>
        <div className="cell middle">
          <div className={classNames('flex', { city: props.name === 'City' })}>
            <div className="resources middle text-center col-1">
              {props.project}
            </div>
            <button
              className="standard-project middle"
              disabled={!canUse}
              onClick={() => action()}
            >
              {props.name}
            </button>
          </div>
        </div>
        <div className={classNames('cell chooser', { chooserOpen })}>
          <ul>
            <li
              className={classNames('resources', {
                disabled:
                  player?.resources[props.cost[1]] <
                  (player?.rates[props.cost[1]] || 8)
              })}
              onClick={() => {
                if (
                  player?.resources[props.cost[1]] >=
                  (player?.rates[props.cost[1]] || 8)
                ) {
                  openChooser(false);
                  props.gameStore.standardProject(props.name, {
                    resource: props.cost[1]
                  });
                }
              }}
            >
              <span>{player?.rates[props.cost[1]] || 8}</span>
              <Resource name={props.cost[1]} />
            </li>
            <li
              className={classNames('resources', {
                disabled: player?.resources.megacredit < props.cost[0]
              })}
              onClick={() => {
                if (player?.resources.megacredit >= props.cost[0]) {
                  openChooser(false);
                  props.gameStore.standardProject(props.name);
                }
              }}
            >
              <MegaCredit value={props.cost[0]} />
            </li>
          </ul>
        </div>
      </div>
    );
  })
);

StandardProject.propTypes = {
  gameStore: PropTypes.shape({
    player: PropTypes.shape({
      rates: PropTypes.object
    }),
    standardProject: PropTypes.func
  }),
  cost: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.array,
    PropTypes.node
  ]),
  project: PropTypes.node,
  name: PropTypes.string,
  title: PropTypes.string
};

/**
 * Standard Projects pane
 */
const StandardProjects = ({ gameStore }) => {
  return (
    <div
      className={classNames('standard-projects', {
        collapse: !gameStore.showStandardProjects
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className="header text-center">
        <button
          className="standard-project"
          onClick={() =>
            (gameStore.showStandardProjects = !gameStore.showStandardProjects)
          }
        >
          Standard Projects
        </button>
      </div>

      <div className="table">
        <StandardProject
          cost={
            <div className="resources middle text-right m-right">
              <span className="x">X</span>
              <Param name="card back" />
            </div>
          }
          name="Sell Patents"
          project={<MegaCredit value="X" />}
        />

        <StandardProject
          cost={gameStore.player?.rates.powerplant || 11}
          modified={gameStore.player?.rates.powerplant === 8}
          name="Power Plant"
          project={
            <Production>
              <div className="flex">
                <Resource name="power" />
              </div>
            </Production>
          }
        />

        <StandardProject
          cost={[14, 'heat']}
          name="Asteroid"
          project={<Param name="temperature" />}
        />

        <StandardProject
          cost={18}
          name="Aquifer"
          project={<Tile name="ocean" />}
        />

        <StandardProject
          cost={[23, 'plant']}
          name="Greenery"
          project={<Tile name="greenery" />}
        />

        <StandardProject
          cost={25}
          name="City"
          project={
            <>
              <Tile name="city" />
              <Production>
                <div className="flex">
                  <MegaCredit value="1" />
                </div>
              </Production>
            </>
          }
        />

        {gameStore.sets.includes('venus') ? (
          <StandardProject
            cost={15}
            name="Air Scrapping"
            project={<Param name="venus" />}
          />
        ) : null}

        {gameStore.variants.trSolo && gameStore.players.length === 1 ? (
          <StandardProject
            cost={16}
            name="Buffer Gas"
            project={<Resource name="tr" />}
          />
        ) : null}
      </div>
    </div>
  );
};

StandardProjects.propTypes = {
  gameStore: PropTypes.shape({
    sets: PropTypes.arrayOf(PropTypes.string),
    showStandardProjects: PropTypes.bool,
    player: PropTypes.shape({
      rates: PropTypes.shape({
        powerplant: PropTypes.number
      })
    }),
    players: PropTypes.array,
    standardProject: PropTypes.func,
    variants: PropTypes.shape({
      trSolo: PropTypes.bool
    })
  })
};

export default inject('gameStore')(observer(StandardProjects));
