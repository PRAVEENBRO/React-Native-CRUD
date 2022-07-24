import React, { useEffect, useState } from 'react';
import { Input, Stack, Center, NativeBaseProvider, Button, Box, HStack, Heading, Icon, FormControl } from 'native-base';
import axios from 'axios';
import { LogBox, Pressable, Text } from 'react-native';
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { AdduserUrl, EdituserUrl } from '../utiles/apiEndpoints';
import { validate } from '../utiles/validation';


const AddForm = ({ navigation, route }) => {


    const [userData, setuserData] = useState({ for: "adduser" })
    const [error, seterror] = useState();
    const [edit, setedit] = useState(false);

    const submit = async () => {
        let data
        const isvalid = validate(userData)
        console.log(userData, '-------------->>>>');
        seterror(isvalid)
        const objectLength = Object.keys(isvalid).length
        console.log('000', isvalid, objectLength);

        if (!objectLength) {
            console.log('in api', edit)
            if (!edit) {
                //  NORMAl
                // data = await axios.post('http://localhost:4120/employee', userData)

                // ORM
                data = await axios.post(AdduserUrl, userData)
                console.log('add function');

            } else {
                //  NORMAl
                // data = await axios.put(`http://localhost:4120/employe/${userData.id}`, userData)

                // ORM
                console.log('edit function');
                data = await axios.put(`${EdituserUrl}/${userData.id}`, userData)
                console.log('edit update', data)
                alert(data.data.message);
                navigation.navigate("DemoUser");
            }
            if (typeof (data.data) === 'object' || typeof (data.data) === 'number' || typeof (data.data) === 'string') {
            } else {
                alert(data.data);
            }
        }

    }
    // console.log('sssssss',userData);

    useEffect(() => {
        // console.log(route.params,'=---')
        if (route.params) {
            var { editData } = route.params;
            const data = { ...editData, ...userData };
            // console.log('-data-->', data)
            setuserData(data);
            if (editData) { setedit(true) }
        }
    }, [])



    return (
        <NativeBaseProvider>
            <Center flex={1} px="0" >
                <HStack width="100%" mt="5">
                    <Pressable onPress={() => navigation.navigate("DemoUser")}>
                        <Heading p="4" pb="2" m="0" ml="0" size="lg" borderRadius="full" >
                            <Icon as={<Ionicons name="md-arrow-back" />} size="lg" color="coolGray.800" />
                        </Heading>
                    </Pressable>
                </HStack>
                <Box p="10" w="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                    <Stack space={0} w="100%">

                        <FormControl>
                            {edit && <Input variant="underlined" type="number" placeholder="Entre Id" onChangeText={(text) => setuserData({ ...userData, id: text })} defaultValue={userData && userData.id.toString()} disabled={edit} />}

                            <Input variant="underlined" placeholder="Entre Name" onChangeText={(text) => setuserData({ ...userData, name: text })} defaultValue={userData && userData.name} />
                            {error && <FormControl.HelperText>{error.name}</FormControl.HelperText>}

                            <Input variant="underlined" placeholder="Entre Email" onChangeText={(text) => setuserData({ ...userData, email: text })} defaultValue={userData && userData.email} />
                            {error && <FormControl.HelperText>{error.email}</FormControl.HelperText>}

                            <Input variant="underlined" type="number" placeholder="Entre Place" onChangeText={(text) => setuserData({ ...userData, place: text })} defaultValue={userData && userData.place} />
                            {error && <FormControl.HelperText>{error.place}</FormControl.HelperText>}

                            {edit && <Input variant="underlined" placeholder="Entre Phone No" onChangeText={(text) => setuserData({ ...userData, phone: text })} defaultValue={userData && userData.phone.toString()} />}
                            {error && <FormControl.HelperText>{error.phone}</FormControl.HelperText>}

                        </FormControl>

                        <Button mt="5" onPress={submit}>Click Me</Button>

                    </Stack>
                </Box>
            </Center>
        </NativeBaseProvider>
    );
};



export default AddForm;
