export default function SMMCLogo({ className = "w-48 h-auto" }) {
  return (
    <div className={`flex items-center justify-center ${className} p-2`}>
      <img 
        src="/smmc-logo.png" 
        alt="SMMC Property Logo" 
        className="max-h-full max-w-full object-contain drop-shadow-xl"
      />
    </div>
  );
}
