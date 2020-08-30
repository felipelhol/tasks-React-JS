import React, {useState, useEffect} from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import api from '../../services/api'

import moment from 'moment'

import './index.css'

export interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {

  // colocar o api dentro de uma variavel pra exibir na tabela
  // essa variavel task é um array de tasks
  const [tasks, setTasks] = useState<ITask[]>([])
  const history = useHistory()

  useEffect(() => {
    loadTasks()
  }, []) // colchetes vazio pra executar assim que a pagina for iniciada

  async function loadTasks() {

    const response = await api.get('/tasks')
    console.log(response)
    setTasks(response.data)

  }

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY")
  }

  function newTask () {
    history.push('/tarefas_cadastro')
  }

  function editTask(id: number){
    //usar literals do javascripts pra passar o id na url
    history.push(`/tarefas_cadastro/${id}`)
  }

//em acoes vao estar os botoes de CRUD
  return (
      <div className="container">
        <br />
        <div className="task-header">
          <h1>Tasks page</h1>
          <Button variant="dark" size="sm" onClick={newTask} >Nova Tarefa</Button>
        </div>        
        <br />
        <Table striped bordered hover className="text-center">
  <thead>
    <tr>
      <th>ID</th>
      <th>Título</th>
      <th>Data de atualização</th>
      <th>Status</th>
      <th>Ações</th> 
    </tr>
  </thead>
  <tbody>

    {
      tasks.map(task => (
       <tr key={task.id}>
          <td> {task.id} </td>
          <td> {task.title} </td>
          <td> { formateDate(task.updated_at) } </td>
          <td> 
            <Badge variant={task.finished ? "success" : "warning"}>
              { task.finished ? "Finalizado" : "pendente" }
            </Badge>
          </td>
          <td>            
            <Button size="sm" onClick={()=> editTask(task.id)}>Editar</Button>{' '}
            <Button size="sm"variant="success">Finalizar</Button>{' '}
            <Button size="sm" variant="info">Visualizar</Button>{' '}
            <Button size="sm" variant="danger">Remover</Button>{' '}
          </td>
      </tr>
      ))
    }


  </tbody>
</Table> 
      </div>
  );
}

export default Tasks;