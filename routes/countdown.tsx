import Countdown from "../islands/Countdown.tsx";

export default function Page() {
    const date = new Date();
    // date.setHours(date.getHours() + 1);
    // date.setMinutes(date.getMinutes()+1);
    date.setSeconds(date.getSeconds()+10);
    return (
        <p>
            The big event is happening <Countdown target={date.toISOString()} />.
        </p>
    );
}
