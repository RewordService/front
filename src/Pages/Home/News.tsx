import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import news from '../../Assets/news';
import BoldTypography from '../../components/BoldTypography';
import Section from '../../components/Section';

const News: React.FC = () => (
  <Section
    title={
      <>
        <InfoIcon />
        <BoldTypography variant="h5">お知らせ</BoldTypography>
      </>
    }
  >
    <Box maxHeight={300} overflow="auto">
      <List>
        {news.news.map(({ title, date, url }) => (
          <Box key={title} color="text.primary">
            <ListItem component={Link} color="inherit" href={url} button>
              <ListItemText primary={title} secondary={`(${date})`} />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  </Section>
);

export default News;
