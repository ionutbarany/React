# Arquitectura final: TypeScript frente a JavaScript en este proyecto

Este documento describe cómo las características de TypeScript que **sí forman parte de este repositorio** reducen errores en tiempo de ejecución frente a hacer lo mismo solo con JavaScript. La refactorización de `generarReporte` con unión discriminada y análisis exhaustivo con `never` corresponde a **otro proyecto del curso** y aquí no se incluye.

## Genéricos (`DataTable<T>`)

El componente de tabla recibe filas de un tipo `T` y columnas ligadas a claves de `T`. En JavaScript, `data` y `columns` serían arreglos sin relación entre sí: podrías declarar una columna con una clave que no existe en los objetos y el fallo aparecería al renderizar o al leer `undefined`. Con un genérico, TypeScript exige que cada `key` de columna sea realmente `keyof T`, de modo que referencias a propiedades inexistentes se detectan al compilar.

## Tipos utilidad (`Partial<T>` en edición de filas)

Durante la edición de una fila, el usuario puede dejar campos sin tocar todavía. El borrador se tipa como `Partial<T>`: es un objeto que puede contener solo **parte** de las claves de `T`. Eso evita fingir que tenemos una fila completa válida antes de fusionar con la fila original al guardar (`{ ...fila, ...borrador }`). En JavaScript, el mismo objeto intermedio sería “cualquier cosa”; sin tipos, es habitual mezclar `undefined` y datos viejos y guardar estados inconsistentes sin advertencia en desarrollo.

## Tipado estricto en utilidades (`calcularDiferenciaDias`)

La función de fechas fija entradas y salida como `Date` y `number`. En JavaScript sería fácil pasar strings u órdenes de argumentos distintos y obtener un número silenciosamente incorrecto. Con firmas explícitas, el compilador obliga a quien llama a construir `Date` válidos (o a adaptar el contrato de forma consciente), lo que reduce confusiones en el uso de la librería externa.

## Conclusión

En este proyecto, los **genéricos**, **`Partial<T>`** y las **firmas explícitas** en utilidades alinean la UI y los datos antes de llegar a producción. Las **uniones discriminadas** y el patrón **`never`** para switches exhaustivos aportan un beneficio parecido en otros escenarios (por ejemplo, máquinas de estado o reportes por variantes), y en tu entrega del curso pueden documentarse donde sí estén implementados.
