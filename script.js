let records = JSON.parse(localStorage.getItem("records")) || [];
function saveRecords() {
    localStorage.setItem("records", JSON.stringify(records));
}
function addRecord() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const editIndex = document.getElementById("editIndex").value;
    if (name === "" || email === "" || phone === "") {
        alert("Please fill in all fields!");
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }
    if (editIndex === "") {
        records.push({ name, email, phone });
        alert("Record added successfully!");
    } else {
        records[Number(editIndex)] = { name, email, phone };
        alert("Record updated successfully!");
    }
    saveRecords();
    clearForm();
    displayRecords();
}
function displayRecords() {
    const recordList = document.getElementById("recordList");
    const search = document.getElementById("search").value.toLowerCase();
    const emptyMessage = document.getElementById("emptyMessage");
    recordList.innerHTML = "";
    let found = 0;
    records.forEach((record, index) => {
        const matches =
            record.name.toLowerCase().includes(search) ||
            record.email.toLowerCase().includes(search) ||
            record.phone.toLowerCase().includes(search);
        if (!matches) {
            return;
        }
        found++;
        const row = document.createElement("tr");
        [index + 1, record.name, record.email, record.phone].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        const actionCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "action-btn edit-btn";
        editButton.onclick = () => editRecord(index);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "action-btn delete-btn";
        deleteButton.onclick = () => deleteRecord(index);
        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);
        recordList.appendChild(row);
    });
    emptyMessage.style.display = found === 0 ? "block" : "none";
}
function editRecord(index) {
    const record = records[index];
    document.getElementById("name").value = record.name;
    document.getElementById("email").value = record.email;
    document.getElementById("phone").value = record.phone;
    document.getElementById("editIndex").value = index;
    document.getElementById("submitBtn").textContent = "Update Record";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function deleteRecord(index) {
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
        records.splice(index, 1);
        saveRecords();
        displayRecords();
        alert("Record deleted successfully!");
    }
}
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("editIndex").value = "";
    document.getElementById("submitBtn").textContent = "Add Record";
}
displayRecords();