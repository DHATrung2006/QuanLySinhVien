
export class DanhSachSV {
    constructor() {
        // Thuộc tính để lưu trữ mảng các đối tượng sinhVien
        this.danhSach = []; 
    }

    // Phương thức thêm Sinh Viên
    themSV(sinhVienMoi) {
        this.danhSach.push(sinhVienMoi);
        console.log(`Đã thêm sinh viên: ${sinhVienMoi.tenSV}`);
        console.log('Danh sách hiện tại:', this.danhSach);
    }
    
    // Phương thức xóa SV (sẽ hoàn thiện sau bằng .filter())
    xoaSV(maSV) {
        // Logic xóa sẽ được bổ sung
    }
    
    // Phương thức cập nhật SV (sẽ hoàn thiện sau bằng Spread Operator)
    capNhatSV(sinhVienCapNhat) {
        // Logic cập nhật sẽ được bổ sung
    }

    // Các phương thức khác như timKiemSV...
}