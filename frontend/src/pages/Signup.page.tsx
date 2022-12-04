import styled from 'styled-components';
import { FormEvent, useState, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../common/hooks/useRedux';
import { getUser, signupUser } from '../features/user/userSlice';
import { ValidatedInput } from '../common/components/helpers/ValidatedInput';
import { Link } from 'react-router-dom';

export const Signup = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);

  const [emailInput, setEmailInput] = useState({
    value: '',
    touched: false,
    valid: false,
  });

  const emailValidation = useCallback((value: string) => value.trim().length >= 5 && value.trim().includes('@'), []);

  const [phoneInput, setPhoneInput] = useState({
    value: '',
    touched: false,
    valid: false,
  });

  const phoneValidation = useCallback((value: string) => value.trim().length === 9, []);

  const [passwordInput, setPasswordInput] = useState({
    value: '',
    touched: false,
    valid: false,
  });

  const passwordValidation = useCallback(
    (value: string) =>
      value.length >= 8 &&
      value.length < 50 &&
      // eslint-disable-next-line
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value) &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[0-9]/.test(value),
    []
  );

  const [confirmPasswordInput, setConfirmPasswordInput] = useState({
    value: '',
    touched: false,
    valid: false,
  });

  const confirmPasswordValidation = useCallback(
    (value: string, touched: boolean) => passwordInput.touched && touched && passwordInput.valid && passwordInput.value === value,
    [passwordInput]
  );

  const formIsValid = emailInput.valid && phoneInput.valid && passwordInput.valid && confirmPasswordInput.valid;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      dispatch(
        signupUser({
          email: emailInput.value,
          password: passwordInput.value,
          phone: phoneInput.value,
        })
      );
    }
  };

  return (
    <Container>
      <h2 className="title">SIGNUP</h2>
      <Form onSubmit={submitHandler}>
        <ValidatedInput name="Email" id="email" type="email" value={emailInput} setValue={setEmailInput} validation={emailValidation}>
          {emailInput.touched && !emailInput.valid && <p>Email must be at least 5 chars long and include '@'</p>}
        </ValidatedInput>
        <ValidatedInput name="Phone number" id="phone" type="tel" value={phoneInput} setValue={setPhoneInput} validation={phoneValidation}>
          {phoneInput.touched && !phoneInput.valid && <p>Phone must be 9 chars long</p>}
        </ValidatedInput>
        <ValidatedInput name="Password" id="password" type="password" value={passwordInput} setValue={setPasswordInput} validation={passwordValidation}>
          {passwordInput.touched && !passwordInput.valid && (
            <div>
              Password must at least have:
              <ul>
                {!(passwordInput.value.length >= 8) && <li>more than 7 characters</li>}
                {!(passwordInput.value.length < 50) && <li>less than 50 characters</li>}
                {
                  // eslint-disable-next-line
                  !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordInput.value) && <li>one special character</li>
                }
                {!/[A-Z]/.test(passwordInput.value) && <li>one uppercase letter</li>}
                {!/[a-z]/.test(passwordInput.value) && <li>one lowercase letter</li>}
                {!/[0-9]/.test(passwordInput.value) && <li>and one number</li>}
              </ul>
            </div>
          )}
        </ValidatedInput>
        <ValidatedInput
          name="Confirm Password"
          id="confirmPassword"
          type="password"
          value={confirmPasswordInput}
          setValue={setConfirmPasswordInput}
          validation={confirmPasswordValidation}
        >
          {passwordInput.touched && confirmPasswordInput.touched && passwordInput.valid && passwordInput.value !== confirmPasswordInput.value && (
            <p>Passwords must be the same</p>
          )}
        </ValidatedInput>
        <div className="confirm-box">
          {user.error && <p className="server-error">{user.error}</p>}
          <button className="confirm" disabled={user.loading || !formIsValid}>
            {user.loading ? 'SIGNING UP...' : 'SIGNUP'}
          </button>
          <Link to="/login">
            Already have an account? <span>Login</span>
          </Link>
        </div>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .title {
    font-weight: 700;
    font-size: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .confirm-box {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .server-error {
    font-size: 1rem;
    font-weight: 700;
  }

  .confirm {
    padding: 1rem 4rem;
    cursor: pointer;
    background: #e4e4e4;
    color: inherit;
    font-weight: 700;
    font-size: 1.2rem;
    border: none;
    font-family: inherit;
  }

  .confirm:disabled {
    cursor: default;
    color: #fff;
  }

  .confirm-box a {
    color: inherit;
    text-decoration: none;
  }

  .confirm-box span {
    font-weight: 700;
  }
`;
