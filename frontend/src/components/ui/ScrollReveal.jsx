import { motion } from "framer-motion";


function ScrollReveal({
    children,
    delay = 0,
    className = ""
}) {

    return (

        <motion.div
            className={`scroll-reveal ${className}`}

            initial={{
                opacity: 0,
                y: 60,
                scale: 0.96
            }}

            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1
            }}

            viewport={{
                once: true,
                amount: 0.15
            }}

            transition={{
                duration: 0.8,
                delay: delay,
                ease: "easeOut"
            }}
        >

            {children}

        </motion.div>
    );
}


export default ScrollReveal;