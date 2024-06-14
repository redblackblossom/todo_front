import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function Sort({
  sortCriteria,
  sortDirection,
  changeSort,
  changeSortDirection,
}) {
  const handleSortChange = (event) => {
    changeSort(event.target.value);
  };

  const toggleSortDirection = () => {
    changeSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <Box display="flex" alignItems="center">
      <FormControl variant="outlined" sx={{ flexGrow: 1, mr: 2 }}>
        <InputLabel>정렬 기준</InputLabel>
        <Select
          value={sortCriteria}
          onChange={handleSortChange}
          label="정렬 기준"
        >
          <MenuItem value="name">제목</MenuItem>
          <MenuItem value="priority">중요도</MenuItem>
          <MenuItem value="startDate">시작일</MenuItem>
          <MenuItem value="endDate">종료일</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={toggleSortDirection}
        sx={{
          backgroundColor: "#a1d3f7",
          "&:hover": {
            backgroundColor: "#a1bff7",
          },
          height: "56px",
        }}
      >
        {sortDirection === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </Button>
    </Box>
  );
}
