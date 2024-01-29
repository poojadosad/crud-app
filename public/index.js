const table = document.querySelector(".t-body");
const studentName = document.getElementById("name");
const studentEmail = document.getElementById("email");
const studentPhone = document.getElementById("phone");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const updateStudentName = document.getElementById("update-name");
const updateStudentEmail = document.getElementById("update-email");
const updateStudentPhone = document.getElementById("update-phone");
const updateStudentForm = document.getElementById("form-update");
let studentId;

// Fetch the data from the server
const students = async () => {
  const response = await fetch("http://localhost:9000/students");
  const data = await response.json();
  tableBody(data);
};

students();

// Update the table with the data from the server
const tableBody = (data) => {
  let tableData = "";
  table.innerHTML = "";
  data.map((student) => {
    tableData += `
        <tr>
        <td class='d-none'>${student._id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
        <button class="btn btn-sm btn-success" data-toggle="modal" onclick="updateStudent(this)" data-target="#myModal">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student._id}')">Delete</button>
        </td>
        </tr>
        `;
    table.innerHTML = tableData;
  });
};

// Add a new student to the database with the form data from the user
document.addEventListener("DOMContentLoaded", () => {
  const handleSubmit = async () => {
    // Get the values from the form fields
    const name = studentName.value;
    const email = studentEmail.value;
    const phone = studentPhone.value;

    console.log(name);
    // Send the new student data to the server
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

    // Update the table with the new data
    tableBody(data);

    // Clear the form fields for the  next input
    studentName.value = "";
    studentEmail.value = "";
    studentPhone.value = "";
  };
});

// Update a student
const updateStudent = async (e) => {
  myModal.show();
  studentId = e.parentElement.parentElement.children[0].innerHTML;
  updateStudentName.value = e.parentElement.parentElement.children[1].innerHTML;
  updateStudentEmail.value =
    e.parentElement.parentElement.children[2].innerHTML;
  updateStudentPhone.value =
    e.parentElement.parentElement.children[3].innerHTML;
};

updateStudentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:9000/students/" + studentId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: updateStudentName.value,
      email: updateStudentEmail.value,
      phone: updateStudentPhone.value,
    }),
  });

  const data = await response.json();
  myModal.hide();
  students();
});

// Delete a student function to called when enpoint is created
const deleteStudent = async (id) => {
  if (confirm("Do you want to delete?")) {
    await fetch(`http://localhost:9000/students/${id}`, {
      method: "DELETE",
    });

    students();
  } else {
    alert("Cancelled");
  }
};
