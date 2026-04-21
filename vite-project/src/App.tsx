import { useCallback, useMemo, useState } from 'react'
import { DataTable } from './components/DataTable.tsx'
import { calcularDiferenciaDias } from './utils/diferenciaDias.ts'
import './App.css'

type Estudiante = {
  id: number
  nombre: string
  carrera: string
}

function App() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    { id: 1, nombre: 'Ana López', carrera: 'Informática' },
    { id: 2, nombre: 'Luis Pérez', carrera: 'Derecho' },
    { id: 3, nombre: 'Marta Ruiz', carrera: 'Medicina' },
  ])

  const columnas = useMemo(
    () =>
      [
        { key: 'id' as const, header: 'ID' },
        { key: 'nombre' as const, header: 'Nombre' },
        { key: 'carrera' as const, header: 'Carrera' },
      ] as const,
    [],
  )

  const onSaveFila = useCallback((index: number, mergedRow: Estudiante) => {
    setEstudiantes((prev) => {
      const next = [...prev]
      next[index] = mergedRow
      return next
    })
  }, [])

  const inicioCurso = useMemo(() => new Date(2026, 2, 10), [])
  const hoy = useMemo(() => new Date(2026, 3, 10), [])
  const diasDesdeInicio = calcularDiferenciaDias(inicioCurso, hoy)

  return (
    <main className="app-lab">
      <header className="lab-header">
        <h1>Laboratorio: UI tipada y documentación</h1>
        <p>
          Tabla genérica con edición parcial (<code>Partial&lt;T&gt;</code>) y
          diferencia de días con <code>date-fns</code>.
        </p>
      </header>

      <section className="lab-panel" aria-labelledby="tabla-title">
        <h2 id="tabla-title">DataTable genérico</h2>
        <DataTable<Estudiante>
          data={estudiantes}
          columns={[...columnas]}
          getRowKey={(row) => row.id}
          onSave={onSaveFila}
        />
      </section>

      <section className="lab-panel" aria-labelledby="fechas-title">
        <h2 id="fechas-title">Diferencia en días</h2>
        <p>
          Entre el 10 mar 2026 y el 10 abr 2026 hay{' '}
          <strong>{diasDesdeInicio}</strong> días (
          <code>calcularDiferenciaDias</code> + date-fns).
        </p>
      </section>
    </main>
  )
}

export default App
