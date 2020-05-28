import React, { useState } from "react";
import PropTypes from "prop-types";
import { first, orderBy } from "lodash";
import HeaderRow from "../Shared/Table/HeaderRow";
import TableRow from "../Shared/Table/TableRow";

function UserList(props) {
  const { selectedUser, setSelectedUser, userList } = props;
  const [sortValue, setSortValue] = useState({
    value: "id",
    orderType: "asc",
  });
  const columns = Object.keys(first(userList))
    .map((col, index) => {
      return {
        id: index,
        value: col,
      };
    })
    .filter(
      ({ value }) =>
        value !== "id" && value !== "createdAt" && value !== "updatedAt"
    );

  const handleSort = (value) => {
    if (value.orderType !== "") {
      setSortValue(value);
    } else {
      setSortValue({
        value: "id",
        orderType: "asc",
      });
    }
  };

  const findMatchingUser = (id) => {
    const matchingUser =
      userList.find((user) => user.id === Number(id)) || null;
    if (selectedUser.id === matchingUser.id) {
      setSelectedUser({});
    } else {
      setSelectedUser(matchingUser);
    }
  };

  return (
    <div className="pb-3">
      <div className="row d-none" />
      <HeaderRow
        columns={columns}
        dataItem="users"
        handleSort={handleSort}
        sortValue={sortValue.value}
      />
      <div className="user-admin-table">
        {orderBy(userList, [sortValue.value], [sortValue.orderType]).map(
          (user) => {
            return (
              <TableRow
                columns={columns}
                dataItem="users"
                key={user.id}
                row={user}
                select={findMatchingUser}
                selected={selectedUser.id === user.id}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

UserList.propTypes = {
  selectedUser: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setSelectedUser: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object]))
    .isRequired,
};

export default UserList;
