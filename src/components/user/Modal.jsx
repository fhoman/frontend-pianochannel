
import React from 'react';


const Modal = ({ handleClose,handleSave,handleInput,show,name,username,surname,number,bio,handleFileUpload,image }) => {
    const showHideClassName = show ? "display-block" : "display-none";
  
    return (
      <div className={showHideClassName}>
           
          <div className="modal-background"></div>
          <div className="modal-card">
          <header className="modal-card-head">
          <p className="modal-card-title">Edit Preferences</p>
          <button onClick={handleClose} className='delete'>close</button>
          </header>
          <section className="modal-card-body">
            <span className='student-profile-big'>
          <img alt={name} src={image}></img>
          </span>          
          <input type="file" onChange={(e => handleFileUpload(e))}/>         
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
          <div class="field">
  <input className="is-checkradio is-success is-circle" type="checkbox" name="email" ></input>
  <label for="email"> E-mail</label>
</div>




          </section>
          <footer className="modal-card-foot">
          <a className="button is-primary modal-save" href='/save' onClick={(e) => handleSave(e)}>Save changes</a>
          <button onClick={handleClose}>close</button>
          </footer>
          </div>



      </div>
    );
  };

  export { Modal }