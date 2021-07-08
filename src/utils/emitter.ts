const emit = (name: string, data: unknown) => {
  const event = new CustomEvent(name, {
    detail: data,
  });

  window.dispatchEvent(event);
};

export default emit;
