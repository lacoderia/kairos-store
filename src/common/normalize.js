export const maxLength = (maxLength) =>
  (value, previousValue) => {
    return (isNaN(Number(value)) || value.toString().length > maxLength) ? previousValue : value
  }

export const isNumber = (value, previousValue) => {
  return (isNaN(Number(value)) || value.toString() == '0') ? previousValue : value
}

const normalize = {
  normalize,
  isNumber,
};

export default normalize;
