import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import '../../game/components/cards/CardLayout.scss';
import Player from '../../game/components/board/players/Player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(theme => ({
  list: {
    overflowY: 'auto',
    padding: theme.spacing(2),
    backgroundColor: '#383838'
  },
  gameTitle: {
    flexGrow: 1,
    textOverflow: 'ellipsis'
  },
  details: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  chip: {
    margin: theme.spacing(0, 1)
  },
  statusChip: {
    cursor: 'pointer'
  },
  boardChip: {
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    cursor: 'pointer'
  },
  occupancy: {
    color: theme.palette.warning.main,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  sets: {
    display: 'flex',
    alignSelf: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
      position: 'static',
      fontSize: 12,
      alignSelf: 'center'
    }
  },
  actions: {
    '& button': {
      fontFamily: 'Prototype'
    }
  }
}));

const setBlurbs = {
  corporate: 'Corporate Era',
  promo: 'Promo Cards',
  prelude: 'Preludes',
  venus: 'Venus Next',
  colonies: 'Colonies',
  turmoil: 'Turmoil'
};

const gameStates = {
  notStarted: 0,
  inProgress: 1,
  complete: 2
};

const Games = ({ gameStore }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState('');

  useEffect(() => {
    // Get the current games
    gameStore.getGames();
  }, []);

  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Games
      </Typography>
      <Paper className={classes.list} variant="outlined">
        {gameStore.games.map(game => {
          const gameState = ['end', 'score'].includes(game.phase)
            ? gameStates.complete
            : ['research', 'action'].includes(game.phase)
            ? gameStates.inProgress
            : gameStates.notStarted;

          return (
            <Accordion
              expanded={expanded === game.id}
              onChange={() =>
                setExpanded(expanded === game.id ? false : game.id)
              }
              key={game.id}
            >
              <AccordionSummary>
                <div className={classes.gameTitle}>
                  <Typography component="span" variant="h6">
                    {game.id}
                  </Typography>
                  <Tooltip
                    arrow
                    title={
                      ['Not Started', 'In Game', 'Game Complete'][gameState]
                    }
                  >
                    <Chip
                      className={classnames(classes.chip, classes.statusChip)}
                      size="small"
                      label={
                        <FontAwesomeIcon
                          icon={['globe', 'clock', 'tree'][gameState]}
                        />
                      }
                      color={['default', 'primary', 'secondary'][gameState]}
                    />
                  </Tooltip>
                </div>
                <div className={classes.sets}>
                  {game.sets.map(set => (
                    <Tooltip key={set} title={setBlurbs[set]}>
                      <div className={classnames('set', set)} />
                    </Tooltip>
                  ))}
                </div>
                <Chip
                  className={classnames(
                    classes.chip,
                    classes.boardChip,
                    game.board.toLowerCase()
                  )}
                  size="small"
                  label={game.board}
                  style={{
                    backgroundColor: {
                      Tharsis: '#f07e25',
                      Hellas: '#0ab6e8',
                      Elysium: '#68bc67'
                    }[game.board]
                  }}
                />
                <ul className="game-variants">
                  {Object.keys(game.variants).map(key => (
                    <li key={`${game.id}-${key}`}>
                      <Chip size="small" label={key} variant="outlined" />
                    </li>
                  ))}
                </ul>
                <div className={classes.occupancy}>({game.players.length})</div>
              </AccordionSummary>
              <AccordionDetails>
                <ul className="game-players">
                  {game.players.map(player => (
                    <li className="" key={`${game.id}-${player.name}`}>
                      <Player
                        pid={player.number}
                        player={player}
                        active={player.number === game.turn}
                        onClick={() =>
                          (window.location = `/game/${game.id}?player=${player.number}`)
                        }
                      />
                      &mdash;{' '}
                      <Typography
                        variant="h6"
                        component="span"
                        className="corporation"
                      >
                        {player.corp}
                      </Typography>
                    </li>
                  ))}
                </ul>
                <div className="del-btn">
                  <IconButton
                    color="primary"
                    onClick={() => setConfirmOpen(game.id)}
                  >
                    <FontAwesomeIcon icon="trash-alt" />
                  </IconButton>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
        {!gameStore.games.length ? (
          <span className="quiet">No games to list&hellip;</span>
        ) : null}
      </Paper>
      <Dialog open={!!confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Delete {confirmOpen}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {confirmOpen}?
          </DialogContentText>
          <DialogActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                gameStore.deleteGame(confirmOpen);
                setConfirmOpen(false);
                setTimeout(() => gameStore.getGames(), 1000);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              autoFocus
              onClick={() => setConfirmOpen(false)}
            >
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

Games.propTypes = {
  gameStore: PropTypes.shape({
    games: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        sets: PropTypes.arrayOf(PropTypes.string),
        board: PropTypes.string,
        players: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            number: PropTypes.number,
            tr: PropTypes.number
          })
        )
      })
    ),
    getGames: PropTypes.func,
    deleteGame: PropTypes.func
  })
};

export default inject('gameStore')(observer(Games));
