import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserCreate() {
  const [valueName, setName] = useState("");
  const [valueEmail, setEmail] = useState("");
  const [valuePhone, setPhone] = useState("");
  const [valuePassword, setPassword] = useState("");
  const [option, setOption] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
    .then(res=> res.json())
      .then(response => setOption(response))
      .catch(error => console.log(error));
  }, []);

  const handlenBtnCreate = (event) =>{
    event.preventDefault();

    if (!valueName.trim() ) {
      alert("Name vui lòng không để trống");
      return 
    }
    if (!valueEmail.trim()) {
      alert("Email vui lòng không để trống");
      return;
    }
    if (!valuePhone.trim()) {
      alert("Phone vui lòng không để trống");
      return;
    }
    if (!address.trim()) {
      alert("Address vui lòng không để trống");
      return;
    }
    if (!valuePassword.trim()) {
      alert("Password vui lòng không để trống");
      return;
    }
   const postData = {
     name:valueName,
     email :valueEmail,
     phone :valuePhone,
     address,
    password:valuePassword
   }
    fetch("http://localhost:8083/api/v1/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => alert("Tạo Thành Công"))
      .catch(error => console.log(error));
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <h2 className="text-center text-uppercase mb-3">Tạo user</h2>
        <button onClick={handlenBtnCreate} className="btn btn-success" id="btn-save">Tạo User</button>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="bg-light p-4">
              <div className="mb-3">
                <label className="col-form-label">Name</label>
                <input type="text" id="name" className="form-control"
                  value={valueName} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email</label>
                <input type="text" id="email" className="form-control"
                  value={valueEmail} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Phone</label>
                <input type="text" id="phone" className="form-control"
                  value={valuePhone} onChange={(e) => setPhone(e.target.value)} />
              
              </div>
              <div className="mb-3">
                <label className="col-form-label">Address</label>
                <select
                  className="form-select"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                >
                  <option value="">--- Vui lòng chọn tỉnh hoặc Thành Phố ---</option>
                  {option.map((e) => (
                    <option key={e.code} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="col-form-label">Password</label>
                <input type="text" id="password" className="form-control" value={valuePassword} onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>
            <div className="text-center mt-3">
              <Link to={"/users"} className="btn btn-warning">Quay Lại</Link>
              <button onClick={handlenBtnCreate} className="btn btn-success" id="btn-save">Tạo User</button>
            </div>
          </div>
        </div>
      </div>






    </>
  )
}

export default UserCreate