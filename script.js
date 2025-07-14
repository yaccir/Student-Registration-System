
// dom objects
const tbody = document.getElementsByClassName("tbody")[0];
const register = document.getElementById("Register");
const fileInput = document.getElementById("profilepic");
const preview = document.getElementById("show");


// photo preview code
fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  if ((file.size / 1024) < 50) {
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  } else alert("file size should be less than 50 KB");
});

// collection of values from input boxes
register.addEventListener("click", function () {
  let arrdata = [];
  arrdata[0] = document.getElementById("studentid").value;
  arrdata[1] = preview.src;
  arrdata[2] = document.getElementsByClassName("name")[0].value;
  arrdata[3] = document.getElementsByClassName("fname")[0].value;
  arrdata[4] = document.getElementsByClassName("mname")[0].value;
  arrdata[5] = document.getElementsByClassName("mobileno")[0].value;
  arrdata[6] = document.getElementsByClassName("dob")[0].value;
  arrdata[7] = document.getElementsByClassName("course")[0].value;
  arrdata[8] = document.getElementById("email").value;
  arrdata[9] = document.getElementsByClassName("address")[0].value;

  if (
    arrdata[0] === "" ||
    arrdata[2] === "" ||
    arrdata[3] === "" ||
    arrdata[4] === "" ||
    arrdata[5] === "" ||
    arrdata[6] === "" ||
    arrdata[7] === "" ||
    arrdata[8] === "" ||
    arrdata[9] === ""
  ) {
    alert("Please fill all fields before registering!");
    return;
  }

  // names mobile email and student id validation
 const nameStudent = /^[a-zA-Z ]{2,}$/;;
const fname = /^[a-zA-Z ]{2,}$/;
const Mname = /^[a-zA-Z ]{2,}$/;
const course = /^[a-zA-Z ]{2,}$/;

// Validate each field separately
if (!nameStudent.test(arrdata[2])) {
  alert("Student name must contain only letters (min 2 characters)");
  return;
}

if (!fname.test(arrdata[3])) {
  alert("Father's name must contain only letters (min 2 characters)");
  return;
}

if (!Mname.test(arrdata[4])) {
  alert("Mother's name must contain only letters (min 2 characters)");
  return;
}

if (!course.test(arrdata[7])) {
  alert("Course must contain only letters (min 2 characters)");
  return;
}

  const mobileRegex=/^[0-9]{10}$/;
  if(!mobileRegex.test(arrdata[5]))
  {
    alert("Mobile No should be of 10 Digits!!");
  return;
  } 
  const stuid=/^[0-9]{5}$/;
  if(!stuid.test(arrdata[0]))
  {
    alert("Student id should be of 5 digits only!!!");
    return;
  }
  const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(!emailregex.test(arrdata[8]))
  {
    alert("Enter Valid Email id");
    return;
  }

  // row creation in tables 
  const row = document.createElement("tr");
  let temp;
  for (let i = 0; i < 12; i++) {
    temp = document.createElement("td");
    //here i==1 means code for image
    if (i === 1) {
      let newtemp = document.createElement("img");
      newtemp.src = arrdata[i];
      temp.appendChild(newtemp);
      row.appendChild(temp);
      continue;
    }
    if (i === 10 || i === 11) {
      const btn = document.createElement("button");
      btn.innerText = i === 10 ? "Edit" : "Delete";
      btn.setAttribute("onclick", i === 10 ? "edit(this)" : "deleteme(this)");
      temp.appendChild(btn);
      row.appendChild(temp);
      continue;
    }
    temp.innerText = arrdata[i];
    row.appendChild(temp);
  }
  tbody.appendChild(row);
  saveToLocalStorage();

  // reseting the input boxes to empty
  document.getElementById("studentid").value = "";
  document.getElementsByClassName("name")[0].value = "";
  document.getElementsByClassName("fname")[0].value = "";
  document.getElementsByClassName("mname")[0].value = "";
  document.getElementsByClassName("course")[0].value = "";
  document.getElementsByClassName("dob")[0].value = "";
  document.getElementsByClassName("address")[0].value = "";
  document.getElementsByClassName("mobileno")[0].value = "";
  document.getElementById("email").value = "";
  fileInput.value = "";
  preview.src = "image/profile.jpg";
});

// delete button in table of registered student
function deleteme(event1) {
  let row = event1.parentNode.parentNode;
  row.remove();
  saveToLocalStorage();
}


//edit code of registered student in table
let tracked = 0;

function edit(event2) {
  let row = event2.parentNode.parentNode;
  let arr = [];

  for (let i = 0; i < 10; i++) {
    //here i==1 means code for image
    if (i === 1) {
      arr[i] = row.cells[i].children[0].src;
      row.cells[i].innerHTML = `<input type="file" id="photoup">`;
      const fileup = document.getElementById("photoup");
      tracked = arr[i];

      fileup.addEventListener("change", function () {
        tracked = 0;
        const file1 = fileup.files[0];

        // if no file selected it should reset to previous one
        if (!file1) {
          row.cells[1].innerHTML = `<img src="${arr[i]}">`;
          return;
        }
        //file size checking less than 50 kb
        if ((file1.size / 1024) < 50) {
          const reader1 = new FileReader();
          reader1.onload = function () {
            row.cells[i].innerHTML = `<img src="${reader1.result}">`;
          };

          reader1.readAsDataURL(file1);
        } else {
          alert("File size should be less than 50 KB");
          row.cells[i].innerHTML = `<img src="${arr[i]}">`;
        }
      });
      continue;
    }

    arr[i] = row.cells[i].innerText;
    row.cells[i].innerHTML = `<input type="text" value="${arr[i]}">`;
  }
  // change the button to save while editing
  event2.innerText = "Save";
  event2.setAttribute("onclick", "update(this)");
}

// update code of registered student in table

function update(event3) {
  let row = event3.parentNode.parentNode;
  for (let i = 0; i < 10; i++) {
    if (i === 1) {
      if (tracked) {
        row.cells[i].innerHTML = `<img src=${tracked}>`;
      }
      continue;
    }
    row.cells[i].innerText = row.cells[i].children[0].value;
  }
  event3.innerText = "Edit";
  event3.setAttribute("onclick", "edit(this)");
  saveToLocalStorage();
}


//local storage code for registered student

function saveToLocalStorage() {
  let allRows = document.querySelectorAll(".tbody tr");
  let dataArr = [];

  allRows.forEach(row => {
    let rowData = [];
    for (let i = 0; i < 10; i++) {
      if (i === 1) {
        rowData[i] = row.cells[i].children[0].src;
      } else {
        rowData[i] = row.cells[i].innerText;
      }
    }
    // collecting all data to one array
    dataArr.push(rowData);
  });

  //setting data to local storage 
  localStorage.setItem("studentData", JSON.stringify(dataArr));
}

// loading data from local storage to the table

function loadFromLocalStorage() {
  let storedData = localStorage.getItem("studentData");
  if (storedData) {
    let dataArr = JSON.parse(storedData);
    dataArr.forEach(rowData => {
      const row = document.createElement("tr");
      for (let i = 0; i < 12; i++) {
        const td = document.createElement("td");
        if (i === 1) {
          const img = document.createElement("img");
          img.src = rowData[i];
          td.appendChild(img);
        } else if (i === 10 || i === 11) {
          const btn = document.createElement("button");
          btn.innerText = i === 10 ? "Edit" : "Delete";
          btn.setAttribute("onclick", i === 10 ? "edit(this)" : "deleteme(this)");
          td.appendChild(btn);
        } else {
          td.innerText = rowData[i];
        }
        row.appendChild(td);
      }
      tbody.appendChild(row);
    });
  }
}

//loading the data from local storage of browser each time when page loads
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
