/* eslint-disable max-len */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LISTS from '../../constants/list';
import { LISTS_ROUTE } from '../../constants/routes';
import List from '.';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockNavigate }));

describe('List', () => {
  it('should navigate to create list page when create list button is clicked', () => {
    // const navigationMock = jest.spyOn(ReactRouterDom.useNavigate, 'useNavigate').mockImplementation(() => () => {});
    render(<List listData={LISTS} />);
    fireEvent.click(screen.getByText('Create list'));
    expect(useNavigate()).toHaveBeenCalledWith(`${LISTS_ROUTE}/create`);
    // expect(mockNavigate).toHaveBeenCalledWith(`${LISTS_ROUTE}/create`);
  });
});
