import { TableHead, TableRow } from "@mui/material";
import TableCell from "@mui/material/TableCell";

export default function Header() {
  return (
    <TableHead sx={{ borderRadius: "1em 0 0 1em" }}>
      <TableRow>
        <TableCell
          align="left"
          sx={{ p: "8px", fontWeight: "600", border: "1px solid #ddd" }}
        >
          Course Name
        </TableCell>
        <TableCell
          align="left"
          sx={{ p: "8px", fontWeight: "600", border: "1px solid #ddd" }}
        >
          Enrollment Time
        </TableCell>
        <TableCell
          align="left"
          sx={{ p: "8px", fontWeight: "600", border: "1px solid #ddd" }}
        >
          Status
        </TableCell>
        <TableCell
          align="left"
          sx={{ p: "8px", fontWeight: "600", border: "1px solid #ddd" }}
        >
          Payment
        </TableCell>
        <TableCell
          align="left"
          sx={{ p: "8px", fontWeight: "600", border: "1px solid #ddd" }}
        >
          Payment info
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
