import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { getPendingUsers } from "../api/userEndpoints";
import t from "../helpers/i18n";
import { usePrevious } from "../hooks";

export default function PendingUsers({ selectedEvent }) {
  const [users, setUsers] = useState([]);
  const prevEvent = usePrevious(selectedEvent) || { id: null };

  useEffect(() => {
    if (!isEmpty(selectedEvent) && selectedEvent.id !== prevEvent.id) {
      const fetchPendingUsers = async () => {
        try {
          const result = await getPendingUsers(selectedEvent.id);
          setUsers(result.data);
        } catch (err) {
          setUsers([]);
        }
      };

      fetchPendingUsers();
    }
  }, [selectedEvent, prevEvent]);

  if (isEmpty(selectedEvent) || isEmpty(users)) return null;

  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <div className="pending-users p-2 border-primary">
          <p className="font-weight-bold">{t("sidebar.pending")}</p>
          <ul>
            {users.map((user) => {
              return <li key={user.id}>{user.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

PendingUsers.defaultProps = {
  selectedEvent: {},
};

PendingUsers.propTypes = {
  selectedEvent: PropTypes.oneOfType([PropTypes.object]),
};
