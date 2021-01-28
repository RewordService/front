import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import BoldTypography from '../components/BoldTypography';
import CardDelete from '../Axios/CardDelete';
import { UserInfo, CurrentUser } from '../Axios/UsersController';
import { Btn } from '../Atom/Button';
import Section from '../Atom/Section';

const AccountStatus: React.FC = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    UserInfo(CurrentUser())
      .then(({ memberstatus }) => {
        if (!memberstatus) return;
        setStatus(memberstatus);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container>
      <Box my={5}>
        <Paper>
          <Box p={2}>
            <Section>
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
                  <BoldTypography variant="h5">会員ステータス</BoldTypography>
                </Box>
              </Box>
              {status ? (
                <>
                  <h3>有料会員</h3>
                  <Btn
                    type="button"
                    value="カードを削除する"
                    onClick={CardDelete}
                  />
                  <h2>IOS</h2>
                  <p>開発中</p>
                  <h2>Android</h2>
                </>
              ) : (
                <>
                  <h3>無料会員</h3>
                  <p style={{ color: 'red' }}>
                    ただいま、決済サービスへの申請を行っています。
                  </p>
                  <div>
                    有料会員になることで、アプリケーションをインストールすることができます。
                  </div>
                  <p style={{ color: 'red' }}>
                    IOSアプリは未対応です。申し訳ございません
                  </p>
                </>
              )}
            </Section>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AccountStatus;
