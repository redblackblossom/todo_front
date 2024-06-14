import {
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

export default function Todo({ todoItem, deleteTodoById, updateTodo }) {
  const updateList = async (updatedTodo) => {
    await updateTodo(updatedTodo);
  };
  const handleDelete = async () => {
    await deleteTodoById(todoItem.id);
  };

  const handleChange = async (event) => {
    await updateList({
      ...todoItem,
      name: event.target.value,
    });
  };

  async function handleImportance(event, newValue) {
    const updatedTodo = { ...todoItem, priority: newValue };
    updateList(updatedTodo);
  }

  async function handleDone() {
    const updatedTodo = { ...todoItem, done: !todoItem.done };
    await updateList(updatedTodo);
  }

  async function handleStartDate(event) {
    const updatedTodo = { ...todoItem, startDate: event.target.value };
    await updateList(updatedTodo);
  }
  async function handleEndDate(event) {
    const updatedTodo = { ...todoItem, endDate: event.target.value };
    await updateList(updatedTodo);
  }

  return (
    <div>
      <ListItem className="mx-auto">
        <Checkbox checked={todoItem.done} onClick={handleDone} />
        <ListItemText>
          <TextField
            placeholder="할 일을 입력"
            fullWidth
            value={todoItem.name}
            onChange={handleChange}
            variant="standard" 
            InputProps={{
              disableUnderline: true,
              style: {
                border: "none",
                padding: 0,
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: {
                border: "none",
              },
            }}
          />
        </ListItemText>
        <input
          type="date"
          id="endDate"
          value={todoItem.startDate}
          onChange={handleStartDate}
          className="mr-2 rounded-xl pl-2"
        />
        <input
          type="date"
          id="endDate"
          value={todoItem.endDate}
          onChange={handleEndDate}
          className="mr-1 rounded-xl pl-2"
        />
        <StyledRating
          name="simple-controlled"
          value={todoItem.priority}
          onChange={handleImportance}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <Button className="m-auto" onClick={handleDelete}>
          삭제
        </Button>
      </ListItem>
    </div>
  );
}

Todo.propTypes = {
  todoItem: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    done: PropTypes.bool.isRequired, 
    title: PropTypes.string.isRequired, 
    startDate: PropTypes.string.isRequired, 
    endDate: PropTypes.string.isRequired, 
  }).isRequired,
  deleteTodoById: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
};
