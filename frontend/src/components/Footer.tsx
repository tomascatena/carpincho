import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer: FC = () => {
  return (
    <footer>
      <Box sx={{ margin: '1rem' }}>
        <Typography align='center'>Copyright &copy; Carpincho</Typography>

        <Typography align='center'>
          Built by <strong>Tomás Catena</strong>
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
