import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Browse from '../Browse';
import { StaticRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const setup = propOverrides => {
  const context = {};
  const wrapper = shallow(
    <StaticRouter location={{ pathname: '/browse' }} context={context} >
      <MuiThemeProvider>
        <Browse />
      </MuiThemeProvider>
    </StaticRouter>
  );

  return {
    wrapper,
    BrowseFilter: wrapper.find('BrowseFilter'),
    BrowseList: wrapper.find('BrowseList'),
    BrowseListItem: wrapper.find('BrowseListItem')
  };
};

describe('Browse component', () => {
  test('render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  xtest('renders filter', () => {
    const { BrowseFilter } = setup();
    expect(BrowseFilter.exists()).toBe(true);
  });

  xtest('renders list of results', () => {
    const { BrowseList } = setup();
    expect(BrowseList.exists()).toBe(true);
  });
  
  xtest('new user is directed to signup start', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={[ '/signup/start' ]}>
        <App/>
      </MemoryRouter>);
    console.log(wrapper);
    expect(wrapper.find('SignUpStart')).toHaveLength(1);
  });

  xtest('returning owner is directed to browse', () => {
    const { Browse } = setup({ owner: true });
    expect(Browse).toHaveLength(1);
  });

  xtest('returning walker is directed to calendar', () => {
    const { Calendar } = setup({ walker: true });
    expect(Calendar).toHaveLength(1);
  });

  // describe('test', () => {
  //   test('handleSubmit called when search is submitted', () => {
  //     sinon.spy(test.prototype, 'handleSubmit');
  //     const subComponent = mount(<subComponent />);
  //     subComponent.find('form').simulate('submit');
  //     expect(test.prototype.handleSubmit.calledOnce).toBe(true);
  //   });
});
