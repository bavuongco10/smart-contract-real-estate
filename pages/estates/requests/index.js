import React from 'react';
import { Button, Item } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import RealEstate from '../../../ethereum/realEstate';
import {map} from "lodash";
import data from "../../data.json";
//
// static async getInitialProps(props) {
//   const { address } = props.query;
//   const realEstate = RealEstate(address);
//   const requestCount = await realEstate.methods.getRequestsCount().call();
//   const approversCount = await realEstate.methods.approversCount().call();
//
//   const requests = await Promise.all(
//     Array(parseInt(requestCount))
//       .fill()
//       .map((element, index) => {
//         return realEstate.methods.requests(index).call();
//       })
//   );
//
//   return { address, requests, requestCount, approversCount };
// }
//
//
// <RequestTable.Row
//   key={index}
//   id={index}
//   request={request}
//   address={this.props.address}
//   approversCount={this.props.approversCount}
// />

const MyItem = ({ owner, image, address}) => {
  return <Item>
    <Item.Image src={image} />
    <Item.Content>
      <Item.Header as='a'>{address}</Item.Header>
      <Item.Meta>
        <span className='cinema'>Số đơn vị đã xác nhận: 2/5</span>
      </Item.Meta>
      Chủ sở hữu: {owner}
      <Item.Extra>
        <Button  basic primary compact>
          <Link route={`/estates/1`}>
            <a>Xem chi tiết</a>
          </Link>
        </Button>
        <Button basic compact color="green">
            Xác nhận yêu cầu
        </Button>
        <Button  compact color="red" disabled>
          Hoàn thành yêu cầu
        </Button>
      </Item.Extra>
    </Item.Content>
  </Item>
}

const  RequestIndex  = () =>  {
    return (
      <Layout>
        <h3>Yêu cầu đăng kí quyền sở hữu Bất động sản</h3>
        <Item.Group>
          <MyItem owner={'Phương Ngân'} image={data[0].files[0]} address={data[0].address}/>
          <MyItem owner={'Văn A'} image={data[1].files[0]} address={data[1].address}/>
          <MyItem owner={'Văn B'} image={data[2].files[0]} address={data[2].address}/>
          <MyItem owner={'Thị C'} image={data[3].files[0]} address={data[3].address}/>
        </Item.Group>
      </Layout>
    );
  }

export default RequestIndex;
