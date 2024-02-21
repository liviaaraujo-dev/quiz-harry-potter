"use client";

import { useRouter } from "next/navigation";
import pageStyles from "./page.module.css";
import { QuizLogo } from "./components/QuizLogo";
import { Card } from "./components/Card";
import { ButtonPrimary } from "./components/ButtonPrimary";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState("")

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px"
          }}
        >
          <QuizLogo />
        </div>

        <Card
          headerTitle="Teste suas habilidades"
        >
          <p style={{ marginBottom: "32px" }}>
            Teste os seus conhecimentos sobre o universo de Harry Potter!
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              router.push(`/game?player=${name}`)
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <input
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                name="playerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <ButtonPrimary text="JOGAR" click={() => {}} />
          </form>
        </Card>
      </section>
    </main>
  )
}
