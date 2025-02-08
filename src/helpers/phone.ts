export const formatPhone = (value: string) => {
  value = value.replace(/\D/g, "");

  if (value.length > 1) {
    value = `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-${value.slice(9, 11)}`;
  }

  return value.trim();
};

export const isPhoneValid = (value: string): boolean => {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phonePattern.test(value.trim());
};
