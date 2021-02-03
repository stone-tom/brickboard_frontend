import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../themes/main';
import Prompt from '../elements/core/container/Prompt/Prompt';
import { OverlayHeadline, OverlayBody } from '../elements/core/components/OverlayBody/OverlayBody.styles';
import { PromptButton } from '../elements/core/container/Prompt/Prompt.styles';
import { Overlay } from '../elements/core/components/Overlay/Overlay.styles';
import { act } from '@testing-library/react';


describe('Render Prompt Component', () => {

  it('renders correctly', () => {
  
    const prompt = mount((
      <ThemeProvider theme={main}>
        <Prompt
          headline="headline"
        >
          test-message
        </Prompt>
      </ThemeProvider>
    ));

    expect(prompt.find(OverlayHeadline).length).toBe(1);
    expect(prompt.find(PromptButton).length).toBe(2);
    expect(prompt.find(Overlay).length).toBe(1);
    expect(prompt.find(OverlayBody).length).toBe(1);
    expect(prompt.find(OverlayBody).children().text()).toBe('headlinetest-messageAbbrechenBestätigen')
  });

  it('renders named buttons correctly', () => {
  
    const prompt = mount((
      <ThemeProvider theme={main}>
        <Prompt
          acceptText="Accept"
          declineText="Decline"
          headline="headline"
        >
          test-message
        </Prompt>
      </ThemeProvider>
    ));

    expect(prompt.find(OverlayHeadline).length).toBe(1);
    expect(prompt.find(PromptButton).length).toBe(2);
    expect(prompt.find(Overlay).length).toBe(1);
    expect(prompt.find(OverlayBody).length).toBe(1);
    expect(prompt.find(OverlayBody).children().text()).toBe('headlinetest-messageDeclineAccept')
  });

  it('calls onDecline correctly', () => {
    
    const onDeclineMock = jest.fn();
    const prompt = mount((
      <ThemeProvider theme={main}>
        <Prompt
          headline="headline"
          onDecline={onDeclineMock}
        >
          test-message
        </Prompt>
      </ThemeProvider>
    ));

    const cancelButton = prompt.find('button').first();
    expect(cancelButton.length).toBe(1);

    act(() => {
      cancelButton.simulate('click');
    });

    expect(onDeclineMock).toHaveBeenCalledTimes(1);
  });

  it('calls onAccept correctly', () => {
    
    const onAcceptMock = jest.fn();
    const prompt = mount((
      <ThemeProvider theme={main}>
        <Prompt
          headline="headline"
          onAccept={onAcceptMock}
        >
          test-message
        </Prompt>
      </ThemeProvider>
    ));

    const acceptButton = prompt.find('button').at(1);
    expect(acceptButton.length).toBe(1);

    act(() => {
      acceptButton.simulate('click');
    });

    expect(onAcceptMock).toHaveBeenCalledTimes(1);
  });
});