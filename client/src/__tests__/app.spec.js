import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../app';
import { MemoryRouter } from 'react-router';

const setup = propOverrides => {
  const props = Object.assign({
    loggedIn: true,
    userInfo: {},
    walker: false,
    owner: false
  }, propOverrides);

  const wrapper = shallow(<App {...props} />);

  return {
    props,
    wrapper,
    AppBar: wrapper.find('AppBar'),
    SignUpStart: wrapper.find('<Route exact path="/signup/start" component={SignUpStart}/>'),
    Browse: wrapper.find('Browse'),
    Calendar: wrapper.find('Calendar'),
  };
};

xdescribe('Main App', () => {
  test('render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
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
