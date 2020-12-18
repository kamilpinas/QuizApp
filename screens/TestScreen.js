import {Button, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../styles';
import CountDown from 'react-native-countdown-component';


export let playerScore = 0;

function TestScreen({route, navigation}) {
    const {id, quizContent: quizContent, qnumber, lastquestion} = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{flex: 1, marginLeft: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Image source={require('../icons/undo.png')}
                               style={styles.imageStyle}/></TouchableOpacity>
                </View>
                <View style={[{flex: 13, alignItems: 'center'}]}>
                    <Text style={styles.headerText}>{quizContent.name}</Text>
                </View>
            </View>
            <View style={styles.content}>
                {lastquestion > qnumber ? RenderQuestion(navigation, quizContent, qnumber) : RenderFinalScore(navigation, quizContent.name, quizContent.tasks.length)}
            </View>
        </SafeAreaView>
    );
}

function RenderQuestion(navigation, quizContent, qnumber) {
    const [key,setKey] = useState(0);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        setRunning(true);
        return () => {
            setRunning(false);
        };
    }, []);
    let question = quizContent.tasks[qnumber];
    let time = quizContent.tasks[qnumber].duration;

    return (
        <View style={[{flex: 1}]}>
            <View style={[{
                flex: 1,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
            }]}>
                <Text style={[{flex: 1, marginStart: 30}]}>Question {qnumber + 1} of {quizContent.tasks.length}</Text>
                <View style={[{paddingTop:20,paddingRight:10}]}>
                    <CountDown
                        key={key}
                        until={time}
                        size={30}
                        onFinish={() => {
                            setKey(prevKey => prevKey + 1);
                            NextQuestion(navigation, quizContent, qnumber);
                        }}
                        digitStyle={{backgroundColor: '#FFB3B0'}}
                        digitTxtStyle={{fontSize:30}}
                        timeToShow={[ 'S']}
                        running={running}
                    />
                </View>
            </View>
            <View style={[{flex: 1, justifyContent: 'center', marginStart: 40, marginEnd: 70}]}>
                <Text style={{alignSelf: 'center'}}>{quizContent.tasks[qnumber].question}</Text>
            </View>
            <View style={{flex: 3}}>
                <View style={styles.answersBox}>
                    <View style={styles.answersRow}>
                        {question.answers.map((el) => (
                                <View style={{marginTop: 15}}>
                                    <Button title={el.content} style={styles.answers}
                                            onPress={() => {
                                                if (el.isCorrect) {
                                                    console.log('poprawna');
                                                    playerScore++;
                                                }
                                                NextQuestion(navigation, quizContent, qnumber);
                                                setKey(prevKey => prevKey + 1);

                                            }}></Button>
                                </View>
                            ),
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}



function NextQuestion(navigation, QuizContent, questionNumber) {
    if (questionNumber - 1 < QuizContent.tasks.length) {
        navigation.navigate(QuizContent.id, {
            id: QuizContent.id,
            qnumber: questionNumber + 1,
            lastquestion: QuizContent.tasks.length,
        });
    }
}

function RenderFinalScore(navigation, testName,numberOfQuestions) {
    fetch('http://tgryl.pl/quiz/'+ 'result',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                nick: "bibi",
                score: playerScore,
                total: numberOfQuestions,
                type: testName,
            }
        )
    })
    return (
        <View style={[{flex: 1, alignItems: 'center'}]}>
            <Text style={styles.resultText}>{'Nazwa: ' + testName}</Text>
            <Text style={styles.resultText}>{'Uzyskany wynik: ' + playerScore}</Text>
            <Text style={styles.resultText}>{'Możliwa liczba punktow: ' + numberOfQuestions}</Text>
            <Text style={styles.resultText}>{'Data: ' + new Date().toISOString().slice(0, 10)}</Text>
            <View style={[{marginTop: 40},{width:'100%'},{padding:5}]}>
                <Button title={'ranking'} onPress={() => navigation.navigate('Rank')}></Button>
            </View>

        </View>
    );
}
export default TestScreen;
