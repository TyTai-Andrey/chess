import React, {useState} from 'react'

import './Main.scss';

export const Main = () => {
  const [type, setType] = useState('Students')

  function typeHandler (param) {
    if (param === type) {return}
    const newType = type === 'Students' ? 'Groups' : 'Students'
    setType(newType)
  }

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
            <div className="add__button add__button-student">
              <div className="ellipse">
                <img
                  src={require("../../img/Add-w.svg").default}
                  alt="account"
                /> 
              </div>
                <span>Добавить</span>
            </div>
            <div className="add__button add__button-group">
              <div className="ellipse">
                <img
                  src={require("../../img/Add-w.svg").default}
                  alt="account"
                /> 
              </div>
                <span>Добавить</span>
            </div>
          </div>
          <div className="add-right">
            <img
              src={require("../../img/Add-g.svg").default}
              alt="account"
            /> 
            <div className="text">Добавьте своего первого ученика</div>
          </div>
        </div>
        { type === 'Students' ? <div>1</div> : type === 'Groups' ? <div>2</div> : null}
      </div>
    </>   
  )
}
