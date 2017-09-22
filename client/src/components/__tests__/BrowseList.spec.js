import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BrowseList from '../BrowseList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import sinon from 'sinon';

const setup = propOverrides => {
  const selectWalkSpy = sinon.spy();
  const props = Object.assign({
    walks: [
      {
        id: 1,
        latitude: '37.7819503',
        longitude: '-122.41117229999998',
        price: '20.00',
        session_end: '2017-09-21T20:00:00.000Z',
        session_end_walker: '2017-09-21T20:00:00.000Z',
        session_start: '2017-09-21T15:00:00.000Z',
        session_start_walker: '2017-09-21T15:00:00.000Z',
        walk_zone_pt: '944 Market Street, San Francisco, CA, United States',
        walk_zone_radius: '1',
        walker: {
          about_me: 'I\'m a dog walker, plain and simple.',
          avg_walker_rating: 4,
          display: 'Rory Upton',
          id: 1,
          profile_pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/vladimirdevic/128.jpg',
        },
        walker_id: 201
      },
      {
        id: 2,
        latitude: '37.7819503',
        longitude: '-122.41117229999998',
        price: '20.00',
        session_end: '2017-09-21T20:00:00.000Z',
        session_end_walker: '2017-09-21T20:00:00.000Z',
        session_start: '2017-09-21T15:00:00.000Z',
        session_start_walker: '2017-09-21T15:00:00.000Z',
        walk_zone_pt: '944 Market Street, San Francisco, CA, United States',
        walk_zone_radius: '1',
        walker: {
          about_me: 'I\'m a dog walker, plain and simple.',
          avg_walker_rating: 4,
          display: 'Rory Upton',
          id: 1,
          profile_pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/vladimirdevic/128.jpg',
        },
        walker_id: 201
      },
      {
        id: 3,
        latitude: '37.7819503',
        longitude: '-122.41117229999998',
        price: '20.00',
        session_end: '2017-09-21T20:00:00.000Z',
        session_end_walker: '2017-09-21T20:00:00.000Z',
        session_start: '2017-09-21T15:00:00.000Z',
        session_start_walker: '2017-09-21T15:00:00.000Z',
        walk_zone_pt: '944 Market Street, San Francisco, CA, United States',
        walk_zone_radius: '1',
        walker: {
          about_me: 'I\'m a dog walker, plain and simple.',
          avg_walker_rating: 4,
          display: 'Rory Upton',
          id: 1,
          profile_pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/vladimirdevic/128.jpg',
        },
        walker_id: 201
      }
    ],
    start_owner: '2017-09-21T15:00:00.000Z',
    end_owner: '2017-09-21T16:00:00.000Z',
    selectWalk: selectWalkSpy
  }, propOverrides);

  const wrapper = mount(
    <MuiThemeProvider>
      <BrowseList {...props} />
    </MuiThemeProvider>
  );

  return {
    props,
    wrapper,
    selectWalkSpy,
    button: wrapper.find('button'),
    title: wrapper.find('h2').text()
  };
};

describe('BrowseList component', () => {
  test('render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  test('renders all walks in the list', () => {
    const { button } = setup();
    expect(button).toHaveLength(3);
  });

  test('presents search results when found', () => {
    const { title } = setup();
    expect(title).toEqual('Search Results');
  });

  test('has a prompt to use filter when first visited', () => {
    const { title } = setup({walks: [], start_owner: null});
    expect(title).toEqual('Open the filter to start searching for walks!');
  });

  test('notifies a user when no search results are found', () => {
    const { title } = setup({walks: []});
    expect(title).toEqual('No walks found, try changing your filter options');
  });
});
