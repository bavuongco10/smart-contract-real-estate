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

const MyItem = ({ owner, image, address, newOwner}) => {
  return <Item>
    <Item.Image src={image} />
    <Item.Content>
      <Item.Header as='a'>{address}</Item.Header>
      <Item.Meta>
        <span className='cinema'>Số đơn vị đã xác nhận: 2/5</span>
      </Item.Meta>
      Chủ sở hữu hiện tại: {owner}
      <br/>
      Chủ sở hữu mới: {newOwner}
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
        <h3>Danh sách yêu cầu chuyển thông tin quyền sở hữu Bất động sản</h3>
        <Item.Group>
          <MyItem owner={'Thiên Nhi'} image={data[5].files[0]} address={data[5].address} newOwner={'Thị D'}/>
          <MyItem owner={'Văn A'} image={data[6].files[0]} address={data[6].address} newOwner={'Thị E'}/>
          <MyItem owner={'Văn B'} image={data[7].files[0]} address={data[7].address} newOwner={'Thị F'}/>
          <MyItem owner={'Thị C'} image={data[8].files[0]} address={data[7].address} newOwner={'Thị G'}/>
        </Item.Group>
      </Layout>
    );
  }

export default RequestIndex;
