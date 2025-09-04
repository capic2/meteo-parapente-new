
export function degToCardinal8(deg: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const d = ((deg % 360) + 360) % 360;
  const index = Math.round(d / 45) % 8;
  return dirs[index];
}

export function formatDateYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mois de 01 à 12
  const day = String(date.getDate()).padStart(2, '0'); // jour de 01 à 31
  return `${year}${month}${day}`;
}
