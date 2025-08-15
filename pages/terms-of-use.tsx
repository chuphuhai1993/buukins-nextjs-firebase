import { NextPage } from 'next';
import Head from 'next/head';

const TermsOfUsePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terms of Use - Buukins</title>
        <meta name="description" content="Terms of use for Buukins application - service terms and conditions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="terms-container">
        <div className="terms-content">
          <header className="terms-header">
            <h1 className="terms-title">📜 Terms of Use – Buukins App</h1>
            <p className="terms-date"><strong>Last Updated:</strong> 31/07/2025</p>
            <p className="terms-intro">
              These Terms of Use ("Terms") govern your use of the Buukins mobile application ("App") and services ("Services") provided by Buukins ("we," "our," "us"). By downloading, accessing, or using the App, you agree to these Terms. If you do not agree, you must not use the App.
            </p>
          </header>

          <hr className="terms-divider" />

          <section className="terms-section">
            <h2 className="section-title">1. Eligibility</h2>
            <p>
              You must be at least 13 years old to use Buukins. If you are under 18, you must have the consent of a parent or legal guardian.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">2. Account Registration</h2>
            <ul className="terms-list">
              <li>To access certain features, you must create an account by providing accurate and complete information.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</li>
              <li>You agree to notify us immediately of any unauthorized use of your account.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="section-title">3. Subscriptions & Payments</h2>
            <ul className="terms-list">
              <li>Buukins offers free and paid subscription plans (Pro, Premium) via Apple's In‑App Purchase system.</li>
              <li>Subscriptions automatically renew unless canceled at least 24 hours before the end of the current billing cycle.</li>
              <li>Payment is charged to your Apple ID at confirmation of purchase.</li>
              <li>You may manage or cancel your subscription in your Apple ID account settings.</li>
              <li>All fees are non‑refundable except where required by law.</li>
            </ul>
            <p className="terms-note">
              For more details on auto‑renewable subscriptions, see Apple's policies in App Store Connect.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">4. Acceptable Use</h2>
            <ul className="terms-list">
              <li>Do not use the App for any unlawful purpose.</li>
              <li>Do not post or transmit any content that is offensive, harmful, or violates third‑party rights.</li>
              <li>Do not attempt to interfere with the security, functionality, or performance of the App.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="section-title">5. Content Ownership</h2>
            <p>
              You retain ownership of the content you create and upload to Buukins. By posting content, you grant Buukins a non‑exclusive, worldwide, royalty‑free license to use, display, and distribute your content solely for operating and promoting the Services.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">6. Data & Privacy</h2>
            <p>
              Your use of the App is subject to our <a href="/privacy-policy-buukins" className="terms-link">Privacy Policy</a>, which explains how we collect, use, and store your information.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">7. Account Deletion</h2>
            <p>
              You can delete your account and associated data at any time through the account settings in the App. Deleting your account is permanent and cannot be undone.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">8. Service Changes & Termination</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the App at any time without notice. We may also terminate your access if you violate these Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Buukins will not be liable for any indirect, incidental, or consequential damages arising from your use of the App.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">10. Governing Law</h2>
            <p>
              These Terms are governed by the laws of Vietnam, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="section-title">11. Contact</h2>
            <p>For any questions about these Terms, contact us:</p>
            <div className="contact-info">
              <p>📧 <strong>Email</strong>: <a href="mailto:chuphuhai1993@gmail.com">chuphuhai1993@gmail.com</a></p>
              <p>🌐 <strong>Website</strong>: <a href="https://buukins.com" target="_blank" rel="noopener noreferrer">https://buukins.com</a></p>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">12. Apple Standard EULA</h2>
            <p>
              If you choose to rely on Apple's Standard EULA, see: <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noopener noreferrer" className="terms-link">https://www.apple.com/legal/internet-services/itunes/dev/stdeula/</a>
            </p>
          </section>
        </div>
      </div>

      <style jsx>{`
        .terms-container {
          min-height: 100vh;
          background: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .terms-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 40px;
          line-height: 1.6;
          color: #333;
        }

        .terms-header {
          margin-bottom: 30px;
        }

        .terms-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .terms-date {
          color: #718096;
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .terms-intro {
          font-size: 1.1rem;
          color: #4a5568;
          margin-bottom: 20px;
        }

        .terms-divider {
          border: none;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          margin: 40px 0;
        }

        .terms-section {
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

        .terms-list {
          list-style: none;
          padding-left: 0;
        }

        .terms-list li {
          margin-bottom: 12px;
          padding-left: 20px;
          position: relative;
        }

        .terms-list li:before {
          content: "•";
          color: #667eea;
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .terms-note {
          font-size: 0.9rem;
          color: #718096;
          font-style: italic;
          margin-top: 15px;
          padding: 10px;
          background: #f7fafc;
          border-radius: 6px;
          border-left: 3px solid #667eea;
        }

        .terms-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        .contact-info {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
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
          .terms-container {
            padding: 10px;
          }

          .terms-content {
            padding: 20px;
          }

          .terms-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default TermsOfUsePage;
