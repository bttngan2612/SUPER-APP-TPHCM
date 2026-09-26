/**
 * Formatter utilities for VietinBank App
 */

export function formatCurrencyVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(Math.round(amount));
}

export function formatNumberVi(val: number): string {
  return new Intl.NumberFormat('vi-VN').format(Math.round(val));
}

export function formatCompactVND(amount: number): string {
  if (amount >= 1_000_000_000) {
    const bill = amount / 1_000_000_000;
    return `${bill % 1 === 0 ? bill : bill.toFixed(1)} tỷ VNĐ`;
  }
  if (amount >= 1_000_000) {
    const mill = amount / 1_000_000;
    return `${mill % 1 === 0 ? mill : mill.toFixed(0)} triệu VNĐ`;
  }
  return formatCurrencyVND(amount);
}
