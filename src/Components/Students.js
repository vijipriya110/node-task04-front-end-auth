// import React, { useState } from 'react'
import Base from '../Base/Base'
// import data from '../Data/data'
// import AddStudents from './AddStudents';
// import UpdateStudents from './UpdateStudents';
import { useHistory } from 'react-router-dom';

function Students({students, setStudents}) {
   const history = useHistory();
    // delete functionality
    const deleteStudent = async (studId)=>{
      
      const response = await fetch(`https://node-mongodb-task3.vercel.app/students/delete/${studId}`, {
         method:"DELETE",
      });

      const data = await response.json()
      console.log(data)
     if(data){
       const remainingStudents = 
       students.filter((stud, idx)=> stud._id !== studId)
       setStudents(remainingStudents)
     }
    }

  
  return (
    <Base 
    title={"Students Data"}
    description={" Here can EDIT and DELETE the Student Data"}
    >

         <div className='card-container'>
            {students.map((stud, idx)=>(
                     <div className='card' key={idx}>
                        <div className='content'>
                     <h3>{stud.name}</h3>
                     <p>{stud.batch}</p>
                     <p>{stud.gender}</p>
                     <p>{stud.qualification}</p>
                     </div>

                     <div className='control'>
                     <button onClick={()=>history.push(`/edit/${stud._id}`)}>Edit</button> {" "}
                     <button onClick={()=>deleteStudent(stud._id)}>Delete</button>
                     </div>
                    </div>
            ))}
     </div>

    </Base>
  )
}

export default Students