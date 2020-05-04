import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import Loading from "../Shared/Loading";
import UserList from "./UserList";
import { fetchUsers, showUsers } from "../../redux/modules/users/userList";
import t from "../../helpers/i18n";

export function UserListContainer(props) {
  const {
    userList,
    error,
    getUsers,
    loading,
    selectedUser,
    setSelectedUser,
  } = props;

  useEffect(() => {
    if (isEmpty(userList)) {
      getUsers();
    }
  }, [userList, getUsers]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (isEmpty(userList)) return <div>{t("noData")}</div>;
  return (
    <UserList
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      userList={userList}
    />
  );
}

UserListContainer.defaultProps = {
  error: null,
};

UserListContainer.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
  error: PropTypes.string,
  getUsers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  selectedUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUsers: fetchUsers,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  userList: showUsers(state),
  error: state.usersReducer.error,
  loading: state.usersReducer.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
