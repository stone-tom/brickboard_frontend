import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import Button from './Button';

describe('Render Button Component', () => {
  it('renders correctly', () => {
    const button = mount((
      <ThemeProvider theme={main}>
        <Button>Button</Button>
      </ThemeProvider>
    ));

    expect(button.find(Button).length).toBe(1);
    expect(button.find(Button).children().text()).toBe('Button');
    expect(button.find(Button).props().disabled).toBe(undefined);
  });

  it('renders disabled button correctly', () => {
    const buttonDisabled = mount((
      <ThemeProvider theme={main}>
        <Button disabled>Button</Button>
      </ThemeProvider>
    ));

    expect(buttonDisabled.find(Button).length).toBe(1);
    expect(buttonDisabled.find(Button).children().text()).toBe('Button');
    expect(buttonDisabled.find(Button).props().disabled).toBe(true);
  });

  it('renders gray button correctly', () => {
    const buttonDisabled = mount((
      <ThemeProvider theme={main}>
        <Button gray>Button</Button>
      </ThemeProvider>
    ));

    expect(buttonDisabled.find(Button).length).toBe(1);
    expect(buttonDisabled.find(Button).children().text()).toBe('Button');
    expect(buttonDisabled.find(Button).props().gray).toBe(true);
  });

  it('renders small button correctly', () => {
    const buttonDisabled = mount((
      <ThemeProvider theme={main}>
        <Button small>Button</Button>
      </ThemeProvider>
    ));

    expect(buttonDisabled.find(Button).length).toBe(1);
    expect(buttonDisabled.find(Button).children().text()).toBe('Button');
    expect(buttonDisabled.find(Button).props().small).toBe(true);
  });
});
