import './App.css';
import sho from './assets/sho.png';
import telegram from './assets/telegram.png';
import x from './assets/x.png';
import audio from './assets/audio.mp3';
import Player from "./useAudio.jsx";
import { motion } from "framer-motion";

function App() {
    return (
        <div className="page">
            <div className="container">

                <div className="content">
                    <div className="bg"></div>
                    <motion.img
                        className="sho"
                        src={sho}
                        alt=""
                        initial={{y: 200, opacity: 0}} // Start below and invisible
                        animate={{y: [0, -40, 0], opacity: 1}} // Oscillate up and down, with opacity fixed to 1
                        transition={{
                            y: {
                                duration: 4, // Duration of one oscillation
                                ease: "easeInOut",
                                repeat: Infinity, // Loop forever
                                repeatType: "loop",
                            },
                            opacity: {
                                duration: 2,  // Fade in once over 1 second
                                ease: "easeInOut",
                            },
                        }}
                    />

                    <motion.p
                        className="sho-text"
                        initial={{y: 100, opacity: 0}} // Start below and invisible
                        animate={{y: 0, opacity: 1}} // Move to the final position and become visible
                        transition={{
                            duration: 2, // Total animation duration
                            ease: "easeInOut", // Smooth transition
                        }}
                    >
                        sho.
                    </motion.p>


                </div>
                <div className="footer">
                    <div className="links">
                        <a href="">
                            <img src={telegram} alt="t"/>
                        </a>
                        <a href="">
                            <img src={x} alt="x"/>
                        </a>
                    </div>
                    <div className="chart">
                        <a href="">chart for shrooms</a>
                        <div className="player-wrapper">
                            <p>MOS 6581</p>
                            <div className="player">
                                <Player url={audio}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
