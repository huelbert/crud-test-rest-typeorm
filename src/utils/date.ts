function addDays(date: Date, days: number): Date {
  const oneDay = 1000 * 60 * 60 * 24 * days
  const timestamp = date.getTime()

  return new Date(timestamp + oneDay)
}

export default {
  addDays
}
