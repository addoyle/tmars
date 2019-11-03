import React, { Component } from 'react';
import './PlayerStats.scss';
import CardRef from './CardRef';
import { Tag, Tile, MegaCredit, Resource, Production } from '../assets/Assets';

/**
 * Player Stats pane
 *
 * Shows player's resources, tags, cards played, etc.
 */
export default class PlayerStats extends Component {
  render() {
    return (
      <div className={`player-stats ${this.props.show ? 'show' : ''} player-${this.props.pid}`} onMouseDown={e => e.stopPropagation()} onMouseMove={e => e.stopPropagation()}>
        {/* Corp title */}
        <div className="title-corp text-center m-top m-bottom">
          {this.props.player.corp ? (
            <CardRef type="corp" card={this.props.player.corp.number}>
              {this.props.player.corp.name}
            </CardRef>
          ) : ''}
          <div className="close" onClick={this.props.closeClick}>&times;</div>
        </div>


        {/* Resources */}
        <div className="title m-top text-center">Resources</div>

        <div className="flex gutter section">

          <div className="col-1 text-center">
            <div class="resource-wrapper flex">
              <div className="resources col-1 text-center">
                <span>{this.props.player.resources.mc}</span>
              </div>
              <div className="resources col-1 text-center">
                <MegaCredit />
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{this.props.player.production.mc}</span>
                <MegaCredit />
              </div>
            </Production>

            <div class="resource-wrapper flex">
              <div className="resources col-1 text-center">
                <span>{this.props.player.resources.pl}</span>
              </div>
              <div className="resources col-1 text-center">
                <Resource name="plant" />
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{this.props.player.production.pl}</span>
                <Resource name="plant" />
              </div>
            </Production>
          </div>

          <div className="col-1 text-center">
            <div class="resource-wrapper flex">
              <div className="resources col-1 text-center">
                <span>{this.props.player.resources.st}</span>
              </div>
              <div className="resources col-1 text-center">
                <Resource name="steel" />
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{this.props.player.production.st}</span>
                <Resource name="steel" />
              </div>
            </Production>

            <div class="resource-wrapper flex">
              <div className="resources col-1 text-center">
                <span>{this.props.player.resources.po}</span>
              </div>
              <div className="resources col-1 text-center">
                <Resource name="power" />
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{this.props.player.production.po}</span>
                <Resource name="power" />
              </div>
            </Production>
          </div>

          <div className="col-1 text-center">
            <div class="resource-wrapper flex">
              <div className="resources col-1 text-center">
                <span>{this.props.player.resources.ti}</span>
              </div>
              <div className="resources col-1 text-center">
                <Resource name="titanium" />
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{this.props.player.production.ti}</span>
                <Resource name="titanium" />
              </div>
            </Production>

            <div class="resource-wrapper flex">
              <div className="resources col-1 text-center p-rel">
                <span className="arrow transfer" />
                <span>{this.props.player.resources.he}</span>
              </div>
              <div className="resources col-1 text-center">
                <Resource name="heat" />
              </div>
            </div>
            <Production>
              <div className="flex">
                <span className="col-1 middle">{this.props.player.production.he}</span>
                <Resource name="heat" />
              </div>
            </Production>
          </div>
        </div>


        {/* Tags */}
        <div className="title m-top text-center">Tags</div>

        <div className="flex section">
          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.building}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="building" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.jovian}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="jovian" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.animal}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="animal" />
              </div>
            </div>
          </div>

          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.space}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="space" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.earth}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="earth" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.city}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="city" />
              </div>
            </div>
          </div>

          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.power}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="power" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.plant}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="plant" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.event}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="event" />
              </div>
            </div>
          </div>

          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.science}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="science" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.microbe}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="microbe" />
              </div>
            </div>
            <div class="flex">
              <div className="resources col-1 text-right">
                <span>{this.props.player.tags.venus}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tag name="venus" />
              </div>
            </div>
          </div>
        </div>

        {/* Tiles */}
        <div className="title m-top text-center">Tiles</div>

        <div className="flex section">
          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right middle">
                <span>{this.props.player.tiles.city}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tile name="city" />
              </div>
            </div>
          </div>
          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right middle">
                <span>{this.props.player.tiles.greenery}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tile name="greenery" />
              </div>
            </div>
          </div>
          <div className="col-1 text-center">
            <div class="flex">
              <div className="resources col-1 text-right middle">
                <span>{this.props.player.tiles.special}</span>
              </div>
              <div className="resources col-1 text-center">
                <Tile name="special" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
