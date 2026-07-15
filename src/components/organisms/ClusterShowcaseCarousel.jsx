"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Maximize, BedDouble, Bath, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const filterData = {
  categories: [
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" }
  ],
  clusters: {
    residential: [
      { id: "avesa", label: "Avesa Garden" },
      { id: "brassia", label: "Brassia Garden" }
    ]
  },
  items: {
    avesa: [
      {
        id: "canary",
        name: "Canary",
        type: "Avesa Garden",
        description: "Hunian berkonsep American Barn House dengan taman terbuka hijau yang asri dan desain plafon tinggi (high ceiling).",
        specs: { beds: "1-2", baths: "1", luasTanah: "72m²", luasBangunan: "20-30m²" },
        image: "/cluster avesa garden/CANARY/galeri_cluster4_68a28b1f778ed.jpg",
        tag: "Last Unit",
        status: "active",
        link: "/clusters/canary"
      },
      {
        id: "derora",
        name: "Derora",
        type: "Avesa Garden",
        description: "Cluster Derora di Metland Cikarang menghadirkan konsep hunian bergaya American Farmhouse yang estetik, modern, dan penuh karakter.",
        specs: { beds: "3", baths: "2", luasTanah: "72-84m²", luasBangunan: "33-59m²" },
        image: "/cluster avesa garden/DERORA/galeri_cluster2_68a174f24c287.jpg",
        tag: "Best Seller",
        status: "active",
        link: "/clusters/derora"
      }
    ],
    brassia: [
      {
        id: "myzora",
        name: "Myzora",
        type: "Brassia Garden",
        description: "Rumah premium berkonsep Farmhouse modern dengan sentuhan arsitektur elegan dan smart door lock terintegrasi.",
        specs: { beds: "2-4", baths: "1-2", luasTanah: "72-98m²", luasBangunan: "33-77m²" },
        image: "/cluster brassia-garden-new/fasad myzora 77 98.jpg",
        tag: "Premium",
        status: "active",
        link: "/clusters/brassia"
      },
      {
        id: "ellyra",
        name: "Ellyra",
        type: "Brassia Garden",
        description: "Eksklusivitas tanpa batas. Hunian lapang dengan high ceiling dan pencahayaan natural yang maksimal.",
        specs: { beds: "2", baths: "1-2", luasTanah: "72-98m²", luasBangunan: "45-56m²" },
        image: "/cluster brassia-garden-new/galeri_cluster8_6a2540593d440.jpeg",
        tag: "Exclusive",
        status: "active",
        link: "/clusters/brassia"
      }
    ],
    commercial: [
      {
        id: "easton",
        name: "Easton Gateway",
        type: "Commercial Ruko",
        description: "Mengadaptasi Konsep Township Commercial Area bergaya Western Cities. Walkable Shopping Area di pintu gerbang utama Metland Cikarang dengan exposure maksimal.",
        specs: { beds: "-", baths: "-", luasTanah: "90-100m²", luasBangunan: "54-60m²", custom: "3 Lantai | Bonus AC + CCTV" },
        image: "/RUKO EASTON GATEWAY/galeri_cluster6_68a1db681c4c4 (1).jpg",
        tag: "Sold Out",
        status: "active",
        link: "/clusters/easton"
      },
      {
        id: "weston",
        name: "Weston Gateway",
        type: "Commercial Ruko",
        description: "Pusat bisnis premium dengan traffic tinggi. Mengadaptasi Konsep Township Commercial Area bergaya Western Cities.",
        specs: { beds: "-", baths: "-", luasTanah: "90-100m²", luasBangunan: "54-60m²", custom: "3 Lantai | Bonus AC + CCTV" },
        image: "/RUKO WESTON GATEWAY/galeri_cluster7_693135f9dd540 (2).jpg",
        tag: "Available",
        status: "active",
        link: "/clusters/weston"
      }
    ]
  }
};

export default function ClusterShowcaseCarousel() {
  const [activeCategory, setActiveCategory] = useState("residential");
  const [activeCluster, setActiveCluster] = useState("avesa");

  // Get active items to display
  const displayItems = activeCategory === "commercial" 
    ? filterData.items.commercial 
    : filterData.items[activeCluster];

  return (
    <section id="best-cluster" className="py-32 bg-[#03050a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        
        {/* Artistic Section Title */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[50px] pointer-events-none"
          />
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 bg-dark-card border border-border px-6 py-2.5 rounded-full mb-6 shadow-emerald-glow"
          >
            <span className="text-sm font-semibold tracking-widest text-light-text uppercase">Best Cluster</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-title font-bold text-light-text mb-6 leading-tight relative"
          >
            Mahakarya <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-200 font-serif italic pr-2">Properti</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              Cluster Terbaik.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-text text-lg md:text-xl max-w-2xl"
          >
            Lebih dari sekadar bangunan. Ini adalah mahakarya arsitektur yang dirancang untuk mewadahi visi kehidupan dan eskalasi bisnis Anda.
          </motion.p>
        </div>

        {/* Dynamic Filtering System */}
        <div className="flex flex-col items-center mb-16">
          {/* Main Category Tabs */}
          <div className="flex space-x-2 p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-8">
            {filterData.categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-500",
                  activeCategory === category.id 
                    ? "bg-primary text-dark-bg shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sub-Category Tabs (Only for Residential) */}
          <AnimatePresence>
            {activeCategory === "residential" && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                className="flex space-x-4 border-b border-white/10 pb-4 overflow-hidden"
              >
                {filterData.clusters.residential.map(cluster => (
                  <button
                    key={cluster.id}
                    onClick={() => setActiveCluster(cluster.id)}
                    className={cn(
                      "text-lg md:text-xl font-title font-medium transition-all duration-300 relative px-2",
                      activeCluster === cluster.id ? "text-emerald-400" : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    {cluster.label}
                    {activeCluster === cluster.id && (
                      <motion.div 
                        layoutId="activeClusterLine"
                        className="absolute -bottom-4 left-0 right-0 h-0.5 bg-emerald-400"
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filtered Grid Gallery */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {displayItems.map((item, index) => {
              const isDisabled = item.status === "disabled";
              const isSoldOut = item.status === "soldout";
              
              return (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "group relative rounded-[2rem] overflow-hidden bg-dark-card/40 backdrop-blur-xl border border-white/5 flex flex-col aspect-square md:aspect-[4/3] transition-all duration-700 ease-out",
                    !isDisabled && !isSoldOut && "hover:border-primary/40",
                    (isDisabled || isSoldOut) && "opacity-75 grayscale-[50%]"
                  )}
                >
                  {/* Link Overlay if active */}
                  {!isDisabled && !isSoldOut && (
                    <Link href={item.link} className="absolute inset-0 block w-full h-full cursor-pointer z-40">
                      <span className="sr-only">View {item.name}</span>
                    </Link>
                  )}

                  {/* Glass Frame Overlay */}
                  <div className={cn(
                    "absolute inset-0 rounded-[2rem] border-[1px] border-white/10 pointer-events-none z-30 transition-colors duration-700",
                    !isDisabled && !isSoldOut && "group-hover:border-primary/50"
                  )} />
                  
                  {/* Image Container */}
                  <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03050a] via-[#03050a]/60 to-transparent opacity-90 z-10 transition-opacity duration-700" />
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-[1.5s] ease-out opacity-80",
                        !isDisabled && !isSoldOut && "group-hover:scale-110 group-hover:opacity-100"
                      )}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 z-20 pointer-events-none">
                    <div className={cn(
                      "backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase shadow-lg transition-all duration-500 border",
                      isSoldOut ? "bg-red-500/20 text-red-200 border-red-500/50" :
                      isDisabled ? "bg-gray-500/20 text-gray-300 border-gray-500/50" :
                      "bg-white/10 text-white border-white/20 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:text-emerald-200"
                    )}>
                      {item.tag}
                    </div>
                  </div>

                  {/* Lock icon overlay for sold out / coming soon */}
                  {(isDisabled || isSoldOut) && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none opacity-50">
                      <Lock size={64} className="text-white/30" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 flex flex-col justify-end pointer-events-none">
                    <p className="text-secondary font-medium tracking-wider text-sm mb-2 uppercase">{item.type}</p>
                    <h3 className={cn(
                      "text-3xl md:text-4xl font-title font-bold text-white mb-3 transition-colors duration-500",
                      !isDisabled && !isSoldOut && "group-hover:text-primary"
                    )}>
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-4 border-t border-white/10 pt-4 flex-wrap">
                      {item.specs.custom && (
                        <div className="flex items-center text-xs text-emerald-300 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-1">
                          {item.specs.custom}
                        </div>
                      )}
                      {!item.specs.custom && item.specs.beds !== "-" && (
                        <div className="flex items-center text-xs text-gray-300">
                          <BedDouble className="w-4 h-4 mr-1.5 text-secondary" /> {item.specs.beds} Bed
                        </div>
                      )}
                      {!item.specs.custom && item.specs.baths !== "-" && (
                        <div className="flex items-center text-xs text-gray-300">
                          <Bath className="w-4 h-4 mr-1.5 text-secondary" /> {item.specs.baths} Bath
                        </div>
                      )}
                      <div className="flex items-center text-xs text-gray-300">
                        <Maximize className="w-4 h-4 mr-1.5 text-secondary" /> {item.specs.luasTanah} / {item.specs.luasBangunan}
                      </div>
                    </div>

                    {/* Arrow Button */}
                    {!isDisabled && !isSoldOut && (
                      <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-primary group-hover:border-primary group-hover:shadow-emerald-glow transition-all duration-500">
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
