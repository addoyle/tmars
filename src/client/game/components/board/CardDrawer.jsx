import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import './CardDrawer.scss';
import CardPreview from './CardPreview';
import { isString } from 'lodash';
import classNames from 'classnames';

/**
 * Card drawer
 */
const CardDrawer = props => {
  // const [selectedCard, setSelectedCard] = useState(0);
  // const [activeCardShown, setActiveCardShown] = useState(false);
  // const [dragging, setDragging] = useState(false);

  const gameStore = props.gameStore;

  // useEffect(() => {
  //   // Handle if dragging leaves the browser window

  //   const mouseout = e => {
  //     e = e ? e : window.event;
  //     const from = e.relatedTarget || e.toElement;
  //     if (!from || from.nodeName === 'HTML') {
  //       this.setState({ dragging: false });
  //     }
  //   };
  //   document.addEventListener('mouseout', mouseout, false);
  // });

  // toggleCollapse() {
  //   // close other drawers
  //   if (this.state.collapse) {
  //     this.props.drawers
  //       .filter((drawer) => drawer.current !== this)
  //       .forEach((drawer) => drawer.current.setState({ collapse: true }));
  //   }

  //   this.setState({
  //     collapse: !this.state.collapse,

  //     // also close card popup
  //     showActiveCard: false,
  //     selectedCard: 0
  //   });
  // }

  // cancelClick() {
  //   this.setState({ showActiveCard: false });
  //   setTimeout(() => this.setState({ selectedCard: 0 }), 500);
  // }

  // selectCard(selectedCard) {
  //   this.setState({ selectedCard, showActiveCard: true });
  // }

  // startDragging = () => this.setState({ dragging: true });
  // stopDragging = () => this.setState({ dragging: false });
  // drag = e => {
  //   if (this.state.dragging) {
  //     this.refs.selectedCard.style.left =
  //       this.refs.selectedCard.offsetLeft + e.movementX + 'px';
  //     this.refs.selectedCard.style.top =
  //       this.refs.selectedCard.offsetTop + e.movementY + 'px';
  //   }
  // };

  const cards = props.cards.map(card => (isString(card) ? { card } : card));
  let cardType = 'project';
  if (props.type === 'corp') {
    cardType = 'corp';
  }
  if (props.type === 'prelude') {
    cardType = 'prelude';
  }

  return (
    <div
      className={classNames('drawer', {
        collapse: gameStore.drawer !== props.type
      })}
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <button
        className={classNames('drawer-btn', props.type)}
        onClick={() => gameStore.switchDrawer(props.type)}
      >
        {props.tab}
      </button>

      <ul className="cards">
        {cards.map((card, i) => (
          <li
            key={i}
            onClick={() => gameStore.showActiveCard(card.card)}
            className={classNames('card-selector', {
              selected:
                gameStore.activeCard.show &&
                card.card === gameStore.activeCard.card,
              landscape: cardType === 'prelude'
            })}
          >
            <CardPreview
              card={card.card}
              resources={card.resources}
              type={cardType}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CardDrawer.propTypes = {
  tab: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  type: PropTypes.string,
  cards: PropTypes.array,
  gameStore: PropTypes.shape({
    drawer: PropTypes.string,
    switchDrawer: PropTypes.func,
    activeCard: PropTypes.shape({
      card: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      show: PropTypes.bool
    }),
    showActiveCard: PropTypes.func
  })
};

export default inject('gameStore')(observer(CardDrawer));
