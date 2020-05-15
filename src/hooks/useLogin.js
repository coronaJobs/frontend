// Apollo & GraphQL
import { useApolloClient, useMutation } from '@apollo/client';

// GraphQL
import { LOGIN } from '../graphql/mutations/users';

export default function useLogin(mail, password, validForm) {
    const client = useApolloClient();
    const result = {
        success: false,
        error: false,
    };
    const [ login ] = useMutation(LOGIN, {
        onCompleted({ login }) {
            localStorage.setItem('token', login);
            client.cache.writeData({
                data: { isLoggedIn: true },
            });
            result.success = true;
            result.error = false;
        },
        onError(error) {
            result.success = false;
            result.error = error;
        },
    });
    if (validForm) {
        login({ variables: { mail, password } });
    }
    return result;
};
