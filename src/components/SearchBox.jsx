import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBox extends Component {
  state = {
    searchTerm: ''
  };

  handleChange = event => {
    const searchTerm = event.target.value;
    this.props.updateSearch(searchTerm.toLowerCase());
    this.setState({
      searchTerm
    });
  };

  render() {
    return (
      <div>
        <h1>Stasjoner</h1>
        <TextField
          label="Søk"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
      </div>
    );
  }
}

export default SearchBox;
