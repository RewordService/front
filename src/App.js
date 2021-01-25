import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import {createMuiTheme} from "@material-ui/core/styles"
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

function App() {
  return (
    <Router>
      <Header />
      <Route path="/Home" exact component={Home} />
      <Route path="/Game" exact component={Game} />
      <Route path="/Contact" exact component={Contact} />
      <Route path="/PrivacyPolicy" exact component={PrivacyPolicy} />
      <Route path="/SearchResult" exact component={SearchResult} />
      {IsSignedIn() ? (
        <>
          <Route path="/" exact component={Home} />
          <Route path="/Account/:id" exact component={Account} />
          <Route path="/ProfileEdit" exact component={ProfileEdit} />
          <Route path="/AccountEdit" exact component={AccountEdit} />
          <Route path="/AccountStatus" exact component={AccountStatus} />
        </>
      ) : (
        <>
          <Route path="/" exact component={LP} />
          <Route path="/Reword" exact component={LP} />
          <Route path="/Terms" exact component={Terms} />
          <Route path="/Account/:id" exact component={Account} />
          <Route path="/SignIn" exact component={SignIn} />
          <Route path="/SignUp" exact component={SignUp} />
        </>
      )}
      <Footer />
    </Router>
  )
}

export default App
