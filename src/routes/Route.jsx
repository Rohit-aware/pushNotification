import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import Setting from '../screens/Settings/Setting';
import navigationServices from './NavigationServices';


const Stack = createStackNavigator();

const Route = () => {
    return (
        <NavigationContainer ref={
            (ref)=>navigationServices.setTopLevelNavigation(ref)
        }>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Setting' component={Setting} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Route;