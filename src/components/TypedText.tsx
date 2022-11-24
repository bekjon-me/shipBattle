import React from "react";
import Typed from "react-typed";

const textLines = [
  `Hey there!`,
  `I'm a full-stack developer.`,
  `I'm currently working on a project called "Ship Battle".`,
  `It's a game where you can play against your friends.`,
  `You can check it out it's source code here: <a target="_blank" id="github_link" href="https://github.com/bekjon-me/shipBattle">Github link</a>`,
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
