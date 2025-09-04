document.addEventListener("DOMContentLoaded", function () {
  // Mostrar alert de bienvenida después de 1 segundo
  setTimeout(function () {
    const welcomeAlert = document.getElementById("welcomeAlert");
    if (welcomeAlert) {
      welcomeAlert.classList.add("show");
    }
  }, 1000);

  // Toggle para mostrar/ocultar contraseña
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const type =
        passwordInput.type === "password" ? "text" : "password";
      passwordInput.type = type;

      const icon = this.querySelector("i");
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }

  // Validación y envío del formulario de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      let isValid = true;

      // Validar email
      if (!emailInput.value || !emailInput.checkValidity()) {
        emailInput.classList.add("is-invalid");
        isValid = false;
      } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
      }

      // Validar contraseña
      if (!passwordInput.value || passwordInput.value.length < 6) {
        passwordInput.classList.add("is-invalid");
        isValid = false;
      } else {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
      }

      if (isValid) {
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailInput.value,
              password: passwordInput.value,
            }),
          });

          const result = await response.json();

          if (response.ok) {
            showToast("¡Inicio de sesión exitoso!", "success");
            // Guardar datos del usuario en localStorage
            localStorage.setItem("userData", JSON.stringify(result.user));
            
            setTimeout(function () {
              window.location.href = "menu.html";
            }, 1500);
          } else {
            showToast(result.message || "Error en el inicio de sesión.", "danger");
            emailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
          }
        } catch (error) {
          console.error("Error en el fetch:", error);
          showToast("No se pudo conectar con el servidor.", "danger");
        }
      } else {
        showToast("Por favor corrige los errores en el formulario.", "danger");
      }
    });
  }

  // Formulario de creación de cuenta
  const createAccountForm = document.getElementById("createAccountForm");
  if (createAccountForm) {
    createAccountForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("createUsername");
      const passwordInput = document.getElementById("createPassword");
      let isValid = true;

      // Validar email
      if (!emailInput.value || !emailInput.checkValidity()) {
        emailInput.classList.add("is-invalid");
        isValid = false;
      } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
      }

      // Validar contraseña
      if (!passwordInput.value || passwordInput.value.length < 6) {
        passwordInput.classList.add("is-invalid");
        isValid = false;
      } else {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
      }

      if (isValid) {
        try {
          const response = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailInput.value,
              password: passwordInput.value,
            }),
          });

          const result = await response.json();

          if (response.ok) {
            showToast("¡Cuenta creada con éxito!", "success");
            const modalElement = document.getElementById("createAccountModal");
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              modal.hide();
            }
          } else {
            showToast(result.message || "Error al crear la cuenta.", "danger");
          }
        } catch (error) {
          console.error("Error en el fetch:", error);
          showToast("No se pudo conectar con el servidor.", "danger");
        }
      } else {
        showToast("Por favor corrige los errores en el formulario.", "danger");
      }
    });
  }

  // Formulario de recuperación de contraseña
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const modalElement = document.getElementById("forgotPasswordModal");
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
      showToast("Enlace de recuperación enviado a tu correo.", "info");
    });
  }

  // Función para mostrar toast
  function showToast(message, type = "success") {
    const toastEl = document.getElementById("notificationToast");
    const toastMessage = document.getElementById("toastMessage");
    if (toastEl && toastMessage) {
      toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
      toastMessage.textContent = message;
      const bsToast = new bootstrap.Toast(toastEl);
      bsToast.show();
    }
  }
});
