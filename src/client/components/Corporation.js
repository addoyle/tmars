import React from 'react';
import './Corporation.scss';
import Card from './Card';
import Tag from './assets/Tag';

export default class Corporation extends Card {

  render() {
    return (
      <Card set={this.props.set} landscape>
        <div className="tags">{this.props.tags.map(tag => ( <Tag key={tag} name={tag} /> ))}</div>
        <div className="corp">
          <div className="title">{this.props.title}</div>
          {this.props.children}
        </div>
      </Card>
    )
  }
}
