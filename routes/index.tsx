/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        璇宝，要给我留点牛肉呀！我马上就下班了！爱你呦❤️
      </p>
      <Counter start={3} />
    </div>
  );
}
