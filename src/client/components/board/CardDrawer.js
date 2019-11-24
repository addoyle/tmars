import React, { Component } from 'react';
import './CardDrawer.scss';
import { Param, Resource } from '../assets/Assets';
import CardPreview from './CardPreview';
import { isString, capitalize } from 'lodash';

/**
 * Standard Projects pane
 */
export default class Hand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: props.type !== 'hand',
      selectedCard: 0,
      showActiveCard: false
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
    if (this.state.collapse) {
      this.props.drawers.filter(drawer => drawer.current !== this).forEach(drawer => drawer.current.setState({collapse: true}));
    }

    this.setState({collapse: !this.state.collapse});
  }

  cancelClick() {
    this.setState({ showActiveCard: false });
    setTimeout(() => this.setState({ selectedCard: 0 }), 500);
  }

  selectCard(selectedCard) {
    this.setState({ selectedCard, showActiveCard: true });
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
    const cards = this.props.cards.map(card => isString(card) ? { card } : card);

    return (
      <div className={`drawer ${this.state.collapse ? 'collapse' : ''}`} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <button className={`drawer-btn ${this.props.type}`} onClick={e => this.toggleCollapse()}>
          {this.props.type === 'hand' ? (
            <>
              <Param name="card back" />
              <Param name="card back" />
              <Param name="card back" />
              <span>Hand</span>
            </>
          ) : (
            <>
              <Param name={`card ${this.props.type}`} />
              <span>{capitalize(this.props.type)}</span>
            </>
          )}
        </button>

        <ul className="cards">
          {cards.map((card, i) => (
            <li key={i} onClick={() => this.selectCard(card.card)} className={`card-selector ${this.state.showActiveCard && card.card === this.state.selectedCard ? 'selected' : ''}`}>
              <CardPreview card={card.card} />
            </li>
          ))}
        </ul>

        <div
            className={`active-card ${this.state.showActiveCard ? 'show' : ''}`}
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
