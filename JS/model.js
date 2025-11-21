export class sinhVien{
    constructor(_maSV, _tenSV, _diemToan, _diemVan){
        this.maSV = _maSV;
        this.tenSV =  _tenSV;
        //để đảm bảo điểm là số tránh cộng thành chuỗi.
        this.diemToan = parseFloat(_diemToan);
        this.diemVan = parseFloat(_diemVan);
    }

    tinhDiemTB() {
        return (this.diemToan + this.diemVan) / 2;
    }

    xepLoai() {
        const dtb = this.tinhDiemTB();

        if (dtb <= 10 || dtb >= 0){
                if (dtb >= 8){
                return "Giỏi";
            }else if (dtb >= 6.5){
                return "Khá";
            }else if (dtb >= 5){
                return "Trung bình";
            }
            else {
                return "Yếu";
            }
        }
        else {
            return "Nhập sai điểm vui lòng kiểm tra lại"
        }
    }
}


