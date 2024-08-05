export function formatarFichas(valor: number | undefined): string {
  return new Intl.NumberFormat('pt-BR').format(valor ?? 0);
}
