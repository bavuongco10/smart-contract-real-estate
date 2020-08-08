import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

class RealEstateIndex extends Component {
  static async getInitialProps() {
    const realEstates = await factory.methods.getDeployedRealEstates().call();

    return { realEstates };
  }

  renderRealEstates() {
    const items = this.props.realEstates.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/estates/${address}`}>
            <a>View RealEstate</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Real Estates</h3>

          <Link route="/estates/new">
            <a>
              <Button
                floated="right"
                content="Register Real Estate"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderRealEstates()}
        </div>
      </Layout>
    );
  }
}

export default RealEstateIndex;
