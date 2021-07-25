import React, {useState} from 'react'

import './Main.scss';
import {Schedule_Progress as ScheduleProgress} from '../../components/Schedule_Progress/Schedule_Progress';
import {Modal} from '../../components/Modal/Modal';


import {useDispatch, useSelector} from 'react-redux';

import {Set_Modal} from '../../REDUX/actions';


export const Main = () => {
  const [type, setType] = useState('Students')
  const dispatch = useDispatch()

  function typeHandler (param) {
    if (param === type) {return}
    const newType = type === 'Students' ? 'Groups' : 'Students'
    setType(newType)
  }
  const state = useSelector(state => state.main)

  return (
    <>
      <div className="main">
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
            onClick={()=>{dispatch(Set_Modal('add_student'))}}
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
            onClick={()=>{dispatch(Set_Modal('add_student'))}}
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
            onClick={()=>{dispatch(Set_Modal('add_student'))}}
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
              {state.students.map((i,index)=><React.Fragment key={index}>
                <div className="student">
                    <img
                      src={require("../../img/avatar_2.svg").default}
                      alt="account"
                    />
                    <div className="student-name">{i.student_name}</div>
                </div></React.Fragment>)}
                
              </div>
            </>}
        </div>
        { type === 'Students' ? <ScheduleProgress /> : type === 'Groups' ? <div>Что-то</div> : null}
      </div>
      {state.modal ? <Modal type={state.modal} /> : null}
    </>   
  )
}
