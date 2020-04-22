// import React from 'react';
// import ReactDOM from 'react-dom';
// import './App.css';
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { userID: '' };
//     this.handleChange = this.handleChange.bind(this);
//     this.handlesubmit = this.handlesubmit.bind(this);
//   }
//   handleChange(event) {
//     this.setState({ userID: event.target.value });
//   }
//   handlesubmit(event) {
//     event.preventDefault();
//     alert('submitted userID is' + this.state.userID);
//   }
//   render() {
//     return (
//       <div>
//         <h1 className="heading">Github User Details</h1>
//         <form onSubmit={this.handlesubmit}>
//           <input
//             type="text"
//             className="userid"
//             placeholder="userID"
//             onChange={this.handleChange}
//           />
//           <br />
//           <br />
//           <input type="submit" className="fetch" value="fetch details" />
//         </form>
//       </div>
//     );
//   }
// }
// export default App;
// ReactDOM.render(<App />, document.getElementById('root'));

// import React from 'react';
// import {useState} from 'react';
// import './App.css';
// const App = () => {
//   const [userID,setuserID] = useState('');

//   const handlesubmit = (event) => {
//     event.preventDefault();
//     alert('submitted userID is' + userID);
//   };

//   render() {
//     return (
//       <div>
//         <h1 className="heading">Github User Details</h1>
//         <form onSubmit={handlesubmit}>
//           <input
//             type="text"
//             className="userid"
//             placeholder="userID"
//             onChange={(event) => setuserID(event.target.value)}
//           />
//           <br />
//           <br />
//           <input type="submit" className="fetch" value="fetch details" />
//         </form>
//       </div>
//     );
//   }
// }
// export default App;

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

  // const handleSearch = (e) => {
  //   setUserInput(e.target.value);
  // };

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
