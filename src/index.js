import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
//Apollo
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {BrowserRouter} from "react-router-dom";


const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

const authLink = setContext((_, {headers})=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY0MDUzNDU5NX0.Kclc2h4JmNXNnlg7H8doEx0qzLrxVUe8M94qzz6yMZ8';
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}`: ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
         <App />
        </ApolloProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
