import React from 'react';
import { FaRegCheckCircle, FaCog, FaCreditCard, FaTruck, FaRegCopyright, FaExclamationTriangle, FaGavel, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1>Terms of Service</h1>
      </header>

      <div className="terms-content">
        {/* Acceptance of Terms */}
        <section className="terms-section">
          <h2><FaRegCheckCircle /> 1. Acceptance of Terms</h2>
          <p>
            By accessing or using the services of <strong>Jaiswal Printers</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        {/* Services Provided */}
        <section className="terms-section">
          <h2><FaCog /> 2. Services Provided</h2>
          <p>
            <strong>Jaiswal Printers</strong> offers online printing services, including but not limited to business cards, brochures, and promotional materials. We reserve the right to modify or discontinue our services at any time without prior notice.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="terms-section">
          <h2><FaRegCheckCircle /> 3. User Responsibilities</h2>
          <ul>
            <li>Provide accurate and complete information during the order process.</li>
            <li>Use our services only for lawful purposes.</li>
            <li>Not engage in any activity that could damage, disable, or impair our website or interfere with other users' access.</li>
          </ul>
        </section>

        {/* Pricing and Payment */}
        <section className="terms-section">
          <h2><FaCreditCard /> 4. Pricing and Payment</h2>
          <p>
            All prices for our products and services are displayed on our website and are subject to change without notice. Payment must be made at the time of order placement, and you agree to provide accurate payment information.
          </p>
        </section>

        {/* Order Processing and Delivery */}
        <section className="terms-section">
          <h2><FaTruck /> 5. Order Processing and Delivery</h2>
          <p>
            We strive to process and deliver your orders promptly. However, we are not liable for any delays in delivery caused by circumstances beyond our control.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="terms-section">
          <h2><FaRegCopyright /> 6. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, and images, is the property of <strong>Jaiswal Printers</strong> and is protected by copyright and intellectual property laws. You may not reproduce or distribute any content without our prior written permission.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="terms-section">
          <h2><FaExclamationTriangle /> 7. Limitation of Liability</h2>
          <p>
            In no event shall <strong>Jaiswal Printers</strong> be liable for any indirect, incidental, or consequential damages arising out of or in connection with your use of our services.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="terms-section">
          <h2><FaRegCheckCircle /> 8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes your acceptance of the new terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className="terms-section">
          <h2><FaGavel /> 9. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of [Insert Jurisdiction].
          </p>
        </section>

        {/* Contact Us */}
        <section className="terms-section">
          <h2><FaPhoneAlt /> 10. Contact Us</h2>
          <p>If you have any questions or concerns regarding these Terms of Service, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> jaiswaloffset@gmail.com</li>
            <li><strong>Phone:</strong> 9827274100, 9425174803</li>
            <li><strong>Address:</strong> New Shukarwari Bazar, Gandhi ward, Dist. Seoni (M.P.)</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
