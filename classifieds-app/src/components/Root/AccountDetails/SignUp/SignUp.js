import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";

import TextInput from "#root/components/shared/TextInput";
import Label from "#root/components/shared/Label";
import LabelText from "#root/components/shared/LabelText";

const LoginButton = styled.button`
  display: inline-block;
  margin-top: .5rem;
`;

const mutation = gql`
    mutation($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            id
        }
    }
`;

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
    .test(
      "sameAsConfirmPassword",
      "${path} is not the same as the confirmation password",
      function(){
        return this.parent.password === this.parent.confirmPassword;
      }
    )
})

const SignUp = ({ toLogin }) => {
  const [createUser] = useMutation(mutation);
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset
  } = useForm({ mode: "onChange", validationSchema });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await createUser({ variables: { email, password } });
    reset();
    toLogin();
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
    <Label>
      <LabelText>Confirm Password</LabelText>
      <TextInput  disabled={isSubmitting} name="confirmPassword" type="password" ref={register} />
    </Label>
    <LoginButton disabled={isSubmitting || !isValid} type="submit" >Create User</LoginButton>
    <LoginButton onClick={toLogin}>Or Login</LoginButton>
  </form>;
};

export default SignUp;
