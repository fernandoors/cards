import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native'
import { getLocalNotification, saveLocalNotification } from '../../services/utils';

export default class PushSettings extends Component {
  state = {
    day: '',
    hour: '',
    minute: '',
    date: '',
  }
  componentDidMount = () => {
    getLocalNotification()
      .then(({ day, hour, minute, date }) => this.setState({ day, hour, minute, date }))
  }
  alertView = () => {
    return (
      Alert.alert(
        'Discard settings',
        'Would like to discard this settings?',
        [
          {
            text: 'Cancel',
            onPress: () => { },
            style: 'cancel',
          },
          { text: 'OK', onPress: () => this.setState({ day: '1', hour: '20', minute: '0' }, () => this.props.navigation.navigate('Home')) },
        ],
        { cancelable: false },
      )
    )
  }
  handleSaveSettings = () => {
    const { day, hour, minute, date } = this.state
    saveLocalNotification(day, hour, minute, date)
  }
  render() {
    const { day, hour, minute, date } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.dataInputs}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Text style={styles.title}>Insert how many days you want to be notification</Text>
            <TextInput onChangeText={(day => this.setState({ day }))} style={styles.input} maxLength={2} keyboardType='numeric' value={day} />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>

            <Text style={styles.title}>Each hour (24h)</Text>
            <TextInput onChangeText={(hour => this.setState({ hour }))} style={styles.input} maxLength={2} keyboardType='numeric' value={hour} />
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>

            <Text style={styles.title}>Each minutes</Text>
            <TextInput onChangeText={(minute => this.setState({ minute }))} style={styles.input} maxLength={2} keyboardType='numeric' value={minute} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.title, { top: 40 }]}>Repeat type</Text>
            <Picker
              selectedValue={date}
              style={{ flex: 1 }}
              style={{ height: 50, width: 100 }}
              onValueChange={(date) =>
                this.setState({ date })
              }>
              <Picker.Item label="Day" value="day" />
              <Picker.Item label="Hours" value="hour" />
              <Picker.Item label="Month" value="month" />
            </Picker>
          </View>
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => this.alertView()} style={styles.buttons}>
            <Text style={styles.buttonsText}>Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSaveSettings()} style={styles.buttons}>
            <Text style={styles.buttonsText}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  title: {
    alignSelf: 'center',
    color: '#007AFF',
    width: '60%',
  },
  dataInputs: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
  },
  input: {
    alignSelf: 'center',
    borderColor: '#007AFF',
    borderRadius: 4,
    borderWidth: 0.9,
    width: 80,
    height: 40,
    marginLeft: 10,
    textAlign: 'center',
  },
  repeat: {
    alignSelf: 'center',
    borderColor: '#007AFF',
    borderRadius: 4,
    borderWidth: 0.9,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    alignItems: 'center',
    borderRadius: 4,
    width: 150,
    borderWidth: 0.9,
    color: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonsText: {
    fontSize: 30,
    alignItems: 'center',
    color: '#007AFF',
    borderColor: '#007AFF',
  },
})