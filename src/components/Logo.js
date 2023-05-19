import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src="/static/logo.png" sx={{ width: 160, height: 30,marginLeft:5,marginTop:2,  ...sx }} />;
}
