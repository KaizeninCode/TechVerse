import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./AuthSlice";
import { selectCurrentRole } from "./AuthSlice";
function RequireAuth() {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
const role=useSelector(selectCurrentRole);

  return token ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
}

export default RequireAuth;
