import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StationPreview from './StationPreview';

class Favorites extends Component {
  render() {
    const { addFavorite, removeFavorite } = this.props;

    return (
      <div>
        {this.props.favorites.length > 0 && (
          <div>
            <h1>Favoritter</h1>
            <div className="stations">
              {this.props.favorites.map(station => (
                <StationPreview
                  key={station.StationID}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                  {...station}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Favorites;
