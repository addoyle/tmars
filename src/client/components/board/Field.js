import React, { Component } from 'react';
import './Field.scss';
import { Tile, Resource, Param } from '../assets/Assets'
import Tharsis from './Tharsis';

/**
 * Mars, i.e. the playing field
 */
export default class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: [],
      phobos: {},
      ganymede: {}
    }
  }

  componentDidMount() {
    this.setState({ field: Tharsis });
  }

  render() {
    const { field, phobos, ganymede } = this.state;

    /**
     * Renders a resource on a space
     *
     * @param resource Resource array to be renderd
     * @param i        Index of resource to render
     * @return Rendered resource
     */
    const renderResource = (resource, i) => {
      if (resource && resource[i]) {
        if (resource[i] === 'card') {
          return (<Param name="card back" />);
        } else if (resource[i] === 'ocean') {
          return (<Tile name="ocean" />);
        } else {
          return (<Resource name={resource[i]} />);
        }
      } else {
        return (<Resource name="blank" />);
      }
    };

    if (field.length) {
      field[0][1].name = 'ocean-placed';
      field[0][1].type = 'ocean';

      field[2][0].name = 'greenery-placed';
      field[2][0].type = 'greenery';
      field[2][0].player = 1;
      field[2][1].name = 'greenery-placed';
      field[2][1].type = 'greenery';
      field[2][1].player = 2;
      field[2][2].name = 'greenery-placed';
      field[2][2].type = 'greenery';
      field[2][2].player = 3;
      field[2][3].name = 'greenery-placed';
      field[2][3].type = 'greenery';
      field[2][3].player = 4;
      field[2][4].name = 'greenery-placed';
      field[2][4].type = 'greenery';
      field[2][4].player = 5;

      field[3][0].name = 'city-placed';
      field[3][0].type = 'city';
      field[3][0].player = 1;
      field[3][1].name = 'city-placed';
      field[3][1].type = 'city';
      field[3][1].player = 2;
      field[3][2].name = 'city-placed';
      field[3][2].type = 'city';
      field[3][2].player = 3;
      field[3][3].name = 'city-placed';
      field[3][3].type = 'city';
      field[3][3].player = 4;
      field[3][4].name = 'city-placed';
      field[3][4].type = 'city';
      field[3][4].player = 5;
      field[3][5].player = 1;
      field[3][6].name = 'capital-placed';
      field[3][6].type = 'city';
      field[3][6].player = 1;

      field[4][0].name = 'special-placed';
      field[4][0].type = 'special';
      field[4][0].icon = 'volcano';
      field[4][0].player = 1;
      field[4][1].name = 'special-placed';
      field[4][1].type = 'special';
      field[4][1].icon = 'mine';
      field[4][1].player = 2;
      field[4][2].name = 'special-placed';
      field[4][2].type = 'special';
      field[4][2].icon = 'restricted';
      field[4][2].player = 3;
      field[4][3].name = 'special-placed';
      field[4][3].type = 'special';
      field[4][3].icon = 'nuclear';
      field[4][3].player = 4;
      field[4][4].name = 'special-placed';
      field[4][4].type = 'special';
      field[4][4].icon = 'mohole';
      field[4][4].player = 5;
      field[4][5].name = 'special-placed';
      field[4][5].type = 'special';
      field[4][5].icon = 'factory';
      field[4][5].player = 1;
      field[4][6].name = 'special-placed';
      field[4][6].type = 'special';
      field[4][6].icon = 'euro';
      field[4][6].player = 2;
      field[4][7].name = 'special-placed';
      field[4][7].type = 'special';
      field[4][7].icon = 'mars';
      field[4][7].player = 3;
      field[4][8].name = 'special-placed';
      field[4][8].type = 'special';
      field[4][8].icon = 'animal';
      field[4][8].player = 4;

      field[5][0].clickable = 'city';
      field[5][1].clickable = 'greenery';
      field[5][2].clickable = 'special';
      field[5][3].clickable = 'ocean';
      field[5][4].clickable = 'capital';
    }

    return (
      <div className="field">
        <div className="tiles">
          <div className="phobos row">
            <Tile
                name={phobos.player ? 'city-placed' : 'blank'}
                clickable={phobos.clickable ? 'city' : false}>
              {phobos.player ? (<Tile name="city" />) : ''}
              {!phobos.player ? (
                <div className="rewards">
                  <div className="resources"><Resource name="blank" /></div>
                  <div className="resources"><Resource name="blank" /></div>
                  <div className="resources"><Resource name="blank" /></div>
                  <img className="city" src="/icons/city.svg" />
                  <div className="text">Phobos Space Haven</div>
                </div>
              ) : ''}
              {phobos.player ? (<Resource name={`player-${phobos.player}`} />) : ''}
            </Tile>
          </div>

          <div className="ganymede row">
            <Tile
                name={ganymede.player ? 'city-placed' : 'blank'}
                clickable={ganymede.clickable ? 'city' : false}>
              {ganymede.player ? (<Tile name="city" />) : ''}
              {!ganymede.player ? (
                <div className="rewards">
                  <div className="resources"><Resource name="blank" /></div>
                  <div className="resources"><Resource name="blank" /></div>
                  <div className="resources"><Resource name="blank" /></div>
                  <img className="city" src="/icons/city.svg" />
                  <div className="text">Ganymede Colony</div>
                </div>
              ) : ''}
              {ganymede.player ? (<Resource name={`player-${ganymede.player}`} />) : ''}
            </Tile>
            <div className="dot">.</div>
          </div>

          {field.map(row => (
            <div className="row">
              {row.map(tile => (
                <Tile
                    name={`${tile.name || (tile.attrs && tile.attrs.indexOf('reserved-ocean') >= 0 ? 'reserved-ocean' : 'blank')} ${tile.icon || ''}`}
                    clickable={tile.clickable}>
                  {tile.name ? (<Tile name={tile.type} icon={tile.icon} />) : ''}
                  {!tile.name ? (
                    <div className="rewards">
                      <div className="resources">
                        {renderResource(tile.resources, 0)}
                      </div>
                      <div className="resources">
                        {renderResource(tile.resources, 1)}
                        <Resource name="blank" />
                        {renderResource(tile.resources, 2)}
                      </div>
                      <div className="resources">
                        {renderResource(tile.resources, 3)}
                      </div>
                      {tile.attrs && tile.attrs.indexOf('noctis-city') >= 0 ? (<img className="city" src="/icons/city.svg" />) : ''}
                      {tile.text ? (<div className="text">{tile.text}</div>) : ''}
                    </div>
                  ) : ''}
                  {tile.player ? (<Resource name={`player-${tile.player}`} />) : ''}
                </Tile>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
