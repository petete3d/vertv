// login.js

const supabase = supabase.createClient(
  "https://jewaryuxrujpsgpoxgoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2NzIyNzk0N30.JkFd0JrKKMGfK64jkFqaAKzN2YApEnj70D5XwJE4Mng"
);

async function iniciarSesion() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  const { data, error } = await supabase
    .from("usuarios_vertv")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    alert("❌ Credenciales incorrectas.");
    return;
  }

  if (data.estado === "suspendido") {
    alert("🚫 Su cuenta está suspendida. Contacte al administrador.");
    return;
  }

  const hoy = new Date();
  const fechaVencimiento = new Date(data.vencimiento);

  if (fechaVencimiento < hoy) {
    alert("⚠️ Su cuenta está vencida.");
    return;
  }

  // Guardar datos en localStorage para usar después si es necesario
  localStorage.setItem("usuario_email", data.email);

  // Redirigir a la pantalla principal del cliente
  window.location.href = "panta_cliente.html";
}
