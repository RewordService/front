import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import 'fontsource-roboto';
import { IsSignedIn } from './Axios/UsersController';
import Header from './Organisms/Header';
import Footer from './Atom/Footer';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import User from './Pages/User';
import ProfileEdit from './Pages/ProfileEdit';
import AccountEdit from './Pages/AccountEdit';
import AccountStatus from './Pages/AccountStatus';
import Game from './Pages/Game';
import LP from './Pages/LP';
import Terms from './Pages/Terms';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Contact from './Pages/Contact';
import Search from './Pages/Search';
import routes from './constants/routes.json';
import theme from './constants/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Header />
      <Switch>
        <Route path={routes.ROOT} exact component={Home} />
        <Route path={routes.HOME} exact component={Home} />
        <Route path={routes.GAME} exact component={Game} />
        <Route path={routes.CONTACT} exact component={Contact} />
        <Route path={routes.POLICY} exact component={PrivacyPolicy} />
        <Route path={routes.SEARCH} exact component={Search} />
        <Route path={routes.LANDING} exact component={LP} />
        <Route path={routes.USER} exact component={User} />
        {IsSignedIn() ? (
          <>
            <Route path={routes.PROFILEEDIT} exact component={ProfileEdit} />
            <Route path={routes.ACCOUNTEDIT} exact component={AccountEdit} />
            <Route
              path={routes.ACCOUNTSTATUS}
              exact
              component={AccountStatus}
            />
          </>
        ) : (
          <>
            <Route path="/Terms" exact component={Terms} />
            <Route path={routes.SIGNIN} exact component={SignIn} />
            <Route path={routes.SIGNUP} exact component={SignUp} />
          </>
        )}
      </Switch>
      <Footer />
    </Router>
  </ThemeProvider>
);

export default App;
