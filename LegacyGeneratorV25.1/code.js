function generateTable() {
  var win = window.open();
  win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Schedule</title>
      <style>
        html, body {
          height: 100%;
          margin: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          height: 90%;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
          @media print {
  /* Default @page rule - browser will often use this if no more specific match */
  @page {
    size: A4 landscape; /* You can set a default, but user can override */
  }

  /* Specific rule for A5 landscape printing */
  @page A5 {
    size: A5; /* Explicitly set size for this rule */
    .period-time {
      font-size: 2px !important; /* Smaller font for A5 */
    }
  }
      </style>
    </head>
    <body>
      <table>
        <tr>
          <th></th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </table>
      <script>
        function formatTime(timeString) {
          if (!timeString) return '';
          const [hours, minutes] = timeString.split(':');
          let h = parseInt(hours, 10);
          const ampm = h >= 12 ? 'PM' : 'AM';
          h = h % 12;
          h = h ? h : 12; // the hour '0' should be '12'
          const m = minutes < 10 ? '0' + minutes : minutes;
          return h + ':' + m + ' ' + ampm;
        }

        function populateTable(data, periodTimes) {
          const table = document.querySelector('table');
          while (table.rows.length > 1) {
            table.deleteRow(1);
          }

          if (!data || data.length === 0) {
            const emptyRow = table.insertRow();
            const emptyCell = emptyRow.insertCell();
            emptyCell.colSpan = 6;
            emptyCell.textContent = "No schedule data available.";
            return;
          }

          const dayDataMap = {};
          data.forEach(dayInfo => {
            dayDataMap[dayInfo.day] = dayInfo.periods;
          });

          const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
          const numPeriods = data.length > 0 && data[0].periods ? data[0].periods.length : 0;

          for (let i = 0; i < numPeriods; i++) {
            const newRow = table.insertRow();
            let periodCell = newRow.insertCell();
            let timeInfo = '';
            if (periodTimes[i] && periodTimes[i].start && periodTimes[i].end) {
              const formattedStart = formatTime(periodTimes[i].start);
              const formattedEnd = formatTime(periodTimes[i].end);
              timeInfo = \`<br> <span style="font-size:8px;">\${formattedStart}-\${formattedEnd}<span>\`;
            }
            periodCell.innerHTML = \`Period \${i + 1}\${timeInfo}\`;

            daysOfWeek.forEach(day => {
              const periodValue = dayDataMap[day] ? dayDataMap[day][i] || '' : '';
              let dataCell = newRow.insertCell();
              dataCell.textContent = periodValue;
            });
          }
          window.print()
          window.close()
        }
      </script>
    </body>
    </html>
  `);
  win.document.close();

  const daysContainer = document.getElementById("days");
  const timesContainer = document.getElementById("times");

  if (!daysContainer || !timesContainer) {
    console.error("Required elements not found in the original document.");
    return;
  }

  const dayElements = daysContainer.querySelectorAll(".day");
  const scheduleData = [];

  dayElements.forEach((dayElement, dayIndex) => {
    const dayName = dayElement.querySelector("h2")?.textContent.trim();
    const periodInputs = dayElement.querySelectorAll("input.day-input[type='text']");
    const daySchedule = { day: dayName, periods: [] };

    periodInputs.forEach((periodInput, periodIndex) => {
      const periodValue = periodInput.value.trim();
      daySchedule.periods.push(periodValue);
    });
    scheduleData.push(daySchedule);
  });

  const periodTimeRows = timesContainer.querySelectorAll(".period-row");
  const periodTimes = [];
  periodTimeRows.forEach(row => {
    // It's crucial that each period-row's start and end inputs have unique IDs
    // For example: <input type="time" id="period1-start" class="time-input">
    // Since your HTML has duplicate IDs (id="start", id="end"),
    // querySelector for first/last of type within the row is more robust.
    const startInput = row.querySelector("input.time-input:first-of-type");
    const endInput = row.querySelector("input.time-input:last-of-type");
    
    periodTimes.push({
      start: startInput ? startInput.value : '',
      end: endInput ? endInput.value : ''
    });
  });

  if (win && win.populateTable && Array.isArray(scheduleData) && Array.isArray(periodTimes)) {
    win.populateTable(scheduleData, periodTimes);
  } else if (win) {
    console.log("Could not populate table in the new window immediately.");
    setTimeout(() => {
      if (win && win.populateTable && Array.isArray(scheduleData) && Array.isArray(periodTimes)) {
        win.populateTable(scheduleData, periodTimes);
      } else {
        console.warn("Still could not populate table after a short delay.");
      }
    }, 200);
  }
}

function boxChanged() {
  console.log("The box with ID 'Period7' has changed!");
  if (box.checked == false){
    remove = document.querySelectorAll("#period7");
    box.remove()
    remove.forEach(element => {
      element.parentNode.remove()
    });
  }
}

const box = document.getElementById("Period7");

if (box) {
  box.addEventListener("change", boxChanged);
} else {
  console.error("Element with ID 'Period7' not found.");
}