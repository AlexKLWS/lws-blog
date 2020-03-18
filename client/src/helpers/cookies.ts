export function setCookie(name: string, value: string, daysToExpire: number) {
  var date = new Date()
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000)
  const expires = '; expires=' + date.toUTCString()
  document.cookie = name + '=' + value + expires + '; path=/'
}
