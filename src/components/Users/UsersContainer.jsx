import {connect} from 'react-redux';
import {
  follow,
  getUsers,
  setCurrentPage,
  toggleFollowingProgress, toggleFollowSuccess,
} from '../../redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {

    this.props.getUsers(pageNumber, this.props.pageSize)
    this.props.setCurrentPage(pageNumber);
  }

  render() {
    return <>
      {this.props.isFetching
        ? <Preloader/>
        : <Users {...this.props} onPageChanged={this.onPageChanged}/>}</>
  }

}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress
  }
}

export default connect(mapStateToProps, {
  toggleFollowSuccess,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers,
  follow
})(UsersContainer);