export function getCurrentDay() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDate = new Date();
  const dayOfweek = currentDate.getDay();
  return daysOfWeek[dayOfweek];
}

export function getCurrentDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const date = currentDate.getDate();
  return `${date} ${month} `;
}

function isNightTime(date = new Date()) {
  // Get hour in 24-hour format (0-23)
  const hours = date.getHours();

  // Consider evenings and mornings as part of nighttime
  // You can adjust this range based on your definition of nighttime
  return hours >= 19 || hours <= 4;
}

// Example usage
export function checkNightTime() {
  const now = new Date();
  if (isNightTime(now)) {
    return true;
  } else {
    return false;
  }
}
