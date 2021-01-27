/* eslint-disable react/no-did-update-set-state */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Lottie from 'react-lottie';
// scripts
import { Users } from '../Axios/UsersController';
import LoadAnime from '../Assets/loading.json';
// partials
import UserList from '../Molecules/UserList';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name_cont: this.props.location.state.search,
      users: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    Users({ params: { name_cont: this.state.name_cont } })
      .then((res) => {
        this.setState({ users: res.data });
        this.setState({ isLoading: true });
      })
      .catch((err) => this.setState({ users: [] }));
  }

  async componentDidUpdate(prevProps) {
    if (this.state.name_cont !== prevProps.history.location.state.name_cont) {
      await this.setState({
        name_cont: prevProps.history.location.state.name_cont,
      });
      await this.setState({ isLoading: false });
      await Users({ params: { name_cont: this.state.name_cont } })
        .then((res) => {
          this.setState({ users: res.data });
          this.setState({ isLoading: true });
        })
        .catch((err) => this.setState({ users: [] }));
    }
  }

  render() {
    const defaultOption = {
      loop: true,
      autoplay: true,
      animationData: LoadAnime,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    };
    return (
      <div>
        {this.state.isLoading ? (
          <>
            {this.state.users.map((user) => (
              <UserList
                key={user.id}
                id={user.id}
                name={user.name}
                url={user.image.url}
              />
            ))}
            {!this.state.users.length > 0 && (
              <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
                検索結果ありません
              </p>
            )}
          </>
        ) : (
          <Lottie
            options={defaultOption}
            height={100}
            width={100}
            style={{ margin: '40px auto' }}
          />
        )}
      </div>
    );
  }
}
