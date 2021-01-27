import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { IUser } from '../interfaces';
import routes from '../constants/routes.json';

const UserCard: React.FC<{ user: IUser }> = ({
  user: { name, id, image },
}: {
  user: IUser;
}) => {
  const history = useHistory();
  const handleClick = () =>
    history.push({
      pathname: `${routes.USERS}/${id}`,
    });

  return (
    <Box mb={1}>
      <Card>
        <CardActionArea onClick={handleClick}>
          <CardContent>
            <Box p={1}>
              <Grid container>
                <Grid item xs={6}>
                  <Avatar
                    alt={name}
                    src={
                      image &&
                      `https://rewordbackend.herokuapp.com/${image.url}`
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{name}</Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

const UserCards: React.FC<{ users: IUser[] }> = ({
  users,
}: {
  users: IUser[];
}) => {
  const cardItems = users.map((user) => <UserCard key={user.id} user={user} />);
  return (
    <Box my={5}>
      <Container maxWidth="sm">{cardItems}</Container>
    </Box>
  );
};

export default UserCards;
