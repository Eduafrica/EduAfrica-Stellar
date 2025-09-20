
export async function validatePassword(password) {
  if (typeof password !== 'string') {
    return { success: false, message: 'Password must be a string.' };
  }
  if (password.length < 8) {
    return { success: false, message: 'Password must be at least 8 characters long.' };
  }
  if (!/[a-z]/.test(password)) {
    return { success: false, message: 'Password must include at least one lowercase letter.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { success: false, message: 'Password must include at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { success: false, message: 'Password must include at least one number.' };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { success: false, message: 'Password must include at least one special character.' };
  }
  return { success: true, message: 'Password is valid.' };
}

export function truncateText(text, length = 100) {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}