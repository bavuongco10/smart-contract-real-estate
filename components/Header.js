import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item">MyRealToken</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Real Estates</a>
        </Link>

        <Link route="/estates/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
