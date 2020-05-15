import * as React from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import '../App.css';
import { connect } from 'react-redux';
import * as actionCreator from '../store/action';
import { ChangeEvent } from 'react';
import { appState } from '..';
import { DispatchProps } from '../interfaces';
type Prop = appState & DispatchProps;
const Api = (props: Prop) => {
  const setUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeUsername(e);
  };
  const handlesubmit = (e: any) => {
    props.getUserData(e, props.username);
  };
  return (
    <div>
      <div className="heading">Github User Details</div>
      <div className="search">
        <Form onSubmit={handlesubmit}>
          <Form.Group>
            <Form.Input
              placeholder="github username"
              name="name"
              onChange={setUserInput}
            />
            <Form.Button content="search" />
          </Form.Group>
        </Form>
      </div>
      {props.grabData ? (
        <div className="card">
          <Card>
            <Image src={props.avatar} />
            <Card.Content>
              <Card.Header>{props.name}</Card.Header>
              <Card.Header>{props.username}</Card.Header>
              <Card.Header>{props.email}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {props.followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {props.following} Following
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {props.repos} Repos
              </a>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <Card.Header>{props.error}</Card.Header>
      )}
    </div>
  );
};

const mapStateToProps = (state: appState) => {
  return {
    name: state.name,
    username: state.username,
    email: state.email,
    repos: state.repos,
    following: state.following,
    followers: state.followers,
    error: state.error,
    avatar: state.avatar,
    grabData: state.grabData,
  };
};

const mapDispatchToProps = {
  changeUsername: actionCreator.changeUsername,
  getUserData: actionCreator.getUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Api);
