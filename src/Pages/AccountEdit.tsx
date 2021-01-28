/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { UserDelete, UserInfo, CurrentUser } from '../Axios/UsersController';
import BoldTypography from '../components/BoldTypography';
// partials
import { FormSection } from '../Atom/Form';

interface IFormValue {
  sex: boolean | null;
  year: number;
  password: string;
  passwordConfirmation: string;
}
const AccountEdit: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormValue>();
  const year = new Date().getFullYear();

  useEffect(() => {
    UserInfo(CurrentUser()).then((res) => {
      console.log(res);
    });
  }, []);

  const onSubmit = (data: SubmitHandler<IFormValue>) => console.log(data);

  return (
    <Container>
      <Box my={5}>
        <Paper>
          <Box p={2}>
            <Box
              border={5}
              borderTop={0}
              borderRight={0}
              borderBottom={0}
              borderColor="primary.main"
            >
              <Box
                display="flex"
                alignItems="center"
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
                pl={4}
              >
                <BoldTypography variant="h5">プロフィール詳細</BoldTypography>
              </Box>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mt={5}>
                <Box
                  display="flex"
                  alignItems="center"
                  border={1}
                  borderTop={0}
                  borderLeft={0}
                  borderRight={0}
                  borderColor="text.disabled"
                  pl={4}
                >
                  <Typography variant="h6">性別</Typography>
                </Box>
                <Controller
                  name="sex"
                  control={control}
                  defaultValue={null}
                  render={({ ref, value, onChange }) => (
                    <RadioGroup
                      ref={ref}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="男性"
                      />
                      <FormControlLabel
                        value
                        control={<Radio />}
                        label="女性"
                      />
                      <FormControlLabel
                        value={null}
                        control={<Radio />}
                        label="その他"
                      />
                    </RadioGroup>
                  )}
                />
              </Box>

              <Box
                display="flex"
                alignItems="center"
                border={1}
                borderTop={0}
                borderLeft={0}
                borderRight={0}
                borderColor="text.disabled"
                pl={4}
              >
                <Typography variant="h6">誕生年</Typography>
              </Box>

              <Controller
                name="year"
                control={control}
                defaultValue=""
                render={({ value, onChange }) => (
                  <TextField
                    type="text"
                    value={value}
                    placeholder={`例)${year}`}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <h2>メールアドレス変更</h2>
              <Controller
                name="email"
                defaultValue=""
                render={({ value, onChange }) => (
                  <TextField
                    value={value}
                    type="text"
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <h2>パスワード変更</h2>
              <Typography>新しいパスワード</Typography>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ ref, value, onChange }) => (
                  <TextField
                    type="password"
                    inputRef={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />

              <Typography>新しいパスワード(確認)</Typography>
              <Controller
                control={control}
                name="passwordConfirmation"
                defaultValue=""
                render={({ ref, value, onChange }) => (
                  <TextField
                    type="password"
                    inputRef={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              />
              <Typography>アカウント削除</Typography>
              <Button onClick={UserDelete}>Delete</Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AccountEdit;
