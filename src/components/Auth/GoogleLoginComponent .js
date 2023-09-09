import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "91997614652-1q2taif2sptoou1dahqsiripc4u5e0b6.apps.googleusercontent.com";

class GoogleLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        emailId: "",
      },
    };
  }

  // Success Handler
  responseGoogleSuccess = (response) => {
    console.log();
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
    };
    this.setState({ userInfo, isLoggedIn: true });
  };

  // Error Handler
  // Inside the responseGoogleError method
  responseGoogleError = (response) => {
    if (response.error === "popup_closed_by_user") {
      console.log("Login process was canceled by the user.");
      // You can also update the state to reflect the canceled state if needed.
    } else {
      console.error(response);
    }
  };

  // Logout Session and Update State
  logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
    };
    this.setState({ userInfo, isLoggedIn: false });
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-12">
          {this.state.isLoggedIn ? (
            <div>
              <h1>Welcome, {this.state.userInfo.name}</h1>

              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={this.logout}
              ></GoogleLogout>
            </div>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
              redirectUri={"http://localhost:3000"} // Update this with your actual redirect URI
            />
          )}
        </div>
      </div>
    );
  }
}
export default GoogleLoginComponent;