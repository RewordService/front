/* eslint-disable react/jsx-no-undef */
import React, { ChangeEvent, useState } from 'react';
import snakeCaseKeys from 'snakecase-keys';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import errorMessages from '../constants/errorMessages.json';
import BoldTypography from '../components/BoldTypography';
import Section from '../components/Section';
import LoadingButton from '../components/Button/LoadingButton';
import ServerAlert from '../components/ServerAlert';
import {
  remove,
  selectCurrentUser,
  selectHeaders,
  setCurrentUser,
  setHeaders,
} from '../slices/currentUser';
import {
  IErrorResponse,
  IErrorsResponse,
  IServerMessages,
  IUser,
  IUserSuccessResponse,
} from '../interfaces';
import routes from '../constants/routes.json';

const ProfileEdit: React.FC = () => (
  <Container>
    <ProfileChange />
    <EmailChange />
    <PasswordChange />
    <AccountDelete />
  </Container>
);

interface IFormValueProfile {
  introduction: string;
  name: string;
}
const ProfileChange = () => {
  const [loading, setLoading] = useState(false);
  const [serverMessages, setServerMessages] = useState<IServerMessages>();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, handleSubmit, errors } = useForm<IFormValueProfile>();
  const dispatch = useDispatch();
  const headers = useSelector(selectHeaders);
  const currentUser = useSelector(selectCurrentUser);
  const onSubmit = (data: IFormValueProfile) => {
    if (!headers) return;
    setLoading(true);
    axios
      .patch<IUserSuccessResponse>('/auth', snakeCaseKeys({ ...data }), headers)
      .then((res) => {
        setLoading(false);
        setServerMessages({
          severity: 'success',
          alerts: ['プロフィールを変更しました'],
        });
        dispatch(setCurrentUser(res.data.data));
      })
      .catch((err: AxiosError<IErrorsResponse>) => {
        setLoading(false);
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors.full_messages || [],
        });
      });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!headers) return;
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    axios
      .patch<{ data: IUser }>('/auth', formData, headers)
      .then((res) => {
        setServerMessages({
          severity: 'success',
          alerts: ['アイコンを変更しました'],
        });
        dispatch(setCurrentUser(res.data.data));
      })
      .catch((err: AxiosError<IErrorResponse>) => {
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors || [],
        });
      });
  };
  return (
    <Box mt={5}>
      <Section
        title={<BoldTypography variant="h5">ユーザー編集</BoldTypography>}
      >
        <Box mt={5}>
          <Box my={5}>
            <ServerAlert serverMessages={serverMessages} />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">アイコン</BoldTypography>
              </Box>
              <input onChange={handleChange} type="file" accept="image/*" />
            </Box>
            <Box mt={5}>
              <Box my={5}>
                <ServerAlert serverMessages={serverMessages} />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">名前</BoldTypography>
              </Box>
              <Controller
                name="name"
                control={control}
                defaultValue={currentUser?.name || ''}
                rules={{
                  required: {
                    value: true,
                    message: errorMessages.name.text + errorMessages.required,
                  },
                  maxLength: {
                    value: errorMessages.name.maxLength,
                    message:
                      errorMessages.name.text +
                      errorMessages.is +
                      String(errorMessages.name.maxLength) +
                      errorMessages.maxLength,
                  },
                }}
                render={({ ref, value, onChange }, { invalid }) => (
                  <TextField
                    variant="outlined"
                    label="Name"
                    error={invalid}
                    fullWidth
                    disabled={loading}
                    inputRef={ref}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <Alert severity="error">{message}</Alert>
                )}
              />
            </Box>
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">自己紹介文</BoldTypography>
              </Box>
              <Controller
                name="introduction"
                control={control}
                defaultValue={currentUser?.introduction || ''}
                render={({ ref, value, onChange }) => (
                  <TextField
                    variant="outlined"
                    label="introduction"
                    multiline
                    rows={10}
                    fullWidth
                    disabled={loading}
                    inputRef={ref}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Box>
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">性別</BoldTypography>
              </Box>
              <Controller
                name="gender"
                control={control}
                defaultValue={currentUser?.gender || 0}
                render={({ name, ref, value, onChange }) => (
                  <RadioGroup
                    row
                    ref={ref}
                    name={name}
                    value={value as number}
                    onChange={(e) =>
                      onChange(Number.parseInt(e.target.value, 10))
                    }
                  >
                    <FormControlLabel
                      value={1}
                      disabled={!!currentUser?.gender || undefined}
                      control={<Radio />}
                      label="男性"
                    />
                    <FormControlLabel
                      disabled={!!currentUser?.gender || undefined}
                      value={2}
                      control={<Radio />}
                      label="女性"
                    />
                    <FormControlLabel
                      disabled={!!currentUser?.gender || undefined}
                      value={9}
                      control={<Radio />}
                      label="その他"
                    />
                  </RadioGroup>
                )}
              />
            </Box>
            <Box mt={5}>
              <Box
                display="flex"
                alignItems="center"
                mb={3}
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
              >
                <BoldTypography variant="h6">誕生年</BoldTypography>
              </Box>

              <Controller
                name="birthday"
                control={control}
                defaultValue={currentUser?.birthday || ''}
                render={({ ref, value, onChange }) => (
                  <TextField
                    inputRef={ref}
                    type="date"
                    variant="outlined"
                    value={value as string}
                    id="date"
                    label="Birthday"
                    disabled={!!currentUser?.birthday || undefined}
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
            </Box>
            <Box mt={5}>
              <LoadingButton loading={loading} primary="保存" />
            </Box>
          </form>
        </Box>
      </Section>
    </Box>
  );
};

interface IFormValueEmail {
  email: string;
}
const EmailChange = () => {
  const [serverMessages, setServerMessages] = useState<IServerMessages>();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const headers = useSelector(selectHeaders);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { control, handleSubmit, errors } = useForm<IFormValueEmail>();
  const onSubmit = (data: IFormValueEmail) => {
    if (!headers) return;
    setLoading(true);
    setServerMessages(undefined);
    axios
      .patch<IUserSuccessResponse>('/auth', data, headers)
      .then((res) => {
        setLoading(false);
        setServerMessages({
          severity: 'success',
          alerts: ['メールアドレスを変更しました'],
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((err: AxiosError<IErrorsResponse>) => {
        setLoading(false);
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors.full_messages || [],
        });
      });
  };
  return (
    <Box mt={5}>
      <Section
        title={<BoldTypography variant="h5">メールアドレス変更</BoldTypography>}
      >
        <Box mt={5}>
          <ServerAlert serverMessages={serverMessages} />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={5}>
            <Controller
              name="email"
              control={control}
              defaultValue={currentUser?.email || ''}
              rules={{
                required: {
                  value: true,
                  message: errorMessages.email.text + errorMessages.required,
                },
                maxLength: {
                  value: errorMessages.email.maxLength,
                  message:
                    errorMessages.email.text +
                    errorMessages.is +
                    String(errorMessages.email.maxLength) +
                    errorMessages.maxLength,
                },
              }}
              render={({ ref, value, onChange }, { invalid }) => (
                <TextField
                  variant="outlined"
                  label="Email"
                  error={invalid}
                  fullWidth
                  disabled={loading}
                  inputRef={ref}
                  value={value as string}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <Alert severity="error">{message}</Alert>
              )}
            />
          </Box>
          <Box mt={5}>
            <LoadingButton loading={loading} primary="変更" />
          </Box>
        </form>
      </Section>
    </Box>
  );
};
interface IFormValuePassword {
  password: string;
  passwordConfirmation: string;
}
const PasswordChange = () => {
  const [serverMessages, setServerMessages] = useState<IServerMessages>();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    watch,
  } = useForm<IFormValuePassword>();
  const headers = useSelector(selectHeaders);
  const onSubmit = (data: IFormValuePassword) => {
    setLoading(true);
    if (!headers) return;
    setServerMessages(undefined);
    axios
      .put<IUserSuccessResponse>('/auth/password', snakeCaseKeys(data), headers)
      .then((res) => {
        setLoading(false);
        setServerMessages({
          severity: 'success',
          alerts: [res.data.message],
        });
      })
      .catch((err: AxiosError<IErrorsResponse>) => {
        setLoading(false);
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors.full_messages || [],
        });
      });
    setValue('password', '');
    setValue('passwordConfirmation', '');
  };
  return (
    <Box mt={5}>
      <Section
        title={<BoldTypography variant="h5">パスワード変更</BoldTypography>}
      >
        <Box mt={5}>
          <ServerAlert serverMessages={serverMessages} />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={5}>
            <Box mb={2}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message:
                      errorMessages.password.text + errorMessages.required,
                  },
                  minLength: {
                    value: errorMessages.password.minLength,
                    message:
                      errorMessages.password.text +
                      errorMessages.is +
                      String(errorMessages.password.minLength) +
                      errorMessages.minLength,
                  },
                  maxLength: {
                    value: errorMessages.password.maxLength,
                    message:
                      errorMessages.password.text +
                      errorMessages.is +
                      String(errorMessages.password.maxLength) +
                      errorMessages.maxLength,
                  },
                }}
                render={({ ref, value, onChange }, { invalid }) => (
                  <TextField
                    type="password"
                    variant="outlined"
                    label="password"
                    error={invalid}
                    fullWidth
                    disabled={loading}
                    inputRef={ref}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <Alert severity="error">{message}</Alert>
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller
                name="passwordConfirmation"
                control={control}
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message:
                      errorMessages.password_confirmation.text +
                      errorMessages.required,
                  },
                  validate: {
                    value: (value) =>
                      value === watch('password') ||
                      errorMessages.validate_password_confirmation,
                  },
                }}
                render={({ ref, value, onChange }, { invalid }) => (
                  <TextField
                    type="password"
                    variant="outlined"
                    label="password_confirmation"
                    error={invalid}
                    disabled={loading}
                    fullWidth
                    inputRef={ref}
                    value={value as string}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <ErrorMessage
                errors={errors}
                name="passwordConfirmation"
                render={({ message }) => (
                  <Alert severity="error">{message}</Alert>
                )}
              />
            </Box>
          </Box>
          <Box mt={5}>
            <LoadingButton loading={loading} primary="変更" />
          </Box>
        </form>
      </Section>
    </Box>
  );
};

const AccountDelete = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMessages, setServerMessages] = useState<IServerMessages>();
  const headers = useSelector(selectHeaders);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    if (!headers) return;
    setLoading(true);
    axios
      .delete('/auth', headers)
      .then(() => {
        history.push({ pathname: routes.HOME });
        dispatch(remove());
        setLoading(false);
      })
      .catch((err: AxiosError<IErrorsResponse>) => {
        setServerMessages({
          severity: 'error',
          alerts: err.response?.data.errors.full_messages || [],
        });
        setLoading(false);
      });
  };

  return (
    <Box my={5}>
      <Section
        title={<BoldTypography variant="h5">アカウント退会</BoldTypography>}
      >
        <Box mt={3}>
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            onClick={handleClickOpen}
          >
            Delete Account
          </Button>
        </Box>
      </Section>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">本当に削除しますか?</DialogTitle>
        <DialogContent>
          <Box my={3}>
            <ServerAlert serverMessages={serverMessages} />
          </Box>
          <DialogContentText id="alert-dialog-description">
            削除を行うと、アカウントやゲームの情報などがすべて消えます
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <LoadingButton
            fullWidth={false}
            loading={loading}
            primary="削除する"
            color="secondary"
            onClick={handleClick}
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default ProfileEdit;
