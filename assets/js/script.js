let dateInput1 = document.getElementById("dateInput dt-1");
let dateInput2 = document.getElementById("dateInput dt-2");
const fetchButton = document.getElementById("fetchButton");

const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1);
dateInput1.value = new Date().toISOString().split("T")[0];
dateInput2.value = endOfMonth.toISOString().split("T")[0];

formatDate();

fetchButton.addEventListener("click", function () {
    formatDate();
});

function formatDate() {
const month = dateInput1.value.split("-")[1];
const year = dateInput1.value.split("-")[0];
const url1 = `https://ummahapi.com/api/prayer-times/month?lat=40.7128&lng=-74.006&month=${month}&year=${year}`;
fetch(url1)
  .then((response) => response.json())
  .then((data) => {
    console.log("Prayer Times:", data);
    const tableBody = document.querySelector(".table tbody");
    tableBody.innerHTML = "";
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
       if(new Date(date) >= new Date(dateInput1.value) && new Date(date) <= new Date(dateInput2.value)){
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
