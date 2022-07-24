import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { NativeBaseProvider, Box, Text, Pressable, Heading, Icon, HStack, Avatar, VStack, Spacer, Center, ScrollView, Input } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { DeleteuserUrl, GetuserUrl } from "../utiles/apiEndpoints";

function DemoUser({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const [showsearch, setshowsearch] = useState(false)

    const [searchinput, setsearchinput] = useState('')





    return (
        <NativeBaseProvider>
            <Center h="100%">

                <Box _dark={{ bg: "coolGray.800" }} _light={{ bg: "blue" }} flex="1" safeAreaTop maxW="400px" w={windowWidth}>

                    <HStack width="100%" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Heading p="4" pb="3" size="lg" w={windowWidth * 0.29}> Users </Heading>

                        <View style={{ flexDirection: 'row' }}>
                            {showsearch &&
                                <Heading p="4" pb="2" mb="0" mt="0.4" borderWidth='0' w="200" >
                                    <Input placeholder="Search" variant="rounded" width="180" mr="5" py="1" px="5" borderWidth="1" borderColor="gray.400" InputRightElement={
                                        <Pressable onPress={() => setshowsearch(!showsearch)}>
                                            <Icon mr="2" size="7" color="black" as={<MaterialIcons name="search-off" />} />
                                        </Pressable>
                                    }
                                        onChangeText={text => setsearchinput(text)}
                                    />
                                </Heading>
                            }

                            {!showsearch &&
                                <Pressable onPress={() => setshowsearch(!showsearch)}>
                                    <Heading p="4" pb="2" m="2" ml="0" borderWidth='0' >
                                        <Icon as={<MaterialIcons name="search" />} size="lg" color="coolGray.800" />
                                    </Heading>
                                </Pressable>
                            }
                            <Pressable onPress={() => navigation.navigate("AddForm")}>
                                <Heading p="4" pb="2" m="2" ml="0" size="lg" borderWidth='0'>
                                    <Icon as={<MaterialIcons name="person-add-alt-1" />} size="lg" color="coolGray.800" />
                                </Heading>
                            </Pressable>
                        </View>
                    </HStack>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Basic navigation={navigation} setsearchinput={setsearchinput} searchinput={searchinput} />
                    </ScrollView>
                </Box>
            </Center>
        </NativeBaseProvider >);
}




function Basic({ navigation, searchinput }) {

    const [listData, setListData] = useState([]);
    const [matcheduser, setmatcheduser] = useState([]);
    const [show, setshow] = useState(false)

    const readData = async () => {

        // normal
        // const data = await axios.get('http://localhost:4120/employes');

        // ORM
        const data = await axios.get(GetuserUrl);
        setListData(data.data);

        // console.log('Data-Loaded')
    }

    useEffect(() => {
        // navigation.addListener('focus', () => {
        // console.log('Refreshed!');
        readData()
        // loader()
        // });

    }, [])


    useEffect(() => { searchuser(searchinput) }, [searchinput])

    const searchuser = (text) => {
        const match = listData.filter((ele) => {
            return ele.name.toLowerCase().startsWith(text.toLowerCase())
        })
        setmatcheduser(match)
            (text.length > 0) ? setshow(true) : setshow(false)
    }

    const editRow = (data) => {
        // console.log(data)
        navigation.navigate("AddForm", { editData: data })
    };

    const deleteRow = async (id) => {
        // console.log(id)
        const data = await axios.delete(`${DeleteuserUrl}/${id}`)
        alert(data.data.message)
        readData();
    };

    const onRowDidOpen = rowKey => {
        console.log("This row opened", rowKey);
    };

    const onRowOpen = () => {
        console.log('tovalue', onRowOpen)
    }

    const renderItem = ({ item, index }) =>
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
        </Box>;


    const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
        <Pressable w="70" ml="auto" bg="coolGray.200" justifyContent="center" onPress={() => editRow(data.item)} _pressed={{
            opacity: 0.5
        }}>
            <VStack alignItems="center" space={2}>
                <Icon as={<Entypo name="edit" />} size="xs" color="coolGray.800" />
                <Text fontSize="xs" fontWeight="medium" color="coolGray.800">Edit</Text>
            </VStack>
        </Pressable>
        <Pressable w="70" bg="red.500" justifyContent="center" onPress={() => deleteRow(data.item.id)} _pressed={{ opacity: 0.5 }}>
            <VStack alignItems="center" space={2}>
                <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                <Text color="white" fontSize="xs" fontWeight="medium">
                    Delete
                </Text>
            </VStack>
        </Pressable>
    </HStack>;


    return <Box bg="white" safeArea flex="1">


        {!show ?
            < SwipeListView data={(matcheduser.length > 0) ? matcheduser : listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={"0"}
                previewOpenValue={-10}
                previewOpenDelay={0}
                closeOnRowBeginSwipe={true}
                onRowDidOpen={onRowDidOpen}
            />

            : <Box> <Text> search nor found </Text></Box>}

    </Box>;
}

export default DemoUser