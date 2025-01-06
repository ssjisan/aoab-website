import { Stack } from "@mui/material";
import Copyright from "./Copyright";
import LogoPart from "./LogoPart";
import NavigatorPart from "./NavigatorPart";

export default function Footer() {
  return (
    <Stack
      sx={{ pt: "24px", pb: "24px", backgroundColor: "#F1F3F8" }}
      gap="40px"
    >
      <LogoPart />
      <NavigatorPart />
      <Copyright />
    </Stack>
  );
}
