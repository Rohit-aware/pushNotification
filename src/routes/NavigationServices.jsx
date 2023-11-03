import { NavigationActions } from '@react-navigation/native';

let _navigator;
const setTopLevelNavigation = (navigationRef) => {
    _navigator = navigationRef;
}

const ToNavigate = (Screen, params) => {
    _navigator.navigate(Screen, params)
}

const goBack = () => {
    _navigator.dispatch(NavigationActions.goBack());
}
export default {
    setTopLevelNavigation,
    ToNavigate,
    goBack
}