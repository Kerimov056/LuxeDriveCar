import { GoogleLogin } from "react-google-login";

const clinetId = "91997614652-1q2taif2sptoou1dahqsiripc4u5e0b6.apps.googleusercontent.com";

function GooglLogin() {

    const onSuccess = (res) =>{
        console.log("Login Succes! Curnet User:", res.profileObj);
    }

    const onFailure = (res) =>{
        console.log("Login Failed! Curnet User:", res);
    }

    return(
        <div id="siginButton">
            <GoogleLogin
                clinetId={clinetId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default GooglLogin