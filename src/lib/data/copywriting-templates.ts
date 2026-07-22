export const salesObjectives = [
  { id: 'lead_gen', label: 'Menambah Leads (Lead Gen)' },
  { id: 'engagement', label: 'Meningkatkan Engagement' },
  { id: 'survey', label: 'Mengajak Survey Lokasi' },
  { id: 'open_house', label: 'Mengajak Open House' },
  { id: 'closing', label: 'Fokus Closing / Promo' },
  { id: 'follow_up', label: 'Follow Up Prospek' },
  { id: 'trust', label: 'Membangun Trust (Edukasi)' },
  { id: 'reactivation', label: 'Reaktivasi Lead Lama' },
  { id: 'personal_brand', label: 'Personal Branding Sales' },
  { id: 'referral', label: 'Meminta Referral / Testimoni' }
];

export const copywritingCategories = [
  { id: 'social_media', label: 'Social Media Copywriting', objectives: ['lead_gen', 'engagement', 'trust', 'open_house', 'closing'] },
  { id: 'sales_copy', label: 'Sales Copywriting (WA/Chat)', objectives: ['follow_up', 'survey', 'closing', 'reactivation', 'referral'] },
  { id: 'advertising', label: 'Advertising (Iklan)', objectives: ['lead_gen', 'closing', 'open_house'] },
  { id: 'landing_page', label: 'Landing Page Copy', objectives: ['lead_gen', 'trust', 'closing'] },
  { id: 'property_promo', label: 'Property Marketing & Promo', objectives: ['closing', 'open_house', 'survey'] },
  { id: 'lead_magnet', label: 'Lead Generation Content', objectives: ['lead_gen', 'trust'] },
  { id: 'personal_brand', label: 'Personal Branding Sales', objectives: ['personal_brand', 'trust'] },
  { id: 'relationship', label: 'Relationship & After Sales', objectives: ['referral', 'follow_up', 'trust'] },
  { id: 'objection', label: 'Objection Handling', objectives: ['follow_up', 'closing', 'survey'] },
  { id: 'framework', label: 'Custom Framework (AIDA, PAS)', objectives: ['lead_gen', 'closing', 'engagement'] }
];

export const copywritingTypes: Record<string, { id: string; label: string }[]> = {
  social_media: [
    { id: 'ig_caption', label: 'Instagram Caption' },
    { id: 'fb_caption', label: 'Facebook Caption' },
    { id: 'tiktok_caption', label: 'TikTok Caption' },
    { id: 'threads_post', label: 'Threads Post' },
    { id: 'linkedin_post', label: 'LinkedIn Post' },
    { id: 'carousel', label: 'Carousel Copy (Slide IG)' },
    { id: 'story', label: 'Story Content' },
    { id: 'reels_hook', label: 'Reels Hook (3 Detik Pertama)' },
    { id: 'video_script', label: 'Video Script Pendek' },
    { id: 'short_cta', label: 'Short Video CTA' }
  ],
  sales_copy: [
    { id: 'wa_broadcast', label: 'WhatsApp Broadcast' },
    { id: 'wa_followup', label: 'WhatsApp Follow Up' },
    { id: 'first_contact', label: 'First Contact Message' },
    { id: 're_engagement', label: 'Re-engagement Lead Dingin' },
    { id: 'survey_invite', label: 'Survey Invitation' },
    { id: 'booking_remind', label: 'Booking Reminder' },
    { id: 'closing_msg', label: 'Closing Message' },
    { id: 'testi_req', label: 'Testimoni Request' },
    { id: 'referral_req', label: 'Referral Request' },
    { id: 'after_sales', label: 'After Sales Follow Up' }
  ],
  advertising: [
    { id: 'fb_primary', label: 'Facebook Ads Primary Text' },
    { id: 'fb_headline', label: 'Facebook Headline' },
    { id: 'fb_desc', label: 'Facebook Description' },
    { id: 'ig_ads', label: 'Instagram Ads' },
    { id: 'search_ads', label: 'Google Search Ads' },
    { id: 'display_ads', label: 'Google Display Ads' },
    { id: 'tiktok_ads', label: 'TikTok Ads' },
    { id: 'yt_script', label: 'YouTube Ads Script' },
    { id: 'banner_ads', label: 'Banner Ads Copy' },
    { id: 'cta_gen', label: 'CTA Generator' }
  ],
  landing_page: [
    { id: 'lp_hero', label: 'Hero Section' },
    { id: 'lp_headline', label: 'Headline Generator' },
    { id: 'lp_subhead', label: 'Subheadline' },
    { id: 'lp_benefit', label: 'Benefit Section' },
    { id: 'lp_feature', label: 'Feature Section' },
    { id: 'lp_faq', label: 'FAQ Section' },
    { id: 'lp_testi', label: 'Testimonial Section' },
    { id: 'lp_closing', label: 'Closing Section' },
    { id: 'lp_cta', label: 'CTA Section' },
    { id: 'lp_seo', label: 'Meta Description SEO' }
  ],
  property_promo: [
    { id: 'launching', label: 'Launching Promo' },
    { id: 'limited_promo', label: 'Limited Promo' },
    { id: 'open_house', label: 'Open House Copy' },
    { id: 'event_invite', label: 'Event Invitation' },
    { id: 'grand_open', label: 'Grand Opening' },
    { id: 'promo_dp', label: 'Promo DP 0%' },
    { id: 'promo_cashback', label: 'Promo Cashback' },
    { id: 'promo_bphtb', label: 'Promo Free BPHTB' },
    { id: 'promo_cicilan', label: 'Promo Subsidi Cicilan' },
    { id: 'promo_kpr', label: 'Promo KPR Bank' }
  ],
  lead_magnet: [
    { id: 'lm_copy', label: 'Lead Magnet Copy' },
    { id: 'ebook_sales', label: 'Ebook Sales Page' },
    { id: 'webinar', label: 'Webinar Invitation' },
    { id: 'seminar', label: 'Seminar Invitation' },
    { id: 'registration', label: 'Registration Page' },
    { id: 'form_head', label: 'Form Headline' },
    { id: 'quiz', label: 'Quiz Landing Page' },
    { id: 'giveaway', label: 'Giveaway Campaign' },
    { id: 'checklist', label: 'Checklist PDF Offer' },
    { id: 'free_consult', label: 'Free Consultation Offer' }
  ],
  personal_brand: [
    { id: 'intro', label: 'Personal Introduction' },
    { id: 'bio_ig', label: 'Bio Instagram' },
    { id: 'bio_tiktok', label: 'Bio TikTok' },
    { id: 'bio_linkedin', label: 'LinkedIn Summary' },
    { id: 'personal_story', label: 'Personal Story' },
    { id: 'daily_insight', label: 'Daily Insight' },
    { id: 'edu_content', label: 'Educational Content' },
    { id: 'authority', label: 'Authority Content' },
    { id: 'trust_post', label: 'Trust Building Post' },
    { id: 'achievement', label: 'Achievement Post' }
  ],
  relationship: [
    { id: 'birthday', label: 'Birthday Greeting' },
    { id: 'holiday', label: 'Holiday Greeting' },
    { id: 'thank_you', label: 'Thank You Message' },
    { id: 'appreciation', label: 'Customer Appreciation' },
    { id: 'anniversary', label: 'Anniversary Customer' },
    { id: 'welcome', label: 'Welcome Message' },
    { id: 'survey_thanks', label: 'Survey Thank You' },
    { id: 'post_survey', label: 'Follow-up setelah Survey' },
    { id: 'post_booking', label: 'Follow-up setelah Booking' },
    { id: 'post_akad', label: 'Follow-up setelah Akad' }
  ],
  objection: [
    { id: 'obj_mahal', label: 'Harga Mahal' },
    { id: 'obj_banding', label: 'Mau Bandingkan Dulu' },
    { id: 'obj_yakin', label: 'Belum Yakin' },
    { id: 'obj_pasangan', label: 'Menunggu Pasangan' },
    { id: 'obj_ortu', label: 'Menunggu Orang Tua' },
    { id: 'obj_kpr', label: 'Menunggu Approval KPR' },
    { id: 'obj_jauh', label: 'Lokasi Jauh' },
    { id: 'obj_kontrak', label: 'Masih Kontrak Rumah' },
    { id: 'obj_dp', label: 'Belum Ada DP' },
    { id: 'obj_nanti', label: 'Nanti Dulu / Tunda' }
  ],
  framework: [
    { id: 'aida', label: 'AIDA (Attention, Interest, Desire, Action)' },
    { id: 'pas', label: 'PAS (Problem, Agitate, Solution)' },
    { id: 'bab', label: 'BAB (Before, After, Bridge)' },
    { id: 'fab', label: 'FAB (Features, Advantages, Benefits)' },
    { id: 'storybrand', label: 'StoryBrand' },
    { id: '4p', label: '4P (Picture, Promise, Prove, Push)' },
    { id: 'quest', label: 'QUEST (Qualify, Understand, Educate, Stimulate, Transition)' },
    { id: 'golden_circle', label: 'Golden Circle (Why, How, What)' },
    { id: 'prob_sol', label: 'Problem & Solution' }
  ]
};

export const copywritingTones = [
  'Profesional & Elegan',
  'Santai & Ramah (Friendly)',
  'Mendesak (Urgency/FOMO)',
  'Informatif & Edukatif',
  'Persuasif & Hard Selling',
  'Storytelling (Emosional)'
];
