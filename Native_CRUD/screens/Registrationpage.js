import * as React from "react";
import { Box, Heading, VStack, HStack, FormControl, Input, Button, Center, NativeBaseProvider, Pressable, Link, Text } from "native-base";
import { validate } from '../utiles/validation';

import { Postmethod } from '../utiles/apiRequest'
import { RegistrationUrl } from '../utiles/apiEndpoints'





const Registrationpage = ({ navigation }) => {

    const [registrationdata, setregistrationdata] = React.useState({ for: "signup" })
    const [error, seterror] = React.useState()

    const onSubmit = async () => {
        const isvalid = validate(registrationdata)
        seterror(isvalid)
        const objectLength = Object.keys(isvalid).length
        if (!objectLength) {
            const { email, password } = registrationdata
            const resp = await Postmethod(RegistrationUrl, { email, password })
            console.log(resp)
            if (!resp.data.error) {
                alert(resp.data.message);
                navigation.navigate("Loginform");
            }
        } else {
            console.log('connetion failed')
        }

    }

    return (

        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Center w="100%">
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                        <Heading size="lg" color="coolGray.800" _dark={{ color: "warmGray.50" }} fontWeight="semibold"> Welcome </Heading>
                        <Heading mt="1" color="coolGray.600" _dark={{ color: "warmGray.200" }} fontWeight="medium" size="xs"> Sign up to continue! </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input onChangeText={text => { setregistrationdata({ ...registrationdata, email: text }) }} />
                                {error && <FormControl.HelperText>{error.email}</FormControl.HelperText>}
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type="password" onChangeText={text => { setregistrationdata({ ...registrationdata, password: text }) }} />
                                {error && <FormControl.HelperText>{error.password}</FormControl.HelperText>}
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Confirm Password</FormControl.Label>
                                <Input type="password" onChangeText={text => { setregistrationdata({ ...registrationdata, Comfpassword: text }) }} />
                                {error && <FormControl.HelperText>{error.Comfpassword}</FormControl.HelperText>}
                            </FormControl>
                            <Button mt="2" colorScheme="indigo" onPress={onSubmit}> Sign up </Button>

                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}> already registered.{" "} </Text>
                                <Pressable onPress={() => { navigation.navigate("Loginform") }}>
                                    <Text fontSize="sm" color="indigo.500" _dark={{ color: "warmGray.200" }}>Sign in </Text>
                                </Pressable>
                            </HStack>
                        </VStack>


                    </Box>
                </Center>
            </Center>
        </NativeBaseProvider>

    );
};

export default Registrationpage;