import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { currentUser } from "../api/userEndpoints";
import translate from "../helpers/i18n";

export default function PendingUsers() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await currentUser();
        setUser(result.data);
      } catch (err) {
        setUser({});
      }
    };

    fetchCurrentUser();
  }, []);

  if (isEmpty(user)) return null;

  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <p className="font-weight-bold mb-0">
          {translate("sidebar.evaluator")}
        </p>
        <span className="text-muted">{user.name}</span>
      </div>
    </div>
  );
}
