import { cookies } from "next/headers";
import ChatWindow from "./chat-window";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <ChatWindow />
    </div>
  );
}
