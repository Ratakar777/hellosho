import {useState, useEffect} from "react";
import {FaPlay, FaPause} from "react-icons/fa";

const useAudio = (url) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const toggle = () => setPlaying(!playing);

    const setAudioTime = (time) => {
        audio.currentTime = time;
        setCurrentTime(time);
    };

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", () => setPlaying(false));

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle, currentTime, duration, setAudioTime];
};


const Player = ({url}) => {
    const [playing, toggle, currentTime, duration, setAudioTime] = useAudio(url);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleSliderChange = (e) => {
        setAudioTime(Number(e.target.value));
    };

    return (
        <div className="player">
            {playing ? (
                <span className="control" onClick={toggle}><FaPause/></span>
            ) : (

                <span className="control" onClick={toggle}><FaPlay/></span>
            )}
            <div>
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSliderChange}
                />
            </div>
            <div className="time-wrapper">
                <span className="time">{formatTime(currentTime)} / </span> <span className="time">{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default Player;
