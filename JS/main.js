import { SinhVien } from './model.js'; 
import { DanhSachSV } from './data-service.js';
import { renderDanhSach, getFormData } from './ui.js';

// Khởi tạo đối tượng quản lý danh sách sinh viên
const danhSachSV = new DanhSachSV();

// 1. Lấy ra các phần tử cần thiết trên DOM
const formSinhVien = document.getElementById('form-sinh-vien');
const tableBody = document.getElementById('tableBody'); // Thêm để xử lý Event

// --- Hàm xử lý sự kiện Thêm Sinh Viên ---
//Hàm xử lý sự kiện phải là async để dùng await (Ngày 13-14)
const handleThemSinhVien = async (event) => {
    event.preventDefault(); // Ngăn form reload trang

    const formData = getFormData();
    
    //Destructuring Assignment để trích xuất dữ liệu (Ngày 9)
    const { maSV, tenSV, diemToan, diemVan } = formData;
    
    try {
        // Tạo đối tượng SinhVien mới
        const svMoi = new SinhVien(maSV, tenSV, diemToan, diemVan);

        //Gọi hàm CRUD Async bằng await và try...catch (Ngày 13-14)
        await danhSachSV.themSV(svMoi);
        
        // Cập nhật giao diện
        renderDanhSach(danhSachSV.layDanhSach());
        formSinhVien.reset(); // Xóa dữ liệu trên form sau khi thêm
        
    } catch (error) {
        console.error("Lỗi khi thêm sinh viên:", error.message);
        alert("Lỗi: " + error.message);
    }
}

// --- Xử lý sự kiện Xóa/Sửa (Event Delegation) ---
//Sử dụng Event Delegation trên bảng (Ngày 10-11)
const handleTableActions = async (e) => {
    if (e.target.classList.contains('btn-xoa')) {
        const maSVCanXoa = e.target.getAttribute('data-id');
        
        if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${maSVCanXoa}?`)) {
            try {
                await danhSachSV.xoaSV(maSVCanXoa);
                renderDanhSach(danhSachSV.layDanhSach());

            } catch (error) {
                console.error("Lỗi khi xóa sinh viên:", error.message);
                alert("Xóa thất bại: " + error.message);
            }
        }
    }
    
    if (e.target.classList.contains('btn-sua')) {
        const maSVCanSua = e.target.getAttribute('data-id');
        alert(`Chức năng Sửa đang được thực hiện cho mã SV: ${maSVCanSua}`);
        // Thêm logic cập nhật (dùng Spread Operator) ở đây
    }
};

// 2. Lắng nghe sự kiện submit form
formSinhVien.addEventListener('submit', handleThemSinhVien);

// 3. Lắng nghe sự kiện click trên bảng (Event Delegation)
tableBody.addEventListener('click', handleTableActions);

// 4. Render ban đầu
renderDanhSach(danhSachSV.layDanhSach());