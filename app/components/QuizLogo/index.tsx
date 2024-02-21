import Link from "next/link";

export function QuizLogo() {
  return (
    <Link href="/">
      <img src="./images/logo.png" alt="" style={{height: "12rem"}} />
    </Link>
  );
}
