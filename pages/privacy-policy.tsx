import { NextPage } from 'next';
import Head from 'next/head';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Buukins</title>
        <meta name="description" content="Buukins app's privacy policy – committed to protecting user privacy." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="privacy-policy-container">
        <div className="privacy-policy-content">
          <h1 className="policy-title">📜 Privacy Policy – <strong>Buukins</strong> App</h1>

          <p className="policy-date">Last Updated: <strong>31/07/2025</strong></p>

          <p className="policy-intro">
            <strong>Buukins</strong> is committed to protecting user privacy. This policy outlines how we collect, use, and protect your personal information when using the app.
          </p>

          <hr className="policy-divider" />

          <section className="policy-section">
            <h2 className="section-title">1. Information We Collect</h2>
            <p>We collect information that you provide when using Buukins to create your profile, publish services, and manage bookings:</p>
            <ul className="policy-list">
              <li><strong>Account registration & login information:</strong> email, password, and authentication data collected when you sign up or sign in via Buukins or third-party authentication providers (e.g., Google, Apple). This information is used solely for account authentication and to provide personalized app features.</li>
              <li><strong>Payment information:</strong> payment method, payment status, payment amount, payment date, payment method, payment status, payment amount, payment date.</li>
              <li><strong>Profile picture:</strong> requires access to <strong>Camera</strong> or <strong>Gallery</strong> when updating your avatar.</li>
              <li><strong>Service & booking information:</strong> service name, price, schedule, status, booking count, customer details, etc.</li>
              <li><strong>Analytics data:</strong> collected via Google Firebase & Google Analytics to improve performance and user experience.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">2. Purpose of Data Usage</h2>
            <p>Information is used to:</p>
            <ul className="policy-list">
              <li>Provide and maintain the app's functionality</li>
              <li>Allow users to create profiles, publish services, and receive bookings from clients</li>
              <li>Manage appointments and notify booking status</li>
              <li>Display statistics and revenue analysis based on subscription plans</li>
              <li>Analyze user behavior to improve features</li>
              <li>Manage transactions and payments via <strong>In-App Purchase</strong></li>
              <li>Authenticate users during sign-in and protect accounts from unauthorized access</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">3. App Permissions</h2>
            <p>Buukins requires certain permissions to function properly:</p>
            <div className="permissions-table">
              <table>
                <thead>
                  <tr>
                    <th>Permission</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Camera / Gallery</td>
                    <td>To update the user's profile picture</td>
                  </tr>
                  <tr>
                    <td>Internet</td>
                    <td>To sync data and connect with Firebase services</td>
                  </tr>
                  <tr>
                    <td>Notifications</td>
                    <td>To send updates regarding booking status</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="policy-section">
            <h2 className="section-title">4. Third-Party Data</h2>
            <p>
              We <strong>do not share your personal data</strong> with any unrelated third parties. However, we use the following platforms to deliver services:
            </p>
            <ul className="policy-list">
              <li><strong>Google Firebase</strong> (data storage, user authentication)</li>
              <li><strong>Google Analytics</strong> (user behavior analysis)</li>
              <li><strong>AdMob (optional in future)</strong> for advertising</li>
            </ul>
            <p>These platforms comply with privacy regulations such as GDPR.</p>
          </section>

          <section className="policy-section">
            <h2 className="section-title">5. Data Storage & Security</h2>
            <p>User data is securely stored on Buukins' cloud systems (e.g., Firebase). We implement:</p>
            <ul className="policy-list">
              <li>User authentication</li>
              <li>Restricted access to unauthorized data</li>
              <li>Encryption of sensitive information</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">6. User Rights</h2>
            <p>You have the right to:</p>
            <ul className="policy-list">
              <li>View, edit, or delete your personal information</li>
              <li>Request account and associated data deletion</li>
              <li>Stop using the app anytime without unauthorized data retention</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2 className="section-title">7. Contact</h2>
            <p>If you have any questions or concerns regarding privacy, please contact us:</p>
            <div className="contact-info">
              <p>📧 <strong>Email</strong>: <a href="mailto:chuphuhai1993@gmail.com">chuphuhai1993@gmail.com</a></p>
              <p>🌐 <strong>Website</strong>: <a href="https://buukins.com" target="_blank" rel="noopener noreferrer">https://buukins.com</a></p>
            </div>
          </section>

          <section className="policy-section">
            <h2 className="section-title">8. Policy Updates</h2>
            <p>
              Buukins may update this privacy policy at any time. Notifications will be sent in-app for major changes. Users are encouraged to check regularly for the latest version.
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