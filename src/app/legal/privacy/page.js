export const metadata = {
  title: "Kebijakan Privasi | Metland Cikarang",
  description: "Kebijakan privasi mengenai pengumpulan dan perlindungan data di ekosistem Metland Cikarang.",
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-invert max-w-none prose-p:text-gray-400 prose-p:font-light prose-p:leading-relaxed prose-headings:text-white prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-li:text-gray-400 prose-li:font-light prose-strong:text-gray-200">
      
      <div className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-3xl font-bold mb-2">Kebijakan Privasi</h1>
        <p className="text-sm text-gray-500 m-0">Terakhir diperbarui: 15 Juli 2026</p>
      </div>

      <p>
        Keamanan dan privasi data Anda adalah prioritas utama kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, melindungi, dan mengungkap informasi pribadi Anda saat menggunakan platform Metland Cikarang.
      </p>

      <h2>1. Informasi yang Kami Kumpulkan</h2>
      <p>
        Kami mengumpulkan beberapa jenis informasi untuk menyediakan dan meningkatkan layanan kami:
      </p>
      <ul>
        <li><strong>Data Interaksi AI (SMI):</strong> Saat Anda menggunakan Smart Metland Intelligence, kami mungkin menyimpan log percakapan anonim secara lokal di perangkat Anda (menggunakan <code>sessionStorage</code>) untuk memastikan kontinuitas percakapan. Kami tidak menyimpan histori percakapan pribadi ini ke server pusat tanpa izin eksplisit Anda.</li>
        <li><strong>Data Profil Finansial:</strong> Input yang Anda masukkan pada kalkulator KPR atau estimasi biaya legal bersifat sementara (ephemeral) selama sesi aktif dan digunakan murni untuk keperluan kalkulasi.</li>
        <li><strong>Data Analitik:</strong> Kami mengumpulkan data penggunaan umum (seperti durasi kunjungan dan halaman yang diakses) untuk mengoptimalkan UI/UX platform.</li>
      </ul>

      <h2>2. Penggunaan Informasi</h2>
      <p>
        Informasi yang dikumpulkan digunakan secara eksklusif untuk:
      </p>
      <ul>
        <li>Memberikan respons AI yang akurat dan terpersonalisasi.</li>
        <li>Menghitung estimasi kelayakan kredit dan biaya properti.</li>
        <li>Memperbaiki kinerja algoritma dan antarmuka aplikasi.</li>
        <li>Menghubungi Anda (jika Anda dengan sukarela menjadwalkan kunjungan atau meninggalkan kontak).</li>
      </ul>

      <h2>3. Keamanan Data</h2>
      <p>
        Kami menerapkan standar enkripsi industri (SSL/TLS) untuk mengamankan komunikasi data antara perangkat Anda dan server kami. Platform AI kami diproses di lingkungan komputasi awan yang aman (End-to-End Encrypted).
      </p>

      <h2>4. Berbagi Pihak Ketiga</h2>
      <p>
        Kami <strong>tidak menjual, menyewakan, atau menukar</strong> informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran. Data hanya dibagikan kepada mitra operasional esensial (misalnya, penyedia infrastruktur cloud) yang terikat oleh perjanjian kerahasiaan ketat.
      </p>

      <h2>5. Hak Pengguna</h2>
      <p>
        Anda berhak untuk membersihkan riwayat percakapan SMI kapan saja menggunakan tombol "Reset Chat". Karena sebagian besar data analitik SMI bersifat *client-side*, menghapus *cache* browser Anda akan sepenuhnya menghapus rekam jejak finansial Anda dari perangkat.
      </p>

    </article>
  );
}
