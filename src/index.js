// React
import React from 'react';
import ReactDOM from 'react-dom';

// Apollo & GraphQL
import { ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs, resolvers } from './graphql/resolvers';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// CSS
import './assets/css/index.css';
import './assets/css/Navigation-with-Search.css'

import App from './pages/App';
import * as serviceWorker from './serviceWorker';


const cache = new InMemoryCache({});


const httpLink = new HttpLink({
	uri: process.env.REACT_APP_BACKEND_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
	if (localStorage.getItem('token')) {
		operation.setContext({
			headers: {
				authorization: localStorage.getItem('token') || null
			}
		});
	}
	return forward(operation);
});

persistCache({
  cache,
  storage: window.localStorage,
}).then(() => {
	const client = new ApolloClient({
		cache,
		link: concat(authMiddleware, httpLink),
		resolvers,
		typeDefs
  	});
  
	cache.writeData({
		data: {
			isLoggedIn: !!localStorage.getItem('token'),
			currentUser: null,
		}
	});

	ReactDOM.render(
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>,
		document.getElementById('root')
	);
});


serviceWorker.unregister();
