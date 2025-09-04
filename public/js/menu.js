document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userData from localStorage:", userData);
  if (!userData) {
    window.location.href = "login.html";
    return;
  }

  const panelTitle = document.getElementById("panelTitle");
  const inicioContent = document.getElementById("inicio-content");
  const dynamicContent = document.getElementById("dynamic-content");
  const notificationBadge = document.getElementById("notificationBadge");

  // --- TRANSLATIONS ---
  const translations = {
    es: {
      "To Do List Dashboard": "Dashboard To Do List",
      "Mi Perfil": "Mi Perfil",
      "Configuración": "Configuración",
      "Cerrar Sesión": "Cerrar Sesión",
      "Inicio": "Inicio",
      "Usuarios": "Usuarios",
      "Ver usuarios": "Ver usuarios",
      "Tareas": "Tareas",
      "Ver tareas": "Ver tareas",
      "Nueva tarea": "Nueva tarea",
      "Config": "Config",
      "Salir": "Salir",
      "Panel de Información": "Panel de Información",
      "¡Bienvenido al dashboard!": "¡Bienvenido al dashboard!",
      "Aquí podrás gestionar usuarios y tareas del sistema.": "Aquí podrás gestionar usuarios y tareas del sistema.",
      "Utiliza el menú lateral para navegar entre las diferentes secciones del sistema.": "Utiliza el menú lateral para navegar entre las diferentes secciones del sistema.",
      "Configuración del Sistema": "Configuración del Sistema",
      "General": "General",
      "Modo oscuro": "Modo oscuro",
      "Idioma": "Idioma",
      "Cancelar": "Cancelar",
      "Guardar cambios": "Guardar cambios",
    },
    en: {
      "To Do List Dashboard": "To Do List Dashboard",
      "Mi Perfil": "My Profile",
      "Configuración": "Settings",
      "Cerrar Sesión": "Logout",
      "Inicio": "Home",
      "Usuarios": "Users",
      "Ver usuarios": "View Users",
      "Tareas": "Tasks",
      "Ver tareas": "View Tasks",
      "Nueva tarea": "New Task",
      "Config": "Config",
      "Salir": "Exit",
      "Panel de Información": "Information Panel",
      "¡Bienvenido al dashboard!": "Welcome to the dashboard!",
      "Aquí podrás gestionar usuarios y tareas del sistema.": "Here you can manage users and tasks of the system.",
      "Utiliza el menú lateral para navegar entre las diferentes secciones del sistema.": "Use the side menu to navigate between the different sections of the system.",
      "Configuración del Sistema": "System Settings",
      "General": "General",
      "Modo oscuro": "Dark Mode",
      "Idioma": "Language",
      "Cancelar": "Cancel",
      "Guardar cambios": "Save Changes",
    },
  };

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.dataset.translate;
      element.textContent = translations[lang][key];
    });
  }

  const languageSelect = document.getElementById("languageSelect");
  languageSelect.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("language", lang);
    setLanguage(lang);
  });

  const savedLanguage = localStorage.getItem("language") || "es";
  languageSelect.value = savedLanguage;
  setLanguage(savedLanguage);

  // --- DARK MODE ---
  const darkModeToggle = document.getElementById("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let darkMode = localStorage.getItem("darkMode") === "true";

  if (localStorage.getItem("darkMode") === null && prefersDark) {
    darkMode = true;
  }
  
  darkModeToggle.checked = darkMode;
  document.body.classList.toggle("dark-mode", darkMode);

  darkModeToggle.addEventListener("change", function () {
    localStorage.setItem("darkMode", this.checked);
    document.body.classList.toggle("dark-mode", this.checked);
    showToast(`Modo oscuro ${this.checked ? "activado" : "desactivado"}.`, "info");
  });

  // --- NAVEGACIÓN ---
  const sidebarLinks = document.querySelectorAll(".sidebar__link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      sidebarLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
      handleSectionChange(this.dataset.section);
    });
  });

  function handleSectionChange(section) {
    inicioContent.style.display = "none";
    dynamicContent.style.display = "block";

    switch (section) {
      case "inicio":
        panelTitle.textContent = "Panel de Información";
        inicioContent.style.display = "block";
        dynamicContent.style.display = "none";
        break;
      case "usuarios":
        panelTitle.innerHTML = '<i class="fas fa-users me-2"></i>Gestión de Usuarios';
        loadUsersContent();
        break;
      case "tareas":
        panelTitle.innerHTML = '<i class="fas fa-list me-2"></i>Lista de Tareas';
        loadTasksContent();
        break;
      case "nueva-tarea":
        panelTitle.innerHTML = '<i class="fas fa-plus me-2"></i>Nueva Tarea';
        loadNewTaskContent();
        break;
    }
  }

  // --- CARGA DE CONTENIDO DINÁMICO ---
  async function loadUsersContent() {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const users = await response.json();
      let tableBody = users.map(user => `
        <tr>
          <td>${user.id}</td>
          <td>${user.nombre}</td>
          <td>${user.email}</td>
          <td><span class="badge bg-success">Activo</span></td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-1" title="Editar">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" title="Eliminar">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join("");

      dynamicContent.innerHTML = `
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="table-dark">
              <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Estado</th><th>Acciones</th></tr>
            </thead>
            <tbody>${tableBody}</tbody>
          </table>
        </div>`;
    } catch (error) {
      dynamicContent.innerHTML = '<p class="text-danger">Error al cargar los usuarios.</p>';
      console.error(error);
    }
  }

  async function loadTasksContent() {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${userData.id}/tareas`);
        const tasks = await response.json();
        notificationBadge.textContent = tasks.length;

        let tasksHtml = tasks.map(task => `
            <div class="col-md-4 mb-3">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h6 class="mb-0">${task.titulo}</h6>
                        <span class="badge bg-${task.estado === 'completada' ? "success" : "warning"}">${task.estado}</span>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${task.descripcion}</p>
                        <button class="btn btn-sm btn-outline-success me-1" onclick="toggleTaskStatus(${task.id}, '${task.estado}')">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

        dynamicContent.innerHTML = `<div class="row">${tasksHtml || "<p>No tienes tareas asignadas.</p>"}</div>`;
    } catch (error) {
        dynamicContent.innerHTML = '<p class="text-danger">Error al cargar las tareas.</p>';
        console.error(error);
    }
}

  function loadNewTaskContent() {
    dynamicContent.innerHTML = `
      <form class="row g-3" id="newTaskForm">
        <div class="col-12">
          <label for="taskTitle" class="form-label">Título de la tarea</label>
          <input type="text" class="form-control" id="taskTitle" required>
        </div>
        <div class="col-12">
          <label for="taskDescription" class="form-label">Descripción</label>
          <textarea class="form-control" id="taskDescription" rows="4"></textarea>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            <i class="fas fa-plus me-2"></i>Crear Tarea
          </button>
        </div>
      </form>`;
    
    document.getElementById("newTaskForm").addEventListener("submit", createTask);
  }

  // --- ACCIONES CRUD ---
  async function createTask(e) {
      e.preventDefault();
      const title = document.getElementById("taskTitle").value;
      const description = document.getElementById("taskDescription").value;

      try {
          const response = await fetch("http://localhost:3000/tareas", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  titulo: title,
                  descripcion: description,
                  usuario_id: userData.id
              })
          });
          const result = await response.json();
          if (response.ok) {
              showToast("Tarea creada con éxito.", "success");
              handleSectionChange("tareas");
          } else {
              showToast(result.message || "Error al crear la tarea.", "danger");
          }
      } catch (error) {
          console.error(error);
          showToast("Error de conexión al crear la tarea.", "danger");
      }
  }

  window.toggleTaskStatus = async function(taskId, currentStatus) {
      const newStatus = currentStatus === 'completada' ? 'pendiente' : 'completada';
      try {
          const response = await fetch(`http://localhost:3000/tareas/${taskId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ estado: newStatus })
          });
          if (response.ok) {
              showToast("Estado de la tarea actualizado.", "success");
              loadTasksContent();
          } else {
              showToast("No se pudo actualizar el estado de la tarea.", "danger");
          }
      } catch (error) {
          console.error(error);
          showToast("Error de conexión al actualizar la tarea.", "danger");
      }
  }

  window.deleteTask = async function(taskId) {
      if (confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
          try {
              const response = await fetch(`http://localhost:3000/tareas/${taskId}`, {
                  method: "DELETE"
              });
              if (response.ok) {
                  showToast("Tarea eliminada.", "success");
                  loadTasksContent();
              } else {
                  showToast("No se pudo eliminar la tarea.", "danger");
              }
          } catch (error) {
              console.error(error);
              showToast("Error de conexión al eliminar la tarea.", "danger");
          }
      }
  }

  // --- UTILIDADES ---
  window.logout = function() {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      localStorage.removeItem("userData");
      showToast("Cerrando sesión...", "info");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  };

  window.saveConfig = function() {
    const modal = bootstrap.Modal.getInstance(document.getElementById("configModal"));
    modal.hide();
    showToast("Configuración guardada correctamente.", "success");
  };

  function showToast(message, type = "success") {
    const toast = document.getElementById("mainToast");
    const toastBody = document.getElementById("toastBody");
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toastBody.textContent = message;
    new bootstrap.Toast(toast).show();
  }
  
  // Carga inicial
  handleSectionChange("inicio");
});
