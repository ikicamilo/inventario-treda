# INVENTARIO TREDA

## _Prueba técnica de ingreso 2024_

El siguiente es un manual explicativo para probar el funcionamiento del servicio web. Se divide en dos partes

- Funcionamiento en Producción (Render)
- Funcionamiento en local

## Funcionamiento en producción

Para poder probar el servicio en producción se debe ingresar a la <a href="https://inventario-treda-ikicamilo.onrender.com/api/v1/docs/#/" target="_blank">Documentación de Swagger</a> y seguir los siguientes pasos:

1. Buscar y ejecutar el siguiente endpoint:
   > `POST /api/auth/login` usando el siguiente body:

```sh
{
  "emailUsu": "admin1@gmail.com",
  "passUsu": "hola1234"
}

Este es un usuario administrador creado en el sistema que posee todos los permisos
```

2. Al ejecutar el endpoint anterior, debe generarse un token el cual debe ser copiado.
3. Se debe dar clic en el botón "Authorize" que aparece al principio de la documentación, a lo cual se mostrará una caja de texto en donde debemos pegar el token generado en el paso anterior.
4. Seguido, se da nuevamente clic a otro botón también llamado "Authorize" y luego cerrar.

Con lo anterior realizado, los demás endpoints que aparecen en la documentación se habilitarán para ser usados sin restricción.
