# vite-project

Aplicación web con **React 19**, **TypeScript** y **Vite**. Incluye recarga en caliente (HMR), ESLint y el **React Compiler** activado en la plantilla.

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- npm (incluido con Node) u otro gestor compatible

## Instalación

```bash
npm install
```

## Scripts

| Comando        | Descripción                          |
|----------------|--------------------------------------|
| `npm run dev`  | Servidor de desarrollo con Vite      |
| `npm run build`| Comprueba tipos y genera la build    |
| `npm run preview` | Sirve la carpeta `dist` localmente |
| `npm run lint` | Ejecuta ESLint sobre el proyecto     |

## Desarrollo

```bash
npm run dev
```

Abre la URL que muestre la consola (por defecto suele ser `http://localhost:5173`).

## Compilación para producción

```bash
npm run build
```

Los archivos estáticos quedan en `dist/`. Para comprobarlos en local:

```bash
npm run preview
```

## React Compiler

Este proyecto tiene el [React Compiler](https://react.dev/learn/react-compiler) habilitado. Mejora el modelo mental del código, pero puede afectar al rendimiento del servidor de desarrollo y de la compilación. Consulta la documentación oficial para detalles y buenas prácticas.

## Plugins oficiales de React en Vite

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — usa [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) — usa [SWC](https://swc.rs/)

## Ampliar la configuración de ESLint

En aplicaciones reales conviene activar reglas de lint **conscientes de tipos**. Ejemplo de configuración sugerida:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Otras configuraciones…

      // Sustituye tseslint.configs.recommended por esto:
      tseslint.configs.recommendedTypeChecked,
      // O, para reglas más estrictas:
      tseslint.configs.strictTypeChecked,
      // Opcional, reglas de estilo:
      tseslint.configs.stylisticTypeChecked,

      // Otras configuraciones…
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // más opciones…
    },
  },
])
```

También puedes añadir [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) y [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) para reglas específicas de React:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Otras configuraciones…
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // más opciones…
    },
  },
])
```
