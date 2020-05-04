import React, { useState } from "react";
import PropTypes from "prop-types";
import { first, orderBy } from "lodash";
import HeaderRow from "../Shared/Table/HeaderRow";
import TableRow from "../Shared/Table/TableRow";
import Pagination from "../Shared/Pagination";
import translate from "../../helpers/i18n";

function UserList(props) {
  const { selectedUser, setSelectedUser, userList } = props;
  const [resetPagination, setResetPagination] = useState(false);
  const [range, setRange] = useState({
    start: 0,
    end: 10,
  });
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

  const onChangePage = (_user, page) => {
    setResetPagination(false);
    setRange({
      start: 10 * (page - 1),
      end: 10 * page,
    });
  };

  const handleSort = (value) => {
    setResetPagination(true);
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
    <div className="p-2 mt-3">
      <div className="row d-none" />
      <div className="row table-row title-header text-white bg-primary">
        <div className="col text-center">
          <h3>Administración de Usuarios</h3>
        </div>
      </div>
      <HeaderRow
        columns={columns}
        dataItem="users"
        handleSort={handleSort}
        sortValue={sortValue.value}
      />
      {orderBy(userList, [sortValue.value], [sortValue.orderType])
        .slice(range.start, range.end)
        .map((user) => {
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
        })}
      <div className="d-flex justify-content-between mt-3">
        <span className="page-items-count">
          {`${translate("pagination.showing")} ${
            range.start === 0 ? 1 : range.start + 1
          } - ${
            range.end <= userList.length ? range.end : userList.length
          } ${translate("pagination.of")} ${userList.length} ${translate(
            "pagination.users"
          )}.`}
        </span>
        <Pagination
          resetPagination={resetPagination}
          data={userList}
          itemCount={10}
          onChange={onChangePage}
        />
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
