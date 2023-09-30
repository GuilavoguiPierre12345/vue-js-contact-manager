// import de axios
import axios from 'axios';

export default class ContactService {
    static serverUrl = "http://localhost:3000"; // ulr de base
    
    // recuperation des contacts
 static getAllContacts() {
        let dataUrl =  `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    // recuperation d'un contact
 static getContact(contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataUrl);
    }

    // Creer un contact 
 static createContact(contact) {
        let dataUrl = `${this.serverUrl}/contacts`;
        return axios.post(dataUrl, contact);
    }

    // mettre a jour un contact 
 static updateContact(contact,contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact);
    }

    // supprimer un contact 
 static deleteContact(contactId) {
        let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl);
    }
    

    // ============== les groups =============================
    static getAllsGroups() {
        let dataUrl = `${this.serverUrl}/groups`;
        return axios.get(dataUrl);
    }

    static getGroup(contact) {
        let dataUrl = `${this.serverUrl}/groups/${contact.groupId}`;
        return axios.get(dataUrl);
    }

    static addGroup(group) {
        let dataUrl = `${this.serverUrl}/groups`;
        return axios.post(dataUrl,group);
    }

}
