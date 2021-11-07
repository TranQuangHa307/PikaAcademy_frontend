export function convertPrice(price, discount = 0, isFormat = true) {
  if (discount) {
    price = price * ((100 - discount) / 100)
  }
  if (price > 0) price = price - 1000
  if (isFormat) price = new Intl.NumberFormat('de-DE').format(price)
  return price
}

export function convertDateTime(time) {
  const date = new Date(time * 1000).toLocaleString('VN', { hour12: false })
  return date
}

export function convertDateTimeVN(time) {
  const date = new Date(time * 1000).toLocaleString('VN', { hour12: false })
  return date
}

export function convertDateTimeZA(time) {
  const date = new Date(time * 1000).toLocaleString('en-ZA').replace(',', '')
  return date
}

export function vndFormat(value) {
  // eslint-disable-next-line key-spacing
  return value.toLocaleString('it-IT', { style : 'currency', currency : 'VND' })
}

export const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(data)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

export function convertTimeStamptoDate(time) {
  return (!time) ? null : new Date(Number(time) * 1000)
}

export function convertLocalDateToUTCIgnoringTimezone(date) {
  const timestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )

  return new Date(timestamp)
}

export function convertDateTimeInsert(time, type = 'date') {
  if (!time) return null
  let res = null
  switch (type) {
    case 'datetime':
      res = time.toLocaleString('en-ZA', { timeZone: 'UTC' }).replace(',', '')
      break
    default:
      res = time.toLocaleString('en-ZA', { timeZone: 'UTC' }).split(',')[0]
      break
  }
  // const options = {
  //   timeZone: 'UTC',
  //   year: 'numeric',
  //   month: 'numeric',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric'
  // }
  // console.log(`res: ${new Intl.DateTimeFormat('it-IT', options).format(time)}`)
  return res
}

export function getDateToLocaleString(time) {
  const date = convertTimeStamptoDate(time)
  return (!date) ? null : date.toLocaleDateString('en-US')
}
