import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import { Spinner } from '../../Spinner/Spinner'

export const ContactList = () => {
    let [state,setState]=useState({
        loading:false,//bcz initsily i dont want to load gif
        contacts:[],
        errorMessage:''//in order to display err
    })
    //in order to replace lifecycle in funxtional based`
    useEffect(()=>{
        let prom1=new Promise((res1,rej1)=>{
            //before getting data from server
            //...state spread operater
            setState({...state,loading:true,contacts:[]})

            let response=ContactServices.getAllContacts()
            res1(response)
            //rej1("error")
        })
        prom1.then((resp1)=>{
            //after getting data from server
            //make loading as false after getting data.
            //set contasts.res1.data in order to get response.
            setState({...state,loading:false,contacts:resp1.data})

            console.log(resp1.data);
        }).catch((error)=>{
            setState({...state,loading:false,errorMessage:error.message})
            alert("data did not found")
        })
    },[])
    let clickDelete=(contactID)=>{
        let promise1=new Promise((res1,rej1)=>{
            let deleteContact=ContactServices.deleteContact(contactID)
            res1(deleteContact)
        })
        promise1.then((resp1)=>{
            if(resp1){
                let prom1=new Promise((res1,rej1)=>{
                    setState({...state,loading:true,contacts:[]})

                    let response=ContactServices.getAllContacts()
                    res1(response)
                     //rej1("error")
                })
    prom1.then((resp1)=>{

        setState({...state,loading:false,contacts:resp1.data})
        console.log(resp1.data);
    }).catch((error)=>{
        setState({...state,loading:false,errorMessage:error.message})
        alert("data did not found")
    })
    }
    //state destructuring
    let {loading,contacts,errorMessage}=state
  return (
    // without container you should not use row or col
        <React.Fragment>
            <pre>{JSON.stringify(contacts)}</pre>
        
        <section className='contact-search p-3'>
        <div className="container">
            <div className="grid">
                {/* row1 */}
                <div className="row">
                    <div className="col">
                        <p className='h3'>Contact Manager<Link className='btn btn-primary ms-2' to={'/contacts/add'}><i className='fa fa-plus-circle me-2'/>Add</Link></p>
                        <p className='fst-italic'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel quo, officia id expedita sunt amet facere nihil veritatis fuga minima aspernatur nisi eveniet consequuntur totam nostrum ad repellendus distinctio repudiandae?</p>
                    </div>
                </div>
                {/* row-2 */}
                <div className="row">
                    <div className="col-md-6">
                        <form action="" className='row'>
                            <div className="col-md-8">
                                <div className="mb-2">
                                    <input type="text" className='form-control' placeholder='Search Name' />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-2">
                                    <input type="submit" className='btn btn-outline-dark' value={'Search'} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </section>
        {/* 2nd section */}
        {/* profile avtar png */}
        {
            loading ? <Spinner/>:
            <React.Fragment>
            <section className="contact-list">
            <div className="container">
                <div className="row" >
                    {
                        contacts.length>0 &&
                        contacts.map((contact)=>{
                        return(
                    
                        /* for create profile card */
                        <div className="col-md-6" >
                            <div className="card my-2">
                            {/* single row */}
                            <div className="card-body"key={contact.id}>
                                {/* to make proper alignment */}
                                <div className='row align-items-center'>
                                    {/* for profile img */}
                                    <div className="col-md-4">
                                        <img className='contact-img'src={contact.photo}></img>
                                    </div>
                                     {/* for input details {Name,Contact,Email} */}
                                    <div className="col-md-7">
                                          {/* parent which contails list */}
                                        <ul className="list-group">
                                            {/*  className:list-group-item for hover effect */}
                                            <li className='list-group-item list group-item-action'>
                                                Name:<span className='fw-bold'>{contact.name}</span>
                                            </li>
                                            <li className='list-group-item list group-item-action'>
                                                Contact:<span className='fw-bold'>{contact.contact}</span>
                                            </li>
                                            <li className='list-group-item list group-item-action'>
                                                Email:<span className='fw-bold'>{contact.email}</span>
                                            </li>
                                        </ul>
                                    </div>
                                     {/* create column :for button icons{veiw,edit,delete} */}
                                    <div className="col-md-1 d-flex flex flex-column align-items-center">
                                        <Link to={`/contacts/view/:contactID`} className='btn btn-warning my-1'><i className='fa fa-eye'/></Link>
                                        <Link to={`/contacts/edit/:contactID`} className='btn btn-primary my-1'><i className='fa fa-pen' /></Link>
                                        <button className='btn btn-danger' onClick={()=>{clickDelete(contact.id)}}><i className='fa fa-trash my-1'/></button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    /* end of creating profile card */
                        )
                    })
                }
            </div>
        </div>
        </section>            
    </React.Fragment>
    }
    </React.Fragment>
    )
} 
