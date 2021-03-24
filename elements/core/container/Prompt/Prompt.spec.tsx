import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from '@testing-library/react';
import main from '../../../../themes/main';
import Prompt from './Prompt';
import { PromptButton } from './Prompt.styles';
import { StoreDispatchContext, StoreStateContext } from '../../../../context/custom_store';
import { OverlayBody, OverlayHeadline } from '../../components/OverlayBody/OverlayBody.styles';
import { Overlay } from '../../components/Overlay/Overlay.styles';

describe('Render Prompt Component', () => {
  it('renders correctly', () => {
    const initialState = {
      component: null,
    };
    const removeComponent = jest.fn();
    const prompt = mount((
      <ThemeProvider theme={main}>
        <StoreDispatchContext.Provider value={{ removeComponent }}>
          <StoreStateContext.Provider value={initialState}>
            <Prompt
              headline="headline"
            >
              test-message
            </Prompt>
          </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
      </ThemeProvider>
    ));

    expect(prompt.find(OverlayHeadline).length).toBe(1);
    expect(prompt.find(PromptButton).length).toBe(2);
    expect(prompt.find(Overlay).length).toBe(1);
    expect(prompt.find(OverlayBody).length).toBe(1);
    expect(prompt.find(OverlayBody).children().text()).toBe('headlinetest-messageAbbrechenBestätigen');
  });

  it('renders named buttons correctly', () => {
    const initialState = {
      component: null,
    };
    const removeComponent = jest.fn();
    const prompt = mount((
      <ThemeProvider theme={main}>
        <StoreDispatchContext.Provider value={{ removeComponent }}>
          <StoreStateContext.Provider value={initialState}>
            <Prompt
              acceptText="Accept"
              declineText="Decline"
              headline="headline"
            >
              test-message
            </Prompt>
          </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
      </ThemeProvider>
    ));

    expect(prompt.find(OverlayHeadline).length).toBe(1);
    expect(prompt.find(PromptButton).length).toBe(2);
    expect(prompt.find(Overlay).length).toBe(1);
    expect(prompt.find(OverlayBody).length).toBe(1);
    expect(prompt.find(OverlayBody).children().text()).toBe('headlinetest-messageDeclineAccept');
  });

  it('calls onDecline correctly', () => {
    const onDeclineMock = jest.fn();

    const initialState = {
      component: null,
    };
    const removeComponent = jest.fn();
    const prompt = mount((
      <ThemeProvider theme={main}>
        <StoreDispatchContext.Provider value={{ removeComponent }}>
          <StoreStateContext.Provider value={initialState}>
            <Prompt
              headline="headline"
              onDecline={onDeclineMock}
            >
              test-message
            </Prompt>
          </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
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
    const initialState = {
      component: null,
    };
    const removeComponent = jest.fn();
    const prompt = mount((
      <ThemeProvider theme={main}>
        <StoreDispatchContext.Provider value={{ removeComponent }}>
          <StoreStateContext.Provider value={initialState}>
            <Prompt
              headline="headline"
              onAccept={onAcceptMock}
            >
              test-message
            </Prompt>
          </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
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
