export const getAvatarNameFromFullName = (fullName: string) => {
  const names = fullName.split(" ");
  if (names.length === 0) return "";
  if (names.length === 1) return names[0][0].toUpperCase();
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
};
