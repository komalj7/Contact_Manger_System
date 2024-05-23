import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'

export const AddContact = () => {
  let navigate=useNavigate()
  let[state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      email:"",
      title:"",
      company:''
    },
    groups:[],
    errorMessage:'' 
  })
  useEffect(()=>{
    let prom=new Promise((res,rej)=>{
      setState({...state,loading:true})
      let  groupResponse=ContactServices.getGroups()
      res(groupResponse)
    })
    prom.then((resp1)=>{
      setState({...state,loading:false,groups:resp1.data})
      console.log(resp1.data);
    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error})
      alert("data is not found")
    })
  },[])
  let updateInput=(event)=>{
    setState({
      ...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value
      }
    })
  }
  let submitForm=(event)=>{
    event.preventDefault();

    let prom=new Promise((res,rej)=>{
      let postContact=ContactServices.createContact(state.contact)
      res(postContact)
    })
    prom.then((resp1)=>{
      if(resp1){
        setState({...state,contact:resp1.data})
        navigate('/contacts/list',{replace:true})
      }
      else{
        navigate('/contacts/add',{replace:false})
      }
    })
  }
  let{loading,contact,groups,errorMessage}=state;
  return (
    <div>
      {/* stringify method is used to check data is present or not on server */}
      <pre>{JSON.stringify(groups)}</pre>
      {/* <h1>AddContact</h1> */}
      {/* create section padding:  p-3 */}
      <section className="create-contact p-3">
        {/* inside section create container */}
          <div className="container">
            {/* row and col always contain inside container */}
            <div className="row">
              <div className="col">
                    <p className='h4 text-success fw-bold'>Create Contact</p>
                    <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos dignissimos similique. Unde culpa quo, alias sunt adipisci ullam iure optio, quia, esse labore praesentium voluptas blanditiis natus dignissimos ipsam.</p>
              </div>
            </div>
            {/* ROW-2 */}
            <div className="row">
              <div className="col-md-4">
                <form action="" onSubmit={submitForm}>
                  <div className="mb-2">
                      <input type="text" className='form-control' required={true} name='name' value={contact.name} onChange={updateInput} placeholder='Name'/>
                  </div>
                  <div className="mb-2">
                      <input type="text" className='form-control'  required={true} name='photo' value={contact.photo} onChange={updateInput} placeholder='Photo URL'/>
                  </div>
                  <div className="mb-2">
                      <input type="number" className='form-control'  required={true} name='contact' value={contact.contact} onChange={updateInput}placeholder='Mobile Number'/>
                  </div>
                  <div className="mb-2">
                      <input type="email" className='form-control'  required={true} name='email'value={contact.email} onChange={updateInput} placeholder='Email'/>
                  </div>
                  <div className="mb-2">
                      <input type="text" className='form-control'  required={true}name='title'value={contact.title} onChange={updateInput}  placeholder='Title'/>
                  </div>
                  <div className="mb-2">
                      <input type="text" className='form-control'  required={true}name='company' value={contact.company} onChange={updateInput} placeholder='Company'/>
                  </div>
                  <div className="mb-2">
                      <select id="" className='form-control' name='groupId' value={contact.groupId} onChange={updateInput}>
                          <option value="">Select A group</option>
                          {
                             groups.length>0 &&
                             groups.map((group)=>{
                              return(                        
                                <option key={group.id} value={group.name}>{group.name}</option>
                             )

                             })
                          }
                      </select>
                  </div>
                  <div className="mb-2">
                      <input type="submit" className='btn btn-primary' value={'Add'}/>
                      <Link to={'/'}className='btn btn-dark ms-2'>Cancel</Link>
                  </div>
                </form>
              </div>
              </div>
          </div> 
      </section>
    </div>
  )
}
