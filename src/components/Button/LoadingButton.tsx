import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

interface ILoadingButton {
  loading: boolean;
  primary: string;
  color?: 'primary' | 'secondary';
  fullWidth?: boolean;
  onClick?: () => void;
}
const LoadingButton: React.FC<ILoadingButton> = ({
  loading,
  primary,
  color,
  fullWidth,
  onClick,
}: ILoadingButton) => (
  <Button
    type="submit"
    variant="contained"
    color={color}
    startIcon={
      <Fade in={loading}>
        <CircularProgress size={20} />
      </Fade>
    }
    disabled={loading}
    disableElevation
    fullWidth={fullWidth}
    onClick={onClick}
  >
    {primary}
  </Button>
);
LoadingButton.defaultProps = {
  color: 'primary',
  fullWidth: true,
  onClick: undefined,
};

export default LoadingButton;
