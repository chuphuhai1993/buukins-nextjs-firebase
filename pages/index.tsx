import React, { useEffect } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById('idx-navbar');

    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        // scroll down
        navbar.style.transform = "translateY(-100%)";
      } else {
        // scroll up
        navbar.style.transform = "translateY(0)";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll, false);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFlipCard = (event: React.MouseEvent) => {
    const flipCard = event.currentTarget as HTMLElement;
    flipCard.classList.toggle('is-flipped');
  };

  return (
    <>
      <Head>
        <title>Buukins – Giải pháp đặt lịch gọn nhẹ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet" />
      </Head>

      <nav id="idx-navbar" className="idx-navbar">
        <div className="idx-nav">
          <div className="idx-nav-container idx-container idx-pl-48">
            <a href="#" className="idx-logo">
              <div style={{ width: 188, height: 32, background: '#1E1F21', borderRadius: 4 }}></div>
            </a>
            <a className="idx-cta-btn" href="#idx-header">Bắt đầu miễn phí</a>
          </div>
        </div>
      </nav>

      <div className="idx-top-fill idx-pink"></div>

      <header id="idx-header" className="idx-pink idx-header">
        <div className="idx-container idx-flex idx-row idx-flex-center idx-gap-4">
          <div className="idx-col idx-flex idx-column idx-gap-2">
            <div className="idx-flex idx-column idx-gap-1">
              <p className="idx-p">Bạn cung cấp dịch vụ làm đẹp, chăm sóc cá nhân? <br/>Bạn làm tại nhà, hoặc hoạt động tự do trên mạng xã hội?</p>
              <h1 className="idx-h1">Buukins giúp bạn tạo trang booking cá nhân, quản lý khách hàng và theo dõi thống kê.</h1>
            </div>
            <div className="idx-flex idx-gap-1">
              <a href="#" className="idx-download-button">
                <div className="idx-apple-app-store-icon w-embed">
                  <div style={{ width: 101, height: 26, background: '#fff', borderRadius: 4 }}></div>
                </div>
              </a>
              <a href="#" className="idx-download-button">
                <div className="idx-google-play-icon w-embed">
                  <div style={{ width: 116, height: 29, background: '#fff', borderRadius: 4 }}></div>
                </div>
              </a>
            </div>
          </div>
          <div className="idx-col">
            <img className="idx-w-100" src="https://www.spict.org.uk/wp-content/uploads/2019/04/placeholder.png" alt="Hero image" />
          </div>
        </div>
      </header>

      <section className="idx-section">
        <div className="idx-container idx-flex idx-row idx-flex-center idx-gap-4">
          <div className="idx-col">
            <img className="idx-w-100" src="https://www.spict.org.uk/wp-content/uploads/2019/04/placeholder.png" alt="Problems illustration" />
          </div>
          <div className="idx-col idx-flex idx-column idx-gap-1">
            <h2 className="idx-h2">Bạn gặp khó khăn khi làm dịch vụ?</h2>
            <ul className="idx-flex idx-column idx-gap-1 idx-ul">
              <li className="idx-li">🚫 Khách hàng đặt qua tin nhắn rời rạc, khó kiểm soát</li>
              <li className="idx-li">🚫 Lịch bị trùng hoặc nhầm giờ, bỏ lỡ khách hàng tiềm năng</li>
              <li className="idx-li">🚫 Không theo dõi được tổng thể khách hàng & tình hình công việc</li>
              <li className="idx-li">🚫 Thiếu không gian giới thiệu dịch vụ và nhận booking chuyên nghiệp</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="idx-light idx-section">
        <div className="idx-container idx-flex idx-column idx-flex-center idx-gap-4">
          <div className="idx-text-container idx-text-grid">
            <h2 className="idx-h2 idx-t-center">👉 Một công cụ tinh gọn, dễ sử dụng.</h2>
            <p className="idx-p idx-t-center">Được ra đời để giải quyết những vấn đề nhỏ nhưng cực kỳ phiền toái với người làm dịch vụ tự do. Buukins giúp bạn xây dựng trang booking cá nhân, giữ kết nối với khách hàng, quản lý và theo dõi hiệu suất công việc một cách dễ dàng nhất.</p>
          </div>
          <div className="idx-grid idx-gap-2 idx-card-grid idx-w-100">
            <div className="idx-card">
              <div className="idx-icon-box idx-lime">
                <div className="idx-icon" style={{ width: 22, height: 22, background: '#5A6500', borderRadius: 4 }}></div>
              </div>
              <h4 className="idx-text-large idx-m-0">Giúp khách hàng dễ dàng tiếp cận dịch vụ và booking.</h4>
              <p className="idx-text-small idx-m-0">Tạo trang booking cá nhân đơn giản, đầy đủ thông tin với giao diện bắt mắt, chia sẻ dễ dàng chỉ với một đường link.</p>
            </div>

            <div className="idx-card">
              <div className="idx-icon-box idx-lime">
                <div className="idx-icon" style={{ width: 22, height: 22, background: '#5A6500', borderRadius: 4 }}></div>
              </div>
              <h4 className="idx-text-large idx-m-0">Tiết kiệm thời gian, quản lý booking dễ dàng.</h4>
              <p className="idx-text-small idx-m-0">Khách hàng tự chọn dịch vụ, ngày và giờ phù hợp; bạn nhận thông báo và xác nhận chỉ với một chạm.</p>
            </div>

            <div className="idx-card">
              <div className="idx-icon-box idx-lime">
                <div className="idx-icon" style={{ width: 22, height: 22, background: '#5A6500', borderRadius: 4 }}></div>
              </div>
              <h4 className="idx-text-large idx-m-0">Không bỏ sót khách hàng và thông tin quan trọng.</h4>
              <p className="idx-text-small idx-m-0">Quản lý toàn bộ khách hàng trong một nơi: ghi chú, phân loại, theo dõi lịch sử sử dụng dịch vụ dễ dàng trên điện thoại.</p>
            </div>

            <div className="idx-card">
              <div className="idx-icon-box idx-lime">
                <div className="idx-icon" style={{ width: 22, height: 22, background: '#5A6500', borderRadius: 4 }}></div>
              </div>
              <h4 className="idx-text-large idx-m-0">Hiểu rõ tình hình kinh doanh để phát triển hiệu quả hơn.</h4>
              <p className="idx-text-small idx-m-0">Theo dõi số lượng khách hàng, số lượt đặt lịch, các dịch vụ được sử dụng nhiều nhất, giúp bạn hiểu rõ tình hình hoạt động và tăng hiệu quả công việc.</p>
            </div>

            <div className="idx-card">
              <div className="idx-icon-box idx-lime">
                <div className="idx-icon" style={{ width: 22, height: 22, background: '#5A6500', borderRadius: 4 }}></div>
              </div>
              <h4 className="idx-text-large idx-m-0">Tránh nhầm lẫn giờ giấc và tăng sự chuyên nghiệp.</h4>
              <p className="idx-text-small idx-m-0">Buukins tự động nhắc lịch trước giờ hẹn – giúp cả bạn và khách luôn chủ động, không bao giờ trễ hẹn.</p>
            </div>

            <div className="idx-card">
              <div className="idx-icon-box idx-lime">
                <div className="idx-icon" style={{ width: 22, height: 22, background: '#5A6500', borderRadius: 4 }}></div>
              </div>
              <h4 className="idx-text-large idx-m-0">Thể hiện cá tính, tạo sự tin tưởng với khách hàng mới.</h4>
              <p className="idx-text-small idx-m-0">Chọn giao diện phù hợp với phong cách cá nhân, thao tác đơn giản, không cần kỹ thuật hay thiết kế.</p>
            </div>
          </div>
          <a className="idx-cta-btn" href="#idx-footer">Bắt đầu miễn phí</a>
        </div>
      </section>

      <section className="idx-section">
        <div className="idx-container idx-flex idx-column idx-flex-center idx-gap-4">
          <h2 className="idx-h2">Buukins phù hợp với những ai?</h2>
          <div className="idx-audience idx-grid idx-gap-2 idx-w-100">
            <div className="idx-flip-card" onClick={handleFlipCard}>
              <div className="idx-flip-card-inner">
                <div className="idx-flip-card-front idx-freelancer">Freelancer trong các lĩnh vực làm đẹp, chăm sóc cá nhân.</div>
                <div className="idx-flip-card-back" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621436699529-27d0d04884e6?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
              </div>
            </div>

            <div className="idx-flip-card" onClick={handleFlipCard}>
              <div className="idx-flip-card-inner">
                <div className="idx-flip-card-front idx-shop">Chủ tiệm nhỏ muốn đơn giản hóa quy trình.</div>
                <div className="idx-flip-card-back" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1683134294916-473fc738750b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
              </div>
            </div>

            <div className="idx-flip-card" onClick={handleFlipCard}>
              <div className="idx-flip-card-inner">
                <div className="idx-flip-card-front idx-home">KOL mạng xã hội thường nhận booking, quảng cáo.</div>
                <div className="idx-flip-card-back" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1705883268010-da0bd4581644?q=80&w=786&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
              </div>
            </div>

            <div className="idx-flip-card" onClick={handleFlipCard}>
              <div className="idx-flip-card-inner">
                <div className="idx-flip-card-front idx-newbie">Người làm dịch vụ tại nhà, hoặc bán thời gian.</div>
                <div className="idx-flip-card-back" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661382511149-9e31e78b8f54?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="idx-lime idx-section">
        <div className="idx-container idx-flex idx-row idx-flex-center idx-gap-4">
          <div className="idx-col">
            <img className="idx-w-100" src="https://www.spict.org.uk/wp-content/uploads/2019/04/placeholder.png" alt="Professional page" />
          </div>
          <div className="idx-col idx-grid idx-gap-2 idx-w-100">
            <h2 className="idx-h2">Tạo trang cá nhân chuyên nghiệp</h2>
            <p className="idx-p">Tạo trang booking với tên, ảnh đại diện, dịch vụ và liên kết MXH – chia sẻ dễ dàng.</p>
          </div>
        </div>
      </section>

      <section className="idx-blue idx-section">
        <div className="idx-container idx-flex idx-row idx-flex-center idx-gap-4">
          <div className="idx-col idx-grid idx-gap-2 idx-w-100">
            <h2 className="idx-h2">Quản lý lịch hẹn và khách hàng</h2>
            <p className="idx-p">Theo dõi thông tin khách, lịch hẹn, ghi chú, lịch sử dịch vụ – tất cả trong 1 app.</p>
          </div>
          <div className="idx-col">
            <img className="idx-w-100" src="https://www.spict.org.uk/wp-content/uploads/2019/04/placeholder.png" alt="Management interface" />
          </div>
        </div>
      </section>

      <section className="idx-pink idx-section">
        <div className="idx-container idx-flex idx-row idx-flex-center idx-gap-4">
          <div className="idx-col">
            <img className="idx-w-100" src="https://www.spict.org.uk/wp-content/uploads/2019/04/placeholder.png" alt="Analytics dashboard" />
          </div>
          <div className="idx-col idx-grid idx-gap-2 idx-w-100">
            <h2 className="idx-h2">Theo dõi hiệu quả công việc</h2>
            <p className="idx-p">Thống kê số lượt đặt lịch, khách hàng, dịch vụ phổ biến – giúp bạn phát triển đúng hướng.</p>
          </div>
        </div>
      </section>

      <footer id="idx-footer" className="idx-purple idx-footer">
        <div className="idx-container idx-flex idx-column idx-flex-center idx-gap-3">
          <h2 className="idx-h2">Tạo trang Buukins của bạn ngay!</h2>
          <div className="idx-flex idx-gap-1">
            <a href="#" className="idx-download-button">
              <div className="idx-apple-app-store-icon w-embed">
                <div style={{ width: 101, height: 26, background: '#fff', borderRadius: 4 }}></div>
              </div>
            </a>
            <a href="#" className="idx-download-button">
              <div className="idx-google-play-icon w-embed">
                <div style={{ width: 116, height: 29, background: '#fff', borderRadius: 4 }}></div>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}