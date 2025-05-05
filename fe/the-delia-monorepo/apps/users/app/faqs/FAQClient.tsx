'use client';

import { useState } from 'react';
import styles from './page.module.css';
import FAQItem from '../components/FAQItem';

type FAQQuestion = { question: string; answer: string };
type FAQCategory = { category: string; questions: FAQQuestion[] };

export default function FAQClient({ faqs }: { faqs: FAQCategory[] }) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {faqs.map((faqCategory, catIndex) => (
        <div key={catIndex} className={styles.faqCategory}>
          <h2>{faqCategory.category}</h2>
          {faqCategory.questions.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={`${catIndex}-${index}`}
              isOpen={openFAQ === `${catIndex}-${index}`}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
      ))}
    </>
  );
}