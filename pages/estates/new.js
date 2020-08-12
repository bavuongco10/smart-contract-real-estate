import React, { Component } from 'react';
import { Form, Button, Input, Message, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { InputFile } from 'semantic-ui-react-input-file'

class RealEstateNew extends Component {
  state = {
    address: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });
    console.log(this.state.address)
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      await factory.methods
        .createRegisterRequest(this.state.address)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Đăng ký quyền sở hữu Bất động sản</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Địa chỉ</label>
            <Input
              value={this.state.address}
              onChange={event =>
                this.setState({ address: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Thửa đất số</label>
            <Input />
          </Form.Field>

          <Form.Field>
            <label>Bản đồ số</label>
            <Input />
          </Form.Field>

          <Form.Field>
            <label>Diện tích</label>
            <Input />
          </Form.Field>

          <Form.Field>
            <Grid celled columns={4}>
              <Grid.Row><Grid.Column width={16}>Bảng kê toạ độ</Grid.Column></Grid.Row>
              <Grid.Row>
                <Grid.Column>Số hiệu</Grid.Column>
                <Grid.Column>X (m)</Grid.Column>
                <Grid.Column>Y (m)</Grid.Column>
                <Grid.Column>S (m)</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
                <Grid.Column><Input/></Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Field>
          <Form.Field>
            <label>Files</label>
            <InputFile
              input={{
                id: 'input-control-id',
              }}
              />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RealEstateNew;
