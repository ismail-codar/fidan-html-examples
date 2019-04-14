import { fidan } from "@fidanjs/runtime";

// State variables
let personId = null;
const formMode = fidan.value("add"); // add or edit
const firstName = fidan.value("");
const lastName = fidan.value("");
const personList = fidan.array<{
  id: any;
  firstName: typeof firstName;
  lastName: typeof lastName;
}>([]);

// Reactive updating
const fullName = fidan.compute(
  () => {
    return firstName() + " " + lastName();
  },
  firstName,
  lastName
);

const buttonText = fidan.compute(() => {
  return formMode() === "add" ? "Add" : "Update";
}, formMode);

fidan.compute(() => {
  if (formMode() === "add") {
    firstName("");
    lastName("");
    personId = null;
    const firstInput = document.querySelector(".app input") as HTMLInputElement;
    firstInput && firstInput.focus();
  }
}, formMode);

const personDataRowClass = person =>
  fidan.compute(() => {
    return personId === person.id ? "edit-row" : "";
  }, formMode);

// UI Actions
const submitPerson = e => {
  e.preventDefault();
  if (formMode() === "add") {
    personList().push({
      id: Math.random()
        .toString(36)
        .substr(2),
      firstName: fidan.value(firstName()),
      lastName: fidan.value(lastName())
    });
  } else {
    var person = personList().find(person => person.id == personId);
    person.firstName(firstName());
    person.lastName(lastName());
  }
  formMode("add");
};

const removePerson = e => {
  personId = e.currentTarget.parentNode.parentNode.getAttribute("data-id");
  var index = personList().findIndex(person => person.id == personId);
  personList().splice(index, 1);
  formMode("add");
};

const editPerson = e => {
  personId = e.currentTarget.parentNode.parentNode.getAttribute("data-id");
  var person = personList().find(person => person.id == personId);
  firstName(person.firstName());
  lastName(person.lastName());
  formMode("edit");
};

var app = fidan.html`
<div class="app">
    <h3>Person List</h3>
    <form onsubmit="${submitPerson}">
      <label>Name:</label> 
      <input oninput="${e =>
        firstName(e.target.value)}" value="${firstName}" required>
      <br>
      <label>Surname:</label>
      <input oninput="${e =>
        lastName(e.target.value)}" value="${lastName}" required>
      <br>
      <small><i>${fullName}</i></small>
      <br>
      <button type="submit">${buttonText}</button>
    </form>
    <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
        ${fidan.htmlArrayMap(personList, person => {
          return fidan.html`
            <tr data-id="${person.id}" class="${personDataRowClass(person)}" >
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td><a href="#" onclick="${editPerson}"><i class="far fa-edit"></i></a></td>
                <td><a href="#" onclick="${removePerson}"><i class="far fa-trash-alt"></i></a></td>
            </tr>
        `;
        })}
        </tbody>
    </table>
</div>
`;

document.getElementById("main").appendChild(app);
