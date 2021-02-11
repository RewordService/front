import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Pages/Home/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import User from './Pages/User';
import AccountEdit from './Pages/AccountEdit';
import AccountStatus from './Pages/AccountStatus';
import Game from './Pages/Game';
import LP from './Pages/LP';
import Terms from './Pages/Terms';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Contact from './Pages/Contact';
import Users from './Pages/Users/Users';
import routes from './constants/routes.json';
import { selectCurrentUser } from './slices/currentUser';

const Routes: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Switch>
      <Route
        path={routes.SITEMAP}
        exact
        component={() => {
          window.location.href =
            'https://reword.s3-ap-northeast-1.amazonaws.com/sitemaps/sitemap.xml.gz';
          return null;
        }}
      />
      <Route path={routes.ROOT} exact component={Home} />
      <Route path={routes.HOME} exact component={Home} />
      <Route path={routes.GAME} exact component={Game} />
      <Route path={routes.CONTACT} exact component={Contact} />
      <Route path={routes.POLICY} exact component={PrivacyPolicy} />
      <Route path={routes.SEARCH} exact component={Users} />
      <Route path={routes.LANDING} exact component={LP} />
      <Route path={routes.USER} exact component={User} />
      {currentUser?.id ? (
        <>
          <Route path={routes.ACCOUNTEDIT} exact component={AccountEdit} />
          <Route path={routes.ACCOUNTSTATUS} exact component={AccountStatus} />
        </>
      ) : (
        <>
          <Route path="/Terms" exact component={Terms} />
          <Route path={routes.SIGNIN} exact component={SignIn} />
          <Route path={routes.SIGNUP} exact component={SignUp} />
        </>
      )}
      <Redirect to={routes.ROOT} />
    </Switch>
  );
};

export default Routes;
