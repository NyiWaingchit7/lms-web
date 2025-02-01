import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <Title title="Profile" />
      <div className="container">
        <button
          className="no-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </Layout>
  );
};
