import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../themes/main';
import TextInput from './TextInput';
import { ClearButton } from '../elements/core/components/FormInput/FormInput.styles';
import { act } from 'react-dom/test-utils';


describe('Render TextInput Component', () => {

  it('renders correctly', () => {
    const textInput = mount((
      <ThemeProvider theme={main}>
        <TextInput name="username" placeholder="Max" type="text">Username</TextInput>
      </ThemeProvider>
    ));

    expect(textInput.find(TextInput).length).toBe(1);
    expect(textInput.find('label').text()).toBe('Username:');
    expect(textInput.find(TextInput).prop('required')).toBeFalsy();
  });

  it('renders a required TextInput correctly', () => {
    const textInput = mount((
      <ThemeProvider theme={main}>
        <TextInput name="username" placeholder="Max" type="text" required>Username</TextInput>
      </ThemeProvider>
    ));

    expect(textInput.find(TextInput).length).toBe(1);
    expect(textInput.find(TextInput).prop('required')).toBeTruthy();
    expect(textInput.find('label').text()).toBe('Username: *');

  });

  it('renders a clearable TextInput correctly and clears onClick', () => {
    const textInput = mount((
      <ThemeProvider theme={main}>
        <TextInput clearable name="username" placeholder="Max" type="text">Username</TextInput>
      </ThemeProvider>
    ));

    expect(textInput.find(TextInput).length).toBe(1);
    expect(textInput.find(TextInput).prop('clearable')).toBeTruthy();
    expect(textInput.find('label').text()).toBe('Username:');
    expect(textInput.find(ClearButton).length).toBe(1);
  });
}); 



