import React, { useEffect, useState } from "react";
import Table from "./userTable";
import "./TableDisplay.css";
import Modal from "./Model";
import usePagination from "./Pagination";
import spinner from "../assets/Eclipse-1s-200px (2).svg";
export default function Display() {
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [checkBox, setCheckBox] = useState([]);
  const [rowToEdit, setrowToEdit] = useState([]);
  const [masterCheckbox, setMasterCheckbox] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tableData();
  }, []);

  //Function which make API call to the endpoint given to get the users data.
  const tableData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = await res.json();

      setRows(result);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const filteredData = rows.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      row.email.toLowerCase().includes(searchVal.toLowerCase()) ||
      row.role.toLowerCase().includes(searchVal.toLowerCase())
    );
  });

  const { render, currentData, currentPage, setCurrentPage, itemsPerPage } =
    usePagination({ filteredData, pagination });

  function handleDeleteRows(targetIndex) {
    setRows(rows.filter((item) => item.id !== targetIndex));
  }
  function handleEditRow(index) { 
    setrowToEdit((currentPage - 1) * itemsPerPage + index);
    setModalOpen(true);
  }
  const handleSearch = (event) => {
    setSearchVal(event.target.value);
    setMasterCheckbox(false);
    setCurrentPage(1);
    setCheckBox([]);
  };

  function handleCheckBox(checked, index) {
    if (index === "master") {
      setMasterCheckbox(checked); // Set the state of masterCheckbox to the checked value

      if (checked) {
        setCheckBox(
          currentData.map((item, index) => index < itemsPerPage && item.id)
        );
      } else {
        setCheckBox([]); // Clear the checkBox state
      }
    } else {
      if (checked) {
        setCheckBox([...checkBox, index]); 
      } else {
        setCheckBox(checkBox.filter((idx) => idx !== index));
      }
      setMasterCheckbox(false); 
    }
  }

  function deleteChecked() {
    const updatedRows = rows.filter((item) => !checkBox.includes(item.id));
    setRows(updatedRows);
    setCheckBox([]);
    setMasterCheckbox(false);
  }

function handleSubmit(newData) {
  setRows(
    rows.map((currRow, index) => {
      if (index !== rowToEdit) {
        return currRow; 
      }
      return newData; 
    })
  );
}

  function pagination(index) {
    setCurrentPage(index + 1); 

    if (currentPage !== index + 1) { 
      setMasterCheckbox(false); 
      setCheckBox([]); 
    }
  }

  if (loading) {
    return <img src={spinner} alt="loader svg" />;
  }

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          className="search-bar"
          type="text"
          placeholder="Search by Name, Role, etc."
          value={searchVal}
          onChange={handleSearch}
        />
        <Table
          rows={currentData}
          deleteRow={handleDeleteRows}
          editRow={handleEditRow}
          checkBox={handleCheckBox}
          check={checkBox}
          masterCheckbox={masterCheckbox}
        />
      </div>
      <div className="delete-paginate">
        <div className="masterDelete-btn" onClick={deleteChecked}>
          Delete Selected
        </div>

        {/* Pagination Controls */}
        {render}
        {/* Pagination Controls */}
      </div>
      {modalOpen && (
        <Modal
          modalClose={() => {
            setModalOpen(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={filteredData[rowToEdit]}
        />
      )}
    </div>
  );
}
