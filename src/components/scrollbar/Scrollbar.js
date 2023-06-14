
import { memo } from 'react';
// @mui
//import { Box } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------



function Scrollbar({ children, sx, ...other }) {
    // server side rendering (SSR)
  //const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  //console.log(userAgent);
  //const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  //console.log(isMobile);
  //if (isMobile) {
  //  return (
  //    <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
  //      {children}
  //    </Box>
  //  );
  //}

  return (
    <StyledRootScrollbar>
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);