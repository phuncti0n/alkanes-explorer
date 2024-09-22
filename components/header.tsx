import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

export const Header: Component = () => {
  const nav = useNavigate();
  return (
    <h1 onClick={() => nav("/")} class="text-center mb-[20px] cursor-pointer">
      Alkanes Explorer
    </h1>
  );
};
