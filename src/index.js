import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import graphQLAPI from './api/graphQLAPI';
import { BrowserRouter } from 'react-router-dom';
import './styles/bootstrap-reboot.css';
import './styles/bootstrap-grid.css';
import './styles/font-awesome.css';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import localMajorityTheme from './styles/localMajorityTheme';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// console.log('endpoints', graphQLAPI.endpoints);
// console.log('queries', graphQLAPI.queries);

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphQLAPI.endpoints.graphQL,
  }),
  cache: new InMemoryCache(),
});

// console.log('Apollo Client', ApolloClient);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiThemeProvider muiTheme={getMuiTheme(localMajorityTheme)}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
