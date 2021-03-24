import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import OverlayBody from './OverlayBody';

describe('Render OverlayBody Component with children', () => {
  it('renders correctly', () => {
    const overlayBody = mount((
      <ThemeProvider theme={main}>
        <OverlayBody>
          <p>This is a test</p>
        </OverlayBody>
      </ThemeProvider>
    ));

    expect(overlayBody.find(OverlayBody).length).toBe(1);
    expect(overlayBody.find('p').children().text()).toBe('This is a test');
  });
});
