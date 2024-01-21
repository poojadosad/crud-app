const table = document.querySelector(".t-body");
const studentName = document.getElementById("name");
const studentEmail = document.getElementById("email");
const studentPhone = document.getElementById("phone");
const formSubmit = document.getElementById("form-submit");

// Fetch the data from the server
const students = async () => {
  const response = await fetch("http://localhost:9000/students");
  const data = await response.json();
  console.log(data);
  tableBody(data);
};

students();

// Update the table with the data from the server
const tableBody = (data) => {
  data.map((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
        <button class="btn btn-sm btn-success">Edit</button>
        <button class="btn btn-sm btn-danger">Delete</button>
        </td>
        `;
    table.appendChild(tr);
    console.log(tr);
  });
};

// Add a new student to the database with the form data from the user
document.addEventListener("DOMContentLoaded", () => {
  formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Get the values from the form fields
    const name = studentName.value;
    const email = studentEmail.value;
    const phone = studentPhone.value;

    console.log(name);
    // Send the new student data to the server\
    const response = await fetch("http://localhost:9000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    });

    // Get the updated data from the server
    const newData = await response.json();
    const data = [newData];
    // console.log(data);

    // Update the table with the new data
    tableBody(data);

    // Clear the form fields for the  next input
    studentName.value = "";
    studentEmail.value = "";
    studentPhone.value = "";
  });
});
