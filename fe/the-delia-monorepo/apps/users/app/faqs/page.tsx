// app/faqs/page.tsx
import styles from './page.module.css';
import HeaderWrapper from '../components/HeaderWrapper';
import FloatingIcons from '../components/FloatingIcons';
import { getMessages, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import FAQClient from './FAQClient';

// Define FAQ structure
type FAQQuestion = { question: string; answer: string };
type FAQCategory = { category: string; questions: FAQQuestion[] };

export default async function FAQPage({ params, searchParams }: { params: { locale: string }; searchParams: { page?: string } }) {
  // Fetch translations server-side
  const messages = await getMessages({ locale: params.locale });
  const tFAQs = await getTranslations('FAQs');
  const tHome = await getTranslations('Home'); // Use Home namespace for footer translations

  // Define all FAQs (for all pages)
  const faqs: FAQCategory[] = [
    // Page 1: Existing categories
    {
      category: tFAQs('productInfoCategory'),
      questions: [
        { question: tFAQs('sizeQuestion'), answer: tFAQs('sizeAnswer') },
        { question: tFAQs('customizationFeeQuestion'), answer: tFAQs('customizationFeeAnswer') },
        { question: tFAQs('customDesignQuestion'), answer: tFAQs('customDesignAnswer') },
        { question: tFAQs('shortPantsQuestion'), answer: tFAQs('shortPantsAnswer') },
        { question: tFAQs('madeToMeasureVsBespokeQuestion'), answer: tFAQs('madeToMeasureVsBespokeAnswer') },
        { question: tFAQs('careInstructionsQuestion'), answer: tFAQs('careInstructionsAnswer') },
      ],
    },
    {
      category: tFAQs('returnsCategory'),
      questions: [
        { question: tFAQs('returnQuestion'), answer: tFAQs('returnAnswer') },
        { question: tFAQs('returnShippingFeeQuestion'), answer: tFAQs('returnShippingFeeAnswer') },
      ],
    },
    // Page 2: Shipping and Delivery, Payment, Taxes, and Customs
    {
      category: tFAQs('shippingDeliveryCategory'),
      questions: [
        { question: tFAQs('shippingOptionsQuestion'), answer: tFAQs('shippingOptionsAnswer') },
        { question: tFAQs('shippingCostQuestion'), answer: tFAQs('shippingCostAnswer') },
        { question: tFAQs('changeAddressQuestion'), answer: tFAQs('changeAddressQuestion') },
        { question: tFAQs('internationalShippingQuestion'), answer: tFAQs('internationalShippingAnswer') },
        { question: tFAQs('trackOrderQuestion'), answer: tFAQs('trackOrderAnswer') },
        { question: tFAQs('deliveryTimeQuestion'), answer: tFAQs('deliveryTimeAnswer') },
        { question: tFAQs('internationalDeliverySupportQuestion'), answer: tFAQs('internationalDeliverySupportAnswer') },
      ],
    },
    {
      category: tFAQs('paymentTaxesCustomsCategory'),
      questions: [
        { question: tFAQs('paymentMethodsQuestion'), answer: tFAQs('paymentMethodsAnswer') },
        { question: tFAQs('taxesCustomsQuestion'), answer: tFAQs('taxesCustomsAnswer') },
        { question: tFAQs('costCoveredQuestion'), answer: tFAQs('costCoveredAnswer') },
      ],
    },
    // Page 3: Order Process
    {
      category: tFAQs('orderProcessCategory'),
      questions: [
        { question: tFAQs('placeOrderQuestion'), answer: tFAQs('placeOrderAnswer') },
        { question: tFAQs('orderConfirmationQuestion'), answer: tFAQs('orderConfirmationAnswer') },
        { question: tFAQs('cancelOrderQuestion'), answer: tFAQs('cancelOrderAnswer') },
      ],
    },
    {
      category: tFAQs('orderIssuesCategory'),
      questions: [
        { question: tFAQs('wrongItemQuestion'), answer: tFAQs('wrongItemAnswer') },
        { question: tFAQs('damagedItemQuestion'), answer: tFAQs('damagedItemAnswer') },
      ],
    },
    // Page 4: Product Care
    {
      category: tFAQs('productCareCategory'),
      questions: [
        { question: tFAQs('washSilkQuestion'), answer: tFAQs('washSilkAnswer') },
        { question: tFAQs('storeGarmentsQuestion'), answer: tFAQs('storeGarmentsAnswer') },
        { question: tFAQs('removeStainsQuestion'), answer: tFAQs('removeStainsAnswer') },
      ],
    },
    {
      category: tFAQs('fabricCareCategory'),
      questions: [
        { question: tFAQs('cashmereCareQuestion'), answer: tFAQs('cashmereCareAnswer') },
        { question: tFAQs('linenCareQuestion'), answer: tFAQs('linenCareAnswer') },
      ],
    },
    // Page 5: Customization Details
    {
      category: tFAQs('customizationDetailsCategory'),
      questions: [
        { question: tFAQs('fabricOptionsQuestion'), answer: tFAQs('fabricOptionsAnswer') },
        { question: tFAQs('turnaroundTimeQuestion'), answer: tFAQs('turnaroundTimeAnswer') },
        { question: tFAQs('designConsultationQuestion'), answer: tFAQs('designConsultationAnswer') },
      ],
    },
    {
      category: tFAQs('customizationLimitsCategory'),
      questions: [
        { question: tFAQs('designChangeQuestion'), answer: tFAQs('designChangeAnswer') },
        { question: tFAQs('sizeAdjustmentQuestion'), answer: tFAQs('sizeAdjustmentAnswer') },
      ],
    },
    // Page 6: Store Policies
    {
      category: tFAQs('storePoliciesCategory'),
      questions: [
        { question: tFAQs('warrantyQuestion'), answer: tFAQs('warrantyAnswer') },
        { question: tFAQs('privacyPolicyQuestion'), answer: tFAQs('privacyPolicyAnswer') },
        { question: tFAQs('returnPolicyDetailsQuestion'), answer: tFAQs('returnPolicyDetailsAnswer') },
      ],
    },
    {
      category: tFAQs('giftCardsCategory'),
      questions: [
        { question: tFAQs('giftCardQuestion'), answer: tFAQs('giftCardAnswer') },
        { question: tFAQs('giftCardUseQuestion'), answer: tFAQs('giftCardUseAnswer') },
      ],
    },
    // Page 7: Customer Support
    {
      category: tFAQs('customerSupportCategory'),
      questions: [
        { question: tFAQs('contactSupportQuestion'), answer: tFAQs('contactSupportAnswer') },
        { question: tFAQs('supportHoursQuestion'), answer: tFAQs('supportHoursAnswer') },
        { question: tFAQs('responseTimeQuestion'), answer: tFAQs('responseTimeAnswer') },
      ],
    },
    {
      category: tFAQs('feedbackCategory'),
      questions: [
        { question: tFAQs('submitFeedbackQuestion'), answer: tFAQs('submitFeedbackAnswer') },
        { question: tFAQs('complaintProcessQuestion'), answer: tFAQs('complaintProcessAnswer') },
      ],
    },
    // Page 8: International Orders
    {
      category: tFAQs('internationalOrdersCategory'),
      questions: [
        { question: tFAQs('currencyQuestion'), answer: tFAQs('currencyAnswer') },
        { question: tFAQs('languageSupportQuestion'), answer: tFAQs('languageSupportAnswer') },
        { question: tFAQs('internationalReturnsQuestion'), answer: tFAQs('internationalReturnsAnswer') },
      ],
    },
    {
      category: tFAQs('importDutiesCategory'),
      questions: [
        { question: tFAQs('importDutiesQuestion'), answer: tFAQs('importDutiesAnswer') },
        { question: tFAQs('dutyResponsibilityQuestion'), answer: tFAQs('dutyResponsibilityAnswer') },
      ],
    },
    // Page 9: Promotions and Discounts
    {
      category: tFAQs('promotionsCategory'),
      questions: [
        { question: tFAQs('discountCodeQuestion'), answer: tFAQs('discountCodeAnswer') },
        { question: tFAQs('promotionEligibilityQuestion'), answer: tFAQs('promotionEligibilityAnswer') },
        { question: tFAQs('combineOffersQuestion'), answer: tFAQs('combineOffersAnswer') },
      ],
    },
    {
      category: tFAQs('loyaltyProgramCategory'),
      questions: [
        { question: tFAQs('loyaltyProgramQuestion'), answer: tFAQs('loyaltyProgramAnswer') },
        { question: tFAQs('earnPointsQuestion'), answer: tFAQs('earnPointsAnswer') },
      ],
    },
    // Page 10: Events and Collaborations
    {
      category: tFAQs('eventsCategory'),
      questions: [
        { question: tFAQs('fashionShowParticipationQuestion'), answer: tFAQs('fashionShowParticipationAnswer') },
        { question: tFAQs('eventTicketsQuestion'), answer: tFAQs('eventTicketsAnswer') },
        { question: tFAQs('eventScheduleQuestion'), answer: tFAQs('eventScheduleAnswer') },
      ],
    },
    {
      category: tFAQs('collaborationsCategory'),
      questions: [
        { question: tFAQs('collaborationQuestion'), answer: tFAQs('collaborationAnswer') },
        { question: tFAQs('designerPartnershipQuestion'), answer: tFAQs('designerPartnershipAnswer') },
      ],
    },
  ];

  // Pagination logic
  const itemsPerPage = 2; // 2 categories per page
  const totalItems = faqs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = faqs.slice(startIndex, endIndex);

  // Generate pagination buttons
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <Link key={i} href={`/faqs?page=${i}`}>
        <button className={i === currentPage ? styles.active : ''}>{i}</button>
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <HeaderWrapper locale={params.locale} messages={messages} />
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h1>{tFAQs('title')}</h1>
        </div>
        <FAQClient faqs={currentFaqs} />
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <Link href={`/faqs?page=${currentPage - 1}`}>
              <button>&lt;</button>
            </Link>
          )}
          {paginationButtons}
          {currentPage < totalPages && (
            <Link href={`/faqs?page=${currentPage + 1}`}>
              <button>&gt;</button>
            </Link>
          )}
          <span>{currentPage}/{totalPages} page</span>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerLogo}>
            <Image
              src="/logo-couture.png"
              alt="Couture Logo"
              width={120}
              height={40}
            />
            <p className={styles.tagline}>{tHome('footerTagline')}</p>
          </div>
          <div className={styles.footerColumn}>
            <h3>{tHome('footerCustomerService')}</h3>
            <ul>
              <li>
                <Link href="/lien-he">{tHome('footerContact')}</Link>
              </li>
              <li>
                <Link href="/faqs">{tHome('footerFAQs')}</Link>
              </li>
              <li>
                <Link href="/dia-chi">{tHome('footerLocations')}</Link>
              </li>
              <li>
                <Link href="/chinh-sach">{tHome('footerPolicies')}</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>{tHome('footerAbout')}</h3>
            <ul>
              <li>
                <Link href="/the-delia-couture">{tHome('footerHistory')}</Link>
              </li>
              <li>
                <Link href="/khach-hang">{tHome('footerClients')}</Link>
              </li>
              <li>
                <Link href="/chuyen-mon">{tHome('footerExpertise')}</Link>
              </li>
              <li>
                <Link href="/bao-chi">{tHome('footerPress')}</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>{tHome('footerHighlights')}</h3>
            <ul>
              <li>
                <Link href="/ky-niem">{tHome('footerMilestones')}</Link>
              </li>
              <li>
                <Link href="/earth-essence">{tHome('footerEarthEssence')}</Link>
              </li>
              <li>
                <Link href="/simplicity">{tHome('footerSimplicity')}</Link>
              </li>
              <li>
                <Link href="/fashion-show">{tHome('footerFashionShow')}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerSocial}>
          <h3>{tHome('footerCommunity')}</h3>
        </div>
        <div className={styles.footerBottom}>
          <p>{tHome('footerCopyright')}</p>
        </div>
      </footer>
      <FloatingIcons />
    </div>
  );
}