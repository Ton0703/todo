import React, {useState, useEffect} from 'react'
import { IoMdAddCircle,IoIosCheckmark, IoIosTrash } from "react-icons/io";
import axios from './utils/axios'

function Main() {
    const [input, set] = useState('')
    const [deleteInput, setDelete] = useState('')
    const [todoList, setTodoList] = useState([])
    useEffect(() => {
       axios.get('/todo').then(res => {
           setTodoList(res.data)
       })
    }, [])
    function handleChange(e){
        set(e)
    }
    function handleSubmit(){
        axios.post('/todo', {input}).then(res => {
           setTodoList([...todoList, res.data])
           set('')
        })
    }
    function handleDelete(e){
        axios.delete(`/todo/${e}`).then(res => {
            setDelete(e)
             setTimeout(() => {
                setTodoList(res.data)
             }, 500)
        })
    }
    function handleComplete(e, index){
        axios.patch(`/todo/${e}`).then(() => {
            
            setTodoList(todoList[index])
        })
    }
    return (
        <div className='main'>
            <div className="title">My Todo</div>
            <div className="add-container">
                <div className="add">
                    <div className="add-input">
                        <input type='input' value={input} onChange={e => handleChange(e.target.value)} placeholder='请输入内容'></input>
                    </div>
                    <div className="add-btn">
                        <div className="btn" onClick={handleSubmit}>
                           <IoMdAddCircle className='btn-svg'/>
                        </div>
                    </div>
                </div>
                <div className="select">
                    <select name="type" id="type">
                        <option value="">所有</option>
                        <option value="">已完成</option>
                        <option value="">未完成</option>
                    </select>
                </div>
            </div>
            <div className="todoList">
                {todoList.map((item,index) =>(
                    <div key={index} className={`todoItem ${item.isComplete?'isComplete': ''} ${deleteInput === item._id? 'isDelete': ''}`}>
                        <div className="content">
                         <span>
                             {item.content}
                         </span>
                        </div>
                        <div className="item-btn">
                            <div className="complete" onClick={() => {handleComplete(item._id, index)}}>
                                <IoIosCheckmark />
                            </div>
                            <div className='delete' onClick={() => handleDelete(item._id)}>
                                <IoIosTrash />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Main
