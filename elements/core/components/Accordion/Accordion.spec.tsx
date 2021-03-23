import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from 'styled-components';
import main from '../../../../themes/main';
import Accordion from './Accordion';
import { AccordionHeader, AccordionBody, ToggleButton } from './Accordion.styles';

const Test = () => (<>test</>);

describe('Render Accordion Component', () => {
  it('renders correctly', () => {
    const accordion = mount((
      <ThemeProvider theme={main}>
        <Accordion
          header={<>test</>}
        >
          <Test />
        </Accordion>
      </ThemeProvider>
    ));

    expect(accordion.find(AccordionHeader).text()).toBe('test');
    expect(accordion.find(AccordionBody).text()).toBe('');
  });

  it('renders with icon correctly', () => {
    const accordion = mount((
      <ThemeProvider theme={main}>
        <Accordion
          toggleIcon={faTimes}
          header={<>test</>}
        >
          <Test />
        </Accordion>
      </ThemeProvider>
    ));

    expect(accordion.find(AccordionHeader).text()).toBe('test');
    expect(accordion.find(AccordionHeader).find(ToggleButton).length).toBe(1);
    expect(accordion.find(AccordionBody).text()).toBe('');
  });

  it('opens correctly and closes again', () => {
    const accordion = mount((
      <ThemeProvider theme={main}>
        <Accordion
          header={<>test</>}
        >
          <Test />
        </Accordion>
      </ThemeProvider>
    ));

    act(() => {
      accordion.find(AccordionHeader).find('button').simulate('click');
    });

    accordion.update();

    expect(accordion.find(AccordionBody).text()).toBe('test');

    act(() => {
      accordion.find(AccordionHeader).find('button').simulate('click');
    });

    accordion.update();

    expect(accordion.find(AccordionBody).text()).toBe('');
  });
});
