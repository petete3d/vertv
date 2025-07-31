// cambiar_clave.js

const supabase = supabase.createClient(
  "https://jewaryuxrujpsgpoxgoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2NzIyNzk0N30.JkFd0JrKKMGfK64jkFqaAKzN2YApEnj70D5XwJE4Mng"
);

async function cambiarClave() {
  const email = document.getElementById("email").value.trim();
  const nuevaClave = document.getElementById("nueva_clave").value.trim();

  if (!email || !nuevaClave) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  // Verificar si el correo existe
  const { data, error: errorConsulta } = await supabase
    .from("usuarios_vertv")
    .select("*")
    .eq("email", email);

  if (errorConsulta || data.length === 0) {
    alert("❌ Correo no encontrado.");
    return;
  }

  // Actualizar contraseña
  const { error: errorUpdate } = await supabase
    .from("usuarios_vertv")
    .update({ password: nuevaClave })
    .eq("email", email);

  if (errorUpdate) {
    alert("❌ Error al cambiar clave: " + errorUpdate.message);
  } else {
    alert("✅ Contraseña actualizada correctamente.");
    window.location.href = "login.html";
  }
}
