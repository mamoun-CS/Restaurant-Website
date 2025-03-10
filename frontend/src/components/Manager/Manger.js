import React, { useState, useEffect } from "react";
import Headerman from "./Headerman";
import Note from "./ListNote";
import notes from "../../notes";
import NoteManager from "./NoteManager";
import Invoice from "./Invoice";
import Modal from "react-modal";
import Editnote from "./Editnote";

Modal.setAppElement("#root"); // Necessary for accessibility

function Manager() {
  const [number, setNumber] = useState(0);
  const [menuItems, setMenuItems] = useState([]);
  const [sessionName, setSessionName] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/read-session", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setSessionName(data.message[0] || "");
          setNumber(data.message[1] || 0);
          setData(Array.isArray(data.message[2]) ? data.message[2] : []);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/get-notes")
      .then((res) => res.json())
      .then((data) => {
        if (data.notes) {
          setMenuItems(data.notes);
        }
      })
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  const addNote = (newItem) => {
    setMenuItems([...menuItems, newItem]);
  };

  const openModal = (note) => {
    
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

 
  
  // Update UI after editing
  const updateNote = (updatedNote) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedNote.id ? updatedNote : item))
    );
    closeModal();
  };

  if (sessionName === "addorder") {
    return (
      <div>
        <Headerman number={number} />
        <NoteManager addNote={addNote} />
      </div>
    );
  } else if (sessionName === "Edit") {
    return (
      <div > 
        <Headerman number={number} />
        <div className="notes-containerM">
        {menuItems.map((note, index) => (
          <div key={`${note.title}-${index}`}>
            <Note
              onClick={() => openModal(note)} 
              round={note.id}
              title={note.title}
              img={note.img}
              content={note.content}
              priceOne={note.price_one}
              priceTwo={note.price_two}
              priceThree={note.price_three}
              chose={true}
              flag={2}
            />
          </div>
        ))}</div>

        <Modal
          isOpen={isModalOpen}
           onRequestClose={closeModal}
           contentLabel="Edit Note"
           className="modal-content"
            overlayClassName="modal-overlay"
          >
  <button className="modal-close-btn" onClick={closeModal}>✖</button>
  <Editnote updateNote={updateNote} selectedNote={selectedNote} />
        
        </Modal>

      </div>
    );
  } else {
    return (
      <div>
        <Headerman number={number} />
        <div>
          <Invoice />
        </div>
      </div>
    );
  }
}

export default Manager;
