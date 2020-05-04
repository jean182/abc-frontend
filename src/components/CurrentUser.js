import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import translate from "../helpers/i18n";
import { fetchUser } from "../redux/modules/auth/session";

function CurrentUser({ getUserInfo, user }) {
  useEffect(() => {
    if (isEmpty(user)) {
      getUserInfo();
    }
  }, [user, getUserInfo]);

  if (isEmpty(user)) return null;

  return (
    <div className="row py-3 sidebar-subtitle-borders border-primary">
      <div className="col">
        <p className="font-weight-bold mb-0">
          {translate("sidebar.evaluator")}
        </p>
        <span className="user-name">{user.name}</span>
      </div>
    </div>
  );
}

CurrentUser.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserInfo: fetchUser,
    },
    dispatch
  );
};

const mapStateToProps = (state) => ({
  user: state.sessionReducer.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
