import { Box, Hidden, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';


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
        margin-top: 4px;
        transform: scale(.4);
`
);

const LogoSign = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(50)};
    height: ${theme.spacing(24)};
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
`
);


const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-bottom: ${theme.spacing(6)};
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
        font-size: ${theme.typography.pxToRem(11)};
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {


  return (
    <LogoWrapper to="/components/oversigt">
      <LogoSignWrapper>
        <LogoSign sx={{mt:7, ml:-6.4}}>
          <img src="/static/images/logo/main.svg" />
        </LogoSign>
      </LogoSignWrapper>
        <LogoTextWrapper sx={{ml:11, mt:7}}>
          <Tooltip title="version 1.00.1 - alpha" arrow placement="right">
            <VersionBadge>alpha</VersionBadge>
          </Tooltip>
          <LogoText>cisco.pm</LogoText>
        </LogoTextWrapper>
    </LogoWrapper>
  );
}

export default Logo;
