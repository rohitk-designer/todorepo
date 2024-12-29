import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [store, setStore] = useState([]);
  const [updata, setUpdate] = useState(false);
  const [id, setId] = useState(null);
  useEffect(() => {
    Getdata();
  }, []);
  const Getdata = async () => {
    let result = await fetch("http://localhost:5000/getdata");
    if(result){
      result = await result.json();
      setStore(result);
    }
    else{
      console.log("error")
    }
  
  };

  const formhandle = async (e) => {
    e.preventDefault();
    if (updata) {
      let result = await fetch(`http://localhost:5000/update/${id}`, {
        method: "put",
        body: JSON.stringify({ work: text }),
        headers: {
          "Content-type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      setId(null)
      setUpdate(false)
      Getdata();

      setText("");
    } else {
      try {
        let result = await fetch("http://localhost:5000/register", {
          method: "post",
          body: JSON.stringify({ work: text }),
          headers: {
            "Content-type": "application/json",
          },
        });
        result = await result.json();
        console.log(result);
        Getdata();
        setId(null)
        setText("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const Editdata = async (id) => {
    setId(id);
    let result = await fetch(`http://localhost:5000/getone/${id}`);
    result = await result.json();
    setText(result.work);
    setUpdate(true);
  };

  const deletedata = async (id) => {
    let result = await fetch(`http://localhost:5000/deletedata/${id}`,{
      method:"Delete"
    });
      result = await result.json()
      Getdata()
      console.log(result)
  };
  return (
    <div className="maindiv">
      <div className="centerdiv">
        <div className="heading-top">
          <p>this is todo list</p>
        </div>
        <form onSubmit={formhandle}>
          <div className="maininputdiv">
            <div className="inputdiv">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="buttondiv">
              <button>Add todo</button>
            </div>
          </div>
        </form>
        <div>
          <table
            style={{
              margin: "0 auto",
              borderCollapse: "collapse",
              width: "90%",
              textAlign: "center",
            }}>
            <tbody>
              {store.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{item.work}</td>
                  <td style={styles.td} onClick={() => Editdata(item._id)}>
                    Edit
                  </td>
                  <td style={styles.td} onClick={() => deletedata(item._id)}>
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    cursor: "pointer",
  },
};

export default App;
