import { motion , useScroll } from "framer-motion";
import { propTypes } from "prop-types";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { textGradient, bgGradient } from "../../../utils/cssStyles";
import { MotionContainer, varFade } from '../../../components/animate';


const StyledGradientText = styled(motion.h3)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: "400%",
  fontFamily: "'Barlow', sans-serif",
  fontSize: `4rem`,
  textAlign: "center",
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  fontWeight: 800,
  userSelect: "none",
  [theme.breakpoints.up("md")]: {
    fontSize: `2rem`,
  },
}));

export default function TitleGradient() {
  return (
    <motion.div variants={varFade().in}>
    <StyledGradientText
      animate={{ backgroundPosition: "200% center" }}
      transition={{
        repeatType: "reverse",
        ease: "linear",
        duration: 20,
        repeat: Infinity,
      }}
    >
      Bienvenido a SUKHA
    </StyledGradientText>
    </motion.div>
  );
}
