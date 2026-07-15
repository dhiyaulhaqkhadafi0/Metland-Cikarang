"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, MapPin, Ruler, BedDouble, Bath, CarFront, Video, Wind, Lock, Lightbulb, Sprout, Maximize, Home, Zap, Plus, Minus, Tag, ShieldCheck, Leaf, Smartphone, Users, WashingMachine, Dumbbell } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const getFeatureIcon = (featureName) => {
  const name = featureName.toLowerCase();
  if (name.includes("security") || name.includes("gate") || name.includes("cctv")) return ShieldCheck;
  if (name.includes("green") || name.includes("eco") || name.includes("taman") || name.includes("garden") || name.includes("asri")) return Leaf;
  if (name.includes("smart")) return Smartphone;
  if (name.includes("carport") || name.includes("parkir") || name.includes("traffic")) return CarFront;
  if (name.includes("clubhouse") || name.includes("community") || name.includes("warga")) return Users;
  if (name.includes("laundry") || name.includes("service")) return WashingMachine;
  if (name.includes("balcony") || name.includes("ceiling") || name.includes("window") || name.includes("fasad")) return Home;
  if (name.includes("fitness") || name.includes("gym") || name.includes("sport") || name.includes("basketball") || name.includes("jogging") || name.includes("track")) return Dumbbell;
  if (name.includes("internet")) return Zap;
  return CheckCircle2;
};

const clusterData = {
  "brassia": {
    name: "Brassia Garden",
    type: "Myzora & Ellyra",
    description: "Rumah premium berkonsep Farmhouse modern dengan sentuhan arsitektur elegan dan smart door lock terintegrasi. Tata ruang dirancang fleksibel untuk memaksimalkan pencahayaan alami dan sirkulasi udara yang sehat bagi keluarga yang bertumbuh. Terletak di kawasan eksklusif dengan area hijau terbuka luas, menjadikannya perpaduan sempurna antara gaya hidup urban dan keasrian alam.",
    price: "Mulai Rp 660 Juta - 1.2 Miliar",
    image: "/brassia-garden-new.jpeg",
    specs: {
      lt: "90m² - 120m²",
      lb: "54m² - 65m²",
      bed: "3",
      bath: "2",
      carport: "2"
    },
    features: [
      "Double Security (with one gate system)", "Green Koridor Cluster", "Green Pocket", 
      "Garden Track", "Community Center", "Smart Home System", "Carport Luas",
      "Clubhouse (With Creative Hub & Forest Track)", "Eco Smart (Waste separation)",
      "Area service yang dapat difungsikan", "Balcony (Window view)",
      "High Ceiling", "Taman Belakang", "CPG & Outdoor Fitness"
    ]
  },
  "derora": {
    name: "Derora",
    type: "Avesa Garden",
    description: "Cluster Derora di Metland Cikarang menghadirkan konsep hunian bergaya American Farmhouse yang estetik, modern, dan penuh karakter. Desainnya yang minimalis namun elegan, menciptakan kesan hangat dan homey. Cocok bagi Anda yang menginginkan rumah dengan gaya kekinian namun tetap fungsional.",
    price: "Mulai Rp 695 Juta - 1.05 Miliar",
    image: "/cluster avesa garden/DERORA/galeri_cluster2_68a174f24c287.jpg",
    specs: {
      lt: "72m² - 84m²",
      lb: "33m² - 59m²",
      bed: "3",
      bath: "2",
      carport: "1",
      listrik: "2200 Watt"
    },
    features: [
      "Smart Home System", "Smart Lamp", "Carport", 
      "Laundry Room", "Backyard"
    ]
  },
  "canary": {
    name: "Canary",
    type: "Avesa Garden",
    description: "Cluster Canary menghadirkan konsep hunian modern yang sempurna untuk pasangan muda yang sedang mewujudkan impian memiliki rumah pertama. Dengan desain \"Rumah Tumbuh\", properti ini memberikan fleksibilitas untuk menyesuaikan kebutuhan seiring berkembangnya keluarga.",
    price: "Mulai Rp 518 Juta - 1.05 Miliar",
    image: "/cluster avesa garden/CANARY/Gerbang Cluster Avesa Garden.jpg",
    specs: {
      lt: "72m²",
      lb: "22m² - 30m²",
      bed: "1 - 2",
      bath: "1",
      carport: "1",
      listrik: "1300 Watt"
    },
    features: [
      "24 Hours Security System", "3 on 3 Basketball", "Bale Warga", 
      "Boom Gate with Access Card", "CCTV", "Clubhouse", 
      "Jogging Area", "One Gate System", "Outdoor Gym"
    ]
  },
  "easton": {
    name: "Easton Gateway",
    type: "Commercial Ruko",
    description: "Mengadaptasi Konsep Township Commercial Area bergaya Western Cities (London, New York, Amsterdam). Berada langsung di pintu gerbang utama Metland Cikarang, ruko 3 lantai ini menawarkan exposure maksimal, akses parkir luas, serta konsep Walkable Shopping Area. Pilihan tepat untuk eskalasi bisnis Anda di pusat komersial terintegrasi dengan traffic tinggi.",
    price: "Mulai Rp 1.265 Miliar",
    image: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db681c4c4 (1).jpg",
    specs: {
      lt: "90m² - 100m²",
      lb: "54m² - 60m²",
      bed: "-",
      bath: "2",
      carport: "2"
    },
    features: [
      "Exposure Maksimal", "Akses dan Parkir Luas", "Potensi Bisnis Tinggi",
      "Walkable Shopping Area", "Visual Timeless", "3 Lantai", "Bonus AC & CCTV"
    ]
  },
  "weston": {
    name: "Weston Gateway",
    type: "Commercial Ruko",
    description: "Mengadaptasi Konsep Township Commercial Area bergaya Western Cities (London, New York, Amsterdam). Berada langsung di pintu gerbang utama Metland Cikarang, ruko 3 lantai ini menawarkan exposure maksimal, akses parkir luas, serta konsep Walkable Shopping Area. Pilihan tepat untuk eskalasi bisnis Anda di pusat komersial terintegrasi dengan traffic tinggi.",
    price: "Mulai Rp 1.265 Miliar",
    image: "/RUKO WESTON GATEWAY/galeri_cluster7_693135f9dd540 (2).jpg",
    specs: {
      lt: "90m² - 100m²",
      lb: "54m² - 60m²",
      bed: "-",
      bath: "2",
      carport: "2"
    },
    features: [
      "Exposure Maksimal", "Akses dan Parkir Luas", "Potensi Bisnis Tinggi",
      "Walkable Shopping Area", "Visual Timeless", "3 Lantai", "Bonus AC & CCTV"
    ]
  }
};

const brassiaTypes = {
  "myzora-33": { 
    price: "Mulai Rp 647 Juta", lt: "72m²", lb: "33m²", bed: "2", bath: "1", carport: "1", listrik: "2200 Watt",
    fasad: "/cluster brassia-garden-new/Fasad Myzora 33 72.jpg", denah: "/cluster brassia-garden-new/denah Myzora 33 72.jpg",
    fasilitasImage: "/cluster brassia-garden-new/fasilitas 33 72.png",
    stock: "Sisa 5 Unit", statusColor: "text-emerald-400",
    siteplan: "/cluster brassia-garden-new/Update Stock Myzora.jpeg"
  },
  "myzora-45": { 
    price: "Mulai Rp 750 Juta", lt: "72m²", lb: "45m²", bed: "3", bath: "1", carport: "1", listrik: "2200 Watt",
    fasad: "/cluster brassia-garden-new/fasad Myzora 45 72.jpeg", denah: "/cluster brassia-garden-new/denah myzora 45 72.png",
    fasilitasImage: "/cluster brassia-garden-new/fasilitas 45 72.png",
    stock: "Sisa 2 Unit", statusColor: "text-orange-400",
    siteplan: "/cluster brassia-garden-new/Update Stock Myzora.jpeg"
  },
  "myzora-56": { 
    price: "Mulai Rp 992 Juta", lt: "84m²", lb: "56m²", bed: "3", bath: "2", carport: "1", listrik: "2200 Watt",
    fasad: "/cluster brassia-garden-new/fasad myzora 56 84.jpg", denah: "/cluster brassia-garden-new/denah myzora 56 84.png",
    fasilitasImage: "/cluster brassia-garden-new/fasilitas 56 84.png",
    stock: "Sold Out", statusColor: "text-red-400",
    siteplan: "/cluster brassia-garden-new/Update Stock Myzora.jpeg"
  },
  "myzora-77": { 
    price: "Mulai Rp 1.2 Miliar", lt: "98m²", lb: "77m²", bed: "4", bath: "2", carport: "2", listrik: "2200 Watt",
    fasad: "/cluster brassia-garden-new/fasad myzora 77 98.jpg", denah: "/cluster brassia-garden-new/denah myzora 77 98.png",
    fasilitasImage: "/cluster brassia-garden-new/Fasilitas 77 98.png",
    stock: "Last Unit", statusColor: "text-red-500",
    siteplan: "/cluster brassia-garden-new/Update Stock Myzora.jpeg"
  },
  "ellyra-56-84": { 
    price: "Mulai Rp 1.1 Miliar", lt: "84m²", lb: "56m²", bed: "2", bath: "2", carport: "1",
    fasad: "/cluster brassia-garden-new/galeri_cluster8_6a2540593d440.jpeg", denah: null,
    fasilitasImage: "/cluster brassia-garden-new/Fasilitas Brassia.png",
    stock: "Sisa 4 Unit", statusColor: "text-emerald-400",
    siteplan: "/cluster brassia-garden-new/Update Stock Elyra.jpeg"
  },
  "ellyra-56-98": { 
    price: "Mulai Rp 1.15 Miliar", lt: "98m²", lb: "56m²", bed: "2", bath: "2", carport: "1",
    fasad: "/cluster brassia-garden-new/galeri_cluster8_6a25408fa1cbe.jpeg", denah: null,
    fasilitasImage: "/cluster brassia-garden-new/Fasilitas Brassia.png",
    stock: "Sisa 2 Unit", statusColor: "text-orange-400",
    siteplan: "/cluster brassia-garden-new/Update Stock Elyra.jpeg"
  },
  "ellyra-45": { 
    price: "Mulai Rp 850 Juta", lt: "72m²", lb: "45m²", bed: "2", bath: "1", carport: "1",
    fasad: "/cluster brassia-garden-new/galeri_cluster8_6a2541c705e72.jpeg", denah: null,
    fasilitasImage: "/cluster brassia-garden-new/Fasilitas Brassia.png",
    stock: "Sisa 8 Unit", statusColor: "text-emerald-400",
    siteplan: "/cluster brassia-garden-new/Update Stock Elyra.jpeg"
  }
};

const canaryTypes = {
  "canary-22": { 
    price: "Rp 518 Juta", lt: "72m²", lb: "22m²", bed: "1", bath: "1", carport: "1", listrik: "1300 Watt",
    fasad: "/cluster avesa garden/CANARY/fasad canary 22 72.jpg", denah: "/cluster avesa garden/CANARY/denah unit canary 22 72.jpeg",
    fasilitasImage: null,
    stock: null, statusColor: "text-emerald-400",
    siteplan: null
  },
  "canary-30": { 
    price: "Rp 578 Juta", lt: "72m²", lb: "30m²", bed: "2", bath: "1", carport: "1", listrik: "1300 Watt",
    fasad: "/cluster avesa garden/CANARY/fasad canary 30 72.jpg", denah: "/cluster avesa garden/CANARY/denah unit canary 30 72.jpeg",
    fasilitasImage: null,
    stock: null, statusColor: "text-emerald-400",
    siteplan: null
  }
};

const deroraTypes = {
  "derora-33": { 
    price: "Rp 695 Juta", lt: "72m²", lb: "33m²", bed: "3", bath: "2", carport: "1", listrik: "2200 Watt",
    fasad: "/cluster avesa garden/DERORA/fasad derora 33 72.jpg", denah: "/cluster avesa garden/DERORA/denah unit derora 33 72.png",
    fasilitasImage: null,
    stock: null, statusColor: "text-emerald-400",
    siteplan: null
  },
  "derora-59": { 
    price: "Rp 1.05 Miliar", lt: "84m²", lb: "59m²", bed: "3", bath: "2", carport: "1", listrik: "2200 Watt",
    fasad: "/cluster avesa garden/DERORA/fasad derora 59 84.jpg", denah: "/cluster avesa garden/DERORA/denah unit derora 59 84.png",
    fasilitasImage: null,
    stock: null, statusColor: "text-emerald-400",
    siteplan: null
  }
};

const eastonTypes = {
  "easton-90": { 
    price: "Rp 1.265 Miliar", lt: "90m²", lb: "54m²", bed: "-", bath: "2", carport: "2", listrik: "2200 Watt",
    fasad: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db77981e5 (1).jpg", denah: null,
    fasilitasImage: null,
    stock: null, statusColor: "text-red-500",
    siteplan: null
  },
  "easton-100": { 
    price: "Rp 1.415 Miliar", lt: "100m²", lb: "60m²", bed: "-", bath: "2", carport: "2", listrik: "2200 Watt",
    fasad: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db8bb0ff7.jpg", denah: null,
    fasilitasImage: null,
    stock: null, statusColor: "text-red-500",
    siteplan: null
  }
};

const westonTypes = {
  "weston-90": { 
    price: "Rp 1.265 Miliar", lt: "90m²", lb: "54m²", bed: "-", bath: "2", carport: "2", listrik: "2200 Watt",
    fasad: "/RUKO WESTON GATEWAY/galeri_cluster7_693135f9dd540 (2).jpg", denah: null,
    fasilitasImage: null,
    stock: null, statusColor: "text-red-500",
    siteplan: null
  },
  "weston-100": { 
    price: "Rp 1.415 Miliar", lt: "100m²", lb: "60m²", bed: "-", bath: "2", carport: "2", listrik: "2200 Watt",
    fasad: "/RUKO WESTON GATEWAY/galeri_cluster7_6931360434110 (2).jpg", denah: null,
    fasilitasImage: null,
    stock: null, statusColor: "text-red-500",
    siteplan: null
  }
};

export default function ClusterMicrosite() {
  const params = useParams();
  const id = params?.id || "brassia";
  const data = clusterData[id] || clusterData["brassia"];
  const [activeSpecKey, setActiveSpecKey] = useState(
    id === "brassia" ? "myzora-33" : 
    id === "canary" ? "canary-22" : 
    id === "derora" ? "derora-33" : 
    id === "easton" ? "easton-90" : 
    id === "weston" ? "weston-90" : null
  );
  const [lightboxImage, setLightboxImage] = useState(null);

  const activeSpec = activeSpecKey 
    ? (id === "canary" ? canaryTypes[activeSpecKey] : id === "derora" ? deroraTypes[activeSpecKey] : id === "easton" ? eastonTypes[activeSpecKey] : id === "weston" ? westonTypes[activeSpecKey] : brassiaTypes[activeSpecKey]) 
    : null;

  return (
    <main className="flex min-h-screen flex-col bg-dark-bg pt-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        
        {/* Top Navbar Center Logo for Brassia */}
        {id === "brassia" && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[60] bg-white p-2 rounded-2xl shadow-2xl border-2 border-white/80">
            <img 
              src="/brassia-icon.png" 
              alt="Brassia Garden Logo" 
              className="h-14 md:h-20 w-auto object-contain" 
            />
          </div>
        )}

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent z-10" />
          {/* We use standard img for dummy data, but should be next/image in prod */}
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-20 pb-16">
          <Link href="/" className="inline-flex items-center text-primary bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/60 transition-colors mb-6 font-medium border border-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto flex flex-col items-center text-center mt-12 md:mt-16"
          >
            <div className="inline-block px-5 py-2 rounded-full border border-primary/40 bg-black/50 backdrop-blur-md text-primary text-sm font-semibold mb-6 shadow-xl">
              {data.type}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-title font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              {data.name}
            </h1>
            
            <p className="text-xl text-emerald-300 font-semibold mb-6 transition-all drop-shadow-md">
              {activeSpec ? activeSpec.price : data.price}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 border-t border-border bg-dark-bg relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content (Description & Features) */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-2xl font-title font-bold text-light-text mb-4">Konsep & Detail Arsitektur</h3>
                <p className="text-gray-text text-lg leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              </div>

              {id === "brassia" && (
                <div>
                  <h3 className="text-2xl font-title font-bold text-light-text mb-6">Pilihan Sub-Cluster</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Myzora */}
                    <div className="bg-dark-card border border-border p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary mb-2">Cluster Myzora</h4>
                      <p className="text-sm text-gray-text mb-4">Tipe unit yang tersedia:</p>
                      <ul className="space-y-2">
                        <li onClick={() => setActiveSpecKey("myzora-33")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "myzora-33" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 33/72</li>
                        <li onClick={() => setActiveSpecKey("myzora-45")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "myzora-45" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 45/72</li>
                        <li onClick={() => setActiveSpecKey("myzora-56")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "myzora-56" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 56/84</li>
                        <li onClick={() => setActiveSpecKey("myzora-77")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "myzora-77" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 77/98</li>
                      </ul>
                    </div>
                    {/* Ellyra */}
                    <div className="bg-dark-card border border-border p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary mb-2">Cluster Ellyra</h4>
                      <p className="text-sm text-gray-text mb-4">Tipe unit yang tersedia:</p>
                      <ul className="space-y-2">
                        <li onClick={() => setActiveSpecKey("ellyra-56-98")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "ellyra-56-98" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 56/98</li>
                        <li onClick={() => setActiveSpecKey("ellyra-56-84")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "ellyra-56-84" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 56/84</li>
                        <li onClick={() => setActiveSpecKey("ellyra-45")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "ellyra-45" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 45/72</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {id === "canary" && (
                <div className="mb-12">
                  <h3 className="text-2xl font-title font-bold text-light-text mb-6">Pilihan Tipe Unit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-card border border-border p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary mb-2">Cluster Canary</h4>
                      <p className="text-sm text-gray-text mb-4">Tipe unit yang tersedia:</p>
                      <ul className="space-y-2">
                        <li onClick={() => setActiveSpecKey("canary-22")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "canary-22" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 22/72</li>
                        <li onClick={() => setActiveSpecKey("canary-30")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "canary-30" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 30/72</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {id === "derora" && (
                <div className="mb-12">
                  <h3 className="text-2xl font-title font-bold text-light-text mb-6">Pilihan Tipe Unit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-card border border-border p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary mb-2">Cluster Derora</h4>
                      <p className="text-sm text-gray-text mb-4">Tipe unit yang tersedia:</p>
                      <ul className="space-y-2">
                        <li onClick={() => setActiveSpecKey("derora-33")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "derora-33" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 33/72</li>
                        <li onClick={() => setActiveSpecKey("derora-59")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "derora-59" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 59/84</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {id === "easton" && (
                <div className="mb-12">
                  <h3 className="text-2xl font-title font-bold text-light-text mb-6">Pilihan Tipe Unit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-card border border-border p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary mb-2">Easton Gateway</h4>
                      <p className="text-sm text-gray-text mb-4">Tipe unit yang tersedia:</p>
                      <ul className="space-y-2">
                        <li onClick={() => setActiveSpecKey("easton-90")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "easton-90" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 90/54 (3 Lantai)</li>
                        <li onClick={() => setActiveSpecKey("easton-100")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "easton-100" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 100/60 (3 Lantai)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {id === "weston" && (
                <div className="mb-12">
                  <h3 className="text-2xl font-title font-bold text-light-text mb-6">Pilihan Tipe Unit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-dark-card border border-border p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-primary mb-2">Weston Gateway</h4>
                      <p className="text-sm text-gray-text mb-4">Tipe unit yang tersedia:</p>
                      <ul className="space-y-2">
                        <li onClick={() => setActiveSpecKey("weston-90")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "weston-90" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 90/54 (3 Lantai)</li>
                        <li onClick={() => setActiveSpecKey("weston-100")} className={`flex items-center cursor-pointer p-2 rounded-lg transition-colors ${activeSpecKey === "weston-100" ? "bg-primary/20 text-primary" : "text-light-text hover:bg-white/5"}`}><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> Tipe 100/60 (3 Lantai)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-title font-bold text-light-text mb-6">Fasilitas & Keunggulan</h3>
                {activeSpec && activeSpec.fasilitasImage ? (
                  <div className="bg-dark-card border border-border p-4 rounded-2xl shadow-emerald-glow">
                    <img src={activeSpec.fasilitasImage} alt="Fasilitas" className="w-full h-auto rounded-xl object-contain" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(activeSpec && activeSpec.features ? activeSpec.features : data.features.map(f => ({ name: f, icon: getFeatureIcon(f), image: null }))).map((feature, idx) => (
                      <div key={idx} className="flex flex-col bg-dark-card border border-border overflow-hidden rounded-xl group hover:border-primary/50 transition-colors">
                        {feature.image && (
                          <div className="h-32 w-full overflow-hidden">
                            <img src={feature.image} alt={feature.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                        )}
                        <div className="p-4 flex items-center space-x-3">
                          <feature.icon className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-light-text font-medium">{feature.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Fasad, Denah & Siteplan */}
              {activeSpec && activeSpecKey && (
                <div className="mt-12" key={`visualisasi-${activeSpecKey}`}>
                  <h3 className="text-2xl font-title font-bold text-light-text mb-6">Visualisasi Tipe <span className="text-sm font-normal text-gray-text block mt-1">(Klik gambar untuk memperbesar)</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeSpec.fasad && (
                      <div className="bg-dark-card p-4 rounded-xl border border-border overflow-hidden">
                        <p className="text-gray-text text-sm mb-3 font-semibold uppercase tracking-wider text-center">Fasad Depan</p>
                        <div 
                          className="rounded-lg overflow-hidden bg-black cursor-pointer group h-48 md:h-56"
                          onClick={() => { setLightboxImage(activeSpec.fasad); }}
                        >
                          <img key={`fasad-${activeSpecKey}`} src={activeSpec.fasad} alt="Fasad" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    )}
                    {activeSpec.denah && (
                      <div className="bg-dark-card p-4 rounded-xl border border-border overflow-hidden">
                        <p className="text-gray-text text-sm mb-3 font-semibold uppercase tracking-wider text-center">Denah Rumah</p>
                        <div 
                          className="rounded-lg overflow-hidden bg-white/5 cursor-pointer flex justify-center group h-48 md:h-56"
                          onClick={() => { setLightboxImage(activeSpec.denah); }}
                        >
                          <img key={`denah-${activeSpecKey}`} src={activeSpec.denah} alt="Denah" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    )}
                    {activeSpec.siteplan && (
                      <div className="bg-dark-card p-4 rounded-xl border border-border overflow-hidden md:col-span-2 lg:col-span-1">
                        <p className="text-gray-text text-sm mb-3 font-semibold uppercase tracking-wider text-center">Update Stok Unit</p>
                        <div 
                          className="rounded-lg overflow-hidden bg-black cursor-pointer flex justify-center group h-48 md:h-56 relative"
                          onClick={() => { setLightboxImage(activeSpec.siteplan); }}
                        >
                          <img key={`siteplan-${activeSpecKey}`} src={activeSpec.siteplan} alt="Siteplan Unit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none">Lihat Denah Letak</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Content (Specs & Booking) */}
            <div className="lg:col-span-1 relative">
              <div className="sticky top-28 bg-dark-card border border-border rounded-2xl p-6 shadow-emerald-glow max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain scroll-smooth pointer-events-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                <h3 className="text-xl font-title font-bold text-light-text mb-6">Spesifikasi Utama</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-gray-text flex items-center"><Ruler className="w-4 h-4 mr-2" /> Luas Tanah</span>
                    <span className="text-white font-semibold transition-all">{activeSpec ? activeSpec.lt : data.specs.lt}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-gray-text flex items-center"><Ruler className="w-4 h-4 mr-2" /> Luas Bangunan</span>
                    <span className="text-white font-semibold transition-all">{activeSpec ? activeSpec.lb : data.specs.lb}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-gray-text flex items-center"><BedDouble className="w-4 h-4 mr-2" /> Kamar Tidur</span>
                    <span className="text-white font-semibold transition-all">{activeSpec ? activeSpec.bed : data.specs.bed}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-gray-text flex items-center"><Bath className="w-4 h-4 mr-2" /> Kamar Mandi</span>
                    <span className="text-white font-semibold transition-all">{activeSpec ? activeSpec.bath : data.specs.bath}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-gray-text flex items-center"><CarFront className="w-4 h-4 mr-2" /> Carport</span>
                    <span className="text-white font-semibold transition-all">{activeSpec ? activeSpec.carport : data.specs.carport}</span>
                  </div>
                  {(activeSpec?.listrik || data.specs.listrik) && (
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="text-gray-text flex items-center"><Zap className="w-4 h-4 mr-2" /> Listrik</span>
                      <span className="text-white font-semibold transition-all">{activeSpec ? activeSpec.listrik : data.specs.listrik}</span>
                    </div>
                  )}
                  
                  {/* Dynamic Stock Display */}
                  {activeSpec && activeSpec.stock && (
                    <div className="flex justify-between items-center py-4 border-b border-border/50 bg-primary/10 px-4 rounded-xl mt-4 border border-primary/20 shadow-emerald-glow">
                      <span className="text-gray-text flex items-center font-medium"><Tag className="w-4 h-4 mr-2 text-primary" /> Info Stok Tersedia</span>
                      <span className={`font-bold transition-all px-3 py-1 rounded-full bg-black/40 text-sm tracking-wide border border-white/10 ${activeSpec.statusColor}`}>
                        {activeSpec.stock}
                      </span>
                    </div>
                  )}
                </div>

                {/* Promo Card */}
                <div className="bg-gradient-to-br from-emerald-900/40 to-dark-bg border border-emerald-500/30 rounded-xl p-5 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Tag className="w-16 h-16 text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center relative z-10"><Tag className="w-5 h-5 mr-2" /> Promo Spesial</h4>
                  <ul className="space-y-3 text-sm text-light-text relative z-10">
                    {id === "canary" ? (
                      <>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya BPHTB</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Subsidi Biaya KPR</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya AJB BN</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Membership Waterland 1 Tahun untuk 4 orang</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Voucher Sepeda Listrik</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> E-Voucher Rp. 10.000.000</li>
                      </>
                    ) : id === "derora" ? (
                      <>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya BPHTB</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Subsidi Biaya KPR</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya AJB BN</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Membership Waterland 1 Tahun untuk 4 orang</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Internet 1 Tahun</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> {activeSpecKey === "derora-59" ? "E-Voucher Metland Rp. 5.000.000" : "E-Voucher Rp. 5.000.000"}</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Voucher Sepeda Listrik</li>
                      </>
                    ) : id === "easton" || id === "weston" ? (
                      <>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya BPHTB</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Subsidi Biaya KPR</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya AJB BN</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free IPL 2 Tahun</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Bonus AC + CCTV</li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya BPHTB</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Subsidi Biaya KPR</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Biaya AJB BN</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Membership Waterland 1 Tahun (4 orang)</li>
                        <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /> Free Internet 1 Tahun</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Detailed Specs Card */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
                  <h4 className="text-lg font-bold text-light-text mb-4">Spesifikasi Bangunan</h4>
                  {id === "canary" ? (
                    <div className="space-y-3 text-sm text-gray-text">
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Pondasi:</strong> <span className="col-span-2">Pondasi foot plate</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Dinding:</strong> <span className="col-span-2">Bata merah (kongsi)</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Atap:</strong> <span className="col-span-2">Genteng beton</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Lantai:</strong> <span className="col-span-2">Homogenous tile (60x60)</span></div>
                    </div>
                  ) : id === "derora" ? (
                    <div className="space-y-3 text-sm text-gray-text">
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Pondasi:</strong> <span className="col-span-2">foot plate</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Dinding:</strong> <span className="col-span-2">Bata merah finish plester aci + cat dinding</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Atap:</strong> <span className="col-span-2">Genteng beton flat + Rangka Baja ringan</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Lantai:</strong> <span className="col-span-2">Homogenous tile (60x60) keramik (50x50)</span></div>
                    </div>
                  ) : id === "easton" ? (
                    <div className="space-y-3 text-sm text-gray-text">
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Pondasi:</strong> <span className="col-span-2">Tiang Pancang / Foot Plate</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Dinding:</strong> <span className="col-span-2">Bata Merah Plester Aci + Cat</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Lantai:</strong> <span className="col-span-2">Homogenous Tile</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Atap:</strong> <span className="col-span-2">Zincalume & Rangka Baja Ringan</span></div>
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm text-gray-text">
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Pondasi:</strong> <span className="col-span-2">Footplate</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Dinding:</strong> <span className="col-span-2">Bata merah plester aci + cat</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Atap:</strong> <span className="col-span-2">Genteng beton flat + rangka baja ringan</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Plafond:</strong> <span className="col-span-2">Gypsum + rangka hollow</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Lantai:</strong> <span className="col-span-2">Ruang utama & tidur: Homogenous Tile 60x60<br/>Teras Depan: Homogenous Tile 60x60<br/>Kamar Mandi: Keramik 50x50</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Dinding K. Mandi:</strong> <span className="col-span-2">Keramik 50x50</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Carport:</strong> <span className="col-span-2">Beton + atap alderon</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Pagar:</strong> <span className="col-span-2">Bata merah plester aci + cat</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Sanitair:</strong> <span className="col-span-2">Kloset duduk</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Kusen:</strong> <span className="col-span-2">Aluminium finish powder coating</span></div>
                      <div className="grid grid-cols-3 gap-2"><strong className="text-light-text col-span-1">Pintu:</strong> <span className="col-span-2">Utama, Kamar & K. Mandi: Engineering honeycomb<br/>Belakang: Sliding + kaca</span></div>
                    </div>
                  )}
                </div>

                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white font-bold mb-3 hover:scale-[1.02] transition-transform">
                  Booking Unit Sekarang
                </button>
                <button className="w-full py-4 rounded-xl bg-transparent border border-primary text-primary font-bold hover:bg-primary/10 transition-colors">
                  Unduh e-Brochure
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Denah Kawasan Brassia */}
      {id === "brassia" && (
        <section className="py-12 bg-dark-bg relative z-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-title font-bold text-light-text mb-4">Denah Kawasan Brassia <span className="text-sm font-normal text-gray-text block mt-1">(Klik gambar untuk memperbesar)</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div 
                className="rounded-2xl overflow-hidden border border-border shadow-emerald-glow bg-black p-2 cursor-pointer group"
                onClick={() => setLightboxImage("/cluster brassia-garden-new/denah brassia 1.png")}
              >
                <img src="/cluster brassia-garden-new/denah brassia 1.png" alt="Denah Brassia 1" className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div 
                className="rounded-2xl overflow-hidden border border-border shadow-emerald-glow bg-black p-2 cursor-pointer group"
                onClick={() => setLightboxImage("/cluster brassia-garden-new/denah brassia 2.png")}
              >
                <img src="/cluster brassia-garden-new/denah brassia 2.png" alt="Denah Brassia 2" className="w-full h-auto rounded-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery Showcase */}
      <section className="py-20 bg-[#0a0a0a] relative z-20 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-title font-bold text-light-text mb-4">Gallery Showcase</h2>
            <p className="text-gray-text">Eksplorasi visual dan rasakan langsung mahakarya {data.name}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We use a dynamic list of images based on cluster ID */}
            {(id === "canary" ? [
              "/cluster avesa garden/CANARY/1.jpg",
              "/cluster avesa garden/CANARY/2.jpg",
              "/cluster avesa garden/CANARY/3.jpg",
              "/cluster avesa garden/CANARY/4.jpg",
              "/cluster avesa garden/CANARY/5.jpg",
              "/cluster avesa garden/CANARY/6.jpg"
            ] : id === "derora" ? [
              "/cluster avesa garden/DERORA/galeri_cluster2_68a174f24c287.jpg",
              "/cluster avesa garden/DERORA/galeri_cluster2_68a1de03090b3.jpg",
              "/cluster avesa garden/DERORA/galeri_cluster2_68a1de3b291f4.jpg",
              "/cluster avesa garden/DERORA/SnapInsta.to_521536022_749533294704958_8210113604896646128_n.jpg",
              "/cluster avesa garden/DERORA/SnapInsta.to_522716021_749533321371622_1018555051259708325_n.jpg",
              "/cluster avesa garden/DERORA/gerbang cluster derora.jfif"
            ] : id === "easton" ? [
              "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db681c4c4 (1).jpg",
              "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db77981e5 (1).jpg",
              "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db8bb0ff7.jpg",
              "/RUKO EASTON GATEWAY/galeri_cluster6_68a1dbaa9e33f.jpg",
              "/RUKO EASTON GATEWAY/fasad ruko easton.jpg",
              "/RUKO EASTON GATEWAY/galeri_cluster6_68a1dbc723048.jpg"
            ] : id === "weston" ? [
              "/RUKO WESTON GATEWAY/galeri_cluster7_693135f9dd540 (2).jpg",
              "/RUKO WESTON GATEWAY/galeri_cluster7_6931360434110 (2).jpg",
              "/RUKO WESTON GATEWAY/galeri_cluster7_6931361786ede (1).jpg"
            ] : [
              "/cluster brassia-garden-new/koridor dalam cluster 1.png",
              "/cluster brassia-garden-new/koridor dalam cluster 2.png",
              "/cluster brassia-garden-new/koridor menuju cluster.png",
              "/cluster brassia-garden-new/taman area clubhouse 1.png",
              "/cluster brassia-garden-new/taman area clubhouse 2.png",
              "/cluster brassia-garden-new/galeri_cluster8_6a2540593d440.jpeg",
              "/cluster brassia-garden-new/galeri_cluster8_6a25408fa1cbe.jpeg",
              "/cluster brassia-garden-new/galeri_cluster8_6a2541c705e72.jpeg",
              "/cluster brassia-garden-new/galeri_cluster8_6a25422242894.jpeg",
              "/cluster brassia-garden-new/galeri_cluster8_6a254283cba2f.jpeg",
              "/cluster brassia-garden-new/galeri_cluster8_6a254290ee914.jpeg",
              "/cluster brassia-garden-new/galeri_cluster8_6a2542e602ad0.jpeg"
            ]).map((imgSrc, idx) => (
              <div 
                key={idx} 
                onClick={() => setLightboxImage(imgSrc)}
                className="group relative h-64 md:h-80 w-full overflow-hidden rounded-[2rem] border-[6px] border-white/10 cursor-pointer bg-white/5 p-1 backdrop-blur-md shadow-2xl transition-all hover:border-primary/50"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img 
                    src={imgSrc} 
                    alt={`Gallery ${idx+1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 z-[120] text-white hover:text-primary transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full h-full flex items-center justify-center p-4">
            <TransformWrapper 
              initialScale={1}
              minScale={0.5}
              maxScale={5}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-6 left-6 z-[120] flex gap-3">
                    <button onClick={() => zoomIn()} className="bg-white/10 hover:bg-primary hover:text-white text-white/90 p-2.5 rounded-full transition-colors backdrop-blur-md" title="Zoom In">
                      <Plus className="w-6 h-6" />
                    </button>
                    <button onClick={() => zoomOut()} className="bg-white/10 hover:bg-primary hover:text-white text-white/90 p-2.5 rounded-full transition-colors backdrop-blur-md" title="Zoom Out">
                      <Minus className="w-6 h-6" />
                    </button>
                    <button onClick={() => resetTransform()} className="bg-white/10 hover:bg-primary hover:text-white text-white/90 px-4 py-2 rounded-full text-sm font-bold transition-colors backdrop-blur-md" title="Reset">
                      Reset
                    </button>
                  </div>
                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <img key={lightboxImage} src={lightboxImage} alt="Enlarged" className="max-w-full max-h-[90vh] object-contain cursor-grab active:cursor-grabbing" />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}

    </main>
  );
}
