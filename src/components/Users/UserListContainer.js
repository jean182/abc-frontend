import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { allUsers } from "../../api/userEndpoints";
import Loading from "../Shared/Loading";
import UserList from "./UserList";

export default function UserListContainer({ selectedUser, setSelectedUser }) {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const result = await allUsers();
        setUserList(result.data);
      } catch (err) {
        setUserList([]);
      }
    };

    if (isEmpty(userList)) {
      fetchUserList();
    }
  }, [userList]);

  if (isEmpty(userList)) return <Loading />;
  return (
    <UserList
      selectedUser={selectedUser}
      setSelectedUser={setSelectedUser}
      userList={userList}
    />
  );
}

UserListContainer.propTypes = {
  selectedUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};
