import Header from '../Header/Header';
import LoginForm from './LoginForm';

const Login = (props) => {
  return (
    <div className="login">
      <Header />
      <div className="login--bg"></div>
      <LoginForm />
    </div>
  );
};

export default Login;
