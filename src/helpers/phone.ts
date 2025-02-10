export const isPhoneValid = (value: string): boolean => {
  const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return phonePattern.test(value.trim());
};
