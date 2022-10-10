import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";
import { store } from "./redux";
import { AppRoutes } from "./routes/AppRoutes";
import { jwtInterceptorProvider } from "./axios/jwt.interceptor";

const App = () => {
  jwtInterceptorProvider();
  return (
    <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
