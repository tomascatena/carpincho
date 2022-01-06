export const formatEUR = (value: number): string => {
  return value.toLocaleString(['de-DE'], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const percentFormatter = (value: number): string => {
  return value.toLocaleString(['de-DE'], {
    style: 'percent',
    maximumFractionDigits: 2,
  });
};
