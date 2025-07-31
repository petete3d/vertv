// registro.js

const supabase = window.supabase.createClient(
  "https://jewaryuxrujpsgpoxgoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2Nzc2NjM5OH0.JeuKtSCHqWmu9JsWFr1O0fzdQMnoqH7bDYX2Qkcr2Mk"
);

async function registrarNuevoCliente() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Por favor, completa ambos campos.");
    return;
  }

  // Verificar si ya existe ese email
  const { data: existente, error: errorVerificar } = await supabase
    .from("usuarios_vertv")
    .select("email")
    .eq("email", email);

  if (errorVerificar) {
    alert("Error al verificar el email: " + errorVerificar.message);
    return;
  }

  if (existente.length > 0) {
    alert("❌ Este correo ya está registrado.");
    return;
  }

  // Calcular fecha de vencimiento (30 días desde hoy)
  const hoy = new Date();
  const vencimiento = new Date(hoy.setDate(hoy.getDate() + 30)).toISOString();

  // Insertar en la tabla
  const { error } = await supabase
    .from("usuarios_vertv")
    .insert([
      {
        email,
        password,
        estado: "activo",
        vencimiento
      }
    ]);

  if (error) {
    alert("Error al registrar: " + error.message);
  } else {
    alert("✅ Registro exitoso. Inicia sesión.");
    window.location.href = "login.html";
  }
}
