# 💻 Challenge Alkemy Fullstack - Backend 🚀

## ⚙️ Configuración del Entorno

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### 1. Prerrequisitos 🛠️

Asegúrate de tener instalado lo siguiente:

Node.js (se recomienda la versión LTS)
https://nodejs.org/es/download

XAMPP para la base de datos MySQL.
https://www.apachefriends.org/es/index.html

### 2. Configuración de la Base de Datos con XAMPP

Instala XAMPP (si aún no lo has hecho).

Abre el Panel de Control de XAMPP.

Inicia el módulo MySQL.

### 3. Instalación de Dependencias

Utilizando una consola de comandos
Clona el repositorio:

`git clone https://github.com/marcodromero/challenge-fs-alkemy-server.git`

`cd challenge-fs-alkemy-server`

Instala todas las dependencias del proyecto:
`npm install`

### 4. Configuración de Variables de Entorno

Copia el archivo de ejemplo:
cp .env.example .env

Edita el nuevo archivo .env y completa las credenciales de tu base de datos (por defecto, XAMPP usa root sin contraseña) y otras variables.

### 5. Base de Datos: Migraciones y Seeders 💾

Crea la base de datos (el nombre debe coincidir con DB_NAME en tu archivo .env).
http://localhost/phpmyadmin

### ▶️ Ejecución del Proyecto

Para iniciar el servidor localmente, ejecuta el siguiente comando:
`npm run start`

El servidor estará disponible en http://localhost:[ En el puerto configurado en .env ]