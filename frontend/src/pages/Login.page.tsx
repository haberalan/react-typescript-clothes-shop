import styled from 'styled-components';
import { FormEvent, useState, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '../common/hooks/useRedux';
import { getUser, loginUser } from '../features/user/userSlice';
import { ValidatedInput } from '../common/components/Utils/ValidatedInput';
import { Link } from 'react-router-dom';

export const Login = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);

  const [emailInput, setEmailInput] = useState({
    value: '',
    touched: false,
    valid: false,
  });

  const emailValidation = useCallback((value: string) => value.trim() !== '' && value.length >= 5 && value.includes('@'), []);

  const [passwordInput, setPasswordInput] = useState({
    value: '',
    touched: false,
    valid: false,
  });

  const passwordValidation = useCallback((value: string) => value.length > 1 && value.length < 50, []);

  const formIsValid = emailInput.valid && passwordInput.valid;

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (formIsValid) {
      dispatch(
        loginUser({
          email: emailInput.value,
          password: passwordInput.value,
        })
      );
    }
  };

  return (
    <Container>
      <h2 className="title">LOGIN</h2>
      <Form onSubmit={submitHandler}>
        <ValidatedInput name="Email" id="email" type="email" value={emailInput} setValue={setEmailInput} validation={emailValidation}>
          {emailInput.touched && !emailInput.valid && <p>Email is not valid</p>}
        </ValidatedInput>
        <ValidatedInput name="Password" id="password" type="password" value={passwordInput} setValue={setPasswordInput} validation={passwordValidation}>
          {passwordInput.touched && !passwordInput.valid && <p>Password is not valid</p>}
        </ValidatedInput>
        <div className="confirm-box">
          {user.error && <p className="server-error">{user.error}</p>}
          <button className="confirm" disabled={user.loading || !formIsValid}>
            {user.loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          <Link to="/signup">
            Don't have an account? <span>Signup</span>
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
