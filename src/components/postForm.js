// React
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Bootstrap
import { Button, Form } from 'react-bootstrap';

// Apollo & GraphQL
import { useApolloClient, useMutation, useQuery} from '@apollo/client';
import { LOGIN } from '../graphql/mutations/users';
import { IS_LOGGED_IN } from '../graphql/queries/inner_queries';


export default function PostFormComponent () {
  return(
    <div>
      <p>Ola</p>
    </div>
  )
}