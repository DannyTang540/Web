import React from "react";
import "../../Style/SignIn.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
const SignIn = () => {
  return (
    <div className="sign-in">
      <div className="left">
        <h3>Welcome</h3>
        <h4>
          Start Shopping Now <br />
          With Our Mannagement System{" "}
        </h4>
      </div>

      <div className="right">
        <h3>Sign In</h3>
        <form>
          
          <label htmlFor="username" className="label">Username:</label><FaUser className="icon" />
          <input type="text" id="username" name="username" required />
          
          
          <label htmlFor="password" className="label">Password:</label><FaLock className="icon" />
          <input type="password" id="password" name="password" required/>
          
          <div className="Remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">Đăng Nhập</button>
          <div className="register-link">
            <p>
              Don't Have Account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
