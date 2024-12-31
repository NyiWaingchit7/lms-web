import "./App.css";
import { Layout } from "./component/layout/Layout";
import { Title } from "./component/layout/Title";

function App() {
  return (
    <Layout>
      <Title title="Home" />
      <div className="text-red-600 mx-auto">hi how are you</div>
    </Layout>
  );
}

export default App;
