import { useEffect, useState } from "react";
import {
  Accordion as AccordionMui,
  AccordionDetails,
  AccordionSummary,
  type SxProps,
  type Theme,
  Box,
  useTheme,
} from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionProps = {
  title?: string;
  icon?: React.ReactNode;
  opcion?: React.ReactNode;
  children: React.ReactNode;
  sxProps?: SxProps<Theme> | undefined;
  customHeader?: React.ReactNode;
  backgroundDetails?: SxProps<Theme> | undefined;
  isExpanded?: boolean;
  isDisabled?: boolean;
  onChange?: () => void;
};

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  sxProps = undefined,
  opcion,
  customHeader: customSummary,
  backgroundDetails,
  isExpanded = false,
  isDisabled = false,
  onChange,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
    if (onChange) onChange();
  };

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <AccordionMui
      expanded={expanded}
      onChange={handleChange}
      disabled={isDisabled}
      sx={{
        boxShadow: "none",
        "&:before": { display: "none" },
        ...sxProps,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          minHeight: "42px",
          py: 0.5,
          px: 2,
          "&.Mui-expanded": {
            minHeight: "42px",
          },
          "& .MuiAccordionSummary-content": {
            margin: "4px 0",
            "&.Mui-expanded": {
              margin: "4px 0",
            },
          },
        }}
      >
        {customSummary ? (
          customSummary
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              component="span"
              variant="body2"
              sxProps={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
            {opcion}
          </Box>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ ...backgroundDetails, pt: 1, pb: 2 }}>
        {children}
      </AccordionDetails>
    </AccordionMui>
  );
};