export const getDate = () => {
  const date = new Date()

  return {
    month: date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth(),
    day: date.getDay() < 10 ? `0${date.getDay()}` : date.getDay(),
    year: date.getFullYear(),
    hours: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    minutes:
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    seconds:
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  }
}
