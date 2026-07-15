export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Metland Cikarang",
    "image": "https://metlandcikarang.com/logo.png",
    "description": "Platform penjualan properti premium dan komersial strategis di Metland Cikarang.",
    "url": "https://metlandcikarang.com",
    "telephone": "+6281234567890",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Metland Cikarang",
      "addressLocality": "Cikarang",
      "addressRegion": "Jawa Barat",
      "postalCode": "17530",
      "addressCountry": "ID"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
