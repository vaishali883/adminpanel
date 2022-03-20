import React from 'react';
import { Snackbar, IconButton, Alert } from '@mui/material';

const SnackbarModule = ({ open, message, handleSnackbarClose,severity }) => {
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open}
                onClose={handleSnackbarClose}
                message={message}
                autoHideDuration={5000}
                action={[
                    <IconButton key="close" aria-label="close" onClick={handleSnackbarClose}>x</IconButton>
                  ]}
            >
                <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
                </Snackbar>
        </div>
    )
}

export default SnackbarModule