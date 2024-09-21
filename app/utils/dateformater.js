export function formatDate(dateString) {
  // Parse the input date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  // Extract the day, month, and year
  const day = date.toLocaleString('en-US', {weekday: 'short'});
  const month = date.toLocaleString('en-US', {month: 'short'});
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  // Format the date string
  const formattedDate = `${day} ${month} ${dayOfMonth} ${year}`;

  return formattedDate;
}
