import { useUserInfoQuery } from "../../features/account/accountApi";
import { useLocation, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const RequireAuth = () => {
 
    const {data: user, isLoading} = useUserInfoQuery();
    const location = useLocation();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return <Outlet />;
};

export default RequireAuth;