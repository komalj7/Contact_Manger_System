import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import { Spinner } from '../../Spinner/Spinner'

export const EditContact = () => {
  let navigate=useNavigate()
  let {contactID}=useParams()
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
      let  response=ContactServices.getContact(contactID)
      res(response)
    })
    prom.then((resp1)=>{
      console.log(resp1);
      setState({...state,loading:false,contact:resp1.data})
      return new Promise((res1,rej1)=>{
        let groupResponse=ContactServices.getGroups()
        res1(groupResponse)
      }).then((resp2)=>{
        console.log(resp2);
        setState({...state,loading:false,contact:resp1.data,groups:resp2.data})
      })
    })
  },[contactID])
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
      let response=ContactServices.updateContact(state.contact,contactID)
      res(response)
      rej("error")
    })
    prom.then((res)=>{
      if(res){
        navigate('/contacts/list',{replace:true})
      }
    }).catch((error)=>{
        setState({...state,loading:false,errorMessage:error})
        navigate(`/contacts/edit/${contactID}`,{replace:true})

    })
  }
  let {loading,contact,groups,errorMessage}=state
  return (
    <div>
       {/* <pre>{JSON.stringify(groups)}</pre>
       <pre>{JSON.stringify(contact)}</pre> */}
        {/* <h1>EditContact</h1> */}
        {
          loading?<Spinner/>:
          <React.Fragment>
               {/* create section padding:  p-3 */}
      <section className="create-contact p-3">
        {/* inside section create container */}
          <div className="container">
            {/* row and col always contain inside container */}
            <div className="row">
              <div className="col">
                  {/* fw:font weight */}
                    <p className='h4 text-primary fw-bold'>Edit Contact</p>
                    <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quos dignissimos similique. Unde culpa quo, alias sunt adipisci ullam iure optio, quia, esse labore praesentium voluptas blanditiis natus dignissimos ipsam.</p>
              </div>
            </div>
            {/* ROW-2 */}
            <div className="row">
              <div className="col-md-4">
                <form action="" onSubmit={submitForm}>
                  <div className="mb-2">
                      <input type="text" className='form-control' required={true}  name='name' value={contact.name} onChange={updateInput} placeholder='Name'/>
                  </div>
                  <div className="mb-2">
                      <input type="text" className='form-control' required={true}  name='photo' value={contact.photo} onChange={updateInput}placeholder='Photo URL'/>
                  </div>
                  <div className="mb-2">
                      <input type="number" className='form-control' required={true}  name='contact' value={contact.contact} onChange={updateInput} placeholder='Mobile Number'/>
                  </div>
                  <div className="mb-2">
                      <input type="email" className='form-control' required={true}  name='email' value={contact.email} onChange={updateInput} placeholder='Email'/>
                  </div>
                  <div className="mb-2">
                      <input type="text" className='form-control' required={true}  name='title' value={contact.title} onChange={updateInput} placeholder='Title'/>
                  </div>
                  <div className="mb-2">
                      <input type="text" className='form-control' required={true}  name='company' value={contact.company} onChange={updateInput} placeholder='Company'/>
                  </div>
                  <div className="mb-2">
                      <select name="groupId" value={contact.groupId} id="" className='form-control'>
                          <option value="">Select A group</option>
                          {

                         groups.length>0  &&
                         groups.map((group)=>{
                          return(
                            <option key={group.id} value={group.id}>{group.name}</option>
                         )
                         })
                          }
                      </select>
                  </div>
          
                  <div className="mb-2">
                      <input type="submit" className='btn btn-primary' value={'Edit'}/>
                      <Link to={'/'}className='btn btn-dark ms-2'>Cancel</Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <img className='contact-img'src={contact.photo}></img>
              </div>
            </div>
          </div>
      </section>
      </React.Fragment>
        }
        
    </div>
  )
}
