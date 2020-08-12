import React, { Component } from 'react';
import { Card, Button, Item } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import { map, times } from 'lodash'
import faker from 'faker';
import { ethers } from 'ethers';
import data from './data.json'

const generateRandomEthereumAddress = () => {
  const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
  const wallet = ethers.Wallet.fromMnemonic(randomMnemonic.phrase);
  return wallet.address
}

const RealEstateIndex = ({
                           // realEstates = []
}) => {
  // console.log()
  // const EthWallet = Wallet.generate();
  // console.log("address: " + EthWallet.getAddressString());
  // console.log("privateKey: " + EthWallet.getPrivateKeyString());

  const realEstates = times(10, () => ({
    address: faker.address.streetAddress(),
    id: faker.random.alphaNumeric(),
    // as: generateRandomEthereumAddress()
  }))
  // console.log(realEstates)
    return (
      <Layout>
        <div>
          <h3>Danh sách bất động sản đã được đăng ký</h3>

          <Link route="/estates/new">
            <a>
              <Button
                style={{ width: 200}}
                floated="right"
                content="Đăng ký quyền sở hữu bất động sản"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          <Item.Group>
            {map(data, item => {
              return <Item>
                <Item.Image src={item.files[0]} />
                <Item.Content>
                  <Item.Header as='a'>{item.address}</Item.Header>
                  <Item.Meta>
                    <span className='cinema'>{item.area} m2</span>
                  </Item.Meta>
                  {/*<Item.Description>{paragraph}</Item.Description>*/}
                  <Item.Extra>
                    <Button basic primary compact>
                      <Link route={`/estates/1`}>
                        <a>Xem chi tiết</a>
                      </Link>
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
              })}
          </Item.Group>
        </div>
      </Layout>
    );
  }

export default RealEstateIndex;
