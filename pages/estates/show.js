import React from 'react';
import {Card, Grid, Image, Icon, Segment} from 'semantic-ui-react';
import Layout from '../../components/Layout';
// import 'pure-react-carousel/dist/react-carousel.es.css';
import RealEstate from '../../ethereum/realEstate';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';
//   const realEstate = RealEstate(props.query.address);
//
//   const summary = await realEstate.methods.getSummary().call();
//
//   return {
//     address: props.query.address,
//     minimumContribution: summary[0],
//     balance: summary[1],
//     requestsCount: summary[2],
//     approversCount: summary[3],
//     manager: summary[4]
//   };
// }
// }

import data from '../data.json'

const RealEstateShow = ({
                          address= data[0].address,
  image = data[0].files[0]
}) => {
  return (
    <Layout>
      <h3>Chi tiết Bất động sản</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              <Card fluid>
                <Image src={image} wrapped ui={false}/>
                <Card.Content>
                  <Card.Header>{address}</Card.Header>
                  <Card.Meta>
                    {/*<span className='date'>Joined in 2015</span>*/}
                  </Card.Meta>
                  <Card.Description>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          Chủ sở hữu
                        </Grid.Column>
                        <Grid.Column>
                          Phương Ngân
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          CMND
                        </Grid.Column>
                        <Grid.Column>
                          273527293
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          Diện tích
                        </Grid.Column>
                        <Grid.Column>
                          100 m2
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          Thửa đất số
                        </Grid.Column>
                        <Grid.Column>
                          19
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          Bản đồ số
                        </Grid.Column>
                        <Grid.Column>
                          109
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <Grid celled columns={4}>
                      <Grid.Row><Grid.Column width={16}>Bảng kê toạ độ</Grid.Column></Grid.Row>
                      <Grid.Row>
                        <Grid.Column>Số hiệu</Grid.Column>
                        <Grid.Column>X (m)</Grid.Column>
                        <Grid.Column>Y (m)</Grid.Column>
                        <Grid.Column>S (m)</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>1</Grid.Column>
                        <Grid.Column>1151056.58</Grid.Column>
                        <Grid.Column>4382343.56</Grid.Column>
                        <Grid.Column>5.00</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>2</Grid.Column>
                        <Grid.Column>1151066.58</Grid.Column>
                        <Grid.Column>1151024.90</Grid.Column>
                        <Grid.Column>20.00</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>3</Grid.Column>
                        <Grid.Column>1151090.58</Grid.Column>
                        <Grid.Column>4382341.56</Grid.Column>
                        <Grid.Column>5.00</Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>2</Grid.Column>
                        <Grid.Column>1151061.51</Grid.Column>
                        <Grid.Column>1151022.90</Grid.Column>
                        <Grid.Column>20.00</Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {/*<a>*/}
                  {/*  <Icon name='user'/>*/}
                  {/*  22 Friends*/}
                  {/*</a>*/}
                </Card.Content>
              </Card>
            </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export default RealEstateShow;
