import React from 'react';
import PropTypes from 'prop-types';
import { MegaCredit, Resource, Production } from '../../assets/Assets';

/**
 * Render the resource portion of the player stats
 *
 * @param {*} props
 */
const Resources = props => {
  const { resources, production } = props;

  const playerBoard = [
    [
      {
        megacredit: {
          resource: resources.megacredit,
          production: production.megacredit
        }
      },
      {
        plant: {
          resource: resources.plant,
          production: production.plant
        }
      }
    ],
    [
      {
        steel: {
          resource: resources.steel,
          production: production.steel
        }
      },
      {
        power: {
          resource: resources.power,
          production: production.power
        }
      }
    ],
    [
      {
        titanium: {
          resource: resources.titanium,
          production: production.titanium
        }
      },
      {
        heat: {
          resource: resources.heat,
          production: production.heat
        }
      }
    ]
  ];

  return (
    <>
      <div className="title m-top text-center">Resources</div>
      <div className="flex gutter section">
        {playerBoard.map((col, i) => (
          <div className="col-1 text-center" key={i}>
            {col.map((resource, j) => {
              const key = Object.keys(resource)[0];
              const val = resource[key];

              return (
                <div key={j}>
                  <div className="resource-wrapper flex">
                    <div className="resources col-1 text-center p-rel">
                      {key === 'heat' ? (
                        <span className="arrow transfer" />
                      ) : null}
                      <span>{val.resource}</span>
                    </div>
                    <div className="resources col-1 text-center">
                      {key === 'megacredit' ? (
                        <MegaCredit />
                      ) : (
                        <Resource name={key} />
                      )}
                    </div>
                  </div>
                  <Production>
                    <div className="flex">
                      <span className="col-1 middle">{val.production}</span>
                      {key === 'megacredit' ? (
                        <MegaCredit />
                      ) : (
                        <Resource name={key} />
                      )}
                    </div>
                  </Production>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

Resources.propTypes = {
  resources: PropTypes.shape({
    megacredit: PropTypes.number,
    steel: PropTypes.number,
    titanium: PropTypes.number,
    plant: PropTypes.number,
    power: PropTypes.number,
    heat: PropTypes.number
  }),
  production: PropTypes.shape({
    megacredit: PropTypes.number,
    steel: PropTypes.number,
    titanium: PropTypes.number,
    plant: PropTypes.number,
    power: PropTypes.number,
    heat: PropTypes.number
  })
};

export default Resources;
