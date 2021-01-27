import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { IUser } from '../interfaces';
import routes from '../constants/routes.json';

const MiniCard = ({ id, name, image }: IUser) => {
  const history = useHistory();
  const handleClick = () => {
    history.push({
      pathname: `${routes.USERS}/${id}`,
    });
  };
  return (
    <Box my={2} mr={2}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <Box width={100} height={80} my={3}>
            <Box display="flex" justifyContent="center">
              <Avatar alt={name} src={image && image.url} />
            </Box>
            <Box m={2}>
              <Typography align="center" noWrap>
                {name}
              </Typography>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
};
const MiniCards = ({ users }: {users: IUser[]}) => {
  const cardItems = users.map(({ id, name, image }) => (
    <MiniCard key={id} id={id} name={name} image={image} />
  ));
  return (
    <Box display="flex" overflow="auto">
      {cardItems}
    </Box>
  );
};

export default MiniCards;
