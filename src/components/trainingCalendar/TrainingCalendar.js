import React from 'react'
import TrainingCalendarItem from './TrainingCalendarItem'

const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]

const TrainingCalendar = ({
  selected,
  activitiesForCalendar: { monthsFormatted }
}) => {
  return (
    <div className='calendar-page__calendar'>
      {months.map((month, index) => (
        <TrainingCalendarItem
          label={month}
          key={month}
          activities={monthsFormatted[index]}
          selected={selected}
        />
      ))}
    </div>
  )
}

export default TrainingCalendar
