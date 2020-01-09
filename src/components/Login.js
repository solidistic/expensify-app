import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const Login = props => {
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify app</h1>
        <p>Start managing your expenses and save money!</p>
        <button onClick={props.startLogin} className="button">Login with Google</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);
