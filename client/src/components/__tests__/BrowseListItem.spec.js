import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BrowseListItem from '../BrowseListItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import sinon from 'sinon';

const setup = propOverrides => {
  const selectWalkSpy = sinon.spy();
  const props = Object.assign({
    start_owner: '2017-09-21T15:00:00.000Z',
    end_owner: '2017-09-21T16:00:00.000Z',
    walk: {
      id: 554,
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
    index: 0,
    selectWalk: selectWalkSpy
  }, propOverrides);

  const wrapper = mount(
    <MuiThemeProvider>
      <BrowseListItem {...props} />
    </MuiThemeProvider>
  );

  return {
    props,
    wrapper,
    selectWalkSpy,
    button: wrapper.find('button')
  };
};

describe('BrowseListItem component', () => {
  test('render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  test('renders checkout button', () => {
    const { button } = setup();
    expect(button).toHaveLength(1);
  });

  test('clicking Proceed to Checkout triggers walk selection', () => {
    const { button, selectWalkSpy } = setup();
    button.simulate('click');
    expect(selectWalkSpy.calledOnce).toBe(true);
  });
});
