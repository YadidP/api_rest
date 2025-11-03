document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.textContent = `Bienvenido, ${data.username}!`;
      messageEl.className = "message success";
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } else {
      messageEl.textContent = data.error || "Error desconocido";
      messageEl.className = "message error";
    }
  } catch (error) {
    messageEl.textContent = "Error de conexión";
    messageEl.className = "message error";
    console.error("Error:", error);
  }
});
