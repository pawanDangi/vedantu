import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Card from './Card';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function List({ data, onStatusChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.map((d, i) => (
          <Grid key={`${d.isbn}-${i}`} item xs={3}>
            <Paper className={classes.paper}>
              <Card data={d} onStatusChange={onStatusChange} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
