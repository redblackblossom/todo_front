function dateFormat(specificDate) {
  const year = specificDate.getFullYear();
  const month = String(specificDate.getMonth() + 1).padStart(2, "0");
  const day = String(specificDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function nowDate() {
  return dateFormat(new Date());
}

export function specificDate(date) {
  return dateFormat(date);
}
