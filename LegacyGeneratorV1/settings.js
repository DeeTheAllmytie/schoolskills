function saveSettings() {
    localStorage.setItem("autoSave", autoSaveInput.checked)
}

function loadSettings() {
    console.log(localStorage.getItem("autoSave"))
    autoSaveInput.checked = (localStorage.getItem("autoSave") === "true")
}

loadSettings()
submitButton.onclick = saveSettings