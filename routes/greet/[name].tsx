// routes/greet/[name].tsx

/** @jsx h */
import { h } from 'preact';
import { PageProps } from '$fresh/server.ts';

export default function GreetPage(props: PageProps) {
    const {name} = props.params;
    return (
        <main>
            <p>Greeting to you, {name}!</p>
            <p>{import.meta.url}</p>
        </main>
    );
}
