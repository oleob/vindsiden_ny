import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StationPreview from './StationPreview';

class Favorites extends Component {
  render() {
    const { addFavorite, removeFavorite } = this.props;

    return (
      <div>
        <h1>Favoritter</h1>
        {this.props.favorites.length > 0 && (
          <div>
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
        {this.props.favorites.length === 0 && (
          <p>
            Du har ingen favoritter. Trykk på stjernen ved navnet til en stasjon
            for å legge den til som favoritt.
          </p>
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
