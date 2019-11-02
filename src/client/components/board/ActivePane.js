import React, { Component } from 'react';
import './Hand.scss';
import { Param, Resource } from '../assets/Assets';
import CardPreview from './CardPreview';

/**
 * Standard Projects pane
 */
export default class Hand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      cards: Array.from({length: 17}, () => Math.floor(Math.random() * 212) + 1),
      selectedCard: 0
    };

    this.startDragging = this.startDragging.bind(this);
    this.stopDragging = this.stopDragging.bind(this);
    this.drag = this.drag.bind(this);

    // Handle if dragging leaves the browser window
    const mouseleave = (e) => {
      e = e ? e : window.event;
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        this.setState({dragging: false});
      }
    };
    if (document.addEventListener) {
      document.addEventListener('mouseout', mouseleave, false);
    } else if (document.attachEvent) {
      document.attachEvent('onmouseout', mouseleave);
    }
  }

  toggleCollapse() {
    this.setState({collapse: !this.state.collapse});
  }

  cancelClick() {
    this.setState({ selectedCard: 0 })
  }

  selectCard(selectedCard) {
    this.setState({ selectedCard });
  }

  startDragging() {
    this.setState({dragging: true});
  }

  stopDragging(e) {
    this.setState({dragging: false});
  }

  drag(e) {
    if (this.state.dragging) {
      this.refs.selectedCard.style.left = (this.refs.selectedCard.offsetLeft + e.movementX) + 'px';
      this.refs.selectedCard.style.top = (this.refs.selectedCard.offsetTop + e.movementY) + 'px';
    }
  }

  render() {
    return (
      <div className={`hand ${this.state.collapse ? 'collapse' : ''}`} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <button className="hand-btn" onClick={e => this.toggleCollapse()}>
          <Param name="card back" />
          <Param name="card back" />
          <Param name="card back" />
          <span>Hand</span>
        </button>

        { !this.state.collapse ? (
          <ul className="cards">
            {this.state.cards.map(card => (
              <li onClick={e => this.selectCard(card)} class={`card-selector ${card === this.state.selectedCard ? 'selected' : ''}`}>
                <CardPreview card={card} simple />
              </li>
            ))}
          </ul>
        ) : ''}

        <div
            className={`active-card ${this.state.selectedCard ? 'show' : ''}`}
            ref="selectedCard"
            onMouseDown={this.startDragging}
            onMouseUp={this.stopDragging}
            onMouseMove={this.drag}
            onMouseLeave={this.stopDragging}>
          {this.state.selectedCard ? (<CardPreview card={this.state.selectedCard} />) : ''}
          <div className="footer">
            <button>
              <div className="flex">
                <div className="resources middle">
                  <Resource name="titanium" />
                </div>
                <span className="col-1 center middle">
                  Use Resource
                </span>
                <div className="pill middle">
                  <span>0/2</span>
                </div>
              </div>
            </button>

            <div className="flex gutter">
              <button className="primary col-1 disabled">
                <div className="flex">
                  <div className="resources middle">
                    <Param name="card back" />
                  </div>
                  <span className="center middle">
                    Play Card
                  </span>
                </div>
              </button>
              <button className="text-center col-1" onClick={e => this.cancelClick()}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
