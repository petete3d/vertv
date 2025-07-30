// panta_cliente.js

const supabase = supabase.createClient(
  "https://jewaryuxrujpsgpoxgoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2NzIyNzk0N30.JkFd0JrKKMGfK64jkFqaAKzN2YApEnj70D5XwJE4Mng"
);

async function verificarAcceso() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const resultado = document.getElementById("resultado");

  if (!email || !password) {
    resultado.innerHTML = '<p class="bloqueado">❗ Ingresa tus datos completos.</p>';
    return;
  }

  const { data, error } = await supabase
    .from("usuarios_vertv")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    resultado.innerHTML = '<p class="bloqueado">❌ Usuario o contraseña inválidos.</p>';
    return;
  }

  const hoy = new Date().toISOString().split("T")[0];
  if (data.estado !== 'activo' || data.vencimiento < hoy) {
    resultado.innerHTML = '<p class="bloqueado">🚫 Tu acceso ha sido suspendido por falta de pago.</p>';
    return;
  }

  resultado.innerHTML = `
    <p class="ok">✅ Bienvenido, tu cuenta está activa.</p>
    <p class="ok">🎥 Aquí aparecería tu pantalla de streaming (Netflix, HBO, etc).</p>
  `;
}
