function extractAndSanitize(base64Input: string): string {
  const splitIndex = base64Input.indexOf('=');
  const onlyBase64Part =
    splitIndex !== -1 ? base64Input.slice(0, splitIndex + 1) : base64Input;
  let sanitized = onlyBase64Part.replace(/-/g, '+').replace(/_/g, '/');
  const padding = sanitized.length % 4;
  if (padding > 0) {
    sanitized += '='.repeat(4 - padding);
  }

  return sanitized;
}

export default extractAndSanitize;
