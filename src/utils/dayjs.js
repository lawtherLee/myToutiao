// export function getDateTimeStamp (dateStr) {
//   return Date.parse(dateStr.replace(/-/gi, '/'))
// }
//
// /* eslint-disable */
// export function getDateDiff(dateStr) {
//   const publishTime = getDateTimeStamp(dateStr) / 1000
//   let d_seconds
//   let d_minutes
//   let d_hours
//   let d_days
//   const timeNow = parseInt(new Date().getTime() / 1000)
//   let d
//   const date = new Date(publishTime * 1000)
//   const Y = date.getFullYear()
//   let M = date.getMonth() + 1
//   let D = date.getDate()
//   let H = date.getHours()
//   let m = date.getMinutes()
//   let s = date.getSeconds()
//   // 小于10的在前面补0
//   if (M < 10) {
//     M = '0' + M
//   }
//   if (D < 10) {
//     D = '0' + D
//   }
//   if (H < 10) {
//     H = '0' + H
//   }
//   if (m < 10) {
//     m = '0' + m
//   }
//   if (s < 10) {
//     s = '0' + s
//   }
//   d = timeNow - publishTime
//   d_days = parseInt(d / 86400)
//   d_hours = parseInt(d / 3600)
//   d_minutes = parseInt(d / 60)
//   d_seconds = parseInt(d)
//   if (d_days > 0 && d_days < 3) {
//     return d_days + '天前'
//   } else if (d_days <= 0 && d_hours > 0) {
//     return d_hours + '小时前'
//   } else if (d_hours <= 0 && d_minutes > 0) {
//     return d_minutes + '分钟前'
//   } else if (d_seconds < 60) {
//     if (d_seconds <= 0) {
//       return '刚刚发表'
//     } else {
//       return d_seconds + '秒前'
//     }
//   } else if (d_days >= 3 && d_days < 30) {
//     return M + '-' + D + '&nbsp' + H + ':' + m
//   } else if (d_days >= 30) {
//     return Y + '-' + M + '-' + D + ' ' + H + ':' + m
//   }
// }

import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export const formetDate = (dateObj) => {
  return dayjs(dateObj).format('YYYY-MM-DD')
}

export const timeAgo = (targetTime) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  const a = dayjs()
  const b = dayjs(targetTime)
  return a.to(b)
}
export default dayjs
