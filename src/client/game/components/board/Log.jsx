import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './Log.scss';
import CardRef from './CardRef';
import ScrollToBottom from 'react-scroll-to-bottom';
import classNames from 'classnames';
import Markdown from 'react-markdown';
import { isPlainObject } from 'lodash';
import { subscribe, gameId } from '../../../util/api';
import { Tile, Param, Resource, Tag, MegaCredit } from '../assets/Assets';

/**
 * The chat log/game history
 */
const Log = forwardRef((props, ref) => {
  const { logStore, gameStore } = props;
  const [msg, setMsg] = useState('');

  const playerNum = new URLSearchParams(window.location.search).get('player');

  // Attach events
  useEffect(() => {
    const keydown = e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();

        if (msg) {
          props.logStore.postLog({
            player: +playerNum,
            body: msg
          });
          setMsg('');
        }
      }
    };
    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('keydown', keydown);
    };
  });

  // Init
  useEffect(() => {
    logStore.fetchLogs();

    let eventSource = subscribe(
      `log/${gameId()}/stream`,
      log => (logStore.log = logStore.log.concat(log))
    );

    return () => eventSource.close();
  }, []);

  return (
    <div
      className="log"
      onMouseDown={e => e.stopPropagation()}
      onMouseMove={e => e.stopPropagation()}
    >
      <ScrollToBottom className="msgs" followButtonClassName="follow-button">
        {gameStore.players?.length
          ? logStore.log?.map((msg, i) => (
              <div
                key={i}
                className={classNames(
                  'msg',
                  { system: msg.system },
                  msg.opts?.classNames || []
                )}
              >
                {msg.player ? (
                  <span
                    className={classNames('strong', `player-${msg.player}`)}
                  >
                    {gameStore.players[msg.player - 1].name}
                  </span>
                ) : null}
                {msg.system ? '' : ': '}
                {(Array.isArray(msg.body) ? msg.body : [msg.body]).map(
                  (body, i) => {
                    if (isPlainObject(body)) {
                      if (body.player) {
                        return (
                          <span
                            key={i}
                            className={`strong player-${body.player}`}
                          >
                            {gameStore.players[body.player - 1].name}
                          </span>
                        );
                      } else if (body.tile) {
                        return <Tile key={i} name={body.tile} />;
                      } else if (body.param) {
                        return <Param key={i} name={body.param} />;
                      } else if (body.standardProject) {
                        return (
                          <span key={i} className="standard-project">
                            {body.standardProject}
                          </span>
                        );
                      } else if (body.resource) {
                        return <Resource key={i} name={body.resource} />;
                      } else if (body.tag) {
                        return <Tag key={i} name={body.tag} />;
                      } else if (body.megaCredit !== undefined) {
                        return <MegaCredit key={i} value={body.megaCredit} />;
                      } else if (body.reveal) {
                        return (
                          <CardRef
                            key={i}
                            type="project"
                            card={`revealed ${body.reveal.length} cards`}
                            onClick={() => gameStore.revealCards(body.reveal)}
                          />
                        );
                      } else if (body.super) {
                        return <sup>{body.super}</sup>;
                      } else {
                        const type = Object.keys(body).filter(key =>
                          ['corp', 'prelude', 'project'].includes(
                            key.toLocaleLowerCase()
                          )
                        )[0];

                        return (
                          <CardRef
                            key={i}
                            type={type}
                            card={body[type]}
                            onClick={() =>
                              body.drawer
                                ? gameStore.switchDrawer(body.drawer)
                                : null
                            }
                          />
                        );
                      }
                    } else {
                      return (
                        <Markdown
                          key={i}
                          className="log-inline"
                          source={body?.toString() || ''}
                          plugins={[require('remark-external-links')]}
                        />
                      );
                    }
                  }
                )}
              </div>
            ))
          : null}
      </ScrollToBottom>
      <div className="form">
        <textarea
          placeholder="Message..."
          onChange={e => setMsg(e.target.value)}
          value={msg}
          ref={ref}
        />
      </div>
    </div>
  );
});

Log.propTypes = {
  logStore: PropTypes.shape({
    postLog: PropTypes.func,
    fetchLogs: PropTypes.func,
    log: PropTypes.array
  }),
  gameStore: PropTypes.shape({
    players: PropTypes.array,
    switchDrawer: PropTypes.func,
    revealCards: PropTypes.func
  })
};

export default inject('logStore', 'gameStore')(observer(Log));
