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
        这是一条deno-deploy自动构建的页面,文件基于github仓库！
      </p>
        <p>仓库地址:https://github.com/whisper540/deno-deploy-01</p>
        <p>基于Deno(1.23.4)+Fresh(1.0)</p>
      <Counter start={3} />
    </div>
  );
}
