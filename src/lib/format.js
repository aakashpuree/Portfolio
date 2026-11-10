export const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  SQL: '#e38c00',
  Other: '#8b8b8b',
};

export function languageColor(name) {
  return languageColors[name] || languageColors.Other;
}

export function formatNumber(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '0';
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`;
  }
  return String(value);
}

export function formatRelativeDate(isoDate) {
  if (!isoDate) return 'recently';
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'recently';

  const diff = Date.now() - date.getTime();
  const day = 1000 * 60 * 60 * 24;

  if (diff < day) return 'today';
  if (diff < day * 2) return 'yesterday';
  if (diff < day * 30) return `${Math.floor(diff / day)}d ago`;
  if (diff < day * 365) return `${Math.floor(diff / (day * 30))}mo ago`;
  return `${Math.floor(diff / (day * 365))}y ago`;
}
