// React
import React from 'react';
import ReactDOM from 'react-dom';

// Apollo & GraphQL
import { ApolloClient, HttpLink, ApolloProvider, concat, ApolloLink } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs, resolvers } from './graphql/resolvers';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// CSS
import './assets/css/index.css';
import './assets/css/colorPalette.css';
import './assets/css/Navigation-with-Search.css'

import App from './pages/App';
import * as serviceWorker from './serviceWorker';


const cache = new InMemoryCache({});

const httpLink = new HttpLink({
  uri: 'https://api-corona-jobs-staging.herokuapp.com/'
});

// TODO: Set auth middleware
// const authMiddleware = new ApolloLink((operation, forward) => {
// 	operation.setContext({
// 		headers: {
// 			authorization: localStorage.getItem('token') || null
// 		}
// 	});
// 	return forward(operation);
// });

persistCache({
  cache,
  storage: window.localStorage,
}).then(() => {
	const client = new ApolloClient({
		cache,
		link: httpLink,
		resolvers,
		typeDefs
  	});
  
	cache.writeData({
		data: {
			isLoggedIn: !!localStorage.getItem('token')
		}
	});

	ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
		document.getElementById('root')
	);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
