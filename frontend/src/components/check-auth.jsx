import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protected: isProtected }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false); // Auth check flag

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isProtected && !token) {
      // Not authenticated, redirect to login
      navigate("/login", { replace: true });
    } else if (!isProtected && token) {
      // Already logged in, redirect to home
      navigate("/", { replace: true });
    } else {
      // Access granted
      setChecked(true);
    }
  }, [isProtected, navigate]);

  if (!checked) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return <>{children}</>;
}

export default CheckAuth;
