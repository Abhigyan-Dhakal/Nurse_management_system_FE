import { Link } from "react-router-dom";
import { LoginForm } from "../../components";
import "../../styles/common/authentication/authentication.css";

type Props = {};

export const Login = (props: Props) => {
  return (
    <div className="auth-container">
      <div>
        <h1 className="auth-heading">Login</h1>
      </div>
      <div>
        <LoginForm />
      </div>
      <div>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
