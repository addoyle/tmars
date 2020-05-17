import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { inject, observer } from 'mobx-react';
import './MilestoneAward.scss';
import { MegaCredit, VictoryPoint, Resource, Tag } from '../assets/Assets';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import { toJS } from 'mobx';

/**
 * Milestone/Awards pane
 */
const MilestoneAward = props => {
  const [collapse, setCollapse] = useState(true);
  const milestones = toJS(props.gameStore.field.milestones);
  const awards = toJS(props.gameStore.field.awards);

  // Add in new Venus Next awards/milestones
  if (props.gameStore.sets.includes('venus')) {
    milestones.push({
      name: 'Hoverlord',
      getValue: player =>
        player.cards.active
          .concat([player.corp])
          .filter(card => card.resources.type === 'floater')
          .reduce((sum, card) => sum + card.resources, 0),
      icon: <Resource name="floater" />,
      requirement: 7,
      description: 'Have at least 7 floater resources on cards',
      color: '#226695',
      highlight: 'rgba(103,155,203,1)'
    });
    awards.push({
      name: 'Venuphile',
      getValue: player => player.tags.venus,
      icon: <Tag name="venus" />,
      description: 'Have the most venus tags in play'
    });
  }

  return (
    <div
      className={classNames('milestone-awards', { collapse })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <div className="header text-center">
        <button
          className="milestone-award btn"
          onClick={() => setCollapse(!collapse)}
        >
          Milestones/Awards
        </button>
      </div>

      <div>
        <div className="flex gutter center section-header">
          <div className="text-right resources col-1 middle">
            <Tooltip arrow title="1st claim">
              <span>
                <MegaCredit value="8" />
              </span>
            </Tooltip>
            <Tooltip arrow title="2nd claim">
              <span>
                <MegaCredit value="8" />
              </span>
            </Tooltip>
            <Tooltip arrow title="3rd claim">
              <span>
                <MegaCredit value="8" />
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
          {milestones.map((milestone, i) => (
            <div className="col-1" key={milestone.name}>
              <Tooltip
                arrow
                title={milestone.description}
                placement={i === 0 ? 'bottom-start' : 'bottom'}
              >
                <div className="milestone">
                  <div className="milestone-icon inline-flex">
                    <div className="requirement middle">
                      {milestone.label || milestone.requirement}
                    </div>
                    <div className="milestone-img middle">{milestone.icon}</div>
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
                        backgroundColor: milestone.color,
                        boxShadow: `0 -12px 12px 0 ${milestone.highlight} inset`
                      }
                    }
                  >
                    {milestone.name}
                  </div>
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>

      <div className="m-top p-top">
        <div className="flex gutter center section-header">
          <div className="text-right resources col-1 middle">
            <Tooltip arrow title="1st funder">
              <span>
                <MegaCredit value="8" />
              </span>
            </Tooltip>
            <Tooltip arrow title="2nd funder">
              <span>
                <MegaCredit value="14" />
              </span>
            </Tooltip>
            <Tooltip arrow title="3rd funder">
              <span>
                <MegaCredit value="20" />
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
          {awards.map((award, i) => (
            <div className="col-1" key={award.name}>
              <Tooltip
                arrow
                title={award.description}
                placement={i === 0 ? 'bottom-start' : 'bottom'}
              >
                <div className="award">
                  <div className="award-img">{award.icon}</div>
                  <div className="label">{award.name}</div>
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

MilestoneAward.propTypes = {
  gameStore: PropTypes.shape({
    sets: PropTypes.arrayOf(PropTypes.string),
    field: PropTypes.shape({
      milestones: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          getValue: PropTypes.func,
          icon: PropTypes.node,
          requirement: PropTypes.number,
          description: PropTypes.string,
          label: PropTypes.string,
          hue: PropTypes.number
        })
      ),
      awards: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          icon: PropTypes.node,
          description: PropTypes.string
        })
      )
    })
  })
};

export default inject('gameStore')(observer(MilestoneAward));
