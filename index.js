let form = document.getElementById("form");

// localStorage.clear();
// let Entries = [];

const retriveEntries = () => {
  let entries = localStorage.getItem("userEntry");

  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let Entries = retriveEntries();

const displayEntries = () => {
  const entries = retriveEntries();

  const rows = entries
    .map((entry) => {
      const name = `<td class="td">${entry.name}</td>`;
      const email = `<td class="td">${entry.email}</td>`;
      const password = `<td class="td">${entry.password}</td>`;
      const dob = `<td class="td">${entry.dob}</td>`;
      const accseptConditions = `<td class="td">${entry.accseptConditions}</td>`;

      const row = `<tr>${name} ${email} ${password} ${dob} ${accseptConditions}</tr>`;
      return row;
    })
    .join("\n");

  let tableDiv = document.getElementById("tableDiv");

  // <th class="th">Name</th> inside oneMore head for name
  tableDiv.innerHTML = `<table class="table" border="2">
  <tr>
    <th class="th">Name</th>
    <th class="th">Email</th>
    <th class="th">Password</th>
    <th class="th">Dob</th>
    <th class="th">Accepted terms?</th>
    <th class="th">Accepted1 terms?</th>
  </tr>
    ${rows}
  </table>`;
};

// const saveUserFrom = () => {
const saveUserFrom = (event) => {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let accseptConditions = document.getElementById("agree").checked;

  let entry_obj = {
    name,
    email,
    password,
    dob,
    accseptConditions,
  };

  Entries.push(entry_obj);

  localStorage.setItem("userEntry", JSON.stringify(Entries));

  displayEntries();
};

form.addEventListener("submit", saveUserFrom);

displayEntries();


function getAge(today, birthDate) {

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let dateELE = document.getElementById("dob");

dateELE.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");

  let dob = new Date(year, month, date);
  let Today = new Date();

  age = getAge(Today, dob);

  // dateELE.style.backgroundColor = '#ffffff';
  if (age < 18 || age > 55) {
    dateELE.setCustomValidity("Your age is not lies between 18 and 55");
    // dateELE.style.backgroundColor = "red";
    return;
  } else {
    dateELE.setCustomValidity("");
  }
});

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}
