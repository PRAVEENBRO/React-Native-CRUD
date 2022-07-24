import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { NativeBaseProvider, Box, Text, Pressable, Heading, IconButton, Icon, HStack, Avatar, VStack, Spacer, Center, Fab, ScrollView } from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { MdOutlineEditNote } from 'react-icons/md';
import { BsPersonPlusFill } from 'react-icons/bs';
import Spinner from 'react-native-loading-spinner-overlay';
import { Demourl, GetuserUrl } from '../utiles/apiEndpoints';


const Table = ({ navigation }) => {


    const [mode, setMode] = useState('Basic');
    const [loading, setLoading] = React.useState(false);
    const [listData, setListData] = useState([]);

    const readData = async () => {

        // normal
        // const data = await axios.get('http://localhost:4120/employes');


        // ORM
        const data = await axios.get(GetuserUrl);
        setListData(data.data);
    }

    const loader = () => {
        setTimeout(() => {
            console.log('loading', loading)
            setLoading(true);
        }, 3000);
    }

    const closeRow = (data) => {
        console.log(data)
        navigation.navigate("AddForm", { editData: data })
    };

    const deleteRow = async (id) => {
        console.log(id)
        const data = await axios.delete(`http://localhost:4120/Deleteuser/${id}`)
        console.log('deleted', data)
        readData();
    };

    const renderItem = ({ item, index }) => (
        <Box>
            <Pressable onPress={() => { navigation.navigate("UserDetails", { UserData: item }) }} _dark={{ bg: 'coolGray.800', }} _light={{ bg: 'white', }}>
                <Box pl="5" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar size="48px" source={{ uri: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_960_720.png' }} />
                        <VStack width="180">
                            <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold> {item.name} </Text>
                            <Spacer />
                            <Text color="coolGray.600" _dark={{ color: 'warmGray.200', }}> {item.phone} </Text>
                        </VStack>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
        <HStack flex="1" pl="2">
            <Pressable w="70" ml="auto" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(data.item)} _pressed={{ opacity: 0.5, }}>
                <VStack alignItems="center" space={2}>
                    <MdOutlineEditNote color="coolGray.800" />
                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800"> Edit </Text>
                </VStack>
            </Pressable>
            <Pressable w="70" bg="red.500" justifyContent="center" onPress={() => deleteRow(data.item.id)} _pressed={{ opacity: 0.5, }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </VStack>
            </Pressable>
        </HStack>
    );


    useEffect(() => {
        // const unsubscribe = navigation.addListener('focus', () => {
        // console.log('Refreshed!');
        readData()
        loader()
        // });
        // return unsubscribe;
    }, []);


    return (
        <NativeBaseProvider>
            <Box _dark={{ bg: 'coolGray.800' }} _light={{ bg: 'white' }} flex="1" safeAreaTop maxW="400px" w="100%">
                <HStack width="100%" >
                    <Heading p="4" pb="3" size="lg"> UserData </Heading>
                    <Pressable onPress={() => navigation.navigate("AddForm")}>
                        <Heading p="4" pb="2" m="2" ml="180" size="lg" borderRadius="full" >
                            <BsPersonPlusFill />
                        </Heading>
                    </Pressable>
                </HStack>
                <Spinner visible={loading} />


                <ScrollView showsVerticalScrollIndicator={false}>
                    <Basic navigation={navigation} readData={readData} listData={listData && listData} />

                    {/* ======================= */}

                    {/* <Box bg="white" safeArea flex="1">
                        <SwipeListView
                            data={listData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-130}
                            previewRowKey={'0'}
                            previewOpenValue={-40}
                            previewOpenDelay={2000}

                        />
                    </Box> */}
                    {/* ======================= */}

                </ScrollView>

            </Box>
        </NativeBaseProvider>
    );
}


function Basic({ navigation, listData, readData }) {




    const closeRow = (data) => {
        console.log(data)
        navigation.navigate("AddForm", { editData: data })
    };

    const deleteRow = async (id) => {

        console.log(id)

        const data = await axios.delete(`http://localhost:4120/Deleteuser/${id}`)
        console.log('deleted', data)
        readData();

    };

    const renderItem = ({ item, index }) => (
        <Box>
            <Pressable onPress={() => { navigation.navigate("UserDetails", { UserData: item }) }} _dark={{ bg: 'coolGray.800', }} _light={{ bg: 'white', }}>
                <Box pl="5" pr="5" py="2">
                    <HStack alignItems="center" space={3}>
                        <Avatar size="48px" source={{ uri: 'https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_960_720.png' }} />
                        <VStack width="180">
                            <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold> {item.name} </Text>
                            <Spacer />
                            <Text color="coolGray.600" _dark={{ color: 'warmGray.200', }}> {item.phone} </Text>
                        </VStack>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
        <HStack flex="1" pl="2">
            <Pressable w="70" ml="auto" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(data.item)} _pressed={{ opacity: 0.5, }}>
                <VStack alignItems="center" space={2}>
                    <MdOutlineEditNote color="coolGray.800" />
                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800"> Edit </Text>
                </VStack>
            </Pressable>
            <Pressable w="70" bg="red.500" justifyContent="center" onPress={() => deleteRow(data.item.id)} _pressed={{ opacity: 0.5, }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </VStack>
            </Pressable>
        </HStack>
    );

    return (
        <Box bg="white" safeArea flex="1">
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                // renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={2000}

            />
        </Box>
    );


}


export default Table
