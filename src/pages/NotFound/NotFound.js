import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import './NotFound.scss';

export default memo(() => (
  <div className="not-found">
    <div className="not-found__wrapper">
      <h2 className="not-found__404">Oops! Error 404</h2>

      <div className="not-found__content">
        <h1 className="not-found__title">Page Not Found</h1>

        <p className="not-found__text">We can&apos;t seem to find the page you&apos;re looking for.</p>

        <p className="not-found__text">Go to the lobby page to start over.</p>

        <Link to="/" className="ui primary button">
          Go To Lobby Page
        </Link>
      </div>
    </div>
  </div>
));
