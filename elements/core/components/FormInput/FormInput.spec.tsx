import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import FormInput from './FormInput';

describe('Render TextInput Component', () => {
  it('renders correctly', () => {
    const formInput = mount((
      <ThemeProvider theme={main}>
        <FormInput name="username" placeholder="Max" type="text">Username</FormInput>
      </ThemeProvider>
    ));

    expect(formInput.find(FormInput).length).toBe(1);
    expect(formInput.find('label').text()).toBe('Username:');
    expect(formInput.find(FormInput).prop('required')).toBeFalsy();
  });

  it('renders a required TextInput correctly', () => {
    const formInput = mount((
      <ThemeProvider theme={main}>
        <FormInput name="username" placeholder="Max" type="text" required>Username</FormInput>
      </ThemeProvider>
    ));

    expect(formInput.find(FormInput).length).toBe(1);
    expect(formInput.find(FormInput).prop('required')).toBeTruthy();
    expect(formInput.find('label').text()).toBe('Username: *');
  });
});
