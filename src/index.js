// React
import React from 'react';
import ReactDOM from 'react-dom';

// Apollo
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';

import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const cache = new InMemoryCache({});

const httpLink = new HttpLink({
  uri: 'https://api-corona-jobs-staging.herokuapp.com/'
});

persistCache({
  cache,
	storage: window.localStorage
}).then(() => {
	const client = new ApolloClient({
		cache,
		link: httpLink,
		// resolvers,
		// typeDefs
  });
  
	// cache.writeData({
	// 	data: {
	// 		isLoggedIn: !!localStorage.getItem('token')
	// 	}
	// });

	// function IsLoggedIn() {
	// 	const { data } = useQuery(IS_LOGGED_IN);
	// 	return data.isLoggedIn ? <Pages /> : <Login />;
	// }

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
