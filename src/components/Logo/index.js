import { Box, Hidden, Tooltip } from "@mui/material";
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
        width: 52px;
        height: 38px;
        transform:scale(0.6)
`
);

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
    background: #8C7CF0;
    width: 215px;
    height: 60px;

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
        font-size: ${theme.typography.pxToRem(15)};
`
);

export function Version() {
return (<VersionBadge sx={{ mt: "93em", ml:-1}} >{sessionStorage.version}</VersionBadge>)
}



export function Logo() {
  return (
    <LogoWrapper to="/components/oversigt">
      <LogoSignWrapper>
        <LogoSign sx={{ mt: -1, ml: 2 }}>
          <img src="/static/images/logo/main.svg" />
        </LogoSign>
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export function LogoAlone() {
  return (
    <LogoSign>
      <img src="/static/images/logo/main.svg" />
    </LogoSign>
  );
}
