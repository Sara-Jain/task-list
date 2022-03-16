import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LISTS_ROUTE } from '../../constants/routes';
import './Root.css';

function Root() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`${LISTS_ROUTE}`)}
      type="submit"
    >
      View all lists
    </button>
  );
}

export default Root;
