import React from 'react';
import './Corporation.scss';
import Card from './Card';
import { Tag } from './assets/Assets';

export default class Corporation extends Card {

  render() {
    return (
      <Card type="corp" set={this.props.set} landscape>
        <div className="tags">{this.props.tags.map(tag => ( <Tag key={tag} name={tag} /> ))}</div>
        <div className="corp-body">
          <div className="title" style={this.props.titleStyle}>{this.props.title}</div>
          <div className="body">
            {this.props.layout}
          </div>
          <div className="flavor bottom">{this.props.flavor}</div>
        </div>
      </Card>
    )
  }
}
