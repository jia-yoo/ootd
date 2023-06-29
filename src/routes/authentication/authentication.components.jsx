import SignUpForm from "../../components/sign-up-form/sign-up-form.components";
import SignInForm from '../../components/sign-in-form/sign-in-form.components'

import { AuthentificationContainer} from './authentication.styles.jsx'

const Authentication = () => {
  return (
    <AuthentificationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthentificationContainer>
  );
};
export default Authentication;
