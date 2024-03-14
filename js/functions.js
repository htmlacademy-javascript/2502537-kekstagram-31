//Функция перевода часов в минуты
const getHoursInMinutes = (time) => {
  time = Number((time[0] * 60)) + Number(time[1]);
  return time;
};

//функция расчета попадания в рабочее время для
const getFullTimeDay = (start, end, meetingStart, durationMeetingTime) => {
  let result = false;
  start = start.split(':');
  end = end.split(':');
  meetingStart = meetingStart.split(':');

  start = getHoursInMinutes(start);
  end = getHoursInMinutes(end);
  meetingStart = getHoursInMinutes(meetingStart);
  durationMeetingTime += meetingStart;

  if (durationMeetingTime >= start && durationMeetingTime <= end){
    result = true;
  } return result;
};

//проверка работы функции
// console.log(getFullTimeDay('08:00', '17:30', '14:00', 90));
// console.log(getFullTimeDay('8:0', '10:0', '8:0', 120));
// console.log(getFullTimeDay('08:00', '14:30', '14:00', 90));
// console.log(getFullTimeDay('14:00', '17:30', '08:0', 90));
// console.log(getFullTimeDay('8:00', '17:30', '08:00', 900));

export {getHoursInMinutes, getFullTimeDay};
