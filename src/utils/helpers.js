export const debounce = (set) => {
  let isCooldown = false;

  return (e) => {
    if (isCooldown) return;
    if (e.target.innerWidth > 768) set(false);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), 100);
  };
};

export const handleError = async (err, message) => {
  const error = await err;
  if (message) console.log(message);
  console.log(error);
  return error.message;
};
