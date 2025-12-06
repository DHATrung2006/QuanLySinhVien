import { SinhVien } from './model.js'; 
// Import layTuLocalStorage và setNextIdGenerator để xử lý việc load và tái tạo ID
import { DanhSachSV, layTuLocalStorage, setNextIdGenerator } from './data-service.js';
import { renderDanhSach, getFormData } from './ui.js';

// Hàm Tái tạo SinhVien từ dữ liệu Local Storage
const taoSinhVienTuLocalStorage = (data) => {
    // Tái tạo instance để các object lấy từ Local Storage có lại các methods (tinhDiemTB, xepLoai)
    return new SinhVien(data.maSV, data.tenSV, data.diemToan, data.diemVan);
};

// 0. Ngày 15: Load dữ liệu ban đầu từ Local Storage
const loadedData = layTuLocalStorage();

// Xử lý Closure ID: Tìm ID lớn nhất để khởi tạo lại generator (Giải quyết vấn đề Ngày 12)
const maxId = loadedData.reduce((max, sv) => {
    const currentNum = parseInt(sv.maSV.replace('SV', ''), 10);
    return currentNum > max ? currentNum : max;
}, 0);

// Khởi tạo lại generator với ID lớn nhất đã tìm được
setNextIdGenerator(maxId); 

// Khởi tạo đối tượng quản lý
const danhSachSV = new DanhSachSV();
// Gán danh sách đã load vào instance.
danhSachSV.danhSach = loadedData.map(taoSinhVienTuLocalStorage);


// 1. Lấy ra các phần tử cần thiết trên DOM
const formSinhVien = document.getElementById('formQLSV');
const tableBody = document.getElementById('tableBody'); 
const btnThem = formSinhVien.querySelector('button[type="submit"]'); 

// Ngày 16: Tối ưu hóa UI - Hàm cập nhật trạng thái loading cho nút
const setLoading = (isLoading) => {
    if (isLoading) {
        btnThem.disabled = true;
        btnThem.textContent = 'Đang xử lý...'; // Hiển thị trạng thái chờ
    } else {
        btnThem.disabled = false;
        btnThem.textContent = 'Thêm Sinh Viên';
    }
}


// --- Hàm xử lý sự kiện Thêm Sinh Viên ---
// Ngày 16: Bắt buộc: Sử dụng Arrow Function để giữ 'this' (Kiểm soát Context)
const handleThemSinhVien = async (event) => {
    event.preventDefault(); 

    const formData = getFormData();
    
    // Ngày 9: Destructuring Assignment để trích xuất dữ liệu
    const { maSV, tenSV, diemToan, diemVan } = formData;
    
    setLoading(true); // Bắt đầu trạng thái loading
    
    try {
        const svMoi = new SinhVien(maSV, tenSV, diemToan, diemVan);

        // Ngày 13-14: Dùng await và bọc bằng try...catch
        await danhSachSV.themSV(svMoi);
        
        renderDanhSach(danhSachSV.layDanhSach());
        formSinhVien.reset(); 
        
    } catch (error) {
        console.error("Lỗi khi thêm sinh viên:", error.message);
        alert("Lỗi: " + error.message);
    } finally {
        setLoading(false); // Kết thúc trạng thái loading
    }
}

// --- Xử lý sự kiện Xóa/Sửa (Event Delegation) ---
// Ngày 10-11: Sử dụng Event Delegation
const handleTableActions = async (e) => {
    if (e.target.classList.contains('btn-xoa')) {
        const maSVCanXoa = e.target.getAttribute('data-id');
        
        if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${maSVCanXoa}?`)) {
            e.target.disabled = true; // Vô hiệu hóa nút trong khi chờ
            e.target.textContent = '...';
            try {
                // Ngày 13-14: Dùng await và bọc bằng try...catch
                await danhSachSV.xoaSV(maSVCanXoa);

                renderDanhSach(danhSachSV.layDanhSach());

            } catch (error) {
                console.error("Lỗi khi xóa sinh viên:", error.message);
                alert("Xóa thất bại: " + error.message);
            } finally {
                e.target.disabled = false;
                e.target.textContent = 'Xóa';
            }
        }
    }
    
    if (e.target.classList.contains('btn-sua')) {
        const maSVCanSua = e.target.getAttribute('data-id');
        alert(`Chức năng Sửa đang được thực hiện cho mã SV: ${maSVCanSua}. Vui lòng chờ 1.5s.`);
        
        e.target.disabled = true; 
        e.target.textContent = '...';
        
        // Giả lập cập nhật điểm
        const svHienTai = danhSachSV.layDanhSach().find(sv => sv.maSV === maSVCanSua);
        if (svHienTai) {
            const svCapNhat = { 
                tenSV: svHienTai.tenSV + ' (Cập nhật)', 
                diemToan: 10, 
                diemVan: 10 
            };
            
            try {
                await danhSachSV.capNhatSV(maSVCanSua, svCapNhat);
                renderDanhSach(danhSachSV.layDanhSach());

            } catch (error) {
                console.error("Lỗi khi cập nhật sinh viên:", error.message);
                alert("Cập nhật thất bại: " + error.message);
            } finally {
                e.target.disabled = false;
                e.target.textContent = 'Sửa';
            }
        }
    }
};

// 2. Lắng nghe sự kiện submit form (Ngày 5-6)
formSinhVien.addEventListener('submit', handleThemSinhVien);

// 3. Lắng nghe sự kiện click trên bảng (Ngày 10-11: Event Delegation)
tableBody.addEventListener('click', handleTableActions);

// 4. Render ban đầu
renderDanhSach(danhSachSV.layDanhSach());