
import { sinhVien as SinhVien } from '../JS/model.js'; // Đổi tên để gọi đúng tên class
import { DanhSachSV } from '../JS/data-service.js';

// Khởi tạo đối tượng quản lý danh sách sinh viên
const danhSachSV = new DanhSachSV();

// 1. Lấy ra các phần tử cần thiết trên DOM
const formSinhVien = document.getElementById('form-sinh-vien');

// 2. Lắng nghe sự kiện submit form
formSinhVien.addEventListener('submit', handleThemSinhVien);

// 3. Hàm xử lý sự kiện
function handleThemSinhVien(event) {
    event.preventDefault(); // Ngăn form reload trang

    // Lấy giá trị từ các trường input
    const maSV = document.getElementById('maSV').value;
    const tenSV = document.getElementById('tenSV').value;
    const diemToan = document.getElementById('diemToan').value;
    const diemVan = document.getElementById('diemVan').value;

    // Áp dụng Destructuring để trích xuất dữ liệu (Cách 1: Trích xuất từ một Object tạm)
    const formData = { maSV, tenSV, diemToan, diemVan };
    const { maSV: newMaSV, tenSV: newTenSV, diemToan: newDiemToan, diemVan: newDiemVan } = formData;
    
    // Tạo đối tượng SinhVien mới
    const svMoi = new SinhVien(newMaSV, newTenSV, newDiemToan, newDiemVan);

    // Thêm vào danh sách và kiểm tra kết quả
    danhSachSV.themSV(svMoi);
    
    // Tạm thời hiển thị kết quả xếp loại
    console.log(`Xếp loại của ${svMoi.tenSV}: ${svMoi.xepLoai()}`);
    
    formSinhVien.reset(); // Xóa dữ liệu trên form sau khi thêm
}