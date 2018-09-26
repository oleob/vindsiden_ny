import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBox extends Component {
  state = {
    searchTerm: ''
  };

  handleChange = event => {
    const searchTerm = event.target.value;
    this.props.updateSearch(searchTerm);
    this.setState({
      searchTerm
    });
  };

  render() {
    return (
      <div>
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
