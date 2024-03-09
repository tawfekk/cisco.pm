import { Box, Hidden, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
        border-radius: 16px;
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 30px;
        height: 40px;
        transform:scale(0.8)
`
);


const linkStyle = {
  fontSize: '1.5rem', // equivalent to text-lg
  fontWeight: '600', // equivalent to font-semibold
  fontFamily: 'Manrope, sans-serif', // Use the Manrope font
  letterSpacing: '0.12em', // equivalent to tracking-widest
  color: '#8C7CF0', // equivalent to text-gray-900
  textTransform: 'uppercase',
};

const LogoSign = styled(Box)(
  ({ theme }) => `
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    width: 200px;
    height: 40px;;

`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-bottom: ${theme.spacing(5)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        float: right;
        font-size: ${theme.typography.pxToRem(11)};
`
);

export function Version() {
return (<VersionBadge sx={{ mt: 1.3}} >{sessionStorage.version}</VersionBadge>)
}



export function Logo() {
  return (
    <LogoWrapper to="https://cisco.pm">
      <LogoSignWrapper>
        <LogoSign>
          <img src="/static/images/logo/main.svg" />
          <Typography  sx={{ml:1.5}}  style={linkStyle}>cisco.pm</Typography>
        </LogoSign>
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export function LogoAlone() {
  return (
    <LogoSign>
      <img alt="Site logo" src="/static/images/logo/main.svg" />
      <Typography sx={{ml:1.5}} style={linkStyle}>cisco.pm</Typography>
    </LogoSign>
  );
}
