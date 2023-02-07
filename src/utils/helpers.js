export const debounce = (set) => {
  let isCooldown = false;

  return (e) => {
    if (isCooldown) return;
    if (e.target.innerWidth > 768) set(false);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), 100);
  };
};
