import React from 'react';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useSelector } from "react-redux";

import TextInput from "#root/components/shared/TextInput";
import TextArea from "#root/components/shared/TextArea";
import Label from "#root/components/shared/Label";
import LabelText from "#root/components/shared/LabelText";

const Button = styled.button`
  display: inline-block;
  margin-top: .5rem;
`;

const Form = styled.form`
  background-color: ${props => props.theme.whiteSmoke};
  margin-top: 1rem;
  padding: 1rem;
`;

const mutation = gql`
  mutation($description: String!, $title: String!) {
    createListing(description: $description, title: $title) {
        id
    }
  }
`;

const AddListing = ({ onAddListing: pushAddListing }) => {
  const [createListings] = useMutation(mutation);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm();
  const session = useSelector(state => state.session);

  if (!session) return <p>Login to add listing</p>

  const onSubmit = handleSubmit(async ({ description, title }) => {
    await createListings({ variables: { description, title } });
    reset();
    pushAddListing();
  });

  return <Form onSubmit={onSubmit}>
    <Label>
      <LabelText>
        Title
      </LabelText>
      <TextInput name="title" disabled={isSubmitting} ref={register} type="text" />
    </Label>
    <Label>
      <LabelText>
        Description
      </LabelText>
      <TextArea name="description" disabled={isSubmitting} ref={register} />
    </Label>
    <Button disabled={isSubmitting} type="submit"> Add Listing </Button>
  </Form>;
};

export default AddListing;