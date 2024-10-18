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

export function formatDateBirth(dateString) {
  console.log('dateString', dateString);
  // Check if dateString is defined and not null
  if (!dateString) {
    return 'Invalid Date';
  }

  // Manually parse the input date string
  const parts = dateString.split(' ');
  if (parts.length < 4) {
    return 'Invalid Date';
  }

  const day = parts[0];
  const month = parts[1];
  const dayOfMonth = parts[2];
  const year = parts[3];

  // Check if the date parts are valid
  if (!day || !month || !dayOfMonth || !year) {
    return 'Invalid Date';
  }

  // Format the date string
  const formattedDate = `${day} ${month} ${dayOfMonth} ${year}`;

  return formattedDate;
}
