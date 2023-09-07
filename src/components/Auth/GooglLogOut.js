import { GoogleLogout } from "react-google-login";

const clinetId = "91997614652-1q2taif2sptoou1dahqsiripc4u5e0b6.apps.googleusercontent.com";

function GooglLogOut() {

    const onSuccess = () => {
        console.log("Log out successfuly");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clinetId={clinetId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default GooglLogOut