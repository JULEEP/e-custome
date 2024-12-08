import React from 'react';
import { FaLock, FaEnvelope, FaPhoneAlt, FaBuilding } from 'react-icons/fa';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-content">
      <header className="privacy-header">
        <h1>Privacy Policy</h1>
      </header>

      {/* Privacy Overview */}
      <section className="privacy-section">
        <h2><FaLock /> 1. Privacy Overview</h2>
        <p>
          At <strong>Jaiswal Printers</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>
      </section>

      {/* Information Collection */}
      <section className="privacy-section">
        <h2><FaLock /> 2. Information We Collect</h2>
        <p>
          We may collect personal information that you provide directly to us when you:
        </p>
        <ul>
          <li>Create an account</li>
          <li>Place an order</li>
          <li>Contact customer service</li>
          <li>Subscribe to our newsletter</li>
        </ul>
        <p>This information may include:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Shipping address</li>
          <li>Payment information</li>
        </ul>
      </section>

      {/* How We Use Your Information */}
      <section className="privacy-section">
        <h2><FaLock /> 3. How We Use Your Information</h2>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To communicate with you regarding your order</li>
          <li>To improve our website and services</li>
          <li>To send you promotional materials and updates (if you opt-in)</li>
        </ul>
      </section>

      {/* Disclosure of Information */}
      <section className="privacy-section">
        <h2><FaLock /> 4. Disclosure of Your Information</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share your information with:
        </p>
        <ul>
          <li>Service providers who assist in fulfilling your orders (e.g., payment processors, shipping companies)</li>
          <li>Law enforcement or regulatory agencies if required by law</li>
        </ul>
      </section>

      {/* Data Security */}
      <section className="privacy-section">
        <h2><FaLock /> 5. Data Security</h2>
        <p>
          We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use encryption and secure server technology to safeguard your data.
        </p>
      </section>

      {/* Your Rights */}
      <section className="privacy-section">
        <h2><FaLock /> 6. Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at <strong>[Insert Contact Email]</strong>.
        </p>
      </section>

      {/* Changes to Privacy Policy */}
      <section className="privacy-section">
        <h2><FaLock /> 7. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website with a revised effective date.
        </p>
      </section>

      {/* Contact Us */}
      <section className="privacy-section">
        <h2><FaPhoneAlt /> 8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <ul>
          <li><strong>Email:</strong> jaiswaloffset@gmail.com</li>
          <li><strong>Office Phone:</strong> 07692-224203</li>
          <li><strong>Mobile:</strong> 9827274100, 9425174803</li>
          <li><strong>Website:</strong> <a href="https://jaiswaloffset.com" target="_blank" rel="noopener noreferrer">jaiswaloffset.com</a></li>
          <li><strong>Customer Care:</strong> 9827274100</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
