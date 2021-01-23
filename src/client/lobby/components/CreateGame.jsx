import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { observer, inject } from 'mobx-react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FieldSet from './FieldSet';
import { Resource } from '../../game/components/assets/Assets';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles(theme =>
  createStyles({
    marker: {
      marginBottom: theme.spacing(1)
    }
  })
);

const CreateGame = ({ gameStore }) => {
  const [name, setName] = useState('');
  const [expansions, setExpansions] = useState({
    corporate: true,
    venus: false,
    prelude: true,
    promo: true
  });
  const [variants, setVariants] = useState({
    draft: true,
    corporate: true,
    wgt: false
  });
  const [board, setBoard] = useState('Tharsis');
  const [players, setPlayers] = useState([]);

  const toggleExpansion = exp =>
    setExpansions({ ...expansions, [exp]: !expansions[exp] });
  const toggleVariant = variant =>
    setVariants({ ...variants, [variant]: !variants[variant] });
  const setPlayer = (i, name) => {
    const p = [...players];
    p[i] = name;
    setPlayers(p);
  };

  const classes = useStyles();

  const createGame = () => {
    const game = {
      id: name,
      players,
      variants,
      board,
      sets: Object.entries(expansions)
        .filter(([, value]) => value)
        .map(([key]) => key)
    };
    gameStore.createGame(game);
  };

  return (
    <>
      <Typography component="h2" variant="h6" gutterBottom>
        Create a Game
      </Typography>
      <form autoComplete="off">
        <Paper variant="outlined">
          <Box p={2}>
            <TextField
              label="Game Name"
              required
              fullWidth
              onChange={e => setName(e.target.value)}
              value={name}
            />

            <Box mt={4}>
              <FieldSet label="Expansions" fullWidth>
                <FormControl>
                  <FormControlLabel
                    label="Corporate Era"
                    checked={expansions.corporate}
                    onChange={() => toggleExpansion('corporate')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    label="Venus Next"
                    checked={expansions.venus}
                    onChange={() => toggleExpansion('venus')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    label="Preludes"
                    checked={expansions.prelude}
                    onChange={() => toggleExpansion('prelude')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    label="Promo Cards"
                    checked={expansions.promo}
                    onChange={() => toggleExpansion('promo')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>
              </FieldSet>
            </Box>

            <Box mt={4}>
              <FieldSet label="Variants" fullWidth>
                <FormControl>
                  <FormControlLabel
                    label="Draft"
                    checked={variants.draft}
                    onChange={() => toggleVariant('draft')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    label="Corporate Era"
                    checked={variants.draft}
                    disabled={!expansions.corporate}
                    onChange={() => toggleVariant('corporate')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>

                <FormControl>
                  <FormControlLabel
                    label="World Government Terraforming"
                    checked={variants.wgt}
                    disabled={!expansions.venus}
                    onChange={() => toggleVariant('wgt')}
                    control={<Switch color="primary" />}
                  />
                </FormControl>
              </FieldSet>
            </Box>

            <Box mt={4}>
              <FieldSet label="Board" fullWidth>
                <ToggleButtonGroup
                  value={board}
                  exclusive
                  color="primary"
                  onChange={(e, newBoard) => setBoard(newBoard)}
                >
                  <ToggleButton
                    value="Tharsis"
                    classes={{ label: 'board-button tharsis' }}
                  >
                    Tharsis
                  </ToggleButton>
                  <ToggleButton
                    value="Elysium"
                    classes={{ label: 'board-button elysium' }}
                  >
                    Elysium
                  </ToggleButton>
                  <ToggleButton
                    value="Hellas"
                    classes={{ label: 'board-button hellas' }}
                  >
                    Hellas
                  </ToggleButton>
                </ToggleButtonGroup>
              </FieldSet>
            </Box>

            <Box mt={4}>
              <FieldSet label="Player Names" fullWidth>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item className={classes.marker}>
                    <Resource name="player-1" />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      fullWidth
                      label="Player 1"
                      required
                      onChange={e => setPlayer(0, e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item className={classes.marker}>
                    <Resource name="player-2" />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      fullWidth
                      label="Player 2"
                      disabled={!players[0]}
                      onChange={e => setPlayer(1, e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item className={classes.marker}>
                    <Resource name="player-3" />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      fullWidth
                      label="Player 3"
                      disabled={!players[1]}
                      onChange={e => setPlayer(2, e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item className={classes.marker}>
                    <Resource name="player-4" />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      fullWidth
                      label="Player 4"
                      disabled={!players[2]}
                      onChange={e => setPlayer(3, e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item className={classes.marker}>
                    <Resource name="player-5" />
                  </Grid>
                  <Grid item sm>
                    <TextField
                      fullWidth
                      label="Player 5"
                      disabled={!players[3]}
                      onChange={e => setPlayer(4, e.target.value)}
                    />
                  </Grid>
                </Grid>
              </FieldSet>
            </Box>

            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<FontAwesomeIcon icon="rocket" />}
                onClick={() => createGame()}
              >
                Create Game
              </Button>
            </Box>
          </Box>
        </Paper>
      </form>
    </>
  );
};

CreateGame.propTypes = {
  gameStore: PropTypes.shape({
    createGame: PropTypes.func
  })
};

export default inject('gameStore')(observer(CreateGame));
