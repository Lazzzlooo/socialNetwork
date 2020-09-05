import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import * as axios from 'axios';
import {setUsersData, toggleIsFetching} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
    .then(responsive => {
      if (!responsive.data.resultCode) {
        let {id, login, email} = responsive.data.data
        this.props.setUsersData(id, login, email);
      }

    })
  }

  render() {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state) => (
  {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId
  }
)

export default connect(mapStateToProps, {setUsersData, toggleIsFetching})(HeaderContainer)