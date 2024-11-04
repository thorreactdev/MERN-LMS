import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import partner from "@/data/companies_partner.json";
import Autoplay from "embla-carousel-autoplay";

function HeroSection() {
    return (
        <div className="main">
            <div className="z-40 w-full">
                <div className="flex items-center justify-center flex-col gap-6">
                    <h1 className="font-extrabold text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] text-center">
                        Unlock Your Potential <br/>with <span className="text-slate-700">Personalized</span> Learning
                    </h1>

                    <div className="w-full md:w-[520px] text-center">
                        <p className="w-full text-sm text-gray-500 font-medium">
                            Empowering you with interactive courses 🧑‍🎓, hands-on projects, and real-time progress tracking🚀. Dive into a learning journey tailored just for you!
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-6 xl:mt-10 cursor-pointer">
                        <Link to={"/course_page"}>
                        <Button className="w-full" size="lg">
                            Explore Courses
                        </Button>
                        </Link>
                        <Link to={"/login"}>
                        <Button variant="outline" className="w-full" size="lg">
                            Get Started
                        </Button>
                        </Link>
                    </div>
                </div>
                {/*{ Carousel of companies }*/}
                <div className="">
                    <h2 className="text-center mt-10 lg:mt-14 xl:mt-20 text-base font-semibold text-gray-800">
                        Partner With Top Companies
                    </h2>
                   <Carousel className="w-full py-10 lg:py-14" plugins={[Autoplay({delay : 2000})]}>
                       <CarouselContent className="flex gap-5">
                           {partner?.partners?.map((item)=>(
                               <CarouselItem key={item?.id} className="basis-1/3 lg:basis-1/4 flex flex-col gap-1 items-center">
                                   <img src={item?.image_link} alt="Comapny Photo" className="h-9 sm:h-14 object-contain aspect-[3/1]"/>
                                   <span className="text-sm font-medium">
                                       {item?.company_name}
                                   </span>
                               </CarouselItem>
                           ))}
                       </CarouselContent>
                   </Carousel>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;