import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class WindFilter extends Component {
  render() {
    const { filterValue, updateFilter } = this.props;
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Filter</FormLabel>
          <RadioGroup
            aria-label="Filter"
            value={filterValue}
            onChange={event => updateFilter(event.target.value)}
          >
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="Siste 5 timer"
            />
            <FormControlLabel
              value="24"
              control={<Radio />}
              label="Hele dagen"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default WindFilter;
