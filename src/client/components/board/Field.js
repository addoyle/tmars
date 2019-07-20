import React, { Component } from 'react';
import './Field.scss';
import { Tile, Resource, Param } from '../assets/Assets'
import Tharsis from './Tharsis';

export default class Field extends Component {
  render() {
    const field = Tharsis;

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
    field[4][0].clickable = 'city';
    field[4][1].clickable = 'greenery';
    field[4][2].clickable = 'special';
    field[4][3].clickable = 'ocean';
    field[4][4].clickable = 'capital';

    return (
      <div className="field">
        <div className="tiles">
          {field.map(row => (
            <div className="row">
              {row.map(tile => (
                <Tile
                  name={tile.name || (tile.attrs && tile.attrs.indexOf('reserved-ocean') >= 0 ? 'reserved-ocean' : 'blank')}
                  clickable={tile.clickable}>
                  {tile.name ? (<Tile name={tile.type} oxygen={tile.type === 'greenery'} />) : ''}
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
                      {tile.attrs && tile.attrs.indexOf('noctis-city') >= 0 ? (<img className="noctis" src="/icons/city.svg" />) : ''}
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
