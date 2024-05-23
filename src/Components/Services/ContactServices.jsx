import axios from 'axios'

export class ContactServices {
  static serverURL="http://localhost:9000"

  static getGroups(){
    let dataURL=`${this.serverURL}/groups`
    return axios.get(dataURL)
  }
  static getAllContacts(){
    let dataURL=`${this.serverURL}/contacts`

    return axios.get(dataURL)
  }
  static getContact(contactID){
    let dataURL=`${this.serverURL}/contacts/${contactID}`

    return axios.get(dataURL)
  }
  static createContact(contact){
    let dataURL=`${this.serverURL}/contacts`

    return axios.post(dataURL,contact)
  }
  static updateContact(contactID,contact){
    let dataURL=`${this.serverURL}/contacts/${contactID}`
    return axios.put(dataURL,contact)
  }
  static deleteContact(contactID){
  let dataURL=`${this.serverURL}/contacts/${contactID}`
    return axios.delete(dataURL)
  }
    
}
