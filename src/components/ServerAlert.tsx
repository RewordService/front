import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import { IServerMessages } from '../interfaces';

interface IServerAlert {
  serverMessages?: IServerMessages;
}
const ServerAlert: React.FC<IServerAlert> = ({
  serverMessages,
}: IServerAlert) => {
  if (!serverMessages) return null;
  const { alerts, severity } = serverMessages;
  const alertItems = alerts.map((str) => (
    <Box mb={2}>
      <Alert severity={severity} key={str}>
        {str}
      </Alert>
    </Box>
  ));
  return <>{alertItems}</>;
};
ServerAlert.defaultProps = { serverMessages: undefined };

export default ServerAlert;
