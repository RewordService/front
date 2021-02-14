import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { store, persistor } from './store';
import theme from './constants/theme';
import 'fontsource-roboto';

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes />
          <Footer />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
