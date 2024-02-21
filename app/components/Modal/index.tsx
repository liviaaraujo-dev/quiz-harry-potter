
import pageStyles from "./style.module.css";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { PiTargetBold } from "react-icons/pi";
import { IoIosCloseCircle } from "react-icons/io";
import { ButtonPrimary } from "../ButtonPrimary";
import { useRouter } from "next/navigation";

interface ModalProps {
  questionsNumber: number;
  corrects: number;
  incorrects: number;
}

export function Modal({questionsNumber, corrects, incorrects}: ModalProps) {
  const router = useRouter();

  function message(): string{
    if(corrects == questionsNumber){
      return '🤩 Uau! Parabéns! Acertou Todas!!';
    }else if(corrects > (questionsNumber / 2)){
      return '🤩 Boa, Quase lá!! Tente Novamente!!';
    } else {
      return 'Que pena!! Tente novamente!!';
    }
  }

  return (
    <div className={pageStyles.modal}>
      <div className={pageStyles.modalContent}>
        <h2>Resultado</h2>
        <div>
          <p className={pageStyles.message}>{message()}</p>

          <div style={{ display: "flex", gap: "2rem", marginBottom: "3rem" }}>
            <div className={pageStyles.box}>
              <BsFillQuestionSquareFill size={40} />
              <span>{questionsNumber}</span>
              <p>Perguntas no total</p>
            </div>

            <div className={pageStyles.box}>
              <PiTargetBold size={40} color="green" />
              <span> {corrects}</span>
              <p>Respostas corretas</p>
            </div>

            <div className={pageStyles.box}>
              <IoIosCloseCircle size={40} color="red" />
              <span> {incorrects  }</span>
              <p>Respostas erradas</p>
            </div>
          </div>
          <ButtonPrimary click={() => {router.push('/')}} text="JOGAR NOVAMENTE" />
        </div>
      </div>
    </div>
  )
}
