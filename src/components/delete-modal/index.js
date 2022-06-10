import React from "react";
import { Overlay, Title } from "../budget-modal";
import styled from "styled-components";
import { Delete } from "../view-expense";
import { useBudgets } from "../../context";

const DeleteModal = ({
  deleteModal,
  toggle,
  deleteId,
  toggleTab,
  func,
  alert,
}) => {
  const { deleteBudget } = useBudgets();

  const handleDelete = (id) => {
    func(id);
    toggle(false);
    toggleTab(false);
  };
  return (
    <>
      {deleteModal ? (
        <Overlay>
          <div className="modal">
            <Heading>
              <p>Confirm Deletion</p>
            </Heading>
            <Section>
              <p>{alert}</p>
            </Section>
            <Buttons>
              <Button
                onClick={() => toggle(false)}
                back="#f0f0f0"
                color="#2EB84B"
                hover="#2EB84B26"
                type="button"
              >
                CANCEL
              </Button>
              <Button
                onClick={() => handleDelete(deleteId)}
                back="#F25A5A"
                color="#ffffff"
                hover="#F25A5ACC"
                type="button"
              >
                DELETE
              </Button>
            </Buttons>
          </div>
        </Overlay>
      ) : null}
    </>
  );
};

export default DeleteModal;
const Heading = styled(Title)`
  width: 496px;
  height: 64px;
`;
const Section = styled.div`
  height: 62px;
  padding: 17px 24px 24px;
  font-size: 14px;
`;

const Buttons = styled.div`
  height: 64px;
  text-align: right;
  padding: 14px 24px;
`;

const Button = styled(Delete)`
  color: ${(props) => props.color};
  background: ${(props) => props.back};
  margin-left: 18px;

  &:hover {
    background: ${(props) => props.hover};
  }
`;