module.exports = (startTime, endTime) => {
  let startHour = parseInt(startTime[0] + startTime[1]);
  let startMinute = parseInt(startTime[3] + startTime[4]);
  let endHour = parseInt(endTime[0] + endTime[1]);
  let endMinute = parseInt(endTime[3] + endTime[4]);

  // startMinute가 endMinute 보다 작은 경우 :endMinute에서 start Minute 빼주면 됨
  //startHour가 endHour 보다 작은 경우 : endHour에서 Start Hour 빼주면 됨
  //startHour가 endHour 보다 큰 경우 : endHour에 24을 더한 후 Start Hour 빼주면 됨

  // startMinute가 endMinute 보다 큰 경우 : endMinute에서 60을 더한 다음 startMinute 빼주기 + endHour에서 1을 빼주기
  //startHour가 endHour 보다 작은 경우 : endHour에서 Start Hour 빼주면 됨
  //startHour가 endHour 보다 큰 경우 : endHour에 24을 더한 후 Start Hour 빼주면 됨

  let hourResult = 0;
  let minuteResult = 0;
  let result = 0;

  if (startMinute <= endMinute) {
    minuteResult = endMinute - startMinute;

    if (startHour <= endHour) {
      hourResult = endHour - startHour;
    } else {
      hourResult = endHour + 24 - startHour;
    }
  } else {
    minuteResult = endMinute + 60 - startMinute;
    endHour = endHour - 1;

    if (startHour <= endHour) {
      hourResult = endHour - startHour;
    } else {
      hourResult = endHour + 24 - startHour;
    }
  }

  minuteResult = parseFloat((minuteResult / 60).toFixed(1));
  result = hourResult + minuteResult;

  return result;
};
