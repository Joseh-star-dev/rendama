"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Who can use Rendama?",
    answer:
      "Rendama is designed for landlords, property managers, and chama groups who want to manage finances and operations digitally.",
  },
  {
    question: "Does Rendama send rent reminders?",
    answer:
      "Yes. Rendama allows you to send automated rent reminders and notifications to tenants.",
  },
  {
    question: "Can chama members see contributions?",
    answer:
      "Yes. Members can track contributions, payouts, and financial records for full transparency.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Absolutely. Rendama uses secure authentication and protected database storage to safeguard your information.",
  },
  {
    question: "Can I manage multiple properties?",
    answer:
      "Yes. You can manage multiple properties, units, and tenants from one dashboard.",
  },
  {
    question: "Is Rendama suitable for small chama groups?",
    answer:
      "Yes. Whether your chama has 5 members or 50, Rendama adapts to your needs.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
