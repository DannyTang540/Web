const ConvertDateArrayToISO=(array)=> {
    const [year, month, day, hour, minute, second, nanoSeconds] = array;

    // Đảm bảo định dạng tháng, ngày, giờ, phút, giây có 2 chữ số
    const pad = (num, size = 2) => String(num).padStart(size, '0');

    // Ghép thành chuỗi ISO
    return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
}
export  default ConvertDateArrayToISO;