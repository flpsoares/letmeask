/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const params = useParams<RoomParams>()

  const roomId = params.id

  // const { user } = useAuth()
  const { questions, title } = useRoom(roomId)

  async function handleDeleteQuestion(questionId: string) {
    if (confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {questions.map(question => {
          return (
            <Question key={question.id} content={question.content} author={question.author}>
              <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          )
        })}
      </main>
    </div>
  )
}
