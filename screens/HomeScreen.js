import {Button, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles';
import React,{Component} from 'react';
const baseURL = 'http://tgryl.pl/quiz/';
class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testsData: [],
        };
    }
    componentDidMount() {
        fetch('http://tgryl.pl/quiz/' + 'tests')
            .then((response) => response.json())
            .then((json) => {
                this.setState({testsData: json});
            })
            .catch((error) => console.error(error));
    }

    async getQuiz(id) {
        return await fetch(baseURL + 'test/' + id)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error));
    }

    async goQuiz(navigation, item) {
        playerScore = 0;
        const quizContent = await this.getQuiz(item.id);
        navigation.navigate(item.id, {
            id: item.id,
            quizContent: quizContent,
            qnumber: 0,
            lastquestion: item.numberOfTasks,
        });

    }
    render() {
        const testsData = this.state.testsData;
        const navigation = this.props.navigation;
        const renderItem = ({item}) => (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                    this.goQuiz(navigation, item);
                }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={[{flexDirection: 'row'}]}>
                        {item.tags.map((el) => (
                            <Text style={styles.tags}>{el}</Text>
                        ))}
                    </View>
                    <Text style={{fontSize: 12}}>{item.info}</Text>
                </TouchableOpacity>
            </View>
        );

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <TouchableOpacity onPress={() => {navigation.openDrawer();}}>
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
                        data={testsData}
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
        );
    }
}
export default HomeScreen;
