# Proyecto 2: API REST CRUD de Usuarios en Render

Este repositorio contiene la implementación de una API Backend construida con Node.js y Express, conectada a una base de datos PostgreSQL alojada en Render.

## Enlaces del Servicio
* **URL de la API:** `https://crud-usuarios-p01l.onrender.com/usuarios`

---

## Pasos de Implementación

### Paso 1: Creación de la Base de Datos PostgreSQL
Se creó una instancia de PostgreSQL en Render con plan gratuito y se obtuvo la variable de conexión `DATABASE_URL`.

![1](docs/Captura-db1.png)

![2](docs/Captura-db2.png)


### Paso 2: Desarrollo del Servidor Backend (`server.js`)
Se programaron las operaciones CRUD completas en Node.js (GET, POST, PUT, DELETE) y la inicialización automática de la tabla `usuarios`.

![3](docs/Captura-js1.png)

![4](docs/Captura-js2.png)


### Paso 3: Configuración del `package.json`
Se configuró el archivo `package.json` especificando las dependencias (`express`, `pg`) y el comando de arranque `"start": "node server.js"`.

![5](docs/Captura-package.png)

### Paso 4: Creación del repositorio
Iniciaremos el control de versiones con Git y se subieron los archivos al repositorio remoto en GitHub.

![6](docs/Captura-GitHub.png)

### Paso 5: Despliegue como Web Service en Render
Se creó un **Web Service** en Render conectando el repositorio, configurando el comando de inicio y enlazando la variable de entorno de PostgreSQL.

![7](docs/Captura-Render-1.png)

![8](docs/Captura-Render.2.png)

![9](docs/Captura-Render-3.png)

### Paso 6: Pruebas de Funcionamiento de la API
Se validó la lectura y creación de datos realizando peticiones a los endpoints del servicio. Para la validación utilizamos PostMan.

![10](docs/Captura-Live.png)

![11](docs/Captura-Postman.png)

![12](docs/Captura-Web.png)