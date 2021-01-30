import React, { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

interface ISection {
  title: ReactNode;
  children: ReactNode;
}

const Section: React.FC<ISection> = ({ title, children }: ISection) => (
  <Box mt={5}>
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
            {title}
          </Box>
        </Box>
        {children}
      </Box>
    </Paper>
  </Box>
);

export default Section;
