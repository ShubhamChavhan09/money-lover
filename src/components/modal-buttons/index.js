import styled from "styled-components";

const ModalButtons = ({ cancel, hidden }) => {
  return (
    <>
      <ButtonContainer>
        {!hidden && (
          <Button
            onClick={cancel}
            back="#f0f0f0"
            color="#2EB84B"
            hover="#2EB84B26"
            type="button"
          >
            CANCEL
          </Button>
        )}
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
  margin-top: 24px;
  text-align: right;
  padding: 14px 24px;
`;

export const Button = styled.button`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100px;
  height: 36px;
  cursor: pointer;
  border-radius: 4px;
  color: ${(props) => props.color};
  background: ${(props) => props.back};
  margin-left: 18px;

  &:hover {
    background: ${(props) => props.hover};
  }
`;
