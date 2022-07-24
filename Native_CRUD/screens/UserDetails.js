import React, { useEffect, useState } from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Icon } from "native-base";
import { Pressable } from "react-native";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

import { IoMdArrowRoundBack } from 'react-icons/io';



const UserDetails = ({ route, navigation }) => {

    const [userSetails, setuserSetails] = useState()

    useEffect(() => {
        console.log(route.params)
        if (route.params) {
            var { UserData } = route.params;
            setuserSetails(UserData)
        }
    }, [])

    return (
        <NativeBaseProvider>
            <HStack width="100%" mt="5">
                <Pressable onPress={() => navigation.navigate("DemoUser")}>
                    <Heading p="4" pb="2" m="0" ml="0" size="lg" borderRadius="full" >
                        <Icon as={<Ionicons name="md-arrow-back" />} size="lg" color="coolGray.800" />
                    </Heading>
                </Pressable>
            </HStack>
            <Center flex={1} px="3">
                {userSetails &&
                    <Box alignItems="center">
                        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600", backgroundColor: "gray.700"
                        }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image source={{
                                        uri: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_960_720.png'
                                    }} alt="image" />
                                </AspectRatio>
                                <Center bg="violet.500" _dark={{ bg: "violet.400" }} _text={{ color: "warmGray.50", fontWeight: "700", fontSize: "xs" }} position="absolute" bottom="0" px="3" py="1.5">EmpID:{userSetails.id}</Center>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1"> {userSetails.name} </Heading>
                                    <Text fontSize="xs" _light={{ color: "violet.500" }} _dark={{ color: "violet.400" }} fontWeight="500" ml="-0.5" mt="-1"> {userSetails.place} </Text>
                                </Stack>

                                <Text fontWeight="400">
                                    Employee of Test Yantra as associate software Engineer
                                </Text>

                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Text color="coolGray.600" _dark={{ color: "warmGray.200" }} fontWeight="400"> {userSetails.phone}</Text>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    </Box>}
            </Center>
        </NativeBaseProvider>
    );
};

export default UserDetails 