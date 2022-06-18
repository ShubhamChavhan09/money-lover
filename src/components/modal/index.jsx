import { motion } from "framer-motion";
import { Children } from "react";
import styled from "styled-components";
import Backdrop from "../backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, children, height, width }) => {
  return (
    <Backdrop onClick={handleClose}>
      <Box
        height={height}
        width={width}
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </Box>
    </Backdrop>
  );
};

export default Modal;

const Box = styled(motion.div)`
  color: black;
  margin: auto;
  background: #ffffff;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  //   width: 350px;
  //   height: 390px;
  border-radius: 4px;
  //   position: absolute;
`;
