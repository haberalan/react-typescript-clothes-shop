import styled from 'styled-components';
import React, { HTMLInputTypeAttribute } from 'react';

type inputObject = {
  value: string;
  touched: boolean;
  valid: boolean;
};

type inputValidatonProps = {
  name: string;
  id: string;
  type: HTMLInputTypeAttribute;
  value: inputObject;
  setValue: React.Dispatch<React.SetStateAction<inputObject>>;
  validation: (value: string, touched: boolean) => boolean;
  placeholder?: string;
  children?: React.ReactNode;
};

export const ValidatedInput = React.memo((props: inputValidatonProps) => {
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue((prev) => {
      return {
        ...prev,
        value: e.target.value,
      };
    });
  };

  const blurHandler = () => {
    props.setValue((prev) => {
      return {
        ...prev,
        touched: true,
        valid: props.validation(prev.value, true),
      };
    });
  };

  return (
    <Input>
      <label htmlFor={props.name}>{props.name}: </label>
      <input
        type={props.type}
        id={props.name}
        placeholder={props.placeholder}
        value={props.value.value}
        onBlur={blurHandler}
        onChange={changeHandler}
        className={!props.value.valid && props.value.touched ? 'invalid' : ''}
      />
      {props.children}
    </Input>
  );
});

const Input = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  width: 20rem;

  .invalid {
    background: #fce6e7;
  }

  label {
    font-size: 1.4rem;
    color: #4a4c4e;
  }

  input {
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
    font-size: 1rem;
    font-family: inherit;
    color: inherit;
    border: 1px solid #1d1f22;
  }

  p {
    font-size: 0.8rem;
    font-weight: 700;
  }

  div {
    font-size: 0.8rem;
  }

  div > ul {
    margin-top: 0.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    font-weight: 700;
    list-style-type: disc;
  }

  div > ul > li {
    margin-left: 1rem;
  }
`;
