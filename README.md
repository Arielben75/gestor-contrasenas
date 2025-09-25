# Gestor de Contraseñas

Sistema de gestión de contraseñas seguro desarrollado con NestJS y Prisma, que permite a los usuarios almacenar y administrar sus credenciales de forma segura.

## 🔗 Repositorio

[GitHub - Gestor de Contraseñas](https://github.com/Arielben75/gestor-contrasenas.git)

## 🚀 Funcionalidad Principal

El sistema ofrece las siguientes características principales:

- **Gestión de Usuarios**: Registro y autenticación de usuarios con validación de contraseñas seguras.
- **Almacenamiento Seguro**: Cifrado de contraseñas utilizando técnicas avanzadas de criptografía.
- **Contraseña Maestra**: Sistema de protección mediante contraseña maestra para acceder a las credenciales almacenadas.
- **CRUD de Contraseñas**: Funcionalidades completas para crear, leer, actualizar y eliminar contraseñas almacenadas.
- **Búsqueda**: Capacidad de buscar contraseñas almacenadas por diferentes criterios.

## 🛠️ Tecnologías Empleadas

### Backend

- **NestJS**: Framework de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.
- **TypeScript**: Lenguaje de programación tipado que mejora la calidad y mantenibilidad del código.
- **Prisma**: ORM moderno para Node.js y TypeScript que facilita el acceso y manipulación de la base de datos.
- **SQLite**: Base de datos relacional ligera utilizada para almacenar la información.

### Seguridad

- **JWT (JSON Web Tokens)**: Para la autenticación y autorización de usuarios.
- **libsodium-wrappers**: Biblioteca criptográfica para el cifrado seguro de contraseñas.
- **bcrypt**: Para el hash seguro de contraseñas maestras.
- **crypto (Node.js)**: Módulo nativo para operaciones criptográficas adicionales.

### Características Adicionales

- **Swagger**: Documentación automática de la API REST.
- **Compression**: Middleware para comprimir las respuestas HTTP.
- **Class Validator**: Para la validación de DTOs y datos de entrada.
- **Class Transformer**: Para la transformación de objetos y serialización.

## 🏗️ Estructura del Proyecto

```
├── src/
│   ├── modules/
│   │   ├── auth/           # Autenticación y gestión de contraseñas
│   │   └── usuarios/       # Gestión de usuarios
│   ├── configurations/     # Configuraciones del sistema
│   ├── database/          # Configuración de la base de datos
│   ├── decorators/        # Decoradores personalizados
│   ├── dto/              # Objetos de transferencia de datos
│   ├── interceptors/     # Interceptores para el formateo de respuestas
│   └── pipes/           # Pipes para validación
├── prisma/
│   └── schema.prisma    # Esquema de la base de datos
└── test/               # Pruebas e2e
```

## 🔒 Características de Seguridad

- Cifrado de contraseñas usando PBKDF2 y secretbox de libsodium
- Validación robusta de contraseñas
- Protección contra ataques CSRF y XSS
- Sistema de tokens JWT para autenticación
- Sanitización de datos de entrada

## 🚀 Cómo Empezar

1. Clonar el repositorio:

```bash
git clone https://github.com/Arielben75/gestor-contrasenas.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar las variables de entorno (crear archivo .env)

4. Ejecutar las migraciones de Prisma:

```bash
npx prisma migrate dev
```

5. Iniciar la aplicación:

```bash
npm run start:dev
```

## 📝 Endpoints Principales

- `POST /auth/login`: Autenticación de usuarios
- `POST /auth/agregar-password`: Agregar nueva contraseña
- `POST /auth/ver-passwords`: Ver contraseñas almacenadas
- `POST /auth/buscar-passwords`: Buscar contraseñas específicas
- `POST /auth/cambiar-password-master`: Cambiar contraseña maestra
- `DELETE /auth/passwords/:id`: Eliminar una contraseña

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de actualizar las pruebas según corresponda.

## 📄 Licencia

[MIT](https://choosealicense.com/licenses/mit/)
