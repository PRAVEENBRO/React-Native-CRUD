import { createStackNavigator } from '@react-navigation/stack';
import AddForm from '../screens/AddForm';
import DemoUser from '../screens/DemoUser';
import FlatTable from '../screens/FlatTable';
import Loginform from '../screens/Loginform';
import Registrationpage from '../screens/Registrationpage';
import ShowData from '../screens/ShowData';
import Table from '../screens/Table';
import UserDetails from '../screens/UserDetails';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="DemoUser" component={DemoUser} options={{ headerShown: false }} />
            <Stack.Screen name="Loginform" component={Loginform} options={{ headerShown: false }} />
            <Stack.Screen name="AddForm" component={AddForm} options={{ headerShown: false }} />
            <Stack.Screen name="ShowData" component={ShowData} options={{ headerShown: false }} />
            <Stack.Screen name="UserDetails" component={UserDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Registrationpage" component={Registrationpage} options={{ headerShown: false }} />


            <Stack.Screen name="FlatTable" component={FlatTable} options={{ headerShown: false }} />
            <Stack.Screen name="Table" component={Table} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}

export default MyStack