import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import { map } from 'lodash'

// const realEstates = await factory.methods.getDeployedRealEstates().call();

const RealEstateIndex = ({realEstates = [] }) => {
    return (
      <Layout>
        <div>
          <h3>Registered Real Estates</h3>

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
          <Card.Group items={map(realEstates,address => ({
              header: address,
              description: (
                <Link route={`/estates/${address}`}>
                  <a>View RealEstate</a>
                </Link>
              ),
              fluid: true
          }))} />
        </div>
      </Layout>
    );
  }

export default RealEstateIndex;
