import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header';
import Footer from './components/Footer';
import coverImage from "./assets/images/chores.jpg";
import { makeStyles } from '@material-ui/core/styles';

import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleTask from './pages/SingleTask';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import AdminProfile from './components/AdminProfile';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const useStyles = makeStyles(theme => ({
  imageContainer: {
    display: 'flex',
    minHeight: '600px',
    padding: '30px',
    flexDirection: 'column',
    flexGrow: 1,
  },
  mainContainer: {
    zIndex: 1,
  },
  overlay: {
    content: "",
    position: 'absolute',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, .8))',
  }
}))

function App() {
  const classes = useStyles();
  const imageBackground = {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundImage: 'url("' + coverImage + '")',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };

  return (
    <ApolloProvider client={client}>
      <Router>

        <div className="flex-column justify-flex-start min-100-vh" >
          <Header />
          <div className={classes.imageContainer} style={imageBackground}>
            <div className={classes.overlay}></div>
            <div className={classes.mainContainer}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/profile/:username?" component={Profile} />
                <Route exact path="/SingleTask/:id" component={SingleTask} />
                <Route exact path="/Admin" component={AdminProfile} />

                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;