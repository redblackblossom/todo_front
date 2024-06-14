import { TextField, Paper, Button, Grid, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/system";
import { useState } from "react";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function AddTodo({ addTodo, todoStartDates }) {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoImportance, setTodoImportance] = useState(3);
  const [totoStartDate, setTotoStartDate] = useState(todoStartDates);
  const [totoEndDate, setTodoEndDate] = useState(todoStartDates);

  function handleTitle(event) {
    setTodoTitle(event.target.value);
  }
  function handleImportance(event, newValue) {
    setTodoImportance(newValue);
  }
  function handleStartDateChange(event) {
    setTotoStartDate(event.target.value);
  }
  function handleEndDateChange(event) {
    setTodoEndDate(event.target.value);
  }

  async function handleClickButton() {
    const createTodo = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const responseDate = await fetch(`http://localhost:8080/todo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            done: false,
            name: todoTitle,
            priority: todoImportance,
            startDate: totoStartDate,
            endDate: totoEndDate,
          }),
        });

        if (!responseDate.ok) {
          throw new Error("생성 실패");
        }

        const data = await responseDate.json();
        return data["id"];
      } catch (error) {
        console.error("생성 실패", error);
        return null;
      }
    };

    const todoId = await createTodo();

    if (todoId !== null) {
      addTodo({
        id: todoId,
        done: false,
        name: todoTitle,
        priority: todoImportance,
        startDate: totoStartDate,
        endDate: totoEndDate,
      });
      setTodoTitle("");
    }
  }

  return (
    <Paper className="px-4 mt-3 ml-4 mb-2 h-20 pt-1">
      <Grid container>
        <Grid lg={5} item className="py-2">
          <TextField
            placeholder="할 일을 입력"
            fullWidth
            value={todoTitle}
            onChange={handleTitle}
          />
        </Grid>
        <Grid item lg={3} className="text-center p-2">
          <input
            type="date"
            id="startDate"
            value={totoStartDate}
            onChange={handleStartDateChange}
            className="mb-1"
          />
          <input
            type="date"
            id="endDate"
            value={totoEndDate}
            onChange={handleEndDateChange}
          />
        </Grid>
        <Grid item lg={2} className="p-2 content-center">
          <StyledRating
            name="simple-controlled"
            value={todoImportance}
            onChange={handleImportance}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
        </Grid>
        <Grid item lg={2} className="grid justify-items-center pl-4">
          <Button onClick={handleClickButton}>추가</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
