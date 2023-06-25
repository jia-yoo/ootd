import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.components.jsx";

import "./sign-up-form.styles.scss";

const SignUpForm = () => {
  const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formField, setFormField] = useState(defaultFormField);

  const { displayName, email, password, confirmPassword } = formField;

  const resetFormFields = () => {
    setFormField(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //check if passworrd and confirm password matches
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }
    try {
      //check if it gets authenticated
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      //check if it gets in the user document
      await createUserDocumentFromAuth(user, {
        displayName,
      });
      resetFormFields();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />

        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />

        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
