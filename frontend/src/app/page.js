"use client"
import { Alert } from "App/utilities";
import Image from "next/image";

export default function Home() {
  Alert.fire({
    title: "Probando SweetAlert2",
    text: "You clicked the button!",
    icon: "success"
  });
  
  return(
    <div>
      Hello word
    </div>
  )
}
