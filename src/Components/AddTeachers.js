// import React, { useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'

const feildValidationShema = yup.object({
  name : yup.string().required("Please Enter the Student name"),
  batch : yup.string().required("Please enter the batch name"),
  gender : yup.string().required("please spcify the gender"),
  qualification : yup.string().required("please enter the qualification"),


}) 


function AddTeachers({teachers, setTeachers}) {
  const history = useHistory()

  const {handleSubmit,handleChange,values,handleBlur,touched,errors} = useFormik({
    initialValues : {
      name : "",
      batch : "",
      gender : "",
      qualification : "",

    },
    validationSchema : feildValidationShema,
    onSubmit : (newTeacherData)=>{
      console.log("onsubmit");
      createTeacher(newTeacherData);
    },
  })

    // const [name, setName] = useState("")
    // const [batch, setBatch] = useState("")
    // const [gender, setGender] = useState("")
    // const [qualification, setQualification] = useState("")

const createTeacher = async (newTeachers) =>{
    // creating object from input states
//     const newTeachers = {
//       name:name,
//       batch:batch,
//       qualification:qualification,
//       gender: gender,
// }

const response = await fetch("https://node-mongodb-task3.vercel.app/mentors/add", {
  method:"POST",
  body:JSON.stringify(newTeachers),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setTeachers([...teachers, data])
  history.push("/teachers")
}

  return (
    <Base
    title={"Add New Teacher"}
    description={"We can able to add new teachers data here"}
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
        

        <div style={{color:"crimson"}}>{touched.name && errors.name? errors.name : ""}</div>
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
        // onClick={createTeacher}
        type="onSubmit"
        >Add Teacher</button>
        </form>
    </div>
    </Base>
  )
}

export default AddTeachers