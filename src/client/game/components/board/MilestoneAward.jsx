import React from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import './MilestoneAward.scss';
import { MegaCredit, VictoryPoint, Resource, Tag } from '../assets/Assets';
import classnames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Tharsis from '../../../../shared/boards/Tharsis';
import Hellas from '../../../../shared/boards/Hellas';
import Elysium from '../../../../shared/boards/Elysium';

const boards = {
  Tharsis,
  Hellas,
  Elysium
};

/**
 * Milestone/Awards pane
 */
const MilestoneAward = ({ gameStore, cardStore }) => {
  const milestones = boards[gameStore?.board]?.milestones.slice() || [];
  const awards = boards[gameStore?.board]?.awards.slice() || [];
  const actionPhase = gameStore.phase === 'action';

  // Add in new Venus Next awards/milestones
  if (gameStore.sets.includes('venus')) {
    milestones.push({
      name: 'Hoverlord',
      icon: <Resource name="floater" />,
      requirement: 7,
      description: 'Have at least 7 floater resources on cards',
      color: '#226695',
      highlight: 'rgba(103,155,203,1)',
      qualifies: player =>
        player.cards.active
          .map(c => ({
            card: c,
            obj: cardStore.get('project', c.card)
          }))
          .concat(
            player.cards.corp.map(c => ({
              card: c,
              obj: cardStore.get('corp', c.card)
            }))
          )
          .filter(c => c?.obj?.resource === 'floater')
          .reduce((sum, c) => (sum += c.card.resource), 0) >= 7
    });
    awards.push({
      name: 'Venuphile',
      icon: <Tag name="venus" />,
      description: 'Have the most venus tags in play',
      value: player => player.tags.venus
    });
  }

  return (
    <div
      className={classnames('milestone-awards', {
        collapse: !gameStore.showMilestones
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className="header text-center">
        <button
          className="milestone-award btn"
          onClick={() => (gameStore.showMilestones = !gameStore.showMilestones)}
        >
          Milestones/Awards
        </button>
      </div>

      <div>
        <div className="flex gutter center section-header">
          <div className="claimers text-right resources col-1 middle">
            <Tooltip arrow title="1st claim">
              <span>
                <MegaCredit value="8" />
                {gameStore.milestones && gameStore.milestones[0] ? (
                  <Resource name={`player-${gameStore.milestones[0].player}`} />
                ) : null}
              </span>
            </Tooltip>
            <Tooltip arrow title="2nd claim">
              <span>
                <MegaCredit value="8" />
                {gameStore.milestones && gameStore.milestones[1] ? (
                  <Resource name={`player-${gameStore.milestones[1].player}`} />
                ) : null}
              </span>
            </Tooltip>
            <Tooltip arrow title="3rd claim">
              <span>
                <MegaCredit value="8" />
                {gameStore.milestones && gameStore.milestones[2] ? (
                  <Resource name={`player-${gameStore.milestones[2].player}`} />
                ) : null}
              </span>
            </Tooltip>
          </div>

          <div className="middle text-center">
            <div className="milestone-award inline-block">
              <span>Milestones</span>
            </div>
          </div>

          <div className="col-1 middle">
            <Tooltip arrow title="Claimer's prize">
              <div className="inline-block">
                <VictoryPoint>
                  <span className="point big">5</span>
                </VictoryPoint>
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="flex gutter">
          {milestones?.map((milestone, i) => {
            const qualifies = milestone.qualifies(gameStore?.player, gameStore);
            const claimed = gameStore.milestones?.some(
              m => m.name === milestone.name
            );
            const allClaimed = gameStore.milestones.length >= 3;

            const disabled =
              (!actionPhase ||
                !qualifies ||
                allClaimed ||
                gameStore?.player.resources.megacredit < 8) &&
              !claimed;
            const clickable =
              actionPhase &&
              qualifies &&
              !allClaimed &&
              !claimed &&
              gameStore.player?.number === gameStore.turn;

            return (
              <div className="col-1" key={milestone.name}>
                <Tooltip
                  arrow
                  title={milestone.description}
                  placement={i === 0 ? 'bottom-start' : 'bottom'}
                >
                  <div
                    className={classnames('milestone', { disabled })}
                    onClick={() =>
                      clickable && gameStore.claimMilestone(milestone.name)
                    }
                  >
                    <div className="milestone-icon inline-flex">
                      <div className="requirement middle">
                        {milestone.label || milestone.requirement}
                      </div>

                      <div className="milestone-img middle">
                        {milestone.icon}
                        {gameStore.milestones
                          ?.filter(m => m.name === milestone.name)
                          .map((m, i) => (
                            <Resource key={i} name={`player-${m.player}`} />
                          ))}
                      </div>

                      <div className="tm middle">
                        <svg viewBox="30 35 35 22">
                          <g xmlns="http://www.w3.org/2000/svg">
                            <path
                              style={{
                                stroke: 'black',
                                fill: 'none',
                                strokeWidth: '6px',
                                strokeLinejoin: 'bevel'
                              }}
                              d="M 38.5 56 L 38.511 37.35 L 30 37.4 L 51 37.4"
                            />
                            <path
                              style={{
                                strokeWidth: 6,
                                strokeLinejoin: 'bevel',
                                fill: 'none',
                                stroke: 'black'
                              }}
                              d="M 46 56 L 45.956 42.033 L 52.966 50.911 L 60.396 34.944 L 60.4 56"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div
                      className="label"
                      style={
                        milestone.style || {
                          background: milestone.color,
                          boxShadow: `0 -12px 12px 0 ${milestone.highlight} inset`
                        }
                      }
                    >
                      {milestone.name}
                    </div>
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>

      <div className="m-top p-top">
        <div className="flex gutter center section-header">
          <div className="funders text-right resources col-1 middle">
            <Tooltip arrow title="1st funder">
              <span>
                <MegaCredit value="8" />
                {gameStore.awards && gameStore.awards[0] ? (
                  <Resource name={`player-${gameStore.awards[0].player}`} />
                ) : null}
              </span>
            </Tooltip>
            <Tooltip arrow title="2nd funder">
              <span>
                <MegaCredit value="14" />
                {gameStore.awards && gameStore.awards[1] ? (
                  <Resource name={`player-${gameStore.awards[1].player}`} />
                ) : null}
              </span>
            </Tooltip>
            <Tooltip arrow title="3rd funder">
              <span>
                <MegaCredit value="20" />
                {gameStore.awards && gameStore.awards[2] ? (
                  <Resource name={`player-${gameStore.awards[2].player}`} />
                ) : null}
              </span>
            </Tooltip>
          </div>

          <div className="middle text-center">
            <div className="milestone-award inline-block">
              <span>Awards</span>
            </div>
          </div>

          <div className="col-1 middle">
            <Tooltip arrow title="Winner">
              <div className="inline-block">
                <VictoryPoint>
                  <span className="point big">5</span>
                </VictoryPoint>
              </div>
            </Tooltip>
            <Tooltip arrow title="Contender">
              <div className="inline-block">
                <VictoryPoint>
                  <span className="point big">2</span>
                </VictoryPoint>
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="flex gutter m-top">
          {awards?.map((award, i) => {
            const funded = gameStore.awards?.some(a => a.name === award.name);
            const allFunded = gameStore.awards.length >= 3;

            const disabled =
              (!actionPhase ||
                allFunded ||
                gameStore.player?.resources.megacredit <
                  8 + 6 * gameStore.awards.length) &&
              !funded;
            const clickable =
              actionPhase &&
              !allFunded &&
              !funded &&
              gameStore.player?.number === gameStore.turn;

            return (
              <div className="col-1" key={award.name}>
                <Tooltip
                  arrow
                  title={award.description}
                  placement={i === 0 ? 'bottom-start' : 'bottom'}
                >
                  <div
                    className={classnames('award', { disabled })}
                    onClick={() => clickable && gameStore.fundAward(award.name)}
                  >
                    <div className="award-img">
                      {award.icon}
                      {gameStore.awards
                        ?.filter(a => a.name === award.name)
                        .map((a, i) => (
                          <Resource key={i} name={`player-${a.player}`} />
                        ))}
                    </div>
                    <div className="label">{award.name}</div>
                  </div>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MilestoneAward.propTypes = {
  gameStore: PropTypes.shape({
    sets: PropTypes.arrayOf(PropTypes.string),
    board: PropTypes.string,
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        player: PropTypes.number
      })
    ),
    awards: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        player: PropTypes.number
      })
    ),
    showMilestones: PropTypes.bool,
    player: PropTypes.object,
    claimMilestone: PropTypes.func,
    fundAward: PropTypes.func,
    turn: PropTypes.number,
    phase: PropTypes.string
  }),
  cardStore: PropTypes.shape({
    get: PropTypes.func
  })
};

export default inject('gameStore', 'cardStore')(observer(MilestoneAward));
