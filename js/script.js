(() => {
  const table = document.querySelector(".users-table");
  const form = document.querySelector(".form-new-user");

  const getUsers = async () => {
    try {
      const dataAPI = await fetch(`https://gorest.co.in/public/v2/users`);
      const data = await dataAPI.json();
      return data;
    } catch (err) {
      alert("Erro ao tentar pegar os dados");
    }
  };

  const showUsers = async () => {
    try {
      const users = await getUsers();
      users.forEach((user) => {
        const tableRow = createTableRow(user);
        table.appendChild(tableRow);
      });
    } catch (err) {
      alert("Erro ao tentar exibir os usuários");
    }
  };

  const createButton = (text, callback) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", callback);
    return button;
  };

  const createTableRow = (user) => {
    const tableRow = document.createElement("tr");
    const tableDataId = document.createElement("td");
    const tableDataName = document.createElement("td");
    const tableDataEmail = document.createElement("td");
    const tableDataButtons = document.createElement("td");
    const deleteButton = createButton("Excluir", () => deleteUser(user.id));
    const editButton = createButton("Editar", () => editUser(user.id));

    tableRow.setAttribute("id", user.id);
    tableRow.appendChild(tableDataId);
    tableRow.appendChild(tableDataName);
    tableRow.appendChild(tableDataEmail);
    tableRow.appendChild(tableDataButtons);
    tableDataId.innerHTML = user.id;
    tableDataName.innerHTML = user.name;
    tableDataEmail.innerHTML = user.email;
    tableDataButtons.appendChild(editButton);
    tableDataButtons.appendChild(deleteButton);

    return tableRow;
  };

  form.addEventListener("click", (e) => {
    e.preventDefault();
    const url = "https://gorest.co.in/public/v2/users";
    const name = window.prompt("Name");
    const email = window.prompt("Email");
    const gender = window.prompt("Genero");

    body = {
      email,
      gender,
      name,
      status: "active",
    };

    createUser(url, body);
  });

  const createUser = async (url, user) => {
    try {
      const response = await fetch(url, {
        body: JSON.stringify(user),
        headers: {
          Authorization:
            "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = await response.json();
      const tableRow = createTableRow(data);
      table.appendChild(tableRow);
    } catch {
      alert("Erro ao enviar o novo usuário");
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: {
          Authorization:
            "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });

      deleteTableRow(id);
    } catch {
      alert("Não foi possível deletar");
    }
  };

  const deleteTableRow = (id) => {
    const tableRow = document.getElementById(`${id}`);
    tableRow.remove();
  };

  const editUser = async (id) => {
    try {
      const name = window.prompt("Mudar nome:");
      const email = window.prompt("Mudar email:");
      const gender = window.prompt("Mudar gênero:");

      const editedUser = { email, gender, name };

      const response = await fetch(
        `https://gorest.co.in/public/v2/users/${id}`,
        {
          body: JSON.stringify(editedUser),
          headers: {
            Authorization:
              "Bearer ea59334639144498e128e9d3d24ee9f38ddd79f30c9d3d4c8f6e3e4c22ef2623",
            "Content-Type": "application/json",
          },
          method: "PUT",
        }
      );

      const data = await response.json();
      editTableRow(data);
      return data;
    } catch {
      alert("Erro ao editar usuário");
    }
  };

  const editTableRow = (user) => {
    const tableRow = document.getElementById(`${user.id}`).childNodes;
    tableRow[1].innerHTML = user.name;
    tableRow[2].innerHTML = user.email;
  };

  showUsers();
})();
