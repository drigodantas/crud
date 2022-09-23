(() => {
  const table = document.querySelector(".users-table");
  const modal = document.querySelector(".modal");
  const formOpenModal = document.querySelector(".form-new-user");
  const modalForm = document.querySelector(".modal-form");

  const getUsers = async () => {
    try {
      const dataAPI = await fetch(`https://gorest.co.in/public/v2/users`);
      const data = await dataAPI.json();
      return data;
    } catch (err) {
      showError("Erro ao tentar pegar os dados");
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
      showError("Erro ao tentar exibir os usuários");
    }
  };

  const createButton = (text, callback) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.addEventListener("click", callback);
    button.classList.add("action-buttons");
    return button;
  };

  formOpenModal.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("Criar usuário");
  });

  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const title = document.querySelector(".modal-title");
    const url = "https://gorest.co.in/public/v2/users";

    body = {
      email,
      gender,
      name,
      status,
    };

    if (title.innerText === "Criar usuário") {
      createUser(url, body);
    } else {
      const idUser = document.querySelector(".id-user").innerText;
      editUser(idUser, body);
    }

    closeModal(e);
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

      if (response.status >= 400) {
        throw new Error();
      }

      const tableRow = createTableRow(data);
      table.appendChild(tableRow);
    } catch {
      showError("Erro ao enviar o novo usuário");
    }
  };

  const createTableRow = (user) => {
    const tableRow = document.createElement("tr");
    const tableDataId = document.createElement("td");
    const tableDataName = document.createElement("td");
    const tableDataEmail = document.createElement("td");
    const tableDataButtons = document.createElement("td");
    const deleteButton = createButton("Excluir", () => deleteUser(user.id));
    const editButton = createButton("Editar", () =>
      openModal("Editar usuário", user.id)
    );

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
      showError("Não foi possível deletar");
    }
  };

  const deleteTableRow = (id) => {
    const tableRow = document.getElementById(`${id}`);
    tableRow.remove();
  };

  const editUser = async (id) => {
    try {
      const editedUser = body;

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
      showError("Erro ao editar usuário");
    }
  };

  const editTableRow = (user) => {
    const tableRow = document.getElementById(`${user.id}`).childNodes;
    tableRow[1].innerHTML = user.name;
    tableRow[2].innerHTML = user.email;
  };

  const openModal = (title, id) => {
    modal.classList.add("active");
    hideError();
    const modalTitle = document.querySelector(".modal-title");
    if (id) {
      modalTitle.innerHTML = `${title}: <span class="id-user">${id}</span>`;
    } else {
      modalTitle.innerText = `${title}`;
    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    modal.classList.remove("active");
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");

    const gender = document.querySelector('input[name="gender"]:checked');
    const status = document.querySelector('input[name="status"]:checked');
    name.value = "";
    email.value = "";
    if (gender && status) {
      gender.checked = false;
      status.checked = false;
    }
  };

  const closeButton = document.querySelector(".close-modal-button");
  closeButton.addEventListener("click", (e) => {
    closeModal(e);
  });

  const showError = (err) => {
    const elementError = document.querySelector(".alert-error");
    elementError.innerHTML = `<span>${err}</span>`;
    elementError.classList.remove("inactive");
  };

  const hideError = () => {
    const elementError = document.querySelector(".alert-error");
    elementError.classList.add("inactive");
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(e);
    }
  });

  showUsers();
})();
