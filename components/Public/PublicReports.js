import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card, Divider, Appbar } from 'react-native-paper';

const PublicReports = ({navigation}) => {
    // const clickableValues = Array.from({ length: 20 }, (_, i) => `${i + 1}. Report ${i + 1}`);
    const clickableValues = ['1.Item Stock vs C.F.Y. Issuance', '2.Warehouse Stock', '3.Issuance to District/Hospitals','4.Issuance to Facility'];

    const handleValueClick = (value) => {
        // Handle click event here
       // alert(`Clicked on ${value}`);  
        if(value == '1.Item Stock vs C.F.Y. Issuance'){
            //alert('inside first');
            navigation.navigate("Warehouse Wise Public Stock");
        }

        if(value == '2.Warehouse Stock'){
           // alert('inside second');
            navigation.navigate("Items Stock vs Isssuance in Warehouse");
        }

        if(value == '3.Issuance to District/Hospitals'){
            // alert('inside second');
             navigation.navigate("Issuance to District/Hospitals");
         }
         if(value == '4.Issuance to Facility'){
            // alert('inside second');
             navigation.navigate("Issuance to Facility");
         }
        
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="DPDMIS 'Stock/Issuance' View" titleStyle={styles.headerTitle} />
            </Appbar.Header>
            <ScrollView style={{ width: '100%' }}>
                <Card style={styles.card}>
                    {clickableValues.map((value, index) => (
                        <TouchableOpacity key={index} onPress={() => handleValueClick(value)}>
                            <View style={[styles.valueContainer, index % 2 === 0 && styles.alternateBackground]}>
                                <Text style={styles.valueText}>{value}</Text>
                            </View>
                            {index !== clickableValues.length - 1 && <Divider style={styles.divider} />}
                        </TouchableOpacity>
                    ))}
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    card: {
        width: '100%',
        padding: 10,
        elevation: 2, // Shadow on Android
        borderRadius: 10,
        marginTop: 10,
    },
    valueContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    valueText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    alternateBackground: {
        backgroundColor: '#f0f0f0', // Alternate background color
    },
    divider: {
        width: '100%',
    },
});

export default PublicReports;
