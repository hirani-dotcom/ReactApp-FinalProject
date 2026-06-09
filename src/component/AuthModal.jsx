import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in:", formData);
    } else {
      console.log("Registering:", formData);
    }
    onClose();
  };

  return (
    <div className="modal__container">
      <div className="search-container__login">
        <button className="auth__btn--close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>
          {isLogin ? "Login" : "Register"}
        </h2>
        <form className="input-spacer"
            onSubmit={handleSubmit}>
          {!isLogin && (
            <input
            className="input__box"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            className="input__box"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="input__box"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="reg-btn"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <br />
        <p className="input__box">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="reg-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
