import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    // Optionally clear tokens or other data if you use them
    // localStorage.removeItem("token");

    // Redirect to login or home page
    navigate("/", { replace: true });
  }, [navigate]);

  // You can also show a small message while redirecting (optional)
  return <p>Logging out...</p>;
};

export default Logout;
