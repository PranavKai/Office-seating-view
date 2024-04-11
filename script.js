let editMode = false;
let editIndex = null;

document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    document.getElementById('employeeForm').addEventListener('submit', handleFormSubmit);
});

function getDatabase() {
    const employeesJson = localStorage.getItem('employees');
    return employeesJson ? JSON.parse(employeesJson) : [];
}

function saveDatabase(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function loadEmployees() {
    const employees = getDatabase();
    const tbody = document.querySelector('#seatingChart tbody');
    tbody.innerHTML = '';
    employees.forEach((employee, index) => {
        tbody.innerHTML += `<tr>
                                <td>${employee.name}</td>
                                <td>${employee.floor}</td>
                                <td>${employee.date}</td>
                                <td>
                                    <a href="#" onclick="editEmployee(${index})">Edit | </a>
                                    <a href="#" onclick="deleteEmployee(${index})">Delete</a>
                                </td>
                            </tr>`;
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('employeeName').value;
    const floor = document.getElementById('employeeFloor').value;
    const date = new Date().toLocaleDateString(); // Get today's date
    
    if (editMode) {
        updateEmployee(editIndex, { name, floor, date });
    } else {
        addEmployee({ name, floor, date });
    }

    // Reset form and mode
    event.target.reset();
    editMode = false;
    editIndex = null;
    loadEmployees();
}

function addEmployee(employee) {
    const employees = getDatabase();
    employees.push(employee);
    saveDatabase(employees);
}

function updateEmployee(index, employee) {
    const employees = getDatabase();
    employees[index] = employee;
    saveDatabase(employees);
}

function editEmployee(index) {
    const employees = getDatabase();
    document.getElementById('employeeName').value = employees[index].name;
    document.getElementById('employeeFloor').value = employees[index].floor;
    
    // Set mode to edit and store index
    editMode = true;
    editIndex = index;
}

function deleteEmployee(index) {
    let employees = getDatabase();
    employees.splice(index, 1);
    saveDatabase(employees);
    loadEmployees();
}
