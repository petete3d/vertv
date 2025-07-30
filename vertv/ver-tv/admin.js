// admin.js

const supabase = supabase.createClient(
  "https://jewaryuxrujpsgpoxgoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impld2FyeXV4cnVqcHNncG94Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxOTAzOTgsImV4cCI6MjA2NzIyNzk0N30.JkFd0JrKKMGfK64jkFqaAKzN2YApEnj70D5XwJE4Mng"
);

// Registrar cliente nuevo
async function registrarCliente() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const vencimiento = document.getElementById("vencimiento").value;

  if (!email || !password || !vencimiento) {
    alert("Completa todos los campos.");
    return;
  }

  const { error } = await supabase
    .from("usuarios_vertv")
    .insert([{ email, password, estado: "activo", vencimiento }]);

  if (error) {
    alert("❌ Error al registrar: " + error.message);
  } else {
    alert("✅ Cliente registrado correctamente.");
    cargarClientes();
  }
}

// Cambiar estado del cliente
async function cambiarEstado(email, nuevoEstado) {
  await supabase
    .from("usuarios_vertv")
    .update({ estado: nuevoEstado })
    .eq("email", email);

  cargarClientes();
}

// Cargar lista de clientes
async function cargarClientes() {
  const { data, error } = await supabase
    .from("usuarios_vertv")
    .select("*")
    .order("vencimiento", { ascending: true });

  const tabla = document.getElementById("tabla-clientes");
  tabla.innerHTML = "";

  const hoy = new Date();

  data.forEach((cliente) => {
    const vencimiento = new Date(cliente.vencimiento);
    const vencido = vencimiento < hoy;
    const estadoMostrado = vencido ? "suspendido" : cliente.estado;

    tabla.innerHTML += `
      <tr class="${vencido ? "suspendido" : ""}">
        <td>${cliente.email}</td>
        <td>${cliente.vencimiento}</td>
        <td>${estadoMostrado}</td>
        <td>
          <button onclick="cambiarEstado('${cliente.email}', '${cliente.estado === "activo" ? "suspendido" : "activo"}')">
            Cambiar a ${cliente.estado === "activo" ? "suspendido" : "activo"}
          </button>
        </td>
      </tr>
    `;
  });
}

cargarClientes();
