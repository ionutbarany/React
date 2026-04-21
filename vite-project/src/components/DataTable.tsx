import { useCallback, useState, type ReactNode } from 'react'

export type DataTableColumn<T extends object> = {
  key: keyof T
  header: string
}

export type DataTableProps<T extends object> = {
  data: T[]
  columns: DataTableColumn<T>[]
  /** Si se omite, se usa el índice de fila como clave estable. */
  getRowKey?: (row: T, index: number) => string | number
  onSave?: (index: number, mergedRow: T) => void
}

function cellValue(v: unknown): string {
  if (v === null || v === undefined) return ''
  return String(v)
}

export function DataTable<T extends object>({
  data,
  columns,
  getRowKey,
  onSave,
}: DataTableProps<T>): ReactNode {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  /** Borrador de edición: puede estar incompleto hasta que el usuario guarde. */
  const [draft, setDraft] = useState<Partial<T> | null>(null)

  const startEdit = useCallback((index: number) => {
    setEditingIndex(index)
    setDraft({ ...data[index] })
  }, [data])

  const cancelEdit = useCallback(() => {
    setEditingIndex(null)
    setDraft(null)
  }, [])

  const updateDraft = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }, [])

  const saveEdit = useCallback(() => {
    if (editingIndex === null || draft === null) return
    const base = data[editingIndex]
    const merged = { ...base, ...draft } as T
    onSave?.(editingIndex, merged)
    setEditingIndex(null)
    setDraft(null)
  }, [data, draft, editingIndex, onSave])

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} scope="col">
                {col.header}
              </th>
            ))}
            <th scope="col" className="data-table-actions">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const rowKey = getRowKey?.(row, rowIndex) ?? rowIndex
            const isEditing = editingIndex === rowIndex

            return (
              <tr key={rowKey}>
                {columns.map((col) => {
                  const key = col.key
                  const display = isEditing
                    ? cellValue((draft as Partial<T> | null)?.[key] ?? row[key])
                    : cellValue(row[key])

                  return (
                    <td key={String(col.key)}>
                      {isEditing ? (
                        <input
                          className="data-table-input"
                          type="text"
                          aria-label={String(col.header)}
                          value={display}
                          onChange={(e) => {
                            const raw = e.target.value
                            const prev = row[key]
                            if (typeof prev === 'number' && raw !== '' && !Number.isNaN(Number(raw))) {
                              updateDraft(key, Number(raw) as T[typeof key])
                            } else {
                              updateDraft(key, raw as T[typeof key])
                            }
                          }}
                        />
                      ) : (
                        display
                      )}
                    </td>
                  )
                })}
                <td className="data-table-actions">
                  {isEditing ? (
                    <>
                      <button type="button" className="data-table-btn" onClick={saveEdit}>
                        Guardar
                      </button>
                      <button type="button" className="data-table-btn ghost" onClick={cancelEdit}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="data-table-btn ghost"
                      onClick={() => startEdit(rowIndex)}
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
