create database to_do_list; 
use to_do_list; 

CREATE TABLE usuarios 
( id INT AUTO_INCREMENT PRIMARY KEY, 
nombre VARCHAR(100) NOT NULL, 
email VARCHAR(150) UNIQUE NOT NULL, 
password VARCHAR(255) NOT NULL );

CREATE TABLE tareas 
( id INT AUTO_INCREMENT PRIMARY KEY, 
titulo VARCHAR(200) NOT NULL, 
descripcion TEXT, 
estado ENUM('pendiente','completada') DEFAULT 'pendiente', 
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
fecha_limite DATE, 
usuario_id INT, 
FOREIGN KEY (usuario_id) REFERENCES usuarios(id) );

INSERT INTO usuarios 
(nombre, email, password) 
VALUES ('Dani', 'user1@example.com', '1234'), 
('Ramiro', 'user2@example.com', '1234'), 
('Chelo', 'user3@example.com', '1234'), 
('José Antonio', 'user4@example.com', '1234'), 
('Vera', 'user5@example.com', '1234'), 
('Eva', 'user6@example.com', '1234'), 
('Beatriz', 'user7@example.com', '1234'), 
('Guillermo', 'user8@example.com', '1234'), 
('María Fernanda', 'user9@example.com', '1234'), 
('Anunciación', 'user10@example.com', '1234'), 
('Pablo', 'user11@example.com', '1234'), 
('Camila', 'user12@example.com', '1234'), 
('Esteban', 'user13@example.com', '1234'), 
('Natalia', 'user14@example.com', '1234'), 
('Joaquín', 'user15@example.com', '1234'), 
('Sol', 'user16@example.com', '1234'), 
('Marcos', 'user17@example.com', '1234'), 
('Carla', 'user18@example.com', '1234'), 
('Andrés', 'user19@example.com', '1234'), 
('Lucía', 'user20@example.com', '1234');

INSERT INTO tareas 
(titulo, descripcion, fecha_limite, usuario_id) 
VALUES 
('Preparar informe semanal', 'Hacer el resumen de actividades de la oficina', '2025-09-15', 1), 
('Comprar café', 'Pasar por el súper y traer café para la casa', '2025-09-10', 1), 
('Organizar papeles de la oficina', 'Revisar y archivar documentos', '2025-08-25', 1), 
('Revisar correos pendientes', 'Responder los mails urgentes', '2025-08-22', 2), 
('Llamar a proveedor', 'Confirmar pedido de materiales', '2025-09-01', 2), 
('Actualizar agenda personal', 'Organizar citas y reuniones', '2025-09-05', 2), 
('Hacer limpieza de la computadora', 'Eliminar archivos innecesarios', '2025-09-08', 3), 
('Escribir lista de compras', 'Armar lista para el súper', '2025-08-30', 3), 
('Pagar servicio de internet', 'Hacer el pago online', '2025-08-20', 3), 
('Revisar contrato del cliente', 'Leer y verificar cláusulas', '2025-09-02', 4), 
('Enviar cotización', 'Mandar propuesta al cliente', '2025-08-28', 4), 
('Llamar al banco', 'Consultar saldo y movimientos', '2025-09-03', 4), 
('Leer capítulo del libro pendiente', 'Continuar con la novela', '2025-08-21', 5), 
('Comprar regalo de cumpleaños', 'Buscar algo especial', '2025-08-25', 5), 
('Preparar almuerzo saludable', 'Planear menú de la semana', '2025-08-29', 5);