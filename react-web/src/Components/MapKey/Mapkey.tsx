const MapKeys = (data, keyMapping) => {
  return Object.keys(keyMapping).reduce((acc, key) => {
    const mappedKey = keyMapping[key]; // Lấy key từ keyMapping

    // Kiểm tra nếu dữ liệu có thuộc tính này, nếu không thì gán giá trị mặc định ("-")
    acc[mappedKey] = data[key] !== undefined ? data[key] : "-";
    return acc;
  }, {});
};
export default MapKeys;