export function getTimeAsNumberOfMinutes(time) {
  var timeParts = time.split(":");

  var timeInMinutes = +timeParts[0] * 60 + +timeParts[1];

  return timeInMinutes;
}

export const isMatchingCurrentTime = (
  date,
  startTime,
  endTime,
  compareDate,
  compareTime
) => {
  var today = new Date();

  const present =
    compareDate ??
    today.getDate().toString().padStart(2, "0") +
      "/" +
      (today.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      today.getFullYear();

  if (present !== date) return false;

  const currentTime =
    compareTime ??
    today.getHours().toString().padStart(2, "0") +
      ":" +
      today.getMinutes().toString().padStart(2, "0");
  var time1InMinutesForPresentTime = getTimeAsNumberOfMinutes(currentTime);
  var time1InMinutesForStartTime = getTimeAsNumberOfMinutes(startTime);
  var time1InMinutesForEndTime = getTimeAsNumberOfMinutes(endTime);

  if (
    time1InMinutesForStartTime <= time1InMinutesForPresentTime &&
    time1InMinutesForPresentTime <= time1InMinutesForEndTime
  ) {
    return true;
  }
  return false;
};

export function getTodaysDate() {
  var today = new Date();
  return (
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0")
  );
}

export function getCurrentTime() {
  var today = new Date();
  return (
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0")
  );
}

export function convertFromMinutes(data) {
  var minutes = data % 60;
  var hours = (data - minutes) / 60;
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0")
  );
}
