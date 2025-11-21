export default function Card({ title, subtitle, icon, color }) {
  return (
    <div
      className={`
        p-4
        w-90 h-50
        rounded-2xl 
        shadow 
        flex flex-col justify-between
        transform transition-all duration-300 
        hover:scale-[1.05] hover:shadow-lg
      `}
      style={{ backgroundColor: color }}
    >
      <div>
        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-[#009E83] drop-shadow-md">
          {title}
        </h2>

        {/* SUBTÍTULO */}
        <p className="text-base text-[#009E83]/85 mt-1 font-medium">
          {subtitle}
        </p>
      </div>

      {/* ÍCONE */}
      <img 
        src={icon} 
        alt={title} 
        className="w-24 object-contain ml-auto mt-4 opacity-95"
      />
    </div>
  );
}
