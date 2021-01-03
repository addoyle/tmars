import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

const LogText = forwardRef((props, ref) => {
  const [msg, setMsg] = useState('');

  const playerNum = props.gameStore.player?.number;

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

  return (
    <div className="form">
      <textarea
        placeholder="Message..."
        onChange={e => setMsg(e.target.value)}
        value={msg}
        ref={ref}
      />
    </div>
  );
});

LogText.propTypes = {
  logStore: PropTypes.shape({
    postLog: PropTypes.func
  }),
  gameStore: PropTypes.shape({
    player: PropTypes.shape({
      number: PropTypes.number
    })
  })
};

export default inject('logStore', 'gameStore')(LogText);
