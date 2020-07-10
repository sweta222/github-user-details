import * as React from 'react';
import { Form, Card, Image, Icon, List } from 'semantic-ui-react';
import '../App.css';
import { connect } from 'react-redux';
import * as actionCreator from '../store/action';
import { ChangeEvent } from 'react';
import { appState } from '..';
import { DispatchProps } from '../interfaces';
import { Bar, Polar } from 'react-chartjs-2';
type Prop = appState & DispatchProps;
const Api = (props: Prop) => {
  const setUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeUsername(e);
  };
  const handlesubmit = (e: any) => {
    props.getUserData(e, props.username);
    props.getRepos(props.username);
  };
  const barData = {
    labels: props.yearlyContributionsData.map((item) => item.year),
    datasets: [
      {
        label: ['contributions per years'],
        barThickness: 45,
        backgroundColor: 'orange',
        borderWidth: 1,
        barPercentage: 2,
        //borderAlign: inner,//for polar
        data: props.yearlyContributionsData.map((item2) => item2.total),
      },
    ],
  };

  let languagesArray = props.repos.map((item) => item.language);
  let map = languagesArray.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1;
    return prev;
  }, {});
  //console.log(map);
  //console.log(Object.keys(map));
  //console.log(Object.values(map));
  const polarData = {
    labels: Object.keys(map),
    datasets: [
      {
        backgroundColor: [
          'rgba(0, 0, 255, 0.2)',
          'pink',
          'lightgreen',
          'rgba(68, 108, 179, 1)',
          'yellow',
          'lightblue',
          'purple',
          'green',
          'rgba(83, 51, 237, 1)',
          'orange',
          'rgb(238, 130, 238)',
          'rgb(60, 179, 113)',
          'rgb(180, 180, 180)',
          'rgb(180, 180, 180)',
          'rgba(0, 181, 204, 1)',
          'rgba(51, 110, 123, 1)',
          '#B21F00',
          '#323130',
          '#7FFFD4',
          '#7FFF00',
          '#FF7F50',
          '#008B8B',
          '#ADFF2F',
          '#008080',
          '#FF6347',
          '#FFE4B5',
          'rgba(255,255,0,0.3)',
          'hsl(290,60%,70%)',
          'hsla(120,60%,70%,0.3)',
          '#808000',
        ],
        data: Object.values(map),
      },
    ],
  };

  const arbitraryStackKey = 'stack1';
  const stackedData = {
    labels: props.repos.map((item) => item.name),
    datasets: [
      {
        stack: arbitraryStackKey,
        label: 'Forks',
        backgroundColor: 'lightblue',
        data: props.repos.map((item) => item.forks),
      },
      {
        stack: arbitraryStackKey,
        label: 'Stars',
        backgroundColor: 'pink',
        data: props.repos.map((item) => item.stargazers_count),
      },
    ],
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
          <div className="card1">
            <Card>
              <Image src={props.avatar} />
              <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Header>{props.loginId}</Card.Header>
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
                  {props.repositories} Repos
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  <a href={props.profile_url} target="_blank">
                    link to profile: {props.profile_url}
                  </a>
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  <a href={props.blog} target="_blank">
                    link to blog: {props.blog}
                  </a>
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  <a>{props.location}</a>
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  <a>{props.bio}</a>
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  <a>{props.company}</a>
                </a>
              </Card.Content>
            </Card>

            <div className="card2">
              <Bar
                data={barData}
                //width={400}
                //height={320}
                width={780}
                height={700}
                options={{
                  title: {
                    display: true,
                    text: 'contributions per year',
                    fontSize: 30,
                  },
                  legend: {
                    display: false,
                    position: 'top',
                  },
                  scales: {
                    xAxes: [
                      {
                        scaleLabel: {
                          display: true,
                          labelString: 'Years',
                          fontSize: 20,
                        },
                        position: 'bottom',
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        scaleLabel: {
                          display: true,
                          labelString: 'Contributions',
                          fontSize: 20,
                        },
                        ticks: {
                          suggestedMin: 0,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>

            <div className="cardC">
              <List.Item>
                <h2>contributions data</h2>
                {props.yearlyContributionsData.map((item: any, index) => (
                  <li key={index}>
                    <a>
                      {item.year} - {item.total} contributions
                    </a>
                  </li>
                ))}
              </List.Item>
            </div>
          </div>

          <div className="card3">
            <Polar
              data={polarData}
              width={85}
              height={65}
              options={{
                title: {
                  display: true,
                  text: 'Languages Used Per Repos',
                  fontSize: 20,
                  position: 'top',
                },
                startAngle: -Math.PI / 4,
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
            <div className="card4">
              <Bar
                data={stackedData}
                width={840}
                height={500}
                options={{
                  tooltips: {
                    mode: 'x-axis',
                  },
                  legend: {
                    display: true,
                  },
                  scales: {
                    xAxes: [
                      {
                        stacked: true,
                        // scaleLabel: {
                        //   display: true,
                        //   labelString: 'Repository names',
                        //   fontSize: 20,
                        // },
                      },
                    ],
                    yAxes: [
                      {
                        // scaleLabel: {
                        //   display: true,
                        //   labelString: 'No.of forks and stars',
                        //   fontSize: 20,
                        // },
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </div>

          <div className="cardR">
            <ul>
              <h1>Repo details</h1>
              {props.repos.map((repo: any, index) => (
                <li key={index}>
                  <a href={repo.html_url} target="_blank">
                    {repo.name} : {repo.forks} forks , {repo.open_issues}
                    issues , {repo.stargazers_count} stars , {repo.language}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <Card.Header>{props.error}</Card.Header>
      )}
    </div>
  );
};

const mapStateToProps = (state: appState) => {
  return {
    loginId: state.loginId,
    name: state.name,
    username: state.username,
    email: state.email,
    repositories: state.repositories,
    following: state.following,
    followers: state.followers,
    error: state.error,
    avatar: state.avatar,
    grabData: state.grabData,
    profile_url: state.profile_url,
    location: state.location,
    blog: state.blog,
    repos: state.repos,
    //commits: state.commits,
    contributions: state.contributions,
    yearlyContributionsData: state.yearlyContributionsData,
    bio: state.bio,
    company: state.company,
  };
};

const mapDispatchToProps = {
  changeUsername: actionCreator.changeUsername,
  getUserData: actionCreator.getUserData,
  getRepos: actionCreator.getRepos,
};

export default connect(mapStateToProps, mapDispatchToProps)(Api);
