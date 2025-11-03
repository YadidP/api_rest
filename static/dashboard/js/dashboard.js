document.addEventListener("DOMContentLoaded", async () => {
  await loadUsers();

  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "/login";
  });
});

async function loadUsers() {
  try {
    const response = await fetch("/api/users");
    const users = await response.json();

    const tableBody = document.getElementById("usersTableBody");
    tableBody.innerHTML = "";

    if (users.length === 0) {
      tableBody.innerHTML =
        '<tr><td colspan="3">No hay usuarios registrados</td></tr>';
      return;
    }

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>
          <button class="delete-btn" onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    showMessage("Error al cargar usuarios", "error");
    console.error("Error:", error);
  }
}

async function deleteUser(userId) {
  if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

  try {
    const response = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    const result = await response.json();

    if (response.ok) {
      if (result.deleted) {
        showMessage("Usuario eliminado correctamente", "success");
        await loadUsers();
      } else {
        showMessage("El usuario no existe o ya fue eliminado", "error");
      }
    } else {
      showMessage(result.error || "Error al eliminar usuario", "error");
    }
  } catch (error) {
    showMessage("Error de conexión", "error");
    console.error("Error:", error);
  }
}

function showMessage(text, type) {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;

  setTimeout(() => {
    messageEl.className = "message";
    messageEl.textContent = "";
  }, 5000);
}
