import PropTypes from "prop-types";
import { Typography, Grid } from "@mui/material";

const PageTitle = ({ heading = "", subHeading = "", docs = "", ...rest }) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string,
};

export default PageTitle;
