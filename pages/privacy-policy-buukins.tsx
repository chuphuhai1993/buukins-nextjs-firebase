import { NextPage } from 'next';
import Head from 'next/head';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chính Sách Bảo Mật - Buukins</title>
        <meta name="description" content="Chính sách bảo mật của ứng dụng Buukins - cam kết bảo vệ quyền riêng tư của người dùng" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="privacy-policy-container">
        <div className="privacy-policy-content">
          <h1 className="policy-title">📜 Chính Sách Bảo Mật – Ứng Dụng <strong>Buukins</strong></h1>
          
          <p className="policy-date">Cập nhật lần cuối: <strong>31/07/2025</strong></p>
          
          <p className="policy-intro">
            Ứng dụng <strong>Buukins</strong> cam kết bảo vệ quyền riêng tư của người dùng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử dụng ứng dụng.
          </p>

          <hr className="policy-divider" />

          <section className="policy-section">
            <h2 className="section-title">1. Thông Tin Chúng Tôi Thu Thập</h2>
            <p>
              Chúng tôi thu thập thông tin bạn cung cấp khi sử dụng Buukins để tạo trang cá nhân, đăng tải dịch vụ và quản lý booking:
            </p>
            <ul className="policy-list">
              <li><strong>Thông tin cá nhân:</strong> tên, email, số điện thoại, ngày sinh, ảnh đại diện, liên kết mạng xã hội.</li>
              <li><strong>Ảnh đại diện:</strong> yêu cầu quyền truy cập <strong>Camera</strong> hoặc <strong>Thư viện ảnh (Gallery)</strong> khi người dùng cập nhật avatar.</li>
              <li><strong>Thông tin dịch vụ & booking:</strong> tên dịch vụ, giá, lịch hẹn, trạng thái, số lượt booking, khách hàng,...</li>
              <li><strong>Thông tin phân tích:</strong> qua Google Firebase & Google Analytics để cải thiện hiệu năng & trải nghiệm người dùng.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">2. Mục Đích Sử Dụng Dữ Liệu</h2>
            <p>Thông tin được sử dụng để:</p>
            <ul className="policy-list">
              <li>Cung cấp và duy trì hoạt động của app</li>
              <li>Cho phép người dùng tạo hồ sơ, đăng dịch vụ, và nhận booking từ khách hàng</li>
              <li>Quản lý lịch hẹn, thông báo trạng thái đặt lịch</li>
              <li>Hiển thị thống kê và phân tích doanh thu theo gói sử dụng</li>
              <li>Phân tích hành vi người dùng nhằm nâng cấp tính năng</li>
              <li>Quản lý giao dịch và thanh toán thông qua <strong>In-App Purchase</strong></li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">3. Quyền Truy Cập Ứng Dụng</h2>
            <p>Buukins yêu cầu một số quyền hạn để hoạt động đúng chức năng:</p>
            <div className="permissions-table">
              <table>
                <thead>
                  <tr>
                    <th>Quyền</th>
                    <th>Mục đích</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Camera / Ảnh</td>
                    <td>Để cập nhật ảnh đại diện người dùng</td>
                  </tr>
                  <tr>
                    <td>Internet</td>
                    <td>Để đồng bộ dữ liệu & kết nối dịch vụ Firebase</td>
                  </tr>
                  <tr>
                    <td>Thông báo</td>
                    <td>Gửi update về trạng thái booking</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="policy-section">
            <h2 className="section-title">4. Dữ Liệu Bên Thứ Ba</h2>
            <p>
              Chúng tôi <strong>không chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào</strong> không liên quan đến chức năng của Buukins. Tuy nhiên, chúng tôi có sử dụng các nền tảng sau để cung cấp dịch vụ:
            </p>
            <ul className="policy-list">
              <li><strong>Google Firebase</strong> (lưu trữ dữ liệu, xác thực người dùng)</li>
              <li><strong>Google Analytics</strong> (phân tích hành vi người dùng)</li>
              <li><strong>AdMob (tùy chọn trong tương lai)</strong> để hiển thị quảng cáo</li>
            </ul>
            <p>Các nền tảng này đều tuân thủ chính sách bảo mật và các quy định quốc tế như GDPR.</p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">5. Lưu Trữ & Bảo Mật</h2>
            <p>
              Dữ liệu người dùng được lưu trữ bảo mật trên hệ thống cloud của Buukins (ví dụ: Firebase). Chúng tôi áp dụng:
            </p>
            <ul className="policy-list">
              <li>Xác thực người dùng</li>
              <li>Hạn chế truy cập dữ liệu trái phép</li>
              <li>Mã hóa các dữ liệu nhạy cảm</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">6. Quyền Lợi Người Dùng</h2>
            <p>Bạn có quyền:</p>
            <ul className="policy-list">
              <li>Xem, chỉnh sửa, xoá thông tin cá nhân</li>
              <li>Yêu cầu xoá tài khoản và toàn bộ dữ liệu liên quan</li>
              <li>Ngừng sử dụng app bất kỳ lúc nào mà không bị lưu giữ trái phép</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">7. Liên Hệ</h2>
            <p>Mọi thắc mắc hoặc yêu cầu liên quan đến quyền riêng tư, vui lòng liên hệ:</p>
            <div className="contact-info">
              <p>📧 <strong>Email</strong>: <a href="mailto:chuphuhai1993@gmail.com">chuphuhai1993@gmail.com</a></p>
              <p>🌐 <strong>Website</strong>: <a href="https://buukins.com" target="_blank" rel="noopener noreferrer">https://buukins.com</a></p>
            </div>
          </section>

          <section className="policy-section">
            <h2 className="section-title">8. Cập Nhật Chính Sách</h2>
            <p>
              Buukins có thể cập nhật chính sách bảo mật bất kỳ lúc nào. Thông báo sẽ được gửi trong app khi có thay đổi lớn. Người dùng nên thường xuyên kiểm tra để cập nhật phiên bản mới nhất.
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        .privacy-policy-container {
          min-height: 100vh;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .privacy-policy-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 40px;
          line-height: 1.6;
          color: #333;
        }

        .policy-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
          text-align: left;
        }

        .policy-date {
          text-align: left;
          color: #718096;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        .policy-intro {
          font-size: 1.1rem;
          color: #4a5568;
          margin-bottom: 30px;
          text-align: left;
        }

        .policy-divider {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          margin: 40px 0;
        }

        .policy-section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }

        .policy-list {
          list-style: none;
          padding-left: 0;
        }

        .policy-list li {
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .policy-list li:before {
          content: "•";
          color: #667eea;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .permissions-table {
          overflow-x: auto;
          margin: 20px 0;
        }

        .permissions-table table {
          width: 100%;
          border-collapse: collapse;
          background: #f7fafc;
          border-radius: 8px;
          overflow: hidden;
        }

        .permissions-table th,
        .permissions-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }

        .permissions-table th {
          background: #667eea;
          color: white;
          font-weight: 600;
        }

        .permissions-table tr:hover {
          background: #edf2f7;
        }

        .contact-info {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
        }

        .contact-info p {
          margin: 10px 0;
        }

        .contact-info a {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .contact-info a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .privacy-policy-container {
            padding: 10px;
          }

          .privacy-policy-content {
            padding: 20px;
          }

          .policy-title {
            font-size: 2rem;
          }

          .permissions-table {
            font-size: 0.9rem;
          }

          .permissions-table th,
          .permissions-table td {
            padding: 8px 12px;
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicyPage; 