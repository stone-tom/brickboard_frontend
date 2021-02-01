import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../themes/main';
import Overlay from '../elements/core/components/Overlay/Overlay';

describe('Render Overlay Component with children', () => {

  it('renders correctly', () => {
    const overlay = mount((
      <ThemeProvider theme={main}>
        <Overlay>
          <p>This is a test</p>
        </Overlay>
      </ThemeProvider>
    ));

    expect(overlay.find(Overlay).length).toBe(1);
    expect(overlay.find('p').length).toBe(1);
    expect(overlay.find('p').children().text()).toBe('This is a test');

  });
});
