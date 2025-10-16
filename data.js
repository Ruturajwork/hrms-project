const date1 = new Date("2024-05-31T00:00:00.000+00:00");
const date2 = new Date("2024-06-01T00:00:00.000+00:00");

// Calculating the time difference
const differenceInTime = date2.getTime() - date1.getTime();

// Calculating the no. of days between two dates
const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

console.log("Difference in days:", differenceInDays);