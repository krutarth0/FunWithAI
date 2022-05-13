import React from "react";

export default function Iclose({ height, width, onClick }) {
  return (
    <div className="close-response" onClick={() => onClick()}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>ionicons-v5-m</title>
        <path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z" />
      </svg>
    </div>
  );
}
