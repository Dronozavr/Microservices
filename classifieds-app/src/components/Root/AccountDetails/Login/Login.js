import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import TextInput from "#root/components/shared/TextInput";
import LabelText from "#root/components/shared/LabelText";
import Label from "#root/components/shared/Label";
import { setSession } from "#root/store/ducks/session";

const LoginButton = styled.button`
  display: inline-block;
  margin-top: .5rem;
`;

const mutation = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;

const Login = ({ toSignup }) => {
  const dispatch = useDispatch();
  const [createUserSession] = useMutation(mutation);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const {
      data: {
        createUserSession: createSession
      }
    } = await createUserSession({ variables: { email, password } });
    dispatch(setSession(createSession));
  });


  return <form onSubmit={onSubmit}>
    <Label>
      <LabelText>Email</LabelText>
      <TextInput  disabled={isSubmitting} name="email" type="email" ref={register} />
    </Label>
    <Label>
      <LabelText>Password</LabelText>
      <TextInput  disabled={isSubmitting} name="password" type="password" ref={register} />
    </Label>
    <LoginButton disabled={isSubmitting} type="submit" >Login</LoginButton>
    <LoginButton onClick={toSignup}>Or Sig Up</LoginButton>
  </form>;
};

export default Login;
