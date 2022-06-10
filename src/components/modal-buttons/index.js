import React from "react";
import styled from "styled-components";
import { Delete } from "../view-expense";

const ModalButtons = ({ cancel }) => {
  return (
    <>
      <ButtonContainer>
        <Button
          onClick={cancel}
          back="#f0f0f0"
          color="#2EB84B"
          hover="#2EB84B26"
          type="button"
        >
          CANCEL
        </Button>
        <Button back="#2EB84B" color="#ffffff" hover="#2EB84BCC" type="submit">
          SAVE
        </Button>
      </ButtonContainer>
    </>
  );
};

export default ModalButtons;

export const ButtonContainer = styled.div`
  height: 64px;
  // border: 2px solid #e4e4e4;
  margin-top: 24px;
  text-align: right;
  padding: 14px 24px;
`;

export const Button = styled(Delete)`
  color: ${(props) => props.color};
  background: ${(props) => props.back};
  margin-left: 18px;

  &:hover {
    background: ${(props) => props.hover};
  }
  &:disabled {
    background: red;
  }
`;
