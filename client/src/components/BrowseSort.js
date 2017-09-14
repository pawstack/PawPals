import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  headline: {
    fontSize: 20,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const BrowseSort = (props) => (
  <div>
    <h2 style={styles.headline}>Sort By:</h2>
    <RadioButtonGroup name="sorting" defaultSelected="price" onChange={props.handleSortRadio} >
      <RadioButton
        value="price"
        label="Lowest Price"
      />
      <RadioButton
        value="session_start"
        label="Start Time"
      />
      <RadioButton
        value="avg_walker_rating"
        label="Rating"
      />
    </RadioButtonGroup>
  </div>
);

export default BrowseSort;
