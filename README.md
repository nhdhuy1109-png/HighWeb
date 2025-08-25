# CV Website - Nguyễn Hồ Đức Huy

## Mô tả
Website CV cá nhân của Nguyễn Hồ Đức Huy - Sinh viên chuyên ngành Trí tuệ nhân tạo tại Đại học Đà Lạt.

## Tính năng
- ✨ Thiết kế responsive, thân thiện với mobile
- 🌙 Chế độ dark/light mode
- 📱 Progressive Web App (PWA)
- 📄 Tải xuống CV dạng PDF
- 📧 Form liên hệ tích hợp
- 🎨 Hiệu ứng animation mượt mà
- 🖨️ Tối ưu cho in ấn

## Công nghệ sử dụng
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript
- Service Worker (PWA)
- Azure Static Web Apps

## Cấu trúc dự án
```
├── index.html              # Trang chính
├── styles.css             # CSS bổ sung
├── script.js              # JavaScript chức năng
├── sw.js                  # Service Worker
├── manifest.json          # PWA Manifest
├── staticwebapp.config.json # Cấu hình Azure SWA
└── README.md              # Tài liệu dự án
```

## Triển khai

### Triển khai trên Azure Static Web Apps
1. Push code lên GitHub repository
2. Tạo Azure Static Web App từ GitHub repo
3. Cấu hình build settings:
   - App location: `/`
   - Output location: `/`

### Triển khai local
```bash
# Sử dụng Live Server extension trong VS Code
# Hoặc Python simple server
python -m http.server 8000

# Hoặc Node.js serve
npx serve .
```

## Tính năng nâng cao
- **PWA**: Có thể cài đặt như ứng dụng native
- **Offline Support**: Hoạt động offline nhờ Service Worker
- **SEO Optimized**: Meta tags và structured data
- **Performance**: Lazy loading và caching
- **Analytics Ready**: Tích hợp Google Analytics

## Liên hệ
- **Email**: huy.nguyen@student.dlu.edu.vn
- **LinkedIn**: [linkedin.com/in/nguyenho-duc-huy](https://linkedin.com/in/nguyenho-duc-huy)
- **GitHub**: [github.com/nhdhuy1109-png](https://github.com/nhdhuy1109-png)

## License
MIT License - Tự do sử dụng và chỉnh sửa.
