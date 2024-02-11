// import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup'
import { useFormik } from 'formik'

const feildValidationShema = yup.object({
  name : yup.string().required("Please Enter the Student name"),
  batch : yup.string().min(5).required("Please enter the batch name"),
  gender : yup.string().required("Please spcify the gender"),
  qualification : yup.string().required("please enter the qualification"),


}) 

function UpdateStudents({students, setStudents}) {
    const {id} = useParams();
    //  const editStudent = students[id]
    const editStudent = students.find(stud => stud._id === id);
    // const [name, setName] = useState("")
    // const [batch, setBatch] = useState("")
    // const [gender, setGender] = useState("")
    // const [qualification, setQualification] = useState("")
    const history = useHistory();

    // useEffect(()=>{
    //    setName(editStudent.name)
    //    setBatch(editStudent.batch)
    //    setGender(editStudent.gender)
    //    setQualification(editStudent.qualification)
    // }, [editStudent])

    const {handleSubmit,handleChange,values,handleBlur,touched,errors} = useFormik({
      initialValues : {
        name : (editStudent.name),
        batch : (editStudent.batch),
        gender : (editStudent.gender),
        qualification : (editStudent.qualification),
  
      },
      validationSchema : feildValidationShema,
      onSubmit : (editStudentData)=>{
        console.log("onsubmit");
        updateStudent(editStudentData);
      },
    })


    async function updateStudent (updatedObject){
        //  const updatedObject = {
        //     name : name,
        //     batch : batch,
        //     gender: gender,
        //     qualification :qualification
        //  }
     const response = await fetch(`https://node-mongodb-task3.vercel.app/students/edit/${editStudent.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     const studIndex = students.findIndex((stud)=>stud._id === id);
     if(data){
         console.log(updatedObject)
         students[studIndex] = updatedObject
         setStudents([...students])
         history.push("/students")
     }
    }

  return (
    <Base
    title={"Edit a Student data"}
    description={"Edit Students data is here"}
    >
    <div>
    <form onSubmit={handleSubmit}>
    <input
        placeholder='Enter Name'
        name = "name"
        type ="name"
        onBlur={handleBlur}
        value = {values.name}
        onChange={handleChange}
        />
        

        <div style={{color:"crimson"}}>{errors.name? errors.name : ""}</div>
        <br></br>
        <input
        placeholder='Enter Batch'
        name = "batch"
        type ="batch"
        onBlur={handleBlur}
        value ={values.batch}
        onChange={handleChange}
        />

        <div style={{color:"crimson"}}>{touched.batch && errors.batch? errors.batch : ""}</div>  

        <br></br>
        <input
        placeholder='Enter Gender'
        name = "gender"
        type ="gender" 
        onBlur={handleBlur}
        value ={values.gender}
        onChange={handleChange}
        />

        <div style={{color:"crimson"}}>{touched.gender && errors.gender? errors.gender : ""}</div>

        <br></br>

        <input
        placeholder='Enter Qualification'
        name = "qualification"
        type ="qualification"
        onBlur={handleBlur}
        value= {values.qualification}
        onChange={handleChange}
        />

        <div style={{color:"crimson"}}>{touched.qualification && errors.qualification? errors.qualification : ""}</div>

        <br></br>
    <button
    // onClick={updateStudent}
    type="onSubmit"
    >Update Students</button>
    </form>
</div>
</Base>
  )
}

export default UpdateStudents