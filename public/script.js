const API_BASE = '/api/register'; //la API está en el mismo host (servida por express)
const API_URL = '/api/register';

// cargar registros al iniciar
document.addEventListener("DOMContentLoaded", loadRegister);

async function loadRegister() {
    try {
        const res = await fetch(API_URL);
        const register = await res.json();
        renderRegister(register);
    } catch (err) {
        console.error("Error cargando registros", err);
    }
}

// renderizar registros en la tabla
function renderRegister(register) {
    const tbody = document.getElementById("userTableBody");
    tbody.innerHTML = '';

    register.forEach(register => {        
        tbody.innerHTML += `
            <tr>
                <td>${register.id}</td>
                <td>${register.customer_name}</td>
                <td>${register.identification_number}</td>
                <td>${register.address}</td>
                <td>${register.phone}</td>
                <td>${register.email}</td>
                <td>${register.platform_used}</td>
                <td>${register.invoice_number}</td>
                <td>${register.billing_period}</td>
                <td>${register.invoiced_amount}</td>
                <td>${register.transaction_type}</td>
                <td>${register.transaction_id}</td>
                <td>${register.transaction_amount}</td>
                <td>${register.transaction_status}</td>
                <td>${register.transaction_date}</td>
                <td>${register.transaction_time}</td>
                <td>${register.amount_paid}</td>
    
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editRegister(${register.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${register.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });    
}

// crear o actualizar registro
document.getElementById("userForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("register.id").value;      // revisar si es regidtre.id o registerId----------------------------------------------
    const customer_name = document.getElementById("customer_name").value.trim();
    const identification_number = document.getElementById("identification_number").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const platform_used = document.getElementById("platform_used").value.trim();
    const invoice_number = document.getElementById("invoice_number").value.trim();
    const billing_period = document.getElementById("billing_period").value.trim();
    const invoiced_amount = document.getElementById("invoiced_amount").value.trim();
    const transaction_type = document.getElementById("transaction_type").value.trim();
    const transaction_id = document.getElementById("transaction_id").value.trim();
    const transaction_amount = document.getElementById("transaction_amount").value.trim();
    const transaction_status = document.getElementById("transaction_status").value.trim();
    const transaction_date = document.getElementById("transaction_date").value.trim();
    const transaction_time = document.getElementById("transaction_time").value.trim();
    const phoamount_paidne = document.getElementById("amount_paid").value.trim();
    

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customer_name, identification_number, address, phone, email, platform_used,
            incoice_number, billing_period, invoiced_amount, transaction_type, transaction_id, transaction_amount, 
            transaction_status, transaction_date, transaction_time, amount_paid })
        });
        resetForm();
        loadRegister();
    } catch (err) {
        console.error("Error guardando registro:", err);
    }
});

// editar registro
async function editRegister(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        const user = await res.json();

        document.getElementById("registerId").value = user.id;
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("age").value = user.age;
        document.getElementById("addres").value = user.addres;
        document.getElementById("gender").value = user.gender;
        document.getElementById("phone").value = user.phone;
        document.getElementById("phone").value = user.phone;
        document.getElementById("phone").value = user.phone;
        document.getElementById("phone").value = user.phone;
        document.getElementById("phone").value = user.phone;
        document.getElementById("phone").value = user.phone;
        document.getElementById("phone").value = user.phone;

        document.getElementById("submitBtn").textContent = "Actualizar";
    } catch (err) {
        console.error("Error obteniendo usuario:", err);
    }
}


// eliminar usuario
async function deleteUser(id) {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadRegister();
    } catch (err) {
        console.error("Error eliminando usuario:", err);
    }
}

// resetear formulario
document.getElementById("resetBtn").addEventListener("click", resetForm);
function resetForm() {
    document.getElementById("userId").value = "";
    document.getElementById("userForm").reset();
    document.getElementById("submitBtn").textContent = "Crear";
}

