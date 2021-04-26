import React from "react";

const onEnter = (cb: (value?: string) => void) => {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      cb(e.currentTarget.value);
    }
  };
};

export default onEnter;
