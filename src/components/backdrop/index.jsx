import { motion } from "framer-motion";
import styled from "styled-components";

const Backdrop = ({ children, onClick }) => {
  return (
    <Container
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </Container>
  );
};

export default Backdrop;

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  // justify-content: center;
  // align-items: start;
  z-index: 10;
`;
