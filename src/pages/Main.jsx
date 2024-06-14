import { Grid, Box } from "@mui/material";
import AddTodo from "../components/AddTodo";
import Todo from "../components/Todo";
import Weather from "../components/Weather";
import TodoCalendar from "../components/TodoCalendar";
import { useState, useEffect } from "react";
import { nowDate } from "../formatting/date";
import RandomDogImage from "../components/RandomDogImage ";
import Sort from "../components/Sort";
import FinancialDashboard from "../components/FinancialDashboard ";
import { useNavigate } from "react-router-dom";
/*
{
    "id" : 52, 
    "name" : "일기쓰기",
    "startDate" : "2024-06-01", 
    "endDate" : "2024-06-30", 
    "done" : false, 
    "priority" : 1 
}
*/

const isDateInRange = (date, startDate, endDate) => {
  const targetDate = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);

  return targetDate >= start && targetDate <= end;
};

export default function Main() {
  const [sortCriteria, setSortCriteria] = useState("priority");
  const [sortDirection, setSortDirection] = useState("desc");
  const [viewDate, setViewDate] = useState(nowDate());
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const responseDate = await fetch(
          `http://localhost:8080/todo?start_date=2020-01-01&end_date=2050-01-01`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (responseDate.status === 401) {
          alert("로그인 후 이용해주세요");
          navigate("/");
        }
        if (!responseDate.ok) {
          throw new Error("데이터 가져오기 실패");
        }

        const data = await responseDate.json();
        setTodoList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function updateViewDate(date) {
    setViewDate(date);
  }
  const addTodo = (newTodo) => {
    setTodoList((prevTodos) => [...prevTodos, newTodo].sort(compareTodos));
  };
  async function deleteTodoById(id) {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    const deleteData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const responseDate = await fetch(`http://localhost:8080/todo/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!responseDate.ok) {
          throw new Error("삭제 실패");
        }
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    };
    await deleteData();
  }
  async function updateTodo(updatedTodo) {
    const changeData = async (data) => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const responseDate = await fetch(`http://localhost:8080/todo`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        });

        if (!responseDate.ok) {
          throw new Error("업데이트 실패");
        }
      } catch (error) {
        console.error("업데이트 실패:", error);
      }
    };
    await changeData(updatedTodo);
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };
  const handleSortDirectionChange = (direction) => {
    setSortDirection(direction);
  };

  const compareTodos = (a, b) => {
    if (a[sortCriteria] < b[sortCriteria])
      return sortDirection === "asc" ? -1 : 1;
    if (a[sortCriteria] > b[sortCriteria])
      return sortDirection === "asc" ? 1 : -1;
    return 0;
  };

  const priTodos = (a, b) => {
    if (a["priority"] < b["priority"]) return 1;
    if (a["priority"] > b["priority"]) return -1;
    return 0;
  };
  return (
    <Box>
      <Box className="flex bg-sky-200/50 mx-auto mt-3 w-[1200px] border-b-2 border-sky-300 rounded-t-md shadow-md">
        <Grid>
          <div className="w-[250px] m-4">
            <RandomDogImage />
          </div>
        </Grid>
        <Grid>
          <FinancialDashboard />
        </Grid>
        <Grid item className="h-[200px] overflow-y-auto">
          <div className="mt-4 mr-4">
            {todoList
              .filter((item) => item.endDate === nowDate())
              .sort(priTodos)
              .map((filteredItem, index) => (
                <div
                  key={filteredItem.id}
                  className={`rounded-xl ${
                    index % 2 === 0 ? "bg-sky-200/70" : null
                  }`}
                >
                  <Todo
                    todoItem={filteredItem}
                    deleteTodoById={deleteTodoById}
                    updateTodo={updateTodo}
                  />
                </div>
              ))}
          </div>
        </Grid>
      </Box>
      <Box className="flex bg-sky-200/50 mx-auto w-[1200px] rounded-b-md shadow-lg">
        <Box container flexGrow={1}>
          <Grid container direction="column">
            <Grid item>
              <AddTodo addTodo={addTodo} todoStartDates={viewDate} />
            </Grid>
            <Grid item container justifyContent="flex-end" className="p-2">
              <Box className="w-48">
                <Sort
                  sortCriteria={sortCriteria}
                  sortDirection={sortDirection}
                  changeSort={handleSortChange}
                  changeSortDirection={handleSortDirectionChange}
                />
              </Box>
            </Grid>
            <Grid item className="h-[350px] overflow-y-auto  ml-8 mb-2">
              {todoList
                .filter((item) =>
                  isDateInRange(viewDate, item.startDate, item.endDate)
                )
                .sort(compareTodos)
                .map((filteredItem, index) => (
                  <div
                    key={filteredItem.id}
                    className={`rounded-xl ml-4 ${
                      index % 2 === 0 ? "bg-sky-200/70" : null
                    }`}
                  >
                    <Todo
                      todoItem={filteredItem}
                      deleteTodoById={deleteTodoById}
                      updateTodo={updateTodo}
                    />
                  </div>
                ))}
            </Grid>
          </Grid>
        </Box>
        <Box flexShrink={0} className="ml-4 px-4 bg-gray-100/5">
          <Grid container direction="column" className=" bg-gray-100/5">
            <Weather></Weather>
            <TodoCalendar
              updateViewDate={updateViewDate}
              viewDate={viewDate}
              todoList={todoList}
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
