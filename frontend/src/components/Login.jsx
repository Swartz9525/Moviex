import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post("http://localhost:4001/user/login", userInfo);
      const responseData = response.data;
      if (responseData) {
        toast.success("Logged in Successfully");
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
          window.location.reload();
          localStorage.setItem("Users", JSON.stringify(responseData.user));
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        console.error(error);
        toast.error("Error: " + error.response.data.message);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal" style={styles.modal}>
        <div style={styles.modalBox}>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog" style={styles.form}>
            <button
              type="button"
              onClick={() => document.getElementById("my_modal_3").close()}
              style={styles.closeBtn}
            >
              ✕
            </button>

            <h3 style={styles.heading}>Login</h3>

            <div style={styles.inputGroup}>
              <span>Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.inputField}
                {...register("email", { required: true })}
              />
              {errors.email && <span style={styles.errorMessage}>This field is required</span>}
            </div>

            <div style={styles.inputGroup}>
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                style={styles.inputField}
                {...register("password", { required: true })}
              />
              {errors.password && <span style={styles.errorMessage}>This field is required</span>}
            </div>

            <div style={styles.buttonGroup}>
              <button type="submit" style={styles.loginButton}>
                Login
              </button>
              <p style={{ marginTop: "10px" }}>
                Not registered?{" "}
                <Link to="/signup" style={styles.signupLink}>
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    border: "none",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    position: "relative",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#999",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  inputField: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "5px",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  buttonGroup: {
    marginTop: "10px",
  },
  loginButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
  signupLink: {
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default Login;

