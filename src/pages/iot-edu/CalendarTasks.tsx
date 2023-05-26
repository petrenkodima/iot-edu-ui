import Calendar from 'color-calendar';
import 'color-calendar/dist/css/theme-glass.css';
import React from 'react';

class CalendarComponent extends React.Component {
  componentDidMount() {
    new Calendar({
      id: '#myCal',
      theme: 'glass',
      weekdayType: 'long-upper',
      monthDisplayType: 'long',
      calendarSize: 'small',
      layoutModifiers: ['month-left-align'],
      eventsData: [
        {
          id: 1,
          name: 'French class',
          start: '2023-03-12T11:30:00',
          end: '2023-03-12T11:30:00',
        },
        {
          id: 2,
          name: 'Blockchain 101',
          start: '2023-03-10T11:30:00',
          end: '2023-03-10T11:30:00',
        },
      ],
      dateChanged: (currentDate: Date) => {
        console.log('date change', currentDate);
      },
    });
  }

  render() {
    return <div id="myCal"></div>;
  }
}

export const CalendarTasks = () => <CalendarComponent />;
