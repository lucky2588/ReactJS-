import React from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

function ModalChangePassword({userID}) {
    const schema = yup.object({
        oldPassword: yup.string().required("Password không để trống"),
        newPassword: yup.string().required(" Password Không để trống"),
    }).required();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        mode: "all"
    });
    const onSubmit = async (data) =>{
        try{
            let rs = await axios.put(`http://localhost:8083/api/v1/users/${userID}/update-password`,data)
            alert("Updata Password Thành Công")
        }catch(err){
               alert(err)
        }
    }
  
      
  return (
    <>
          <div className="modal fade" id="modal-change-password" data-bs-backdrop="static" data-bs-keyboard="false"
              tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <form onSubmit={handleSubmit(onSubmit)}> 
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Đổi mật khẩu</h5>
                          <button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <div className="mb-3">
                              <label className="col-form-label">Mật khẩu cũ</label>
                              <input type="text" id="old-password" className="form-control"
                                  placeholder='nhập mật khẩu cũ '
                                      {...register("oldPassword")}   
                              />
                          </div>
                          <div className="mb-3">
                              <label className="col-form-label">Mật khẩu mới</label>
                              <input type="text" id="new-password" className="form-control" 
                                      placeholder='nhập mật khẩu mới '
                                      {...register("newPassword")}   
                                      />
                          </div>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                          <button type="submit" className="btn btn-primary" id="btn-change-password">Xác nhận</button>
                      </div>
                  </div>
              </form>
              </div>
          </div>





    </>
  )
}

export default ModalChangePassword