import test1 from '../tests/test1';
import test2 from '../tests/test2';
import test3 from '../tests/test3';
import test4 from '../tests/test4';
import {Button, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import React from 'react';
const DATA = [{
    id: '1',
    title: 'TEST1',
    tag1: '#historia',
    tag2: '#starozytnosc',
    info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
}, {
    id: '2',
    title: 'TEST2',
    tag1: '#kino',
    tag2: '#filmy',
    info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
}, {
    id: '3',
    title: 'TEST3',
    tag1: '#muzyka',
    tag2: '#pop',
    info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
}, {
    id: '4',
    title: 'TEST4',
    tag1: '#serial',
    tag2: '#netflix',
    info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
}];

const testHolder = {
    'TEST1': test1,
    'TEST2': test2,
    'TEST3': test3,
    'TEST4': test4,
};



function HomeScreen({navigation}) {

    const renderItem = ({item}) => (

        <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate(item.title, {
                name: item.title,
                test: testHolder[item.title.toString()],
                qnumber: 0,
            })}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[{flexDirection: 'row'}]}>
                    <Text style={styles.tags}>{item.tag1}</Text>
                    <Text style={styles.tags}>{item.tag2}</Text>
                </View>
                <Text style={{fontSize: 12}}>{item.info}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, marginLeft: 10}}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../icons/menu.png')}
                               style={styles.imageStyle}/>
                    </TouchableOpacity>
                </View>
                <View style={[{flex: 13, alignItems: 'center'}]}>
                    <Text style={styles.headerText}>Strona Glowna</Text>
                </View>
            </View>
            <View style={styles.content}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListFooterComponent={
                        <View style={[{flexDirection: 'column', allignItems: 'flex-end', height: 100}]}>
                            <Text style={styles.footerText}>{'SPRAWDZ RANKING'}</Text>
                            <View style={[{flexDirection: 'column', alignSelf: 'center', height: 30, width: 100}]}>
                                <Button title={'Ranking'} style={[{width: 20}]}
                                        onPress={() => navigation.navigate('Rank')}/>
                            </View>
                        </View>
                    } ListFooterComponentStyle={styles.container2}/>
            </View>
        </SafeAreaView>
    )
        ;
}
export default HomeScreen;
