export const salesObjectives = [
  { id: 'lead_gen', label: 'Menambah Leads (Lead Generation)' },
  { id: 'engagement', label: 'Meningkatkan Engagement & Trust' },
  { id: 'survey', label: 'Mengajak Survey Lokasi' },
  { id: 'open_house', label: 'Mengajak Open House / Event' },
  { id: 'closing', label: 'Fokus Closing & Promo Spesia' },
  { id: 'follow_up', label: 'Follow Up Prospek & Reaktivasi' },
  { id: 'referral', label: 'Meminta Referral / Testimoni' }
];

export const mainCategories = [
  { id: 'social_media', code: 'A', name: 'Media Sosial', desc: 'Konten Organik IG, TikTok, FB, LinkedIn' },
  { id: 'sales_copy', code: 'B', name: 'Penjualan (Sales)', desc: 'Broadcast WA, Follow up, Closing' },
  { id: 'advertising', code: 'C', name: 'Naskah Iklan (Ads)', desc: 'FB/IG Ads, Google Search/Display, TikTok Ads' },
  { id: 'landing_page', code: 'D', name: 'Landing Page', desc: 'Hero Section, Headline, Benefit, Meta SEO' },
  { id: 'property_promo', code: 'E', name: 'Pemasaran Properti', desc: 'Promo DP 0%, Free BPHTB, Open House' },
  { id: 'lead_gen', code: 'F', name: 'Lead Generation', desc: 'Lead Magnet, Ebook, Quiz, Registration' },
  { id: 'personal_brand', code: 'G', name: 'Personal Branding', desc: 'Bio, Personal Story, Authority Post' },
  { id: 'relationship', code: 'H', name: 'Relationship & After Sales', desc: 'Greeting, Thank You, Follow up Akad' },
  { id: 'objection', code: 'I', name: 'Salinan Keberatan', desc: 'Handling Harga Mahal, Lokasi, KPR' },
  { id: 'formula', code: 'J', name: 'Rumus (Framework)', desc: 'AIDA, PAS, BAB, FAB, StoryBrand, 4P' }
];

export const copywritingTemplates: Record<string, { id: string; label: string; desc?: string }[]> = {
  social_media: [
    { id: 'ig_caption', label: 'Keterangan Instagram (IG Caption)' },
    { id: 'fb_caption', label: 'Keterangan Facebook' },
    { id: 'tiktok_caption', label: 'Keterangan TikTok' },
    { id: 'threads_post', label: 'Postingan Threads' },
    { id: 'linkedin_post', label: 'Postingan LinkedIn' },
    { id: 'carousel_copy', label: 'Salinan Carousel (Slide IG)' },
    { id: 'story_content', label: 'Isi Cerita (Story Content)' },
    { id: 'reels_hook', label: 'Gulungan Kait (Reels Hook 3 Detik)' },
    { id: 'video_script', label: 'Naskah Video Konten' },
    { id: 'short_cta', label: 'Video Singkat CTA' }
  ],
  sales_copy: [
    { id: 'wa_broadcast', label: 'Siaran WhatsApp (WA Broadcast)' },
    { id: 'wa_followup', label: 'Tindak Lanjut WhatsApp (WA Follow Up)' },
    { id: 'first_contact', label: 'Pesan Kontak Pertama' },
    { id: 're_engagement', label: 'Pemimpin Keterlibatan Kembali (Re-engagement)' },
    { id: 'survey_invite', label: 'Undangan Survei Lokasi' },
    { id: 'booking_remind', label: 'Pengingat Pemesanan (Booking Reminder)' },
    { id: 'closing_msg', label: 'Pesan Penutup (Closing Message)' },
    { id: 'testi_req', label: 'Permintaan Testimoni' },
    { id: 'referral_req', label: 'Permintaan Rujukan (Referral)' },
    { id: 'after_sales', label: 'Tindak Lanjut Purna Jual' }
  ],
  advertising: [
    { id: 'fb_primary', label: 'Teks Utama Iklan Facebook (Primary Text)' },
    { id: 'fb_headline', label: 'Judul Facebook Ads' },
    { id: 'fb_desc', label: 'Deskripsi Facebook Ads' },
    { id: 'ig_ads', label: 'Iklan Instagram' },
    { id: 'search_ads', label: 'Iklan Penelusuran Google (Search Ads)' },
    { id: 'display_ads', label: 'Iklan Tampilan Google (Display Ads)' },
    { id: 'tiktok_ads', label: 'Iklan TikTok' },
    { id: 'yt_script', label: 'Skrip Iklan YouTube' },
    { id: 'banner_ads', label: 'Teks Iklan Banner' },
    { id: 'cta_gen', label: 'Generator CTA Iklan' }
  ],
  landing_page: [
    { id: 'lp_hero', label: 'Bagian Pahlawan (Hero Section)' },
    { id: 'lp_headline', label: 'Pembuat Judul Utama (Headline)' },
    { id: 'lp_subhead', label: 'Subjudul Landing Page' },
    { id: 'lp_benefit', label: 'Bagian Manfaat (Benefit Section)' },
    { id: 'lp_feature', label: 'Bagian Fitur (Feature Section)' },
    { id: 'lp_faq', label: 'Bagian Tanya Jawab (FAQ)' },
    { id: 'lp_testi', label: 'Bagian Testimoni' },
    { id: 'lp_closing', label: 'Bagian Penutup' },
    { id: 'lp_cta', label: 'Bagian Tombol CTA' },
    { id: 'lp_seo', label: 'Deskripsi Meta SEO' }
  ],
  property_promo: [
    { id: 'launching', label: 'Promo Peluncuran (Launching Promo)' },
    { id: 'limited_promo', label: 'Promo Terbatas (Limited Promo)' },
    { id: 'open_house', label: 'Rumah Terbuka (Open House)' },
    { id: 'event_invite', label: 'Undangan Acara' },
    { id: 'grand_open', label: 'Pembukaan Besar (Grand Opening)' },
    { id: 'promo_dp', label: 'Promo DP 0%' },
    { id: 'promo_cashback', label: 'Promo Cashback' },
    { id: 'promo_bphtb', label: 'Promo Gratis BPHTB & Biaya KPR' },
    { id: 'promo_cicilan', label: 'Promo Subsidi Cicilan' },
    { id: 'promo_kpr', label: 'Promo KPR Bank Partner' }
  ],
  lead_gen: [
    { id: 'lm_copy', label: 'Salinan Lead Magnet' },
    { id: 'ebook_sales', label: 'Halaman Penjualan Ebook' },
    { id: 'webinar', label: 'Undangan Webinar Properti' },
    { id: 'seminar', label: 'Undangan Seminar' },
    { id: 'registration', label: 'Halaman Pendaftaran' },
    { id: 'form_head', label: 'Judul Formulir' },
    { id: 'quiz', label: 'Kuis Pilih Rumah' },
    { id: 'giveaway', label: 'Kampanye Giveaway' },
    { id: 'checklist', label: 'Daftar Periksa PDF (Checklist)' },
    { id: 'free_consult', label: 'Konsultasi Gratis' }
  ],
  personal_brand: [
    { id: 'intro', label: 'Perkenalan Pribadi (Personal Intro)' },
    { id: 'bio_ig', label: 'Bio Instagram Sales Pro' },
    { id: 'bio_tiktok', label: 'Bio TikTok Sales' },
    { id: 'bio_linkedin', label: 'Ringkasan LinkedIn' },
    { id: 'personal_story', label: 'Kisah Pribadi (Personal Story)' },
    { id: 'daily_insight', label: 'Wawasan Harian Properti' },
    { id: 'edu_content', label: 'Konten Pendidikan Properti' },
    { id: 'authority', label: 'Konten Otoritas & Keahlian' },
    { id: 'trust_post', label: 'Pos Membangun Kepercayaan' },
    { id: 'achievement', label: 'Postingan Prestasi / Unit Terjual' }
  ],
  relationship: [
    { id: 'birthday', label: 'Ucapan Selamat Ulang Tahun' },
    { id: 'holiday', label: 'Salam Liburan & Hari Raya' },
    { id: 'thank_you', label: 'Pesan Terima Kasih' },
    { id: 'appreciation', label: 'Apresiasi Pelanggan' },
    { id: 'anniversary', label: 'Pelanggan Ulang Tahun Akad' },
    { id: 'welcome', label: 'Pesan Selamat Datang' },
    { id: 'survey_thanks', label: 'Terima Kasih Setelah Survei' },
    { id: 'post_survey', label: 'Tindak Lanjut Setelah Survei' },
    { id: 'post_booking', label: 'Tindak Lanjut Setelah Pemesanan (Booking)' },
    { id: 'post_akad', label: 'Tindak Lanjut Setelah Akad' }
  ],
  objection: [
    { id: 'obj_mahal', label: 'Penanganan Keberatan: Harga Mahal' },
    { id: 'obj_banding', label: 'Penanganan Keberatan: Mau Bandingkan Dulu' },
    { id: 'obj_yakin', label: 'Penanganan Keberatan: Belum Yakin' },
    { id: 'obj_pasangan', label: 'Penanganan Keberatan: Menunggu Pasangan' },
    { id: 'obj_ortu', label: 'Penanganan Keberatan: Menunggu Orang Tua' },
    { id: 'obj_kpr', label: 'Penanganan Keberatan: Menunggu Persetujuan KPR' },
    { id: 'obj_jauh', label: 'Penanganan Keberatan: Lokasi Jauh' },
    { id: 'obj_kontrak', label: 'Penanganan Keberatan: Masih Kontrak Rumah' },
    { id: 'obj_dp', label: 'Penanganan Keberatan: Belum Ada DP' },
    { id: 'obj_nanti', label: 'Penanganan Keberatan: Nanti Dulu' }
  ],
  formula: [
    { id: 'aida', label: 'Rumus AIDA (Attention, Interest, Desire, Action)' },
    { id: 'pas', label: 'Rumus PAS / LULUS (Problem, Agitate, Solution)' },
    { id: 'bab', label: 'Rumus BAB (Before, After, Bridge)' },
    { id: 'fab', label: 'Rumus FAB (Features, Advantages, Benefits)' },
    { id: 'storybrand', label: 'Rumus StoryBrand' },
    { id: '4p', label: 'Rumus 4P (Picture, Promise, Prove, Push)' },
    { id: 'quest', label: 'Rumus QUEST / PENCARIAN (Qualify, Understand, Educate, Stimulate, Transition)' },
    { id: 'before_after_bridge', label: 'Rumus Sebelum Sesudah Jembatan' },
    { id: 'golden_circle', label: 'Rumus Lingkaran Emas (Golden Circle)' },
    { id: 'prob_sol', label: 'Rumus Solusi Masalah' }
  ]
};

export const copywritingTones = [
  'Profesional & Elegan',
  'Santai & Ramah (Friendly)',
  'Mendesak (Urgency / FOMO)',
  'Informatif & Edukatif',
  'Persuasif & Hard Selling',
  'Storytelling (Emosional)'
];
