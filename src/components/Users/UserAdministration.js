import React, { useState } from "react";
import UserForm from "../Surveys/UserForm";
import UserListContainer from "./UserListContainer";

export default function UserAdministration() {
  const [selectedUser, setSelectedUser] = useState({});
  return (
    <div className="modal-body">
      <UserForm selectedUser={selectedUser} />
      <UserListContainer
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}
