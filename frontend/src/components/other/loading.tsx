import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <div className="loader">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress
                    color="inherit"  />
            </Box>
        </div>
    )
}
export default Loader;