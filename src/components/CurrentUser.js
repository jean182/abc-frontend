import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import translate from "../helpers/i18n";

function CurrentUser({ user }) {
  if (isEmpty(user)) return null;

  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <p className="font-weight-bold mb-0 pb-2">
          {translate("sidebar.evaluator")}
        </p>
        <span className="user-name">{user.name}</span>
      </div>
    </div>
  );
}

CurrentUser.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.sessionReducer.user,
});

export default connect(mapStateToProps)(CurrentUser);
