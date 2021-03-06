import { Title } from "../edit-budget-modal";
import styled from "styled-components";
import { Delete } from "../view-expense";
import Modal from "../modal";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({
  deleteModal,
  toggle,
  deleteId,
  func,
  alert,
  redirect,
}) => {
  let navigate = useNavigate();

  const handleDelete = () => {
    func(deleteId);
    toggle(false);
    navigate(redirect);
  };

  return (
    <>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {deleteModal ? (
          <Modal>
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
          </Modal>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DeleteModal;
const Heading = styled(Title)`
  width: min(90vw, 496px);
  height: 64px;
`;
const Section = styled.div`
  height: 62px;
  padding: 17px 24px 24px;
  font-size: 0.9rem;
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
