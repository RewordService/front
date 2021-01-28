/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BoldTypography from '../components/BoldTypography';
import { UserPatch, UserInfo, CurrentUser } from '../Axios/UsersController';

const ProfileEdit: React.FC = () => {
  const { control, handleSubmit } = useForm();
  function IconPatch(e) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    UserPatch(formData).then(() => window.location.reload());
  }

  function IconDelete() {
    const data = { image: null };
    UserPatch(data);
  }
  const onSubmit = (data: SubmitHandler) => console.log(data);

  useEffect(() => {
    UserInfo(CurrentUser()).then((res) => {
      console.log(res);
    });
  }, []);

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
                <BoldTypography variant="h5">プロフィール編集</BoldTypography>
              </Box>
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
                <BoldTypography variant="h6">プロフィール画像</BoldTypography>
              </Box>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => IconPatch(e)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={IconDelete}
                disableElevation
              >
                デフォルトに戻す
              </Button>
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
                <BoldTypography variant="h6">紹介文</BoldTypography>
              </Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="introduce"
                  control={control}
                  defaultValue=""
                  render={({ ref, value, onChange }) => (
                    <TextField
                      variant="outlined"
                      label="introduce"
                      multiline
                      rows={10}
                      fullWidth
                      inputRef={ref}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
                <Box mt={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                  >
                    保存
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfileEdit;
