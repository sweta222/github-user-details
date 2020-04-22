import React, { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import './App.css';

const App = () => {
  const [name, setName] = useState('');
  const [userName, setuserName] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/example')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);
  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    email,
  }) => {
    setName(name);
    setuserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setEmail(email);
  };

  const handlesubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setData(data);
        }
      });
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
              onChange={(event) => setUserInput(event.target.value)}
            />
            <Form.Button content="search" />
          </Form.Group>
        </Form>
      </div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
              <Card.Header>{email}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
};
export default App;
