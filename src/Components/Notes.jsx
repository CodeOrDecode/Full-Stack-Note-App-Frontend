import React from "react";
import { useState, useEffect } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  async function getAllNote() {
    let token = localStorage.getItem("token");
    try {
      let res = await fetch(
        "https://backend-6-vs53.onrender.com/note/allnote",
        {
          method: "GET",
          headers: { authorization: `bearer ${token}` },
        }
      );
      let res2 = await res.json();
      console.log(res2);
      setNotes(res2.notes);
    } catch (error) {
      console.log(error);
    }
  }

  async function handledelete(id) {
    let token = localStorage.getItem("token");

    try {
      let res = await fetch(
        `https://backend-6-vs53.onrender.com/note/delete/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `bearer ${token}` },
        }
      );
      let res2 = await res.json();
      console.log(res2);
      getAllNote();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNote();
  }, []);

  return (
    <div>
      {notes.length > 0 ? (
        notes.map((ele) => {
          return (
            <div
              key={ele._id}
              style={{
                border: "1px solid black",
                padding: "14px",
                marginTop: "14px",
              }}
            >
              <h3>{ele.title}</h3>
              <h4>{ele.description}</h4>

              <button
                onClick={() => {
                  handledelete(ele._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <h1>No notes</h1>
      )}
    </div>
  );
};

export default Notes;
