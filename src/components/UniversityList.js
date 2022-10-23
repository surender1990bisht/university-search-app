import React, { useState } from "react";
import { LOCAL_DEV_API_URL } from '../constant';

const UniversityList = () => {
  const [universityList, setUniversities] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchOrder, setSearchOrder] = useState("Asc");

  const getUniversities = (name, order) => {
    const url = `${LOCAL_DEV_API_URL}?name=${name}&order=${order}`;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setUniversities(result);
        },
        (error) => {
          console.error(`Unable to get response from ${url}`);
          setUniversities(null);
        }
      );
  };

  const submit = (event) => {
    event.preventDefault();
    setUniversities(null);
    getUniversities(searchName, searchOrder);
  };
  const clearInput =
    (event) => {
      event.preventDefault();
      setSearchName("");
      setSearchOrder("Asc");
    };
  return (<div>
    <form onSubmit={submit}>
      <h2>University Search Application</h2><br />
      <input
        value={searchName}
        onChange={(event) =>
          setSearchName(event.target.value)
        }
        type="text"
        placeholder="search university.."
      />&nbsp;&nbsp;
      <select value={searchOrder}
        onChange={(event) =>
          setSearchOrder(event.target.value)
        }>
        <option value="Asc"> Asc
        </option>
        <option value="Desc"> Desc
        </option>
      </select>
      &nbsp;&nbsp;
      <button>Search</button>
      &nbsp;&nbsp;
      <button onClick={() => { clearInput(); }}>Clear</button>
    </form>
    <h2>University Search Result</h2>
    {(!universityList || (0 === universityList.length)) ?
      (<div>0 Record Found...</div>)
      : (<div>
        <h3>{universityList.length} records found..</h3>
        <table className="table" border="1">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>University Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {universityList.map((unv, index) => (
              // <tr key={unv.name+unv.country}>
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{unv.name}</td>
                <td>{unv.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
  </div>);
};
export default UniversityList;
