import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="container">
      <h1>Oi sann</h1>
      <p>Denne siden finnes ikke</p>
      <Link to="/">Her kommer du tilbake</Link>
    </div>
  );
};

export default Error404;
