export const convertTimeStringTo12HourFormat = (timeString: string) => {
  if (!timeString) return null
  // Prepend any date. Use your birthday.
  const timeString12hr = new Date(
    "1970-01-01T" + timeString + "Z"
  ).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  })
  return timeString12hr
}
