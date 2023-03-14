import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';


function UserCreate() {
  const nagavite = useNavigate();
  const schema = yup.object({
    name: yup.string().required("Tên không được để trống"),
    email: yup.string()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email Không hợp lệ")
      .required("Email ko được để trống"),
    phone: yup.number().positive().integer().required("Số Điện Thoại Không được để trống "),
    password: yup.string().required("Password không được để trống "),
  }).required();

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const [option, setOption] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(response => setOption(response))
      .catch(error => console.log(error));
  }, []);

  const onSubmit = async (data) => {
    try {
      let rs = await axios.post(`http://localhost:8083/api/v1/users`, data)
      alert("Tạo User Thành Công !!! ")
      setTimeout(() => {
        nagavite(`/users/${rs.data.id}`);
      }, 1500
      )
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <div className="container mt-5 mb-5">
        <h2 className="text-center text-uppercase mb-3">Tạo user</h2>
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit(onSubmit)}  >
            <div className="col-md-6">
              {/* <form onSubmit={handleSubmit(onSubmit)}/> */}
              <div className="bg-light p-4">
                <div className="mb-3">
                  <label className="col-form-label">Name</label>
                  <input type="text" id="name" className="form-control"
                    // value={valueName} onChange={(e) => setName(e.target.value)}
                    {...register("name")}
                  />
                  {<p className='text-danger'>{errors.name?.message}</p>}
                  {/* <p className="text-danger">{errors.firstName?.message}</p> */}
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Email</label>
                  <input type="text" id="email" className="form-control"
                    // value={valueEmail} onChange={(e) => setEmail(e.target.value)} 
                    {...register("email")}
                  />
                  {<p className='text-danger'>{errors.email?.message}</p>}
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Phone</label>
                  <input type="text" id="phone" className="form-control"
                    // value={valuePhone} onChange={(e) => setPhone(e.target.value)}
                    {...register("phone")}
                  />
                  <p className='text-danger'>{errors.phone?.message}</p>
                  {/* <p>{errors.firstName?.message}</p> */}

                </div>
                <div className="mb-3">
                  <label className="col-form-label">Address</label>
                  <select
                    className="form-select"
                    id="address"
                    {...register("address")}
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
                  <input type="text" id="password" className="form-control"
                    //  value={valuePassword} onChange={(e)=>setPassword(e.target.value)} 
                    {...register("password")}
                  />
                  {<p className='text-danger'>{errors.password?.message}</p>}
                  {/* <p>{errors.firstName?.message}</p> */}
                </div>
              </div>
              <div className="text-center mt-3">
                <Link to={"/users"} className="btn btn-warning">Quay Lại</Link>
                <button type="submit" className="btn btn-success" id="btn-save">Tạo User</button>
              </div>
            </div>
          </form>

        </div>
      </div>






    </>
  )
}

export default UserCreate