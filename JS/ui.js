// Viết hàm renderDanhSach()
export const renderDanhSach = (danhSach) => {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    let content = '';

    // Sử dụng Array Method .map() và Template Literals (Ngày 7-8)
    content = danhSach.map(sv => {
        // Destructuring để sử dụng tiện lợi (Ngày 9)
        const { maSV, tenSV } = sv; 
        const dtb = sv.tinhDiemTB();
        const xepLoai = sv.xepLoai();

        return `
            <tr data-masv="${maSV}">
                <td>${maSV}</td>
                <td>${tenSV}</td>
                <td>${sv.diemToan}</td>
                <td>${sv.diemVan}</td>
                <td>${dtb}</td>
                <td>${xepLoai}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-sua" data-id="${maSV}">Sửa</button>
                    <button class="btn btn-danger btn-sm btn-xoa" data-id="${maSV}">Xóa</button>
                </td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = content; //tableBody là một DOM element trỏ tới tbody id='tableBody'.
};

// Hàm lấy dữ liệu từ form
export const getFormData = () => {
    // Lấy giá trị từ các trường input
    const maSV = document.getElementById('maSV').value; // *Giữ lại để hoàn thiện logic sửa/cập nhật sau*
    const tenSV = document.getElementById('tenSV').value;
    const diemToan = document.getElementById('diemToan').value;
    const diemVan = document.getElementById('diemVan').value;
    
    //Trả về object để Destructuring luôn.
    return { maSV, tenSV, diemToan, diemVan };
}