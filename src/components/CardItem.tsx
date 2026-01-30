import { Star, Download, MessageCircle } from "lucide-react";
import android from "@/assets/icons/566798443d4c7396de7cfd60251629e15e91ec5a.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type AppCardProps = {
  name: string;
  downloads: string;
  rating: number;
  reviews: string;
  images: string[];
  id: number;
  img: string;
};

export default function AppCard({
  name,
  downloads,
  rating,
  reviews,
  images,
  id,
  img,
}: AppCardProps) {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleActivate = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (progress > 0) return;
    let value = 0;

    const interval = setInterval(() => {
      value += 5;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => navigate(`/app/${id}`), 300);
      }
    }, 80);
  };

  return (
    <section
      className={cn(
        "bg-white py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-3 relative overflow-hidden"
      )}
    >
      <div className="flex gap-4 justify-between text-right border-b pb-3 px-4 relative">
        <section className="flex gap-4">
          <img
            src={img}
            alt={name}
            className="size-[65px] rounded-full"
            loading="lazy"
          />
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            <div className="flex items-center text-gray-600 text-sm">
              <Download className="w-4 h-4 mr-1 text-blue-500" />
              <h5 className="font-semibold">{downloads}</h5>
            </div>
            <div className="flex items-center text-gray-600 text-sm gap-1">
              <Star className="w-5 h-5 mr-1 text-yellow-400" />
              <h5 className="font-semibold">{rating}</h5>
            </div>
            <div className="flex items-center text-gray-600 text-sm gap-1">
              <MessageCircle className="w-5 h-5 mr-1" />
              <h5 className="font-semibold">{reviews}</h5>
            </div>
            <img
              src={android}
              className="size-8 absolute left-5 bottom-3 opacity-70"
              alt="android"
            />
          </div>
        </section>

        {/* زر تفعيل جذاب بنفس الحجم */}
        <div className="relative w-[90px] h-[38px]">
          <Button
            onClick={handleActivate}
            disabled={progress > 0}
            variant="link"
            className={cn(
              "relative w-full h-full font-semibold rounded-lg overflow-hidden transition-all duration-300 text-white",
              progress > 0
                ? "bg-[#00a76a]"
                : "bg-gradient-to-r from-[#00C67C] to-[#009E6F] hover:from-[#00D285] hover:to-[#00A674] shadow-md hover:shadow-lg"
            )}
          >
            {progress === 0 ? "تفعيل" : "جاري التفعيل..."}
          </Button>

          {/* شريط التعبئة الذهبي داخل الزر */}
          {progress > 0 && (
            <span
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-yellow-300 transition-all ease-linear rounded-lg"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-800 my-5 px-4 border-b pb-3">
        صور من التطبيق
      </h2>
      <div className="flex items-center justify-center gap-3">
        {images.map((img) => (
          <img src={img} className="w-[100px] rounded-lg" alt="" />
        ))}
      </div>
    </section>
  );
}
