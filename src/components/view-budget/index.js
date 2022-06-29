import { useState, useEffect } from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useBudgets } from "../../context";
import { format } from "date-fns";
import { currencyFormatter } from "../../utils";
import EditBudgetModal from "../edit-budget-modal";
import ViewBudgetExpense from "../view-budget-expense";
import TotalExpenseReport from "../total-expense-report";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import DeleteModal from "../delete-modal";
import { supabase } from "../../supabaseClient";

const ViewBudget = (
  {
    // title,
    // budgetName,
    // toggle,
    // date,
    // budgetLeft,
    // des,
    // setDeleteModal,
    // startDate,
    // endDate,
  }
) => {
  let { budgetId } = useParams();
  let navigate = useNavigate();

  const { budgets, expenses, getBudgetExpenses, deleteBudget } = useBudgets();
  const [deleteModal, setDeleteModal] = useState(false);
  const [budgetRangeData, setBudgetRangeData] = useState([]);

  const singleBudget = budgets.filter((budget) => {
    return budget.id === budgetId;
  });

  const budgetName = singleBudget[0]?.name;
  const budgetMax = singleBudget[0]?.max;
  const budgetDate = singleBudget[0]?.created;
  const budgetStart = singleBudget[0]?.startDate;
  const budgetEnd = singleBudget[0]?.endDate;

  const daysLeft = new Date(budgetEnd).getDate() - new Date().getDate();

  const daysData = () => {
    if (daysLeft >= 0) {
      return `${daysLeft} days left`;
    } else {
      return "Finished";
    }
  };

  console.log({ daysLeft });
  //
  const dateString2 = budgetEnd && format(new Date(budgetEnd), "yyyy-MM-dd");
  const dateString1 =
    budgetStart && format(new Date(budgetStart), "yyyy-MM-dd");

  useEffect(() => {
    month();
  }, []);

  const month = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select()
      .lte("date", dateString2)
      .gte("date", dateString1);
    if (error) console.log("error", error);
    else setBudgetRangeData(data);
  };

  const budgetData = budgetRangeData.filter((item) => {
    return item.name === budgetName;
  });

  // //

  const totalBudgetExpenseAmount = budgetData.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  console.log({ budgetData });

  const budgetAmountLeft = budgetMax - totalBudgetExpenseAmount;

  //

  const [budgetModal, setBudgetModal] = useState(false);
  const [showBudgetExpense, setShowBudgetExpense] = useState(false);

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleModal = () => {
    setShowBudgetExpense(true);
  };

  const dropIn = {
    hidden: {
      // x: "100vw",
      opacity: 0,
    },
    visible: {
      // x: "0",
      opacity: 1,
      transition: {
        // delay: 0.2,
        duration: 0.3,
        type: "tween",
      },
    },
    exit: {
      // x: "100vw",
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <>
      <Container
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Head>
          <div>
            <Close onClick={() => navigate("/")} />
            <p>Detail</p>
          </div>
          <div>
            <Delete onClick={handleDelete}>DELETE</Delete>
            <Edit onClick={() => setBudgetModal(true)}>EDIT</Edit>
          </div>
        </Head>
        <Details>
          <h3>{budgetName}</h3>
          {/* <p>{budgetDate && format(new Date(budgetDate), "EEEE, dd/MM/yy")}</p> */}
          <p>{daysData()}</p>
          <hr />
          <p>{budgetAmountLeft >= 0 ? "Left" : "Overspent"}</p>
          <h3>{currencyFormatter.format(Math.abs(budgetAmountLeft))}</h3>
        </Details>
        <Chart>
          <TotalExpenseReport chartData={budgetData} />
        </Chart>
        <View>
          <p onClick={handleModal}>VIEW TRANSACTION</p>
        </View>
      </Container>

      <EditBudgetModal
        budgetModal={budgetModal}
        setBudgetModal={setBudgetModal}
        name={budgetName}
        startDate={budgetStart}
        endDate={budgetEnd}
        id={budgetId}
      />
      <ViewBudgetExpense
        showBudgetExpense={showBudgetExpense}
        close={setShowBudgetExpense}
        data={budgetData}
        total={totalBudgetExpenseAmount}
      />
      <DeleteModal
        deleteModal={deleteModal}
        toggle={setDeleteModal}
        deleteId={budgetId}
        redirect={"/"}
        func={deleteBudget}
        alert="Do you want to delete this budget?"
      />
    </>
  );
};

export default ViewBudget;

const Container = styled(motion.div)`
  background: #ffffff;
  width: min(92vw, 600px);
  height: min(100%, 620px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 3px 7px 0 rgb(0 0 0 / 27%);
  margin: auto;
  background: linear-gradient(145deg, #f5f6fa, #ffffff);
  box-shadow: 27px 27px 54px #666666, -27px -27px 54px #ffffff;
`;
const Head = styled.div`
  height: 64px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;

  & > div {
    display: flex;
    align-items: center;
  }
  p {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

export const Close = styled(IoArrowBack)`
  font-size: 1.25rem;
  margin-right: 18px;
  cursor: pointer;
  color: #969696;

  &:hover {
    color: #303030;
  }
`;
export const Delete = styled.button`
  border: none;
  outline: none;
  color: #f45a5a;
  background: transparent;
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  width: min(4rem, 5rem);
  height: 36px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #f45a5a21;
  }
`;
const Edit = styled(Delete)`
  color: #2db84c;
  &:hover {
    background: #2db84c21;
  }
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 60px;
  border-bottom: 1px solid #e4e4e4;
  margin-bottom: 20px;

  h3 {
    font-size: 24px;
    margin: 10px 0;
  }
  p {
    font-size: 0.75rem;
    color: #969696;
  }
  hr {
    width: 150px;
    margin: 12px 0;
  }
`;

const View = styled(Head)`
  justify-content: center;
  margin-top: 20px;
  height: 48px;
  border-top: 1px solid #e4e4e4;
  // align-self: baseline;

  p {
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

const Chart = styled.div`
  // padding: 1rem;
  text-align: center;
  width: 100%;
`;
