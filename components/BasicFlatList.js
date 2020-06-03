import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, Alert, Platform, TouchableHighlight } from 'react-native';

import FlatListData from '../data/FlatListData';
import Swipeout from 'react-native-swipeout';

import AddModal from './AddModal';
import EditModal from './EditModal';


class FlatListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeRowkey: null,
            numberOfRefresh: 0
        };
    }

    refeshFlatListItem = () => {
        this.setState( (prevState) => {
            return{
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });
    }
    render() {
        const swipeSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowkey != null) {
                    this.setState({ activeRowkey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowkey: this.props.item.key })
            },
            right: [
                {
                    onPress: () => {
                        // alert("Update");
                        this.props.parentFlatList.refs.editModal.showEditModal(FlatListData[this.props.index], this );
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowkey;
                        Alert.alert(
                            'Alert',
                            'Are you want to delete ? ',

                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        FlatListData.splice(this.props.index, 1);
                                        // Refhesh
                                        this.props.parentFlatList.refeshFlatList(deletingRow);
                                    }
                                },
                            ],
                            { cancelable: true }
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        return (
            <Swipeout {...swipeSetting}>
                <View>
                    <View style={{
                        flex: 1,
                        backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato',
                        flexDirection: 'row'
                    }}>
                        <Image
                            source={{ uri: this.props.item.imageUrl }}
                            style={{ width: 100, height: 100, margin: 5 }}
                        >

                        </Image>
                        <View>
                            <Text style={styles.flatListItem}>
                                {this.props.item.name}
                            </Text>
                            <Text style={styles.flatListItem}>
                                {this.props.item.foodDescription}
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#fff' }}></View>
                </View>
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: '#fff',
        padding: 10,
        fontSize: 16
    }
})
export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            deletedRowKey: null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refeshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            }
        });
        this.refs.flatlist.scrollToEnd();
    }

    _onPressAdd() {
        // alert('You add item');
        this.refs.addModal.showAddModal();
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <View style={{
                    backgroundColor: 'tomato',
                    height: 63,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems:'center'
                }}>
                    <TouchableHighlight
                        style={{ marginRight: 10 }}
                        underlayColor='tomato'
                        onPress={this._onPressAdd}
                    >
                        <Image style={{ width: 35, height: 35 }}
                            source={require('../icon/add.png')}
                        />
                    </TouchableHighlight>
                </View>
                <FlatList
                    ref={"flatlist"}
                    data={FlatListData}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item} index={index} parentFlatList={this}>

                            </FlatListItem>
                        )
                    }}
                >
                </FlatList>
                <AddModal ref={'addModal'} parentFlatList={this}>

                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this}>
                    
                </EditModal>
            </View>
        )
    }
}