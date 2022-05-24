import React from "react";
import { useParams } from "react-router-dom";

const Lists = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Lists</div>;
};

export default Lists;
