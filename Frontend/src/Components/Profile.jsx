import { Navigate } from "react-router-dom";

export const ProfileInfo = ({ LoggedIn }) => {
    if (!LoggedIn) {
        return <Navigate to="/sign-up" replace />;
    }

    return (
        <div>
            HELLO FROM USER PROFILE
        </div>
    );
};
