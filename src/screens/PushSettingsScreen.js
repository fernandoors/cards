import React from 'react'
import { View } from 'react-native'
import PushSettings from '../components/PushSettings/PushSettings';

export default function PushSettingsScreen({navigation}) {
  return (
    <View style={{ flex: 1 }}>
      <PushSettings 
        navigation={navigation}
      />
    </View>
  )
}
PushSettingsScreen.navigationOptions = {
  title: 'Push Settings',
};