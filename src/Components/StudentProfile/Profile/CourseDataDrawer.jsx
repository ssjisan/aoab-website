import {
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Cross } from "../../../assets/Icons";

export default function CourseDataDrawer({
  open,
  toggleDrawer,
  selectedCourse,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
    console.log(selectedCourse);
    
  const handleRadioChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSave = () => {
    console.log(`Course: ${selectedCourse?.label}, Answer: ${selectedAnswer}`);
    toggleDrawer(false)();
  };

  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Stack sx={{ width: "320px" }}>
        <Stack
          sx={{ p: 2, borderBottom: "1px solid rgba(145, 142, 175, 0.24)" }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: "600" }}>
            AOA Courses & Others
          </Typography>
          <IconButton onClick={toggleDrawer(false)}>
            <Cross color="black" size="20px" />
          </IconButton>
        </Stack>

        <Stack sx={{ p: 2 }}>
          <Typography sx={{ mb: 2 }}>{selectedCourse?.question}</Typography>
          <RadioGroup value={selectedAnswer} onChange={handleRadioChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          {selectedAnswer === "yes" && (
            <Button variant="contained" sx={{ mt: 2 }}>
              Upload Document
            </Button>
          )}

          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#111827", color: "#fff" }}
            onClick={handleSave}
            disabled={!selectedAnswer}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
