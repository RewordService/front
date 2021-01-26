import React from "react"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import {ThemeProvider} from "@material-ui/core/styles"
import "fontsource-roboto"
//scripts
import {IsSignedIn} from "./Axios/UsersController"
//partials
import Header from "./Organisms/Header"
import Footer from "./Atom/Footer"
//pages
import Home from "./Pages/Home"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import Account from "./Pages/Account"
import ProfileEdit from "./Pages/ProfileEdit"
import AccountEdit from "./Pages/AccountEdit"
import AccountStatus from "./Pages/AccountStatus"
import Game from "./Pages/Game"
import LP from "./Pages/LP"
import Terms from "./Pages/Terms"
import PrivacyPolicy from "./Pages/PrivacyPolicy"
import Contact from "./Pages/Contact"
import SearchResult from "./Pages/SearchResult"
import routes from "./constants/routes.json"
import theme from "./constants/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path={routes.ROOT} exact component={Home} />
          <Route path={routes.HOME} exact component={Home} />
          <Route path={routes.GAME} exact component={Game} />
          <Route path={routes.CONTACT} exact component={Contact} />
          <Route path={routes.POLICY} exact component={PrivacyPolicy} />
          <Route path="/SearchResult" exact component={SearchResult} />
          <Route path={routes.LANDING} exact component={LP} />
          {IsSignedIn() ? (
            <>
              <Route path={routes.USER} exact component={Account} />
              <Route path="/ProfileEdit" exact component={ProfileEdit} />
              <Route path="/AccountEdit" exact component={AccountEdit} />
              <Route path="/AccountStatus" exact component={AccountStatus} />
            </>
          ) : (
            <>
              <Route path="/Terms" exact component={Terms} />
              <Route path={routes.USER} exact component={Account} />
              <Route path={routes.SIGNIN} exact component={SignIn} />
              <Route path={routes.SIGNUP} exact component={SignUp} />
            </>
          )}
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
