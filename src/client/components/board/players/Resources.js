import React from 'react';
import { MegaCredit, Resource, Production } from '../../assets/Assets';

/**
 * Render the resource portion of the player stats
 * 
 * @param {*} props 
 */
export default function Resources(props) {
  const resources = [
    [
      {'megacredit': { resource: props.resources.mc, production: props.production.mc }},
      {'plant': { resource: props.resources.pl, production: props.production.pl }}
    ],
    [
      {'steel': { resource: props.resources.st, production: props.production.st }},
      {'power': { resource: props.resources.po, production: props.production.po }}
    ],
    [
      {'titanium': { resource: props.resources.ti, production: props.production.ti }},
      {'heat': { resource: props.resources.he, production: props.production.he }}
    ]
  ];
  
  return <>
    <div className="title m-top text-center">Resources</div>
    <div className="flex gutter section">
      {resources.map((col, i) => <div className="col-1 text-center" key={i}>
        {col.map((resource, j) => {
          const key = Object.keys(resource)[0];
          const val = resource[key];

          return <div key={j}>
            <div className="resource-wrapper flex">
              <div className="resources col-1 text-center p-rel">
                {key === 'heat' ? <span className="arrow transfer" /> : null}
                <span>{val.resource}</span>
              </div>
              <div className="resources col-1 text-center">
                {key === 'megacredit' ? <MegaCredit /> : <Resource name={key} />}
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{val.production}</span>
                {key === 'megacredit' ? <MegaCredit /> : <Resource name={key} />}
              </div>
            </Production>
          </div>
        })}
      </div>)}
    </div>
  </>;
}