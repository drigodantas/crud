const table = document.querySelector(".users-table");
const form = document.querySelector(".form");

const users = async function getUsers() {
  const dataAPI = await fetch(`https://gorest.co.in/public/v2/users`);
  const data = await dataAPI.json();
  return data;
};

async function showUsers() {
  const usuarios = await users();

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
  tr.appendChild(tdId);
  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(tdButtons);
  tdId.innerHTML = user.id;
  tdName.innerHTML = user.name;
  tdEmail.innerHTML = user.email;
  tdButtons.innerHTML = `<input type="submit" value="Editar" src="https://gorest.co.in/public/v2/users/${user.id}"  />`;
  tdButtons.innerHTML += `<input type="submit" value="Excluir" src="https://gorest.co.in/public/v2/users/${user.id}"  />`;

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
  const tr = createTr(body);
  table.appendChild(tr);
});

async function createUser(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
    },
    body: JSON.stringify(data),
  });
  return response.JSON;
}

showUsers();
