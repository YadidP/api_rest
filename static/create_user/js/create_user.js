document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const messageEl = document.getElementById("message");

    // Validación básica
    if (password !== confirmPassword) {
      messageEl.textContent = "Las contraseñas no coinciden";
      messageEl.className = "message error";
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        messageEl.textContent = `Usuario creado exitosamente! ID: ${data.id}`;
        messageEl.className = "message success";
        // Redirigir después de 2 segundos
        setTimeout(() => (window.location.href = "/login"), 2000);
      } else {
        messageEl.textContent = data.error || "Error al crear el usuario";
        messageEl.className = "message error";
      }
    } catch (error) {
      messageEl.textContent = "Error de conexión con el servidor";
      messageEl.className = "message error";
      console.error("Error:", error);
    }
  });
