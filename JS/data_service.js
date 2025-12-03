// Sử dụng Closure để quản lý ID tự động tăng (Ngày 12)
const createIdGenerator = () => {
    let currentId = 0;
    return () => {
        currentId += 1;
        return 'SV' + currentId.toString().padStart(3, '0'); // Ví dụ: SV001, SV002
    };
};
const getNextId = createIdGenerator();

export class DanhSachSV {
    constructor() {
        this.danhSach = [];
    }

    // Hàm giả lập bất đồng bộ (Async/Await Cơ bản - Ngày 13-14)
    async _simulateAsync(operation) {
        return new Promise((resolve, reject) => {
            // Giả lập bất đồng bộ, không có delay 1.5s
            setTimeout(() => {
                try {
                    const result = operation();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, 0); 
        });
    }

    themSV(sinhVienMoi) {
        return this._simulateAsync(() => {
            //Gán ID tự động tăng từ Closure
            sinhVienMoi.maSV = getNextId(); 
            
            // Tạo Array mới bằng Spread Operator
            this.danhSach = [...this.danhSach, sinhVienMoi];
            return sinhVienMoi;
        });
    }

    // Xóa SV bằng .filter()
    xoaSV(maSV) {
        return this._simulateAsync(() => {
            const oldLength = this.danhSach.length;
            
            //Sử dụng .filter() để tạo Array mới (Ngày 7-8 & 10-11)
            this.danhSach = this.danhSach.filter(sv => sv.maSV !== maSV);
            
            if (this.danhSach.length === oldLength) {
                // Giả lập lỗi để luyện tập try...catch
                throw new Error(`Xóa thất bại: Không tìm thấy sinh viên có mã ${maSV}.`);
            }
        });
    }

    //Cập nhật SV bằng Spread Operator
    capNhatSV(maSV, svCapNhat) {
        return this._simulateAsync(() => {
            const index = this.danhSach.findIndex(sv => sv.maSV === maSV);

            if (index !== -1) {
                //Tạo bản sao của Array và Object (Ngày 9 & 10-11)
                const newDanhSach = [...this.danhSach]; // Sao chép mảng
                
                // Sao chép và cập nhật đối tượng sinh viên
                newDanhSach[index] = { 
                    ...this.danhSach[index], 
                    ...svCapNhat 
                };

                this.danhSach = newDanhSach;
                return newDanhSach[index];
            } else {
                 throw new Error(`Cập nhật thất bại: Không tìm thấy sinh viên có mã ${maSV}.`);
            }
        });
    }

    layDanhSach() {
        return this.danhSach;
    }
}