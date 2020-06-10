import React from 'react';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag/src";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { clearSession } from "#root/store/ducks/session";

const Email = styled.div`
  color: ${props => props.theme.nero};
  font-size: 1rem;
  margin-top: .25rem;
`;
const LogoutLink = styled.a.attrs({ href: "#" })`
  color: blue;
  display: block;
  margin-top: .25rem;
`;
const Wrapper = styled.div`
  color: ${props => props.theme.mortar};
  font-size: .9rem;
`;

const mutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

const Account = (props) => {
  const dispatch = useDispatch()
  const [deleteUserSession] = useMutation(mutation);
  const session = useSelector(state => state.session);

  return <Wrapper>
    Logged in as <Email>{session.user.email}</Email>
    <LogoutLink onClick={event => {
      event.preventDefault();
      dispatch(clearSession());
      deleteUserSession({ variables: { sessionId: session.id }});
    }}>Logout </LogoutLink>
  </Wrapper>;
};

export default Account;