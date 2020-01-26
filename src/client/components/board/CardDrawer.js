import React, { Component } from 'react';
import './CardDrawer.scss';
import { Param, Resource } from '../assets/Assets';
import CardPreview from './CardPreview';
import { isString } from 'lodash';
import classNames from 'classnames';

/**
 * Card drawer
 */
export default class CardDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: props.collapse || props.collapse === undefined,
      selectedCard: 0,
      showActiveCard: false
    };

    // Handle if dragging leaves the browser window
    document.addEventListener('mouseout', (e) => {
      e = e ? e : window.event;
      const from = e.relatedTarget || e.toElement;
      if (!from || from.nodeName === 'HTML') {
        this.setState({dragging: false});
      }
    }, false);
  }

  toggleCollapse() {
    // close other drawers
    if (this.state.collapse) {
      this.props.drawers
        .filter(drawer => drawer.current !== this)
        .forEach(drawer => drawer.current.setState({collapse: true}));
    }

    this.setState({
      collapse: !this.state.collapse,

      // also close card popup
      showActiveCard: false,
      selectedCard: 0
    });
  }

  cancelClick() {
    this.setState({ showActiveCard: false });
    setTimeout(() => this.setState({ selectedCard: 0 }), 500);
  }

  selectCard(selectedCard) {
    this.setState({ selectedCard, showActiveCard: true });
  }

  startDragging = () => this.setState({dragging: true});
  stopDragging = () => this.setState({dragging: false});
  drag = (e) => {
    if (this.state.dragging) {
      this.refs.selectedCard.style.left = (this.refs.selectedCard.offsetLeft + e.movementX) + 'px';
      this.refs.selectedCard.style.top = (this.refs.selectedCard.offsetTop + e.movementY) + 'px';
    }
  }

  render() {
    const cards = this.props.cards.map(card => isString(card) ? { card } : card);

    return (
      <div className={classNames('drawer', { collapse: this.state.collapse })} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        <button className={classNames('drawer-btn', this.props.type)} onClick={() => this.toggleCollapse()}>
          {this.props.tab}
        </button>

        <ul className="cards">
          {cards.map((card, i) =>
            <li key={i} onClick={() => this.selectCard(card)} className={classNames('card-selector', { selected: this.state.showActiveCard && card.card === this.state.selectedCard.card })}>
              <CardPreview card={card.card} resources={card.resources} />
            </li>
          )}
        </ul>

        <div
            className={classNames('active-card', { show: this.state.showActiveCard})}
            ref="selectedCard"
            onMouseDown={this.startDragging}
            onMouseUp={this.stopDragging}
            onMouseMove={this.drag}
            onMouseLeave={this.stopDragging}>
          {this.state.selectedCard ? (<CardPreview {...this.state.selectedCard} />) : ''}
          <div className="footer">
            {['active', 'hand'].indexOf(this.props.type) >= 0 ?
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
            : null}

            <div className="flex gutter">
              {this.props.type === 'hand' ?
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
              : null}
              <button className="text-center col-1" onClick={e => this.cancelClick()}>
                {['active', 'hand'].indexOf(this.props.type) >= 0 ? 'Cancel' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
