import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
    gridColumn: '1/4',
    gridRow: '1/2'
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes, history } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => history.push('/')}
          >
            <img src="/windonly.png" style={{ width: 35 }} />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Vindsiden
          </Typography>
          <Button color="inherit" onClick={() => history.push('/about')}>
            Om siden
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ButtonAppBar));
