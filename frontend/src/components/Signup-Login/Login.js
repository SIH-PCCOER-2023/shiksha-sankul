import Header from '../Header/Header';
import LoginForm from './LoginForm';

const Login = (props) => {
  return (
    <div className="login">
      <Header />
      <div className="login__content">
        <div className="login__box"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
