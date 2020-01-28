import React from 'react';
import { Tile } from '../../assets/Assets';

/**
 * Render the tiles portion of the player stats
 * 
 * @param {*} props 
 */
export default function Tiles(props) {
  const {
    city, greenery, special
   } = props.tiles;

  const tiles = [
    {city}, {greenery}, {special}
  ];
  
  return <>
    <div className="title m-top text-center">Tiles</div>
    <div className="flex section">
      {tiles.map((tile, i) => {
        const key = Object.keys(tile)[0];
        const val = tile[key];

        return <div className="col-1 text-center" key={i}>
          <div className="flex">
            <div className="resources col-1 text-right middle">
              <span>{val}</span>
            </div>
            <div className="resources col-1 text-center">
              <Tile name={key} />
            </div>
          </div>
        </div>;
      })}
    </div>
  </>;
}