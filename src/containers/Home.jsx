import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchAllStations,
  addFavorite,
  removeFavorite,
  updateSearch
} from '../actions/stationActions';

import SearchBox from '../components/SearchBox';
import SearchResult from '../components/SearchResult';
import Favorites from '../components/Favorites';

class Home extends Component {
  componentDidMount() {
    this.props.fetchAllStations();
  }

  render() {
    const {
      addFavorite,
      removeFavorite,
      searchResult,
      favorites,
      updateSearch
    } = this.props;
    return (
      <div className="container">
        <Favorites
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favorites={favorites}
        />
        <SearchBox updateSearch={updateSearch} />
        <SearchResult
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          stations={searchResult}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stations: state.stationReducer.stations,
  searchResult: state.stationReducer.searchResult,
  favorites: state.stationReducer.favorites
});

const mapDispatchToProps = {
  fetchAllStations,
  addFavorite,
  removeFavorite,
  updateSearch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
