import { userActions } from './features/user/userSlice';
import { store } from './store';

export const getUserInfoFromLocalStorage = (): void => {
  try {
    const persistedUserInfo = localStorage.getItem('userInfo');

    if (persistedUserInfo) {
      const userInfo = JSON.parse(persistedUserInfo);

      store.dispatch(userActions.hydrateUserInfo(userInfo));
    }
  } catch (error) {
    console.log(error);
  }
};
