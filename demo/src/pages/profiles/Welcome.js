import React from 'react';
import { Link } from 'react-router-dom';
import navigate from 'navigate';

export default function Welcome() {
  const newUrl = navigate.to.ProfileNew({}, false);

  return (
    <div>
      <h3 className="mt-3">Welcome.</h3>
      <p>Please select a profile from the list on the left or create a <Link to={newUrl}>new</Link> one.</p>
    </div>
  );
}