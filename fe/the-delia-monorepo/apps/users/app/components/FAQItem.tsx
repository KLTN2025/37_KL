/* eslint-disable @typescript-eslint/no-unused-vars */
// app/components/FAQItem.tsx
'use client';

import { useState } from 'react';
import styles from './FAQItem.module.css';

interface FAQItemProps {
  question: string;
  answer: string;
  index: string;
  isOpen: boolean;
  toggleFAQ: (index: string) => void;
}

export default function FAQItem({ question, answer, index, isOpen, toggleFAQ }: FAQItemProps) {
  return (
    <div
      className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
      onClick={() => toggleFAQ(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          toggleFAQ(index);
        }
      }}
      aria-expanded={isOpen}
    >
      <div className={styles.faqQuestion}>
        <span>{question}</span>
        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </div>
      {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
    </div>
  );
}