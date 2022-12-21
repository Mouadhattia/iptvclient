// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

// utils
import { fShortenNumber } from "./helpers";
// components
import Iconify from "./Iconify";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

Cart.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function Cart({
  title,
  total,
  icon,
  color = "primary",
  bgColor = "#D1E9FC",
  fontColor = "#061B64",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: fontColor,
        bgcolor: bgColor,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].dark,
              0
            )} 0%, ${alpha(theme.palette[color].dark, 0.24)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h4">{fShortenNumber(total)}{' DT'}</Typography>

      <Typography variant="span" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
