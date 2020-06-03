import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TextInput } from 'react-native';

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import FlatListData from '../data/FlatListData';

var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newFoodName: '',
            newFoodDescription: ''
        }
    }

    showAddModal = () => {
        this.refs.myModal.open();
    }

    generateKey = (numberOfCharacters ) => {
        return require('random-string')({length: numberOfCharacters });
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert('Modal closed');
                }}
            >
                <Text
                    style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 40 }}>New foods infomation
                </Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ newFoodName: text })}
                    placeholder="Enter new food's name"
                    value={this.state.newFoodName}
                />

                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ newFoodDescription: text })}
                    placeholder="Enter new food's description"
                    value={this.state.newFoodDescription}
                />

                <Button 
                style={{fontSize:18, color:'white'}}
                containerStyle={{
                    padding:8,
                    marginLeft:70,
                    marginRight:70,
                    height:40,
                    borderRadius:6,
                    backgroundColor: 'mediumseagreen'
                }}
                onPress={() => {
                    if(this.state.newFoodName.length == 0 || this.state.newFoodDescription.length == 0) {
                        alert("You must enter food's name and description ")
                        return;
                    }
                    const newKey = this.generateKey(24);
                    const newFood = {
                        key: newKey,
                        name: this.state.newFoodName,
                        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Devonshire_tea.jpg/240px-Devonshire_tea.jpg",
                        foodDescription: this.state.newFoodDescription
                    };
                    FlatListData.push(newFood);
                    this.props.parentFlatList.refeshFlatList(newKey);
                    this.refs.myModal.close();
                }}
                >
                Save 
                </Button>
            </Modal>
        )
    }
}