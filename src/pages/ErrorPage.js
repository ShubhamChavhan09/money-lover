import React from "react";
import styled from "styled-components";

const ErrorPage = () => {
  return (
    <Page>
      <h2>404</h2>
      <p>Not Found</p>
      <p className="small">Sorry, we were unable to find that page</p>
      <span>Please use the main menu.</span>
    </Page>
  );
};

export default ErrorPage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h2 {
    font-size: 7rem;
  }

  p {
    font-size: 2rem;
  }
  p.small {
    font-size: 1rem;
  }
  span {
    font-size: 0.8rem;
  }
`;
