import confetti from "confetti";

export default function ConfettiIsland() {
    return <button onClick={()=>{
        confetti();
    }}>🎉撒花</button>;
}
