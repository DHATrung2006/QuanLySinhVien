export class SinhVien { // Đổi tên class
    constructor(_maSV, _tenSV, _diemToan, _diemVan) {
        this.maSV = _maSV;
        this.tenSV = _tenSV;
        // Bắt buộc: Đảm bảo điểm là số ngay từ constructor
        this.diemToan = parseFloat(_diemToan);
        this.diemVan = parseFloat(_diemVan);
    }

    tinhDiemTB() {
        const dtb = (this.diemToan + this.diemVan) / 2;
        return dtb.toFixed(2); // Làm tròn 2 chữ số thập phân
    }

    // Yêu cầu: Method trả về Xếp loại
    xepLoai() {
        const dtb = parseFloat(this.tinhDiemTB());

        if (dtb >= 8) {
            return "Giỏi";
        } else if (dtb >= 6.5) {
            return "Khá";
        } else if (dtb >= 5) {
            return "Trung bình";
        } else {
            return "Yếu";
        }
    }
}