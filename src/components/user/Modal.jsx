
import React from 'react';


const Modal = ({ handleClose,handleSave,handleInput,show,name,username,surname,number,bio }) => {
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
          <label className="label">Name</label>
          <p className="control">
          <input className="input" onChange={handleInput} placeholder="Text input" name='name' type="text" value={name}></input>
          </p>
          <label className="label">Surname</label>
          <p className="control has-icon has-icon-right">
          <input className="input" onChange={handleInput} placeholder="Text input" name='surname' type="text" value={surname}></input>
          </p>
          <label className="label">Email</label>
          <p className="control has-icon has-icon-right">
          <input className="input" onChange={handleInput} placeholder="Email input" name='username' type="text" value={username}></input>
          <i className="fa fa-warning"></i>
       
          </p>
          <label className="label">Description</label>
          <p className="control">
          <textarea className="textarea" onChange={handleInput} placeholder="Describe Yourself!"  name='bio'  value={bio}></textarea>
          </p>
         
          <label className="label">Phone Number</label>
          <p className="control has-icon has-icon-right">
          <input className="input"  onChange={handleInput} placeholder="Text input"  name='number'  type="text"  value={number}></input>
          </p>
          
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