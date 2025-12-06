// Closure - Quản lý ID tự động tăng
const createIdGenerator = (initialId = 0) => {
    let currentId = initialId;
    return () => {
        currentId += 1;
        return 'SV' + currentId.toString().padStart(3, '0'); // Ví dụ: SV001, SV002
    };
};
// Khởi tạo ban đầu. Sẽ được xử lý khởi tạo lại trong main.js
let getNextId = createIdGenerator();

// Khóa Local Storage & Hàm lấy dữ liệu
const LOCAL_STORAGE_KEY = 'danhSachSV';

const luuVaoLocalStorage = (danhSach) => {
    // Chỉ lưu các thuộc tính (dữ liệu thô)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(danhSach));
};

export const layTuLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

// Hàm cập nhật ID generator sau khi load data (sử dụng được trong main.js)
export const setNextIdGenerator = (initialId) => {
    getNextId = createIdGenerator(initialId);
};


// Định nghĩa Class DanhSachSV
export class DanhSachSV {
    constructor() {
        // Danh sách sẽ được gán dữ liệu load từ main.js
        this.danhSach = []; 
    }

    // Promises & Async/Await - Hàm giả lập bất đồng bộ
    async _simulateAsync(operation) {
        return new Promise((resolve, reject) => {
            // Yêu cầu: Độ trễ 1.5 giây
            setTimeout(() => {
                try {
                    const result = operation();
                    // Lưu vào Local Storage sau khi thao tác thành công
                    luuVaoLocalStorage(this.danhSach);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, 1500); // 1.5 giây delay
        });
    }

    // themSV() trả về Promise
    themSV(sinhVienMoi) {
        return this._simulateAsync(() => {
            //Gán ID tự động tăng từ Closure
            sinhVienMoi.maSV = getNextId(); 
            
            // Tạo Array mới bằng Spread Operator
            this.danhSach = [...this.danhSach, sinhVienMoi];
            return sinhVienMoi;
        });
    }

    // xoaSV() trả về Promise và dùng .filter()
    xoaSV(maSV) {
        return this._simulateAsync(() => {
            const oldLength = this.danhSach.length;
            
            // Sử dụng .filter() để tạo Array mới (Immutable Update)
            this.danhSach = this.danhSach.filter(sv => sv.maSV !== maSV);
            
            if (this.danhSach.length === oldLength) {
                // Xử lý lỗi cho try...catch
                throw new Error(`Xóa thất bại: Không tìm thấy sinh viên có mã ${maSV}.`);
            }
        });
    }

    //  capNhatSV() trả về Promise và dùng Spread Operator
    capNhatSV(maSV, svCapNhat) {
        return this._simulateAsync(() => {
            const index = this.danhSach.findIndex(sv => sv.maSV === maSV);

            if (index !== -1) {
                // Tạo bản sao của Array và Object (Immutable Update)
                const newDanhSach = [...this.danhSach]; 
                
                newDanhSach[index] = { 
                    ...this.danhSach[index], // Sao chép thuộc tính cũ
                    ...svCapNhat // Ghi đè thuộc tính mới
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