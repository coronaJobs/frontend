// Apollo & GraphQL
import { useApolloClient, useMutation } from '@apollo/client';

// GraphQL
import { LOGIN } from '../graphql/mutations/users';

export default function useLogin(mail, password, validForm) {
    const client = useApolloClient();
    const result = {
        success: false,
        error: null,
    };
    const [ login, resultMutation ] = useMutation(LOGIN, {
        onCompleted({ login }) {
            localStorage.setItem('token', login);
            client.cache.writeData({
                data: { isLoggedIn: true },
            });
            result.success = true;
            result.error = false;
        },
        onError() {},
    });
    if (validForm) {
        login({ variables: { mail, password } });
    }
    if (resultMutation.error) {
        result.success = false;
        result.error = resultMutation.error;
    }
    return result;
};
