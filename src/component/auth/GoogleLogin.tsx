import { config } from "@/utils/config";
import { generateToken } from "@/utils/headerOption";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  title: string;
}
export const GoogleLogin = ({ title }: Props) => {
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    const token = await generateToken();
    const url = `${config.baseUrl}/auth/google?api_token=${token}`;
    window.open(url, "_blank", "width=800,height=600");
    window.addEventListener("message", handleMessage);
  };

  const handleMessage = (event: MessageEvent) => {
    if (!config.baseUrl.startsWith(event.origin) || !event.data?.token) {
      return;
    }

    const { token } = event.data;

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
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
      <button
        type="reset"
        className=" w-full flex items-center justify-center font-semibold border border-green rounded-md p-2"
        onClick={handleGoogleLogin}
      >
        <img src="/google.png" alt="google" className="w-7" /> {title} with
        Google
      </button>
    </div>
  );
};
