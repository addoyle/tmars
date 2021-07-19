import React, { useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import './Log.scss';
import CardRef from './CardRef';
import ScrollToBottom from 'react-scroll-to-bottom';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { isPlainObject, repeat } from 'lodash';
import { subscribe, gameId } from '../../../util/api';
import { Tile, Param, Resource, Tag, MegaCredit } from '../assets/Assets';
import LogText from './LogText';

const preserveSpaces = str =>
  str.replace(
    /^( *)(.*?)( *)$/,
    ($0, $1, $2, $3) =>
      repeat('&nbsp;', $1.length) + $2 + repeat('&nbsp;', $3.length)
  );

/**
 * The chat log/game history
 */
const Log = forwardRef((props, ref) => {
  const { logStore, gameStore } = props;

  // Init
  useEffect(() => {
    logStore.fetchLogs();

    let eventSource = subscribe(`log/${gameId()}/stream`, log =>
      logStore.update(log)
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
                      } else if (body.milestone) {
                        return (
                          <span key={i} className="milestone">
                            {body.milestone}
                          </span>
                        );
                      } else if (body.award) {
                        return (
                          <span key={i} className="award">
                            {body.award}
                          </span>
                        );
                      } else if (body.resource) {
                        return <Resource key={i} name={body.resource} />;
                      } else if (body.tag) {
                        return <Tag key={i} name={body.tag} />;
                      } else if (body.megacredit !== undefined) {
                        return <MegaCredit key={i} value={body.megacredit} />;
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
                        return <sup key={i}>{body.super}</sup>;
                      } else {
                        const type = Object.keys(body).find(key =>
                          ['corp', 'prelude', 'project'].includes(key)
                        );

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
                      return body === ' ' ? (
                        ' '
                      ) : (
                        <ReactMarkdown
                          key={i}
                          className="log-inline"
                          plugins={[require('remark-gfm')]}
                        >
                          {preserveSpaces(body?.toString()) || ''}
                        </ReactMarkdown>
                      );
                    }
                  }
                )}
              </div>
            ))
          : null}
      </ScrollToBottom>
      <LogText ref={ref} />
    </div>
  );
});

Log.propTypes = {
  logStore: PropTypes.shape({
    fetchLogs: PropTypes.func,
    log: PropTypes.array,
    update: PropTypes.func
  }),
  gameStore: PropTypes.shape({
    players: PropTypes.array,
    switchDrawer: PropTypes.func,
    revealCards: PropTypes.func
  })
};

export default inject('logStore', 'gameStore')(observer(Log));
