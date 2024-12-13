const ConvertDateArrayToISO = (array) => {
    if (!Array.isArray(array) || array.length < 6) {
        throw new Error("Invalid date array: The array must contain at least 6 elements.");
    }
    const [year, month, day, hour, minute, second] = array.map((value) =>
        typeof value === "number" ? value : 0
    );

    const pad = (num, size = 2) => String(num).padStart(size, "0");
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
};
export default ConvertDateArrayToISO;
