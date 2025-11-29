const WINDOWS_RESERVED_NAMES = [
  'CON', 'PRN', 'AUX', 'NUL',
  'COM0', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
  'LPT0', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9',
];

export function sanitizeFileName(
  name: string,
  maxLength = 140,
): string {
  if (!name) {
    return 'untitled';
  }

  let sanitized = name.toLowerCase().trim();

  // Replace all special characters and spaces with hyphens
  sanitized = sanitized.replace(/[^a-z0-9._-]/g, '-');

  // Remove leading/trailing hyphens, underscores, and periods
  sanitized = sanitized.replace(/^[._-]+/, '').replace(/[._-]+$/, '');

  // Consolidate multiple consecutive hyphens into one
  sanitized = sanitized.replace(/-+/g, '-');

  // Check for Windows reserved names
  const nameWithoutExt = sanitized.replace(/\.[^.]*$/, '');
  if (WINDOWS_RESERVED_NAMES.includes(nameWithoutExt.toUpperCase())) {
    sanitized = `file-${sanitized}`;
  }

  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
    sanitized = sanitized.replace(/[._-]+$/, '');
  }

  if (!sanitized) {
    return 'untitled';
  }

  return sanitized;
}

