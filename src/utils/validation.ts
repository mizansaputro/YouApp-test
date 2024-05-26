export const isNumberKey = (evt: any) => {
  if (!/[0-9]/.test(evt.key) && evt.key !== "Backspace" && evt.key !== ".") {
    evt.preventDefault();
  }
};
