import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
const NOTIFICATION_KEY = 'SET_NOTIFICATION'
const SET_PUSH_SETTINGS = 'SET_PUSH_SETTINGS'

export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const setTime = () => new Date().toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'GO TO QUIZZES',
    body: "Don't forget to do your quizzes for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification(days = 1, hours = 20, minutes = 0, repeat = 'day') {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let pushDate = new Date()
              pushDate.setDate(pushDate.getDate() + parseInt(days))
              pushDate.setHours(parseInt(hours))
              pushDate.setMinutes(parseInt(minutes))

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: pushDate,
                  repeat,
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              AsyncStorage.setItem(SET_PUSH_SETTINGS, JSON.stringify({ day, hour, minute, date })).then(getLocalNotification())
            }
          })
      }
    })
}

export async function getLocalNotification() {
  return await AsyncStorage.getItem(SET_PUSH_SETTINGS).then(JSON.parse).then(data => {
    if (data === null) {
      saveLocalNotification('1', '20', '0', 'day').then(getLocalNotification())
    } else {
      return data
    }
  })
}
export async function saveLocalNotification(day, hour, minute, date) {
  return await AsyncStorage.setItem(SET_PUSH_SETTINGS, JSON.stringify({ day, hour, minute, date }))
    .then(setLocalNotification())
}
