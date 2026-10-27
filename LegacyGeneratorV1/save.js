function saveDataType() {
    const timeElement = document.getElementById("times")
    const timeInputs = timeElement.querySelectorAll(".period-row");
    for (let a = 1; a <= 6; a++) {
        const input = timeInputs[a - 1];
        var startInput = input.querySelector('input:first-of-type');
        var endInput = input.querySelector('input:nth-of-type(2)');
        var saveIdStart = `P${a}S`;
        var saveIdEnd = `P${a}E`;
        localStorage.setItem(saveIdStart, startInput.value);
        localStorage.setItem(saveIdEnd, endInput.value);
    }
    for (let i = 1; i <= 5; i++) {
        const dayId = "day" + i;
        const dayElement = document.getElementById(dayId); 
        
        if (dayElement) {
            console.log(`Found day: ${dayId}`);
            const periodInputs = dayElement.querySelectorAll('.day-input');
            
            for (let j = 1; j <= 6; j++) {
                const periodInput = periodInputs[j - 1]; 
                
                if (periodInput) {
                    
                    if (periodInput.tagName === 'INPUT' || periodInput.tagName === "SELECT") {
                        const valueToSave = periodInput.value;
                        const localStorageKey = `${i}${j}`; // e.g., "11" for Day 1, Period 1
                        localStorage.setItem(localStorageKey, valueToSave);
                        console.log(`  Saved key: ${localStorageKey}, value: "${valueToSave}"`);
                    } else {
                        console.warn(`  Warning: Element at index ${j-1} within ${dayId} is not an input field.`);
                    }
                } else {
                    console.warn(`  Warning: Period input at index ${j-1} not found within ${dayId}. (Expected period ${j})`);
                }
            }
        } else {
            console.warn(`Warning: Day element with ID '${dayId}' not found.`);
        }
    }
    console.log("Save data process complete.");
}

function loadDataType() {
    const timeElement = document.getElementById("times")
    const timeInputs = timeElement.querySelectorAll(".period-row");
    for (let a = 1; a <= 6; a++) {
        const input = timeInputs[a - 1];
        var startInput = input.querySelector('input:first-of-type');
        var endInput = input.querySelector('input:nth-of-type(2)');
        var saveIdStart = `P${a}S`;
        var saveIdEnd = `P${a}E`;

        startInput.value = localStorage.getItem(saveIdStart);
        endInput.value = localStorage.getItem(saveIdEnd);

        localStorage.setItem(saveIdStart, startInput.value);
        localStorage.setItem(saveIdEnd, endInput.value);
    }
    for (let i = 1; i <= 5; i++) {
        const dayId = "day" + i;
        const dayElement = document.getElementById(dayId);
        
        if (dayElement) {
            console.log(`Found day: ${dayId}`);
            const periodInputs = dayElement.querySelectorAll('.day-input');
            for (let j = 1; j <= 7; j++) {
                const periodInput = periodInputs[j - 1];
                
                if (periodInput) {
                    if (periodInput.tagName === 'INPUT' || periodInput.tagName === "SELECT") {
                        const localStorageKey = `${i}${j}`; // e.g., "11" for Day 1, Period 1
                        const storedValue = localStorage.getItem(localStorageKey);
                        
                        if (storedValue !== null) { // Check if a value was stored
                            periodInput.value = storedValue; // Use .value for input fields
                            console.log(`  Loaded key: ${localStorageKey}, value: "${storedValue}"`);
                        } else {
                            console.log(`  No stored value found for key: ${localStorageKey}`);
                        }
                    } else {
                        console.warn(`  Warning: Element at index ${j-1} within ${dayId} is not an input field.`);
                    }
                } else {
                    console.warn(`  Warning: Period input at index ${j-1} not found within ${dayId}. (Expected period ${j})`);
                }
            }
        } else {
            console.warn(`Warning: Day element with ID '${dayId}' not found.`);
        }
    }
    console.log("Load data process complete.");
}

loadDataType();

function timedCount() {
    saveDataType()
    setTimeout("timedCount()",5000);
}
  
if ((localStorage.getItem("autoSave") === "true")) {
    console.log("Auto Save On")
    timedCount();
} else {
    console.log("Auto save off")
}