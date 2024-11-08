export function truncate(str: string, maxLength = 30) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...'
  }
  return str
}

export function formatStartDate(start: string): string {
  // Create a new Date object from the start string
  const date = new Date(start)

  // Define an array of month names in Portuguese
  const monthNames = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ]

  // Get the month and year from the date
  const month = monthNames[date.getMonth()] // getMonth() returns 0-11
  const year = date.getFullYear()

  return `${month}, ${year}`
}
