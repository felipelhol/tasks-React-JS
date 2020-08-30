import React, { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api'
import './index.css'

export interface ITask {
  //id: number;
  title: string;
  description: string;
 //  valores default nao precisam no model
//  finished: boolean;
//  created_at: Date;
 // updated_at: Date;
}

const Tasks: React.FC = () => {

  const history = useHistory()

  //const { id }  = useParams();
 

  const [model, setModel] = useState<ITask>({
    
    title: '',
    description: ''
  })
  /*
  useEffect(() =>{
    findTask(id);  
      
  },[id])
*/
  // criar uma function para atualizar os valores do meu estado/ model de acordo com o valor de cada campo
  function updatedModel (e: ChangeEvent<HTMLInputElement>) {
    //desestruturação do que ja tiver no model ... /
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    //console.log(model) para testar se o botao salvar ta recebendo a model
    // comunicar com a api e typeorm
    const response = await api.post('/tasks', model)

    console.log(response)
  }
/*
  async function findTask (id: string) {
    const response = await api.get(`tasks/${id}`)
    console.log(response)
  }
*/
  async function back () {
    //pega o historico da sua aplicação e volta pra ultima pagina
    await history.goBack()
    
  }


  //em acoes vao estar os botoes de CRUD
  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h3>New Task</h3>
        <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control 
              type="text" 
              name="title" 
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} 
            />
            
          </Form.Group>

          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              name="description"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>
         
          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Tasks;