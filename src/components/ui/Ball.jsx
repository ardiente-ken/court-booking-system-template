// src/components/ui/Ball.jsx: the pickleball mark. Used by: Header, Hero, DonePage.
import pickleBall from "../../assets/pickle-ball.png";

export default function Ball({ size }) {
  return (
    <img
      src={pickleBall}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      style={{
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}

