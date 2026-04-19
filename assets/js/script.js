let dateInput1 = document.getElementById("dateInput dt-1");
let dateInput2 = document.getElementById("dateInput dt-2");
const fetchButton = document.getElementById("fetchButton");
const tableBody = document.querySelector(".table tbody");


const endOfMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth() + 1,
);
dateInput1.value = new Date().toISOString().split("T")[0];
dateInput2.value = endOfMonth.toISOString().split("T")[0];
let startDate = allDates();
formatDate(startDate);

fetchButton.addEventListener("click", function () {
  let dates = allDates();
  tableBody.innerHTML = "";
  formatDate(dates);
});

function allDates() {
  let firstYear = dateInput1.value.split("-")[0];
  let firstMonth = dateInput1.value.split("-")[1];
  let firstDay = parseInt(dateInput1.value.split("-")[2]);
  let secondYear = dateInput2.value.split("-")[0];
  let secondMonth = dateInput2.value.split("-")[1];
  let secondDay = parseInt(dateInput2.value.split("-")[2]);
  const startDate = new Date(firstYear, firstMonth - 1, firstDay);
  const endDate = new Date(secondYear, secondMonth - 1, secondDay);

  const dates = [];
  for (
    let date = new Date(startDate.getTime() + 86400000); // Add one day
    date <= new Date(endDate.getTime() + 86400000);
    date.setDate(date.getDate() + 1)
  ) {
    dates.push(new Date(date).toISOString().split("T")[0]);
  }
  return dates;
}

async function formatDate(dates) {
  for (let i = 0; i < dates.length; i++) {
    const dateParts = dates[i].split("-");
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    await fetchPrayerTimes(year, month, day);
  }
}

function fetchPrayerTimes(year, month, dayOfMonth) {
  const url1 = `https://ummahapi.com/api/prayer-times/month?lat=40.7128&lng=-74.006&month=${month}&year=${year}`;
  return fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      data.data.days.forEach((day) => {
        let date = day.date;
        let fajr = day.prayer_times.fajr.substring(0, 5);
        let dhuhr = day.prayer_times.dhuhr.substring(0, 5);
        let sunrise = day.prayer_times.sunrise.substring(0, 5);
        let asr = day.prayer_times.asr.substring(0, 5);
        let maghrib = day.prayer_times.maghrib.substring(0, 5);
        let isha = day.prayer_times.isha.substring(0, 5);
        let imsak = day.prayer_times.imsak.substring(0, 5);
        const row = document.createElement("tr");
        if (date == `${year}-${month}-${dayOfMonth}`) {
          row.innerHTML = `
        <th scope="row">${date}</th>
        <td>${imsak}</td>
        <td>${fajr}</td>
        <td>${sunrise}</td>
        <td>${dhuhr}</td>
        <td>${asr}</td>
        <td>${maghrib}</td>
        <td>${isha}</td>
        `;
          tableBody.appendChild(row);
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
