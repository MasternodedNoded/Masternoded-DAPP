import AvailablePool from "./components/avilablepool/AvailablePool";
import Hero from "./components/avilablepool/Hero";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import store from "./redux/store";
import { Provider } from "react-redux";
import 'react-tooltip/dist/react-tooltip.css';
import "react-toastify/dist/ReactToastify.css";
import CustomToast from "./components/common/customToast";
function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <Hero />
      <AvailablePool />
      <Footer />
      <CustomToast />
    </Provider>
  );
}

export default App;
