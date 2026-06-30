export const GRID_START_HOUR = 7
export const GRID_END_HOUR = 23
export const HOUR_HEIGHT = 64 // px

export function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function minutesFromGridStart(t) {
  return timeToMinutes(t) - GRID_START_HOUR * 60
}

export function durationMinutes(start, end) {
  return timeToMinutes(end) - timeToMinutes(start)
}

export function formatHourLabel(hour) {
  const h = hour % 24
  const period = h < 12 ? 'AM' : 'PM'
  const display = h % 12 === 0 ? 12 : h % 12
  return `${display} ${period}`
}

export function formatTimeRange(start, end) {
  return `${formatTimeShort(start)} – ${formatTimeShort(end)}`
}

function formatTimeShort(t) {
  const [h, m] = t.split(':').map(Number)
  const period = h < 12 ? 'am' : 'pm'
  const display = h % 12 === 0 ? 12 : h % 12
  return m === 0 ? `${display}${period}` : `${display}:${String(m).padStart(2, '0')}${period}`
}

export function totalHours(events, predicate) {
  return events
    .filter(predicate)
    .reduce((sum, e) => sum + durationMinutes(e.start_time, e.end_time) / 60, 0)
}
