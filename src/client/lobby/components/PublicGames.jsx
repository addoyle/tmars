import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import '../../game/components/cards/CardLayout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

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
  boardChip: {
    fontFamily: 'Prototype',
    letterSpacing: '.2em',
    textTransform: 'uppercase'
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

const PublicGames = ({ gameStore }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const details = game => (
    <>
      <div className={classes.sets}>
        {game.sets.map(set => (
          <Tooltip key={set} title={setBlurbs[set]}>
            <div className={classnames('set', set)} />
          </Tooltip>
        ))}
      </div>
      <Chip
        className={classnames(classes.chip, classes.boardChip)}
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
    </>
  );

  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Public Games
      </Typography>
      <Paper className={classes.list} variant="outlined">
        {gameStore.publicGames.map(game => (
          <ExpansionPanel
            expanded={expanded === game.id}
            onChange={() => setExpanded(expanded === game.id ? false : game.id)}
            key={game.id}
          >
            <ExpansionPanelSummary>
              <div className={classes.gameTitle}>
                {game.name}
                <Chip
                  className={classes.chip}
                  size="small"
                  label={game.started ? 'In Progress' : 'Waiting for players'}
                  color={game.started ? 'default' : 'primary'}
                />
              </div>
              {expanded !== game.id && details(game)}
              <div className={classes.occupancy}>
                ({game.players}/{game.max})
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className={classes.details}>{details(game)}</div>
              {!game.started && game.players < game.max && (
                <div className={classes.actions}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<FontAwesomeIcon icon="rocket" />}
                    size="large"
                  >
                    Join Game
                  </Button>
                </div>
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Paper>
    </>
  );
};

PublicGames.propTypes = {
  gameStore: PropTypes.shape({
    publicGames: PropTypes.arrayOf({
      name: PropTypes.string,
      id: PropTypes.string,
      sets: PropTypes.arrayOf(PropTypes.string),
      started: PropTypes.bool,
      board: PropTypes.string,
      max: PropTypes.number,
      players: PropTypes.number
    })
  })
};

export default inject('gameStore')(observer(PublicGames));
