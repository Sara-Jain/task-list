/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';

const onClick = jest.fn();

describe('Button', () => {
  it('renders button component', () => {
    const text = 'click me';
    // const onClick = jest.fn();
    render(<Button onClick={onClick}>{text}</Button>);
  });
});
