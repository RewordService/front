import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

interface ILoadingButton {
  loading: boolean;
  primary: string;
}
const LoadingButton: React.FC<ILoadingButton> = ({
  loading,
  primary,
}: ILoadingButton) => (
  <Button
    type="submit"
    variant="contained"
    color="primary"
    startIcon={
      <Fade in={loading}>
        <CircularProgress size={20} />
      </Fade>
    }
    disabled={loading}
    disableElevation
    fullWidth
  >
    {primary}
  </Button>
);

export default LoadingButton;
