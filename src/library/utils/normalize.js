export const maxLength = (maxLength) =>
  (value, previousValue) => {
    return (isNaN(Number(value)) || value.toString().length > maxLength) ? previousValue : value
  }

const normalize = {
  maxLength,
};

export default normalize;
