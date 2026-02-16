export function formatHoursMinutes(decimalHours: number): string {
  if (!Number.isFinite(decimalHours) || decimalHours <= 0) {
    return "0h 0m";
  }

  const totalMinutes = Math.ceil(decimalHours * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
}
