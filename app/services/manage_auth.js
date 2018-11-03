import { checkUserExists } from './check_user_exists';
import { login } from './login';
import { register } from './register';

const manageAuth = async (client, variables) => {
  try {
    const user = await checkUserExists(client, { email: variables.email });
    return user ? login(client, variables) : register(client, variables);
  } catch (e) {
    return false;
  }
};

export { manageAuth };
