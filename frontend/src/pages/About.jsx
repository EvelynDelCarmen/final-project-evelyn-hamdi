import { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const About = () => {

    //GSAP - ändra effekterna
    useEffect(() => {
        const logotypeElements = document.querySelectorAll(".logotype");
        logotypeElements.forEach((container) => {
            const logo = container.querySelector(".logo");
            const squareTop = container.querySelectorAll(".right-up");
            const squareBottom = container.querySelectorAll(".left-down");
            const toggleLogo = gsap.timeline({
                reversed: true,
                paused: true,
                defaults: { duration: 0.3 },
            });
            toggleLogo
                .to(logo, { rotation: 135 }, 0)
                .to(squareTop, { fill: "#32E0C4" }, "<")
                .to(squareBottom, { fill: "#32E0C4" }, "<");
            container.addEventListener("mouseenter", () => toggleLogo.play());
            container.addEventListener("mouseleave", () => toggleLogo.reverse());
        });
    }, []); // Empty dependency array to run the effect only once on mount
    return (

        //responsive design - lägg till 
        <div className="container mx-auto my-8 flex">
            <div className="w-1/2 pr-4">
                {/* Add your image here */}
                <img
                    src="src/assets/evelyn123.jpg"
                    alt="Evelyn Del Carmen"
                    className="w-full object-cover"
                />
            </div>
            <div className="w-1/2">
                <div className="flex justify-end mb-4">
                    <Link
                        to="/"
                        className="text-2xl text-customBlue p-1 border border-customBlue rounded-md hover:bg-customBlue hover:text-white transition-all">
                        {/* This is your sleeker "X" button */}
                        &#10006;
                    </Link>
                </div>
                <div>
                    <h1 className="font-archivoBlack text-2xl font-bold mb-4 text-customBlue">
                        About
                    </h1>
                    <p className="opacity-100 transform translate-x-0 translate-y-0">
                        GROWING UP IN THE SWEDISH COUNTRYSIDE,
                        <br />
                        EVELYN DEL CARMEN EARLY ON FOUND AN ESCAPE
                        <br />
                        FROM THE MUNDANE EVERYDAY IN CINEMA.
                        <br />
                        INSPIRED BY THE CINEMATIC AESTHETICS,
                        <br />
                        SHE PICKED UP HER FIRST CAMERA AT A YOUNG AGE
                        <br />
                        AND BEGAN CAPTURING THE PEOPLE AND PLACES
                        <br />
                        AROUND HER. SINCE THEN, EVELYN HAS STUDIED
                        <br />
                        PHOTOGRAPHY AND MOVING IMAGE AT KULTURAMA
                        <br />
                        AND FOTOSKOLAN STHLM. SHE ADDITIONALLY HAS A<br />
                        BACKGROUND IN PROJECT MANAGEMENT, SOMETHING
                        <br />
                        THAT HAS PROVED USEFUL WHEN DIRECTING PHOTO SHOOTS
                        <br />
                        AND MUSIC VIDEOS. NO STRANGER TO FAST-PACED ENVIRONMENTS,
                        <br />
                        EVELYN IS KNOWN FOR HER HEARTY LAUGHTER, SHARP EYE FOR
                        <br />
                        DETAIL, AND HER “LET’S DO THIS”-ATTITUDE.
                    </p>
                    <br />
                    <h1 className="font-archivoBlack text-2xl font-bold mb-4 text-customBlue">
                        Clients & expertise
                    </h1>
                    <p className="opacity-100 transform translate-x-0 translate-y-0">
                        HAVING SPECIALISED IN E-COM,
                        <br />
                        PORTRAITS AND PRODUCT PHOTOGRAPHY – <br />
                        HER CLIENT LIST INCLUDES FILIPPA K, <br />
                        & OTHER STORIES, WEEKDAY, H&M,
                        <br /> SKANSKA, SONIC MAGAZINE, <br />
                        SOUNDTELLING AND MORE.
                    </p>
                </div>
            </div>
        </div>
    );
};
export default About;