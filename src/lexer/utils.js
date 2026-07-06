export function isLetter(ch) {
  return ch !== null && /[A-Za-z_]/.test(ch);
}

export function isDigit(ch) {
  return ch !== null && /[0-9]/.test(ch);
}

export function isLetterOrDigit(ch) {
  return ch !== null && /[A-Za-z0-9_]/.test(ch);
}

export function isWhitespace(ch) {
  return ch !== null && /\s/.test(ch);
}

export function isDecimalPoint(ch) {
    return ch === ".";
}
