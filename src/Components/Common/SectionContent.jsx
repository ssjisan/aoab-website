import PropTypes from "prop-types";
import { Grid, Stack, Typography } from "@mui/material";
import Chip from "./Chip";

export default function SectionContent({ chip, title, subTitle }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Stack gap="16px">
          <Stack gap="8px">
            <Chip chip={chip} />
            <Typography variant="h2">{title}</Typography>
          </Stack>
          <Typography variant="h6" color="text.secondary">
            {subTitle}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

// Define prop types for SectionContent
SectionContent.propTypes = {
  chip: PropTypes.string.isRequired, // The chip should be a string
  title: PropTypes.string.isRequired, // The title should be a string
  subTitle: PropTypes.string.isRequired, // The subtitle should be a string
};
