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
          <BoldTypography>準備中です</BoldTypography>
        </Section>
      </Box>
    </Container>
  );
};

export default AccountStatus;
