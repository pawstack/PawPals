import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
  headline: {
    fontSize: 24,
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const BrowseSort = (props) => (
  <div>
    <h2 style={styles.headline}>Sort By:</h2>
    <RadioButtonGroup name="sorting" defaultSelected="price" onChange={props.handleSortRadio} style={{ display: 'flex' }}>
      <RadioButton
        value="price"
        label="Lowest Price"
        style={{ width: '20%' }}
      />
      <RadioButton
        value="startTime"
        label="Start Time"
        style={{ width: '20%' }}
      />
      <RadioButton
        value="rating"
        label="Rating"
        style={{ width: '20%' }}
      />
    </RadioButtonGroup>
  </div>
);

export default BrowseSort;
