import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";
function SignUp() {
  const [formData, setFormData] = useState({
    name: " ",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onSubmit = async (e) =>{
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      toast.error("something went wrong ");
      console.log(error)
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <input
          type="text"
          className="nameInput"
          placeholder="Name"
          id="name"
          onChange={onChange}
        />

        <input
          type="email"
          className="emailInput"
          placeholder="Email"
          id="email"
          onChange={onChange}
        />

        <div className="passwordInputDiv">
          <input
            type="text"
            className="passwordInput"
            placeholder="password"
            id="password"
            onChange={onChange}
          />
        </div>

        <div className="signUpBar">
          <p className="signUpText">Sign Up</p>
          <button className="signUpButton" onClick={onSubmit}></button>
        </div>

        <div className="gaa">
          <div className="ga">
            <OAuth />
            <Link to="/sign-in" className="registerLink">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
