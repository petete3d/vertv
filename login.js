import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://jewaryuxrujpsgpoxgoq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...tu_clave_completa...'
);

document.getElementById("btnEntrar").addEventListener("click", async () => {
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
    <p class="ok">🔐 Aquí aparecería tu pantalla de streaming.</p>
    <p style="color:#ccc;">(Netflix, HBO, Spotify, etc.)</p>
  `;
});
