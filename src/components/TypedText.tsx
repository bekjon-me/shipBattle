import React from "react";
import Typed from "react-typed";

const textLines = [
  `Hey! Check out the nice library
  <a href="https://github.com/mattboldt/typed.js">Typed.js!</a>`,
  `It's animating <b>any text</b> you pass to it. <b>Just one line</b> of code!`,
  `In this example I've used React.js wrapper for Typed.js: <b>react-typed</b>`,
  `Such a cool effect, isn't it?`,
  `Follow <b>@room_js</b> to get more web development tricks!`,
];

function TypedText() {
  return (
    <div className="text-[32px] text-white text-center mt-[20vh] p-12 absolute h-[80vh] w-[100%]">
      <Typed strings={textLines} typeSpeed={60} />
    </div>
  );
}

const MemoTypedText = React.memo(TypedText);

export default MemoTypedText;
