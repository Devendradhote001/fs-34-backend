import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState([]);

  let getUsers = async () => {
    try {
      let res = await axios.get("http://localhost:3000/users");
      console.log("users ko ghet kiya", res);
      setUsers(res.data.users);
    } catch (error) {
      console.log("error in get api");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);

      let res = await axios.post("http://localhost:3000/register", formData);
      console.log(res);
    } catch (error) {
      console.log("error in api->", error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleFormSubmit} action="">
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          onChange={handleChange}
          name="password"
          type="text"
          placeholder="password"
        />
        <input
          onChange={handleChange}
          name="mobile"
          type="text"
          placeholder="Mobile"
        />
        <button>Create</button>
      </form>

      <div>
        {users.map((elem) => {
          return <h1>{elem.name}</h1>;
        })}
      </div>
    </div>
  );
};

export default App;
