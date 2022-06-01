import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBudgets } from "../context";
import styled from "styled-components";
import { currencyFormatter } from "../utils";
import { AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { format } from "date-fns";
import { MISCELLANEOUS_BUDGET_ID } from "../context";
import * as Gi from "react-icons/gi";
import * as Md from "react-icons/md";
import * as Fi from "react-icons/fi";
import * as Ai from "react-icons/ai";
import * as Bi from "react-icons/bi";
import * as Bs from "react-icons/bs";
import * as Io from "react-icons/io";
import * as Tb from "react-icons/tb";

const Lists = () => {
  const { expenses, deleteExpense } = useBudgets();
  const { id } = useParams();

  const items = expenses.filter((expense) => {
    if (id) {
      return expense.budgetId === id;
    } else {
      return expenses;
    }
  });

  const handleDelete = (id) => {
    deleteExpense(id);
  };

  const DynamicFaIcon = ({ name }) => {
    const GiComponent = Gi[name];
    const BsComponent = Bs[name];
    const MdComponent = Md[name];
    const FiComponent = Fi[name];
    const AiComponent = Ai[name];
    const BiComponent = Bi[name];
    const IoComponent = Io[name];
    const TbComponent = Tb[name];

    if (GiComponent) {
      return <GiComponent />;
    }
    if (BsComponent) {
      return <BsComponent />;
    }
    if (MdComponent) {
      return <MdComponent />;
    }
    if (FiComponent) {
      return <FiComponent />;
    }
    if (AiComponent) {
      return <AiComponent />;
    }
    if (BiComponent) {
      return <BiComponent />;
    }
    if (IoComponent) {
      return <IoComponent />;
    }

    return <TbComponent />;
  };

  return (
    <div>
      {items.map((item) => {
        const date = format(new Date(item.date), "dd MMM, yyyy");
        // console.log(item);
        return (
          <List key={item.id}>
            <Name>
              <Tag>
                <DynamicFaIcon name={item.icon} />
              </Tag>
              <Details>
                <p>{item.category}</p>
                <span>{item.description}</span>
              </Details>
            </Name>
            <div>{date}</div>
            <div>
              {currencyFormatter.format(item.amount)}
              <Delete onClick={() => handleDelete(item.id)} />
            </div>
          </List>
        );
      })}
    </div>
  );
};

export default Lists;

const List = styled.div`
  padding: 10px 10px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(72, 219, 251, 0.3);
  border-radius: 6px;
`;

const Delete = styled(AiOutlineDelete)`
  color: rgba(194, 54, 22, 1);
  font-size: 22px;
  margin-left: 20px;
  vertical-align: bottom;
  cursor: pointer;
`;

const Name = styled.div`
  display: flex;
  span {
    font-size: 14px;
  }
  p {
    font-size: 18px;
    font-weight: 400;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  margin: 5px;
  font-size: 25px;
  background: rgba(47, 54, 64, 0.4);
  border-radius: 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;
