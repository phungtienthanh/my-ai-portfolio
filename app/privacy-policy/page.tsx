"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8faf6] via-[#f0f5f0] to-[#e8f1eb]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-12">Last updated: February 2026</p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a personal portfolio website designed to showcase my professional work and experience. I respect your privacy and am committed to being transparent about how I collect and use information from visitors.
            </p>
          </section>

          {/* Data Collection */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What Data Do We Collect?</h2>

            <div className="space-y-6">
              {/* Analytics */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">📊 Analytics Data</h3>
                <p className="text-gray-700 mb-3">
                  We use <strong>Vercel Analytics</strong> to understand how visitors interact with this portfolio.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                  <li>Pages viewed and time spent on each page</li>
                  <li>Device type (mobile, desktop, tablet)</li>
                  <li>Browser type and operating system</li>
                  <li>Geographic location (country level)</li>
                  <li>Traffic source (direct, search, social, etc.)</li>
                </ul>
                <p className="text-gray-600 text-sm mt-3">
                  <strong>Privacy:</strong> No personal data (names, emails) is collected through analytics. We do not use tracking cookies.
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">📧 Contact Form Data</h3>
                <p className="text-gray-700 mb-3">
                  When you submit the contact form, we collect:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-2">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Message subject and content</li>
                  <li>Phone number (optional)</li>
                </ul>
                <p className="text-gray-600 text-sm mt-3">
                  <strong>Usage:</strong> This data is used exclusively to respond to your inquiry. Your email address is used as a contact point only.
                </p>
              </div>

              {/* No Cookies */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">🍪 Cookies</h3>
                <p className="text-gray-700">
                  This website does <strong>not use tracking cookies</strong> or any form of persistent tracking. The website functions normally without cookies, and analytics tracking does not require cookie consent.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How Long Do We Keep Your Data?</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Analytics Data:</strong> Retained by Vercel Analytics for 30 days, then aggregated and archived.
              </p>
              <p>
                <strong>Contact Form Data:</strong> Email messages are kept in the inbox for reference and follow-up purposes. You can request deletion at any time.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">How Is Your Data Protected?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All data transmission uses HTTPS encryption</li>
              <li>Contact form data is processed through Gmail with built-in security</li>
              <li>Analytics data is processed by Vercel, a trusted provider</li>
              <li>No data is shared with third parties</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Under Vietnamese data protection law (PDPA 2024) and international standards, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access the data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to the processing of your data</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise any of these rights, please contact: <strong>phungtienthanh2004@gmail.com</strong>
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🌐 Vercel Analytics</h3>
                <p className="text-gray-700">
                  Provides analytics and performance monitoring. <a href="https://vercel.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vercel Privacy Policy</a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📧 Gmail</h3>
                <p className="text-gray-700">
                  Used to send and receive contact form messages. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔗 External Links</h3>
                <p className="text-gray-700">
                  This site may contain links to social media profiles (GitHub, LinkedIn). These are external services with their own privacy policies.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-3">
              If you have questions about this Privacy Policy or how we handle your data, please contact:
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> phungtienthanh2004@gmail.com
            </p>
          </section>

          {/* Changes */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              I may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of this website constitutes acceptance of any changes.
            </p>
          </section>

          {/* Footer */}
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600">
              © 2026 Phùng Tiến Thành. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
