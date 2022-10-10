import { Link } from "react-router-dom";
import { RegisterForm } from "../../components";
import "../../styles/common/authentication/authentication.css";

type Props = {};

export const Register = (props: Props) => {
  return (
    <div className="auth-container">
      <div>
        <h1 className="auth-heading">Register</h1>
      </div>
      <div>
        <RegisterForm />
      </div>
      <div>
        <p>
          Already have an account? Go to <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
