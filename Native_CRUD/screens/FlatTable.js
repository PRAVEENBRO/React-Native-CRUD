import React, { useEffect, useState } from "react";
import { Box, FlatList, Heading, ScrollView, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import axios from "axios";
import { GetuserUrl } from "../utiles/apiEndpoints";

const FlatTable = () => {
    const [listData, setListData] = useState([]);

    const readData = async () => {

        // normal
        // const data = await axios.get('http://localhost:4120/employes');

        // ORM
        const data = await axios.get(GetuserUrl);
        setListData(data.data);
        console.log(data);
    }


    useEffect(() => {
        readData()
    }, [])

    return (
        <NativeBaseProvider>
            <Box>
                <Heading fontSize="xl" p="4" pb="3">Inbox</Heading>
                <ScrollView showsVerticalScrollIndicator={false}>


                    <FlatList data={listData} renderItem={({
                        item
                    }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                            <HStack space={3} justifyContent="space-between">
                                <Avatar size="48px" source={ require('../assests/avatar.webp') } />
                                <VStack>
                                    <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>{item.name}</Text>
                                    <Text color="coolGray.600" _dark={{ color: "warmGray.200" }}>{item.email}</Text>
                                </VStack>
                                <Spacer />
                                <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">{item.place}</Text>
                            </HStack>
                        </Box>} keyExtractor={item => item.phone} />
                </ScrollView>

            </Box>
        </NativeBaseProvider>

    );
};

export default FlatTable
