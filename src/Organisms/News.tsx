import React from 'react';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import news from '../Assets/news';
import BoldTypography from '../components/BoldTypography';

const News: React.FC = () => (
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
          <InfoIcon />
          <BoldTypography variant="h5">お知らせ</BoldTypography>
        </Box>
      </Box>
      <Box maxHeight={300} overflow="auto">
        <List>
          {news.news.map(({ title, date, url }) => (
            <>
              <ListItem key={title} component={Link} href={url} button>
                <ListItemText primary={title} secondary={`(${date})`} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </Box>
  </Paper>
);

export default News;
