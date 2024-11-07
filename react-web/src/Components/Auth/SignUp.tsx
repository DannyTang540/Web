import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import "../../Style/SignIn.css";

const SignUp = () => {
  return (
    <div className="register-form">
      <div className="right1">
        <h3>
          Welcome to our website
          <br />
          Start shopping now    
        </h3>
      </div>
      <div className="left1">
        <h3>Sign Up</h3>
        <form>
          <label htmlFor="register-username" className="label">
            Username:
          </label>
          <FaUser className="icon" />
          <input
            type="text"
            id="register-username"
            name="register-username"
            required
          />

          <label htmlFor="register-password" className="label">
            Password:
          </label>
          <FaLock className="icon" />
          <input
            type="password"
            id="register-password"
            name="register-password"
            required
          />

          <label htmlFor="register-email" className="label">
            Email:
          </label>
          <IoIosMail className="icon" />
          <input
            type="email"
            id="register-email"
            name="register-email"
            required
          />
          <br />
          <button type="submit" className="btn">
            Đăng Ký
          </button>
          <div className="login-link">
            <p>
              Already Have Account? <a href="/login">Login Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
