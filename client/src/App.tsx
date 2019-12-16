import React from "react";
import "./App.scss";

import Header from "./components/header/header.component";
// import history from "./utils/history";
import Footer from "./components/footer/footer.component";
import Pages from "./pages";

const App: React.FC = () => {
  // const { loading } = useAuth0();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
  <>
      <Header/>
    <div className="App">
      <Pages />
    </div>
      <Footer />
  </>
  );
};

export default App;
