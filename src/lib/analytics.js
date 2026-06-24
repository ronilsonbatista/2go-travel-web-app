// 2GO Travel Growth Analytics & Tracking utility (GTM, Meta Pixel, GA4, Google Ads)

export function trackEvent(eventName, details = {}) {
  // Always log to console in development mode
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c[Analytics Event] ${eventName}`, 'color: #FF5A1F; font-weight: bold; font-size: 11px;', details);
  }

  // Safe window checkout (Client-side execution only)
  if (typeof window === 'undefined') return;

  // 1. Google Tag Manager (GTM)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    timestamp: new Date().toISOString(),
    ...details
  });

  // 2. Meta Pixel (Facebook)
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, details);
  }

  // 3. Google Analytics (GA4) / Google Ads (gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, details);
  }
}

export function trackPageView(pageType, slug = '') {
  trackEvent('view_page', {
    page_type: pageType,
    page_slug: slug,
    url: typeof window !== 'undefined' ? window.location.href : ''
  });
}

export function trackLeadCapture(type, email, data = {}) {
  trackEvent('lead_capture', {
    lead_type: type, // 'newsletter', 'checklist', 'pdf_guide', 'planner_unlock', 'premium_request'
    lead_email: email,
    ...data
  });
}

export function trackClickWhatsApp(destination) {
  trackEvent('click_whatsapp', {
    destination: destination || 'global'
  });
}

export function trackClickGenerateItinerary(destination) {
  trackEvent('click_generate_itinerary', {
    destination: destination || 'global'
  });
}

export function trackDownloadPDF(destination, type) {
  trackEvent('download_pdf', {
    destination: destination || 'general',
    pdf_type: type // 'guide', 'checklist'
  });
}

export function trackClickPremiumRequest(destination) {
  trackEvent('premium_request', {
    destination: destination || 'global'
  });
}

export function trackHotelClick(hotelName, partner) {
  trackEvent('hotel_click', {
    hotel_name: hotelName,
    partner: partner
  });
}

export function trackTourClick(tourName, partner) {
  trackEvent('tour_click', {
    tour_name: tourName,
    partner: partner
  });
}

export function trackInsuranceClick(planName, partner) {
  trackEvent('insurance_click', {
    plan_name: planName,
    partner: partner
  });
}

export function trackCarClick(carType, partner) {
  trackEvent('car_click', {
    car_type: carType,
    partner: partner
  });
}

export function trackPremiumSelect(planName) {
  trackEvent('premium_select', {
    plan_name: planName
  });
}

export function trackPremiumCheckout(planName, paymentMethod, status) {
  trackEvent('premium_checkout', {
    plan_name: planName,
    payment_method: paymentMethod,
    status: status
  });
}

export function trackAppDownload(source) {
  trackEvent('app_download', {
    source: source || 'global'
  });
}

