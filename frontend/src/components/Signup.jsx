import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Login from "./Login";

function Signup() {
  const [showSignup, setShowSignup] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("SUBMIT-FIRED", data); // Debug log
    setLoading(true);
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo
      );
      if (res.data) {
        toast.success("Signup Successful");
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-center" />
      {showSignup && (
        <div className="signup-container">
          <div style={styles.signupBox}>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
              <Link to="/" style={styles.closeBtn}>✕</Link>
              <h3 style={styles.heading}>Signup</h3>

              <div style={styles.inputGroup}>
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Fullname"
                  {...register("fullname", { required: true })}
                  style={styles.inputField}
                />
                {errors.fullname && (
                  <span style={styles.errorMessage}>This field is required</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                  style={styles.inputField}
                />
                {errors.email && (
                  <span style={styles.errorMessage}>This field is required</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 6 })}
                  style={styles.inputField}
                />
                {errors.password && (
                  <span style={styles.errorMessage}>
                    Password must be at least 6 characters
                  </span>
                )}
              </div>

              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.signupButton} disabled={loading}>
                  {loading ? "Signing up..." : "Signup"}
                </button>
                <p>
                  Have an account?{" "}
                  <button
                    type="button"
                    style={styles.loginButton}
                    onClick={() => {
                      setShowSignup(false);
                      document.getElementById("my_modal_3")?.showModal(); // modal should exist
                    }}
                  >
                    Login
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <Login onClose={() => setShowSignup(true)} />
    </div>
  );
}

const styles = {
  signupBox: {
    width: "500px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
    margin: "50px auto",
    position: "relative",
  },
  form: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "20px",
    color: "#999",
    textDecoration: "none",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "10px",
  },
  inputGroup: {
    marginTop: "10px",
  },
  inputField: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "5px",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
  },
  buttonGroup: {
    marginTop: "20px",
    textAlign: "center",
  },
  signupButton: {
    backgroundColor: "007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loginButton: {
    textDecoration: "underline",
    color: "blue",
    cursor: "pointer",
    background: "none",
    border: "none",
  },
};

export default Signup;
