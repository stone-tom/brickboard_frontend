import * as React from 'react';
import { mount } from 'enzyme';
import IndexPage from '../pages/index';
import { ThemeProvider } from 'styled-components';
import main from '../themes/main';

describe('Pages', () => {
  describe('Index', () => {
    it('should render without throwing an error', () => {
      const wrap = mount(
        <ThemeProvider theme={main}>
          <IndexPage />
        </ThemeProvider>
      )
      expect(wrap.find('h1').text()).toBe('Hello Dude');
    })
  })
});