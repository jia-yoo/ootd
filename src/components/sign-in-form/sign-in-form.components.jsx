import { useState } from "react";
import { useDispatch } from 'react-redux'
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";

import FormInput from "../form-input/form-input.component.jsx";
import Button, { BUTTON_TYPE_CLASS } from "../button/button.components.jsx";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.jsx"; 

import { googleSignInStart,emailSignInStart } from "../../store/user/user.action.js";

const SignInForm = () => {
  const dispatch = useDispatch()
  const defaultFormField = {
    email: "",
    password: "",
  };
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;

  const resetFormFields = () => {
    setFormField(defaultFormField);
  };

  const signInWithGoogle = async () => {
  dispatch(googleSignInStart())
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit">Sign-in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASS.google}
            onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
