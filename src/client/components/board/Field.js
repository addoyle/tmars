import React, { Component } from 'react';
import './Board.scss';
import { Tile, Resource, Param } from '../assets/Assets'
import Tharsis from './Tharsis';

export default class Field extends Component {
  render() {
    const field = Tharsis;

    // for (var i = 0; i < 9; i++) {
    //   tharsis.push([]);
    //   var n = 9 - Math.abs(i + 5 - 9);
    //   for (var j = 0; j < n; j++) {
    //     tharsis[i].push(<Tile name="blank" />);
    //   }
    // }

    // TODO: Parse out things from Tharsis.js here

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

    return (
      <div className="field">
        <div className="tiles">
          {field.map(row => (
            <div className="row">
              {row.map(tile => (
                <Tile
                  name={tile.attrs && tile.attrs.indexOf('reserved-ocean') >= 0 ? 'reserved-ocean' : 'blank'}>
                  {!tile.name ? (
                    <div>
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
                    </div>
                  ) : ''}
                  {tile.attrs && tile.attrs.indexOf('noctis-city') >= 0 ? (<img className="noctis" src="/icons/city.svg" />) : ''}
                  {tile.text ? (<div className="text">{tile.text}</div>) : ''}
                </Tile>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
