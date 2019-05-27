import React from 'react';
import './Assets.scss';
import Tag from './Tag.js';

function renderReq(req) {
  if (req.tag) {
    return (
      <Tag name={req.tag} />
    );
  }
}

export default function Requirement(props) {
  return (
    <div className={`requirement ${props.max ? 'max' : ''}`}>
      {props.values.map((req, i) => (
        <span key={i}>{req.text ? req.text : renderReq(req)}</span>
      ))}
    </div>
  );
}
