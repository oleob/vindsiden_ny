import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PlaceIcon from '@material-ui/icons/Place';
import CityIcon from '@material-ui/icons/LocationCity';
import Button from '@material-ui/core/Button';

class StationPreview extends Component {
  toggleFavorite = () => {
    const { StationID, isFavorite, addFavorite, removeFavorite } = this.props;
    if (isFavorite) {
      removeFavorite(StationID);
    } else {
      addFavorite(StationID);
    }
  };

  render() {
    const { Name, Region, City, StationID, isFavorite, history } = this.props;
    return (
      <Paper className="stationPreview" key={StationID}>
        <List>
          <ListItem>
            {isFavorite ? (
              <Star className="favoriteIcon" onClick={this.toggleFavorite} />
            ) : (
              <StarBorder
                className="favoriteIcon"
                onClick={this.toggleFavorite}
              />
            )}
            <ListItemText primary={Name} />
          </ListItem>
          {Region.length > 0 && (
            <ListItem>
              <Avatar>
                <PlaceIcon />
              </Avatar>
              <ListItemText secondary={Region} />
            </ListItem>
          )}
          {City.length > 0 && (
            <ListItem>
              <Avatar>
                <CityIcon />
              </Avatar>
              <ListItemText secondary={City} />
            </ListItem>
          )}

          <Button
            variant="raised"
            size="large"
            color="primary"
            onClick={() => history.push('/station/' + StationID)}
          >
            Info
          </Button>
        </List>
      </Paper>
    );
  }
}

StationPreview.propTypes = {
  Name: PropTypes.string.isRequired,
  Region: PropTypes.string.isRequired,
  City: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired
};

StationPreview.defaultProps = {
  isFavorite: false
};

export default withRouter(StationPreview);
