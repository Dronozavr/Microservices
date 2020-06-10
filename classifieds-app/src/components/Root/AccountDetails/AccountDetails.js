import React, { useState } from 'react';
import { useSelector } from "react-redux";

import Account from "./Account";
import Login from "./Login";
import SignUp from "./SignUp";

const AccountDetails = () => {
  const session = useSelector(state => state.session);
  const [page, setPage] = useState(true);

  if (session) return <Account />;

  return page ?
    (<Login toSignup={() => setPage(false)} />) :
    (<SignUp toLogin={() => setPage(true)} />);
};

export default AccountDetails;