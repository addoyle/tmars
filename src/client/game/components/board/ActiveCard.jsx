import React from 'react';
import { observer, inject } from 'mobx-react';
import CardPreview from './CardPreview';
import { Resource, Param } from '../assets/Assets';
import classnames from 'classnames';

const ActiveCard = props => {
  return (
    <div
      className={classnames('active-card', {
        show: this.state.showActiveCard
      })}
      ref="selectedCard"
      onMouseDown={this.startDragging}
      onMouseUp={this.stopDragging}
      onMouseMove={this.drag}
      onMouseLeave={this.stopDragging}
    >
      {this.state.selectedCard ? (
        <CardPreview {...this.state.selectedCard} type={cardType} />
      ) : (
        ''
      )}
      <div className="footer">
        {['active', 'hand'].indexOf(this.props.type) >= 0 ? (
          <button>
            <div className="flex">
              <div className="resources middle">
                <Resource name="titanium" />
              </div>
              <span className="col-1 center middle">Use Resource</span>
              <div className="pill middle">
                <span>0/2</span>
              </div>
            </div>
          </button>
        ) : null}

        <div className="flex gutter">
          {this.props.type === 'hand' ? (
            <button className="primary col-1 disabled">
              <div className="flex">
                <div className="resources middle">
                  <Param name="card back" />
                </div>
                <span className="center middle">Play Card</span>
              </div>
            </button>
          ) : null}
          <button
            className="text-center col-1"
            onClick={e => this.cancelClick()}
          >
            {['active', 'hand'].indexOf(this.props.type) >= 0
              ? 'Cancel'
              : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default inject('gameStore')(observer(ActiveCard));
