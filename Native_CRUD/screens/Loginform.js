import * as React from "react";
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { Pressable } from "react-native";
import { validate } from '../utiles/validation';
import { Postmethod } from '../utiles/apiRequest'
import { LoginUrl } from '../utiles/apiEndpoints'
import Spinner from 'react-native-loading-spinner-overlay';
import axios from "axios";

const Loginform = ({ navigation }) => {


    const [logindata, setlogindata] = React.useState({ for: "signin" });
    const [error, seterror] = React.useState()
    const [loading, setLoading] = React.useState(false);



    const onSubmit = async () => {

        setLoading(true);
        const isvalid = validate(logindata)
        seterror(isvalid)
        const objectLength = Object.keys(isvalid).length
        if (!objectLength) {
            const { email, password } = logindata;
            try {
                console.log('submited');
                const resp = await Postmethod(LoginUrl, { email, password })
                if (!resp.data.error) {
                    // setLoading(false);
                    //    setTimeout(() => {
                    alert(resp.data.message)
                    navigation.navigate("DemoUser");
                 
                    // }, 3000);
                } else {
                    alert(resp.data.message);
                }
            } catch (err) {
                console.log('connsction failed');
            }
        } else {
            console.log('reject');
        }
    }


    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Center w="100%">

                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}> Welcome </Heading>
                        <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs"> Sign in to continue! </Heading>

                        <Spinner visible={loading} textContent={'Loading...'} />

                        <VStack space={3} mt="5">

                            <FormControl>
                                <FormControl.Label>Email ID</FormControl.Label>
                                <Input onChangeText={text => setlogindata({ ...logindata, email: text })} />
                                {error && <FormControl.HelperText>{error.email}</FormControl.HelperText>}
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type="password" onChangeText={text => setlogindata({ ...logindata, password: text })} />
                                {error && <FormControl.HelperText>{error.password}</FormControl.HelperText>}
                                <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1"> Forget Password? </Link>
                            </FormControl>

                            <Button mt="2" colorScheme="indigo" onPress={onSubmit}> Sign in </Button>

                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}> I'm a new User.{" "} </Text>
                                <Pressable onPress={() => { navigation.navigate("Registrationpage") }}>
                                    <Text fontSize="sm" color="indigo.500" _dark={{ color: "warmGray.200" }}>Sign Up </Text>
                                </Pressable>
                            </HStack>

                        </VStack>
                    </Box>

                </Center>
            </Center>
        </NativeBaseProvider>
    );
};

export default Loginform 