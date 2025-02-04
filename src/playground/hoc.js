import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1>Infomatiooni</h1>
    <p>The info is {props.info}</p>
  </div>
);

const withAdminWarning = WrappedComponent => {
  return props => (
    <div>
      {props.isAdmin && <p>This is private info, please don't share!</p>}
      <WrappedComponent {...props} />
    </div>
  );
};

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login to view the info</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="this site is created by Janne Mulari" />,
//   document.getElementById("app")
// );
ReactDOM.render(
  <AuthInfo
    isAuthenticated={true}
    info="this site is created by Janne Mulari"
  />,
  document.getElementById("app")
);
