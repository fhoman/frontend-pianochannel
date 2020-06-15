
import React from 'react';
import { FaWhatsapp,FaEnvelope } from "react-icons/fa";

const Modal = (props) => {


const {username,name,surname,number,bio,image,show,emailnotifications,whatsappnotifications} = props.user
const {handleClose,handleFileUpload,handleInput,handleSave} = props


    const showHideClassName = show ? "display-block" : "display-none";
  
    return (
      <div className={showHideClassName}>           
          <div className="modal-background"></div>
          <div className="modal-card">
          <header className="modal-card-head">
          <p className="modal-card-title">Edit Profile</p>
          <button onClick={handleClose} className='delete'>close</button>
          </header>
          <section className="modal-card-body">
            <span className='student-profile-big'>
          <img alt={name} src={image}></img>
          <input type="file"  onChange={(e => handleFileUpload(e))}/>     
          </span>                       
          <label className="label">Name</label>         
          <input className="input" onChange={handleInput} placeholder="Text input" name='name' type="text" value={name}></input>          
          <label className="label">Surname</label>        
          <input className="input" onChange={handleInput} placeholder="Text input" name='surname' type="text" value={surname}></input>         
          <label className="label">Email</label>         
          <input className="input" onChange={handleInput} placeholder="Email input" name='username' type="text" value={username}></input>
          <i className="fa fa-warning"></i>
          <label className="label">Description</label>          
          <textarea className="textarea" onChange={handleInput} placeholder="Describe Yourself!"  name='bio'  value={bio}></textarea>                 
          <label className="label">Phone Number</label>         
          <input className="input"  onChange={handleInput} placeholder="Text input"  name='number'  type="text"  value={number}></input>
          <label className="label">Send me notifications for every new video</label>         
          <div className="field">
  <input className="is-checkradio is-success is-circle"  style={{marginRight:10}}  checked={emailnotifications} type="checkbox" name="emailnotifications" onChange={handleInput}></input>
  <label htmlFor="email" style={{marginRight:20}}><span className="icon is-small is-left">
                  <FaEnvelope/>
                  </span> E-mail</label>
  <input className="is-checkradio is-success is-circle" style={{marginRight:10}} checked={whatsappnotifications} type="checkbox" name="whatsappnotifications" onChange={handleInput}></input>
  <label htmlFor="whastapp" ><span className="icon is-small is-left">
                  <FaWhatsapp/>
                  </span> Whatsapp</label>
</div>
          </section>
          <footer className="modal-card-foot">
          <a className="button is-primary modal-save" href='/save' onClick={(e) => handleSave(e)}>Save changes</a>
          <button onClick={handleClose} className='button is-danger'>close</button>
          </footer>
          </div>
      </div>
    );
  };

  export { Modal }