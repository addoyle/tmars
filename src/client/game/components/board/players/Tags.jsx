import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '../../assets/Assets';

/**
 * Render the tags portion of the player stats
 *
 * @param {*} props
 */
const Tags = props => {
  const {
    building,
    space,
    power,
    science,
    jovian,
    earth,
    plant,
    microbe,
    animal,
    city,
    event,
    venus
  } = props.tags;

  const tags = [
    [{ building }, { jovian }, { animal }],
    [{ space }, { earth }, { city }],
    [{ power }, { plant }, { event }],
    [{ science }, { microbe }, { venus }]
  ];

  return (
    <>
      <div className="title m-top text-center">Tags</div>
      <div className="flex gutter section">
        {tags.map((col, i) => (
          <div className="col-1 text-center" key={i}>
            {col.map((tag, j) => {
              const key = Object.keys(tag)[0];
              const val = tag[key];

              return (
                <div className="flex" key={j}>
                  <div className="resources col-1 text-right">
                    <span>{val}</span>
                  </div>
                  <div className="resources col-1 text-center">
                    <Tag name={key} />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

Tags.propTypes = {
  tags: PropTypes.shape({
    building: PropTypes.number,
    space: PropTypes.number,
    power: PropTypes.number,
    science: PropTypes.number,
    jovian: PropTypes.number,
    earth: PropTypes.number,
    plant: PropTypes.number,
    microbe: PropTypes.number,
    animal: PropTypes.number,
    city: PropTypes.number,
    event: PropTypes.number,
    venus: PropTypes.number
  })
};

export default Tags;
