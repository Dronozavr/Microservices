import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag/src";
import styled from "styled-components";

import AddListing from "./AddListing";

const Description = styled.p`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: block;
  
  :not(:first-child) {
    margin-top: .75rem;
  }
`;

const Listing = styled.div`
  padding: 1rem 0;
  
  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.veryLightGrey};
  }
`;

const Title = styled.strong`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
`;

const query = gql`
    {
        listings {
            description
            id
            title
        }
    }
`;

const Listings = (props) => {
  const { data, loading, refetch } = useQuery(query);

  if (loading) return "Loading...";

  return (
    <div>
      {
        data.listings.map(listing => (
          <Listing key={listing.id}>
            <Title>{listing.title}</Title>
            <Description>{listing.description}</Description>
          </Listing>
        ))
      }
      <AddListing onAddListing={() => refetch()} />
    </div>
  );
};

export default Listings;