import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import BoldTypography from '../components/BoldTypography';
import Section from '../components/Section';
import { selectCurrentUser } from '../slices/currentUser';

const AccountStatus: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Container>
      <Box mb={5}>
        <Section
          title={<BoldTypography variant="h5">会員ステータス</BoldTypography>}
        >
          {currentUser ? (
            <>
              <h3>有料会員</h3>
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
    </Container>
  );
};

export default AccountStatus;
