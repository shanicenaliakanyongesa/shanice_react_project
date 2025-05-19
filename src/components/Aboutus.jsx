import React, { useState } from "react";
import CustomCarousel from "./Carousel"; // Make sure it has gym-themed images
import "../App.css";

const AboutUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ Data (Gym-Themed)
  const faqs = [
    {
      question: "What products do you offer at Gym Extreme?",
      answer:
        "We offer premium fitness equipment, supplements, gym apparel, resistance bands, protein powders, and much more.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes! We deliver our products worldwide. Shipping fees may vary depending on location.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You can return unused items within 30 days of delivery for a full refund, provided they are in original packaging.",
    },
    {
      question: "Are your supplements safe and tested?",
      answer:
        "All our supplements are third-party tested and certified for quality and safety.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes! Once your order is shipped, you’ll receive an email with a tracking number and link to follow your package.",
    },
  ];

  return (
    <div className="about-us">
      {/* Hero Section with Carousel */}
      <section className="hero-section mb-5">
        <CustomCarousel />
        <div className="hero-overlay"></div>
        <div className="hero-content text-white text-center">
          <h1 className="display-4 fw-bold">Welcome to Gym Extreme</h1>
          <p className="lead">Your one-stop shop for all things fitness!</p>
        </div>
      </section>

      {/* About Shop Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">About Gym Extreme</h2>
            <p className="lead text-muted">
              Your journey to better fitness starts here.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-10">
              <p className="fs-5">
                At <strong>Gym Extreme</strong>, we’re passionate about helping fitness enthusiasts reach their goals.
                Whether you're a seasoned bodybuilder or just starting out, we provide top-quality gear and supplements
                to fuel your workouts and lifestyle.
              </p>
              <p className="fs-5 mt-4">
                Our mission is to make high-performance fitness products accessible and affordable to everyone,
                with fast shipping, expert guidance, and unmatched customer service.
              </p>
              <p className="text-center mt-4 text-muted fs-6">
                Thank you for choosing Gym Extreme!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <h3 className="text-center fw-bold mb-5">Frequently Asked Questions</h3>

          {faqs.map((faq, index) => (
            <div key={index} className="accordion mb-3" id={`faqAccordion${index}`}>
              <div className="accordion-item shadow-sm border-0 rounded-3">
                <h2 className="accordion-header" id={`heading${index}`}>
                  <button
                    className={`accordion-button fw-semibold ${
                      openIndex !== index ? "collapsed" : ""
                    }`}
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`collapse${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div
                  id={`collapse${index}`}
                  className={`accordion-collapse collapse ${
                    openIndex === index ? "show" : ""
                  }`}
                  aria-labelledby={`heading${index}`}
                  data-bs-parent="#faqAccordionGroup"
                >
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;