import React, {useState} from 'react'

import './Main.scss';
import {Schedule_Progress as ScheduleProgress} from '../../components/Schedule_Progress/Schedule_Progress';
import {Modal} from '../../components/Modal/Modal';


import {LESSON, STUDENTS} from '../../components/DATA'

import {useDispatch, useSelector} from 'react-redux';

import {Set_Modal, Students_Update, Lesson_Add, Add_Student} from '../../REDUX/actions';


export const Main = () => {
  const [type, setType] = useState('Students')
  const dispatch = useDispatch()

  function typeHandler (param) {
    if (param === type) {return}
    const newType = type === 'Students' ? 'Groups' : 'Students'
    setType(newType)
  }
  const state = useSelector(state => state.main)


  function next () {

    let arrStudents = JSON.parse(JSON.stringify(state.students))

    arrStudents.push(arrStudents.shift())

    dispatch(Students_Update(arrStudents))
    
  }

  const [check, setCheck] = useState(true)


  function AddStudentAndLessons () {

    if (check) {

      dispatch(Lesson_Add(LESSON))
      dispatch(Add_Student(STUDENTS))
      setCheck(false)
    }

  }


  return (
    <>
      <div id="main">
      <div 
      className="AddStudentAndLessons"
      onClick={AddStudentAndLessons}
      >Добавить учеников и лекции</div>
        <h1>Мои ученики</h1>
        <div className="types">
          <div 
          className={type === 'Students' ? 'active type type-students' : 'type type-students'} 
          onClick={()=>typeHandler('Students')}
          >
            <h2>Ученики</h2>
            <div className="line"></div>
          </div>
          <div 
          className={type === 'Groups' ? 'active type type-groups' : 'type type-groups'} 
          onClick={()=>typeHandler('Groups')}
          >
            <h2>Группы</h2>
            <div className="line"></div>
          </div>
        </div>
        <div className="add">
          <div className="add-left">
            <div className="add__button add__button-student"
            onClick={()=>{dispatch(Set_Modal({type: 'add_student', payload: '', update: ''}))}}
            >
              <div className="ellipse">
                <img
                  src={require("../../img/Add-w.svg").default}
                  alt="account"
                /> 
              </div>
                <span>Добавить</span>
            </div>
            <div className="add__button add__button-group"
            onClick={()=>{dispatch(Set_Modal({type: 'add_student', payload: '', update: ''}))}}
            >
              <div className="ellipse">
                <img
                  src={require("../../img/Add-w.svg").default}
                  alt="account"
                /> 
              </div>
                <span>Добавить</span>
            </div>
          </div>
          {state.students.length === 0 ? <>
            <div 
            className="add-right"
            onClick={()=>{dispatch(Set_Modal({type: 'add_student', payload: '', update: ''}))}}
            >
              <img
                src={require("../../img/Add-g.svg").default}
                alt="account"
              /> 
              <div className="text">Добавьте своего первого ученика</div>
            </div>
            </> : <>
              <div 
              className="border-students"
              >
              <div className="students">
                {state.students.map((i,index)=><React.Fragment key={index}>
                      <div className="student">
                          <img
                            src={require("../../img/avatar_2.svg").default}
                            alt="account"
                          />
                          <span className="student-name">{i.student_name}</span>
                      </div>
                </React.Fragment>)}
                </div>
                <img
                  src={require("../../img/next.svg").default}
                  alt="account"
                  width='30'
                  className='next'
                  onClick={next}
                />
                <img
                  src={require("../../img/Arrow-g.svg").default}
                  alt="account"
                  className='next-mobil'
                  onClick={next}
                /> 
              </div>
            </>}
        </div>
        { type === 'Students' ? <ScheduleProgress studentsState={state.students} /> : type === 'Groups' ? <div>Что-то</div> : null}
      </div>
      {state.modal.type ? <Modal type={state.modal.type} /> : null}
    </>   
  )
}
