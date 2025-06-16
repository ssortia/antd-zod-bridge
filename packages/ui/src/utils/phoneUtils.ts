/**
 * Утилиты для работы с номерами телефонов
 */

/**
 * Форматирует номер телефона в российском формате +7 (XXX) XXX-XX-XX
 */
export function formatPhoneNumber(value: string): string {
  if (!value) return '';

  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length === 0) return '';

  let phone = cleaned;

  if (phone.startsWith('8')) {
    phone = '7' + phone.slice(1);
  }

  phone = phone.slice(0, 11);

  if (phone.length > 0 && !phone.startsWith('7')) {
    phone = '7' + phone;
  }

  if (phone.length === 1 && phone === '7') return '+7';
  if (phone.length <= 4) return `+7 (${phone.slice(1)}`;
  if (phone.length <= 7) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4)}`;
  if (phone.length <= 9) return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
  return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;
}

/**
 * Извлекает чистый номер телефона (только цифры) из отформатированной строки
 */
export function parsePhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.startsWith('8')) {
    return '7' + cleaned.slice(1);
  }
  return cleaned;
}