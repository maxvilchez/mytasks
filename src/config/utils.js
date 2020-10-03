import { Dimensions, Platform, StatusBar } from 'react-native'
import _ from 'lodash'
import moment from 'moment'

export function isIphoneX() {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 || dimen.width === 896)
  )
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0
  })
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0
}

export const calendarFormats = {
  sameDay: '[Today]',
  nextDay: '[Tomorrow]',
  nextWeek: 'dddd',
  lastDay: '[Yesterday]',
  lastWeek: '[Last] dddd',
  sameElse: 'DD/MM/YYYY'
}

export const tasksMapping = data => {
  const tsks = []
  const groups = _.groupBy(data, task =>
    moment(task.scheduled_date).calendar(calendarFormats)
  )
  _.forEach(groups, (value, key) => {
    let item
    item = _.assign(item, {
      title: key,
      data: groups[key]
    })
    tsks.push(item)
  })

  return tsks
}
