const table = document.querySelector(".users-table");
const form = document.querySelector(".form-new-user");
const deleteButton = document.querySelector(".delete-button");

const getUsers = async () => {
  const dataAPI = await fetch(`https://gorest.co.in/public/v2/users`);
  const data = await dataAPI.json();
  return data;
};

async function showUsers() {
  const usuarios = await getUsers();

  usuarios.forEach((element) => {
    const tr = createTr(element);
    table.appendChild(tr);
  });
}

function createTr(user) {
  const tr = document.createElement("tr");
  const tdId = document.createElement("td");
  const tdName = document.createElement("td");
  const tdEmail = document.createElement("td");
  const tdButtons = document.createElement("td");
  tr.setAttribute("id", user.id);
  tr.appendChild(tdId);
  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(tdButtons);
  tdId.innerHTML = user.id;
  tdName.innerHTML = user.name;
  tdEmail.innerHTML = user.email;
  tdButtons.innerHTML = `<input type="submit" onclick="editUser(${user.id})" value="Editar" src="https://gorest.co.in/public/v2/users/${user.id}"  />`;
  tdButtons.innerHTML += `<input type="submit" onclick="deleteUser(${user.id})" class="delete-button" value="Excluir" src="https://gorest.co.in/public/v2/users/${user.id}"  />`;

  return tr;
}

form.addEventListener("click", (e) => {
  e.preventDefault();
  const url = "https://gorest.co.in/public/v2/users";
  const nome = window.prompt("Name");
  const email = window.prompt("Email");
  const gender = window.prompt("Genero");

  body = {
    name: nome,
    email: email,
    gender: gender,
    status: "active",
  };

  createUser(url, body);
});

async function createUser(url, user) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  const tr = createTr(data);
  console.log(data, "data");
  table.appendChild(tr);
  return response.JSON;
}

async function deleteUser(id) {
  const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
    },
    body: null,
  });

  const data = response.json;
  console.log(data);
  deleteTr(id);
}

function deleteTr(id) {
  const tr = document.getElementById(`${id}`);
  tr.remove();
}

async function editUser(id) {
  const name = window.prompt("Mudar nome:");
  const email = window.prompt("Mudar email:");
  const gender = window.prompt("Mudar gênero:");

  const editedUser = { id: id, name: name, email: email, gender: gender };

  const response = await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
    },
    body: JSON.stringify(editedUser),
  });

  changeTr(editedUser);
  const data = await response.json();
  console.log(data);
  return data;
}

function changeTr(user) {
  console.log(user);
  const tr = document.getElementById(`${user.id}`).childNodes;
  tr[1].innerHTML = user.name;
  tr[2].innerHTML = user.email;
}

showUsers();
