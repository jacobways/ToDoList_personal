import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function PickDate( {setSimpleDate} ) {
  const [date, setDate] = useState(new Date());
  
  function getToday(date) {
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  const simpleDateHandler = () => {
    setSimpleDate(getToday(date))
  }

  useEffect(() => {
    simpleDateHandler()
  }, [date])
  
  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
      />
    </div>
  );
}

export default PickDate;