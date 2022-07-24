import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';
import React, { useState, useEffect } from 'react'
import axios from 'axios';



const ShowData = ({ navigation }) => {

    const [displayData, setdisplayData] = useState();

    const readData = async () => {

        // normal
        // const data = await axios.get('http://localhost:4120/employes');

        // ORM
        const data = await axios.get('http://192.168.137.1:4120/users');
        setdisplayData(data.data);
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Refreshed!');
            readData()
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => { navigation.navigate("AddForm") }}>
                <Text style={styles.addbtn}>Add User</Text>
            </TouchableOpacity>

            <View style={styles.tablerow}>
                <Text style={styles.tableCol}>id</Text>
                <Text style={styles.tableCol}>Name</Text>
                <Text style={styles.tableCol}>Email ID</Text>
                <Text style={styles.tableCol}>Place</Text>
                <Text style={styles.tableCol}>Phone</Text>
                <Text style={styles.tableCol}>Edit</Text>
                <Text style={styles.tableCol}>Delete</Text>
            </View >

            {displayData && displayData.map((ele, inx) => {
                return <TableComponent data={ele} key={inx} navigation={navigation} readData={readData} />
            })}
        </View>
    )

}


export default ShowData



const TableComponent = ({ data, navigation, readData }) => {

    var Edituser = (data) => {
        navigation.navigate("AddForm", { editData: data })
    }

    var Deleteuser = async (id) => {
        // NORMAL
        // const data = await axios.delete(`http://localhost:4120/employe/${id}`)

        // ORM
        const data = await axios.delete(`http://localhost:4120/Deleteuser/${id}`)
        console.log('deleted', data)
        readData();
    }


    return (
        <View style={styles.tablerow}>
            <Text style={styles.tableCol}>{data.id}</Text>
            <Text style={styles.tableCol}>{data.name}</Text>
            <Text style={styles.tableCol}>{data.email}</Text>
            <Text style={styles.tableCol}>{data.place}</Text>
            <Text style={styles.tableCol}>{data.phone}</Text>
            <TouchableOpacity style={styles.tableCol} onPress={() => { Edituser(data) }}>
                <Text style={styles.editbtns}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tableCol} onPress={() => { Deleteuser(data.id) }}>
                <Text style={styles.delbtns} >Delete</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
    },
    tablerow: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'yellow',
        paddingVertical: 5
    },
    tableCol: {
        paddingHorizontal: 5,
        width: 52
    },
    addbtn: {
        backgroundColor: 'green',
        width: 80,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: 'white',
        borderRadius: 15
    },
    editbtns: {
        backgroundColor: 'blue',
        padding: 1,
        color: "white"
    },
    delbtns: {
        backgroundColor: 'red',
        padding: 1,
        color: "white"
    }
});