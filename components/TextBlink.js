import React, { Component } from 'react';
import { Text, View, } from 'react-native';

class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: true
        }

        const timeToBlink = 1000;
        var taskTodo = () => {
            this.setState(previousState => {
                return {
                    showText: !previousState.showText
                }
            })
        }
        setInterval(taskTodo, timeToBlink)
    }

    render() {
        let textToDisplay = this.state.showText ? this.props.inputText: '';
        return(
            <Text>{ textToDisplay }</Text>
        )
    }
}

export default class TextBlink extends Component {
    render() {
        return(
            <View>
                <Blink inputText='Hello, how are you ?'/>
                <Blink inputText='im fine, Thanks'/>
            </View>
        )
    }
}