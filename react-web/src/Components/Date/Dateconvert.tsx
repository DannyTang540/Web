const ConvertDateArrayToISO = (array) => {
    console.log(array)
    if (!Array.isArray(array) || array.length < 6) {
        throw new Error("Invalid date array: The array must contain at least 6 elements.");
    }
    const [year, month, day, hour, minute, second] = array.map((value) =>
        typeof value === "number" ? value : 0
    );

    const pad = (num, size = 2) => String(num).padStart(size, "0");
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
};
export const formatDateTime=(inputDate)=> {
    // Chuyển chuỗi thành đối tượng Date
    const date = new Date(inputDate);

    // Lấy các thành phần ngày, tháng, năm, giờ và phút
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Tháng viết tắt
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Giờ (12h format)
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Đảm bảo phút đủ 2 số
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}
export default ConvertDateArrayToISO;
