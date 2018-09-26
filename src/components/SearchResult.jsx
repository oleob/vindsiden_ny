import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StationPreview from './StationPreview';

class SearchResult extends Component {
  render() {
    const { addFavorite, removeFavorite } = this.props;

    return (
      <div>
        <h1>Stasjoner</h1>
        <div className="stations">
          {this.props.stations.map(station => (
            <StationPreview
              key={station.StationID}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
              {...station}
            />
          ))}
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  stations: PropTypes.arrayOf(PropTypes.shape({}))
};

export default SearchResult;
