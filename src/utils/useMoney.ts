export function formatMoneyBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    value
  )
}

export function formatMoneyBRLWithoutR$(value: number) {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value)
}
