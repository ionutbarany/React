import { differenceInDays } from 'date-fns'

/**
 * Calcula la diferencia en días entre dos instantes (fecha fin − fecha inicio),
 * usando calendario completo (misma semántica que `differenceInDays` de date-fns).
 */
export function calcularDiferenciaDias(
  fechaInicio: Date,
  fechaFin: Date,
): number {
  return differenceInDays(fechaFin, fechaInicio)
}
