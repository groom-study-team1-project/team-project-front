import { useState, useEffect } from "react";

function useJwt(token) {
  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const parsedPayload = JSON.parse(jsonPayload);
        console.log("isJwt");
        console.log(parsedPayload);
        setPayload(parsedPayload);
      } catch (error) {
        console.error("Invalid JWT token", error);
      }
    }
  }, [token]);

  return payload;
}

export default useJwt;