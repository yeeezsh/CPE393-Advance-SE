import React, {useState} from 'react';



function Quicknote() {
    return (
        <div style = {styles.inputCard}>
            <div style = {styles.inputHeader}> URL </div>
            <input 
                style = {styles.inputField}
                type = "text"
                placeholder = "Take a note"
            />
        </div>
    );
}

const styles = {
  inputCard: {
    width: '600px',
    margin: '20px auto',
    backgroundColor: '#FFFFFF',
    minHeight: '200px',
    border: '1px solid hsl(216, 8% ,88%)',
    borderRadius: '4px',
    
  },
  inputHeader: {
    fontFamily: 'Arial',
    fontSize:'15px',
    // backgroundColor: '#F5F6F7',
    borderRadius: '2px 2px 0 0',
    borderBottom: '1px solid #dddfe2 ',
    margin: '0',
    padding: '15px',


  },
  inputField: {
    height: '100px',
    width: '580px',
    padding: '10px',
    border: 'none',
    fontFamily: 'Arial',
    fontSize:'20px',
    outline: 'none',
  
  },
  //   focus:{
  //   outline: 'none',
  
  // }
};

export default Quicknote;