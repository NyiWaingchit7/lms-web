import { config } from "@/utils/config";
import { generateToken } from "@/utils/headerOption";
import { useEffect } from "react";

export const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    const token = await generateToken();
    const url = `${config.baseUrl}/auth/google?api_token=${token}`;
    window.open(url, "_blank", "width=800,height=600");
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.origin !== `${config.backendUrl}` || !event.data?.token) {
      return;
    }

    const { token } = event.data;

    if (token) {
      console.log(token);

      //   localStorage.setItem("token", token);
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
      <button className="login-btn" onClick={handleGoogleLogin}>
        Log in
      </button>
    </div>
  );
};
