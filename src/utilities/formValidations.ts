export function validatePassword(password: string) {

  if (password.length >= 6) {
    return false;
  }

  return true;

}

export function isPastDate(date: Date | string) {
  const _date = new Date(date);

  const today = new Date();

  return _date < today;
}