import React, { ReactNode, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

interface IDynamicSnackbar {
  children: ReactNode;
  severity: 'error' | 'success';
}
const DynamicSnackbar: React.FC<IDynamicSnackbar> = ({
  children,
  severity,
}: IDynamicSnackbar) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(true);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default DynamicSnackbar;
