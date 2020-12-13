import {Button, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../styles';
import CountDown from 'react-native-countdown-component';
import test1 from '../tests/test1';


export const scoreBoard = [];
export let playerScore = 0;

function TestScreen({route, navigation}) {
    const {name, test, qnumber} = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, marginLeft: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={require('../icons/undo.png')}
                               style={styles.imageStyle}/></TouchableOpacity>
                </View>
                <View style={[{flex: 13, alignItems: 'center'}]}>
                    <Text style={styles.headerText}>{name}</Text>
                </View>
            </View>
            <View style={styles.content}>
                {test.length > qnumber ? RenderQuestion(navigation, test, qnumber, name) : RenderFinalScore(navigation, name)}

            </View>
        </SafeAreaView>
    );
}

function RenderQuestion(navigation, test, qnumber, testname) {
    const [key,setKey] = useState(0);
    let time = test[qnumber].duration;
    return (
        <View style={[{flex: 1}]}>
            <View style={[{
                flex: 1,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
            }]}>
                <Text style={[{flex: 1, marginStart: 30}]}>Question {qnumber + 1} of {test.length}</Text>
                <View style={[{paddingTop:20,paddingRight:10}]}>
                    <CountDown
                        key={key}
                        until={time}
                        size={30}
                        onFinish={() => alert('Czas minął')}
                        digitStyle={{backgroundColor: '#FFB3B0'}}
                        digitTxtStyle={{fontSize:30}}
                        timeToShow={[ 'S']}
                    />
                </View>
            </View>
            <View style={[{flex: 1, justifyContent: 'center', marginStart: 40, marginEnd: 70}]}>
                <Text style={{alignSelf: 'center'}}>{test[qnumber].question}</Text>
            </View>
            <View style={{flex: 3}}>
                <View style={styles.answersBox}>
                    <View style={styles.answersRow}>
                        <View>
                            <Button title={test[qnumber].answers[0].content} style={styles.answers}
                                    onPress={() => {
                                        if (test[qnumber].answers[0].isCorrect) {
                                            playerScore++;
                                        }
                                        console.log(playerScore);
                                        NextQuestion(navigation, testname, qnumber);
                                        setKey(prevKey => prevKey + 1)
                                    }}></Button>
                        </View>
                        <View style={[{marginTop: 7}]}>
                            <Button title={test[qnumber].answers[1].content}
                                    style={styles.answers}
                                    onPress={() => {
                                        if (test[qnumber].answers[1].isCorrect) {
                                            playerScore++;
                                        }
                                        NextQuestion(navigation, testname, qnumber);
                                        setKey(prevKey => prevKey + 1)
                                    }}></Button>
                        </View>
                    </View>
                    <View style={styles.answersRow}>
                        <View>
                            <Button title={test[qnumber].answers[2].content} style={styles.answers}
                                    onPress={() => {
                                        if (test[qnumber].answers[2].isCorrect) {
                                            playerScore++;
                                        }
                                        NextQuestion(navigation, testname, qnumber);
                                        setKey(prevKey => prevKey + 1)
                                    }}></Button>
                        </View>
                        <View style={[{marginTop: 7}]}>
                            <Button title={test[qnumber].answers[3].content} style={styles.answers}
                                    onPress={() => {
                                        if (test[qnumber].answers[3].isCorrect) {
                                            playerScore++;
                                        }
                                        NextQuestion(navigation, testname, qnumber);
                                        setKey(prevKey => prevKey + 1)
                                    }}></Button>
                        </View></View>
                </View>
            </View>
            <View style={{flex: 8}}></View>
        </View>
    );
}



function NextQuestion(navigation, testName, questionNumber) {
    if (questionNumber - 1 < test1.length) {
        navigation.navigate(testName, {
            name: testName,
            question: test1[questionNumber + 1],
            qnumber: questionNumber + 1,
        });
    }
}

function RenderFinalScore(navigation, testName) {
    scoreBoard.push({
        'nick': 'nicko',
        'date': new Date().toISOString().slice(0, 10),
        'score': playerScore,
        'total': test1.length,
        'type': testName,
    });
    playerScore = 0;
    return (
        <View style={[{flex: 1, alignItems: 'center'}]}>
            <Text style={styles.resultText}>{'Nazwa: ' + testName}</Text>
            <Text style={styles.resultText}>{'Uzyskany wynik: ' + scoreBoard[scoreBoard.length - 1].score}</Text>
            <Text style={styles.resultText}>{'Możliwa liczba punktow: ' + test1.length}</Text>
            <Text style={styles.resultText}>{'Data: ' + new Date().toISOString().slice(0, 10)}</Text>
            <View style={[{marginTop: 40},{width:'100%'},{padding:5}]}>
                <Button title={'ranking'} onPress={() => navigation.navigate('Rank')}></Button>
            </View>

        </View>
    );
}
export default TestScreen;
