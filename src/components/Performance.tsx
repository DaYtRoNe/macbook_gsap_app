import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { performanceImages, performanceImgPositions } from "../constants"

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {
    const sectionRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const isMobile = window.innerWidth <= 1024

        // Text animation - fade in and move up
        gsap.to(".content p", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".content",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none",
            }
        })

        // Desktop only - image animations with scrubbed scroll timeline
        if (!isMobile) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "center center",
                    scrub: 1,
                }
            })

            // Animate each image to its final position at time 0
            performanceImgPositions.forEach((position) => {
                // Skip p5 as requested
                if (position.id === "p5") return

                const target = `.${position.id}`
                const animProps: gsap.TweenVars = {
                    bottom: `${position.bottom}%`,
                    opacity: 1,
                    ease: "power2.inOut",
                }

                // Add left or right property based on what's defined
                if ("left" in position) {
                    animProps.left = `${position.left}%`
                } else if ("right" in position) {
                    animProps.right = `${position.right}%`
                }

                // Set initial state
                gsap.set(target, {
                    opacity: 0,
                    bottom: "20%",
                })

                // Add to timeline at time 0
                tl.to(target, animProps, 0)
            })
        }

        // Refresh ScrollTrigger on resize
        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, { scope: sectionRef })

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map(({ id, src }) => (
                    <img src={src} key={id} alt={id} className={id} />
                ))}
            </div>

            <div className="content">
                <p>
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with your imagination. The M4 family of chips features a GPU with a
                    second-generation hardware-accelerated ray tracing engine that renders
                    images faster, so{" "}
                    <span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span>{" "}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge performance boost
                    for the most demanding pro apps and games.
                </p>
            </div>

        </section>
    )
}

export default Performance