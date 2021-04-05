import React, {useState} from 'react';

const inputCard = {
    width: '600px',
    margin: '20px auto',
    backgroundColor: '#FFFFFF',
    minHeight: '200px',
    border: '1px light ',
    borderRadius: '4px',

  }
  const inputHeader = {
    fontFamily: 'Arial',
    fontSize:'15px',
  }
  const inputField = {
    height: '100px',
    width: '100%',
    padding: '10px auto',
    border: 'none',
    fontFamily: 'Arial',
    fontSize:'20px',
    

  }
function Quicknote() {
    return (
        <div className = "inputCard">
            <div className = "inputHeader"> URL </div>
            <input 
                className = "inputField"
                type = "text"
            />
        </div>
    )
}



export default Quicknote;