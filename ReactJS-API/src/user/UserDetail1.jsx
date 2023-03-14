import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ModalChangePassword from "./ModalChangePassword";



function UserDetail1() {
    let { userID } = useParams();
    const [user, setUser] = useState(null);
    const [mapVN, setMap] = useState([]);
    const schema = yup.object({
        name: yup.string().required("Tên không được để trống"),
        phone: yup.number().positive().integer().required("Số Điện Thoại Không được để trống "),
    }).required();

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(schema),
        mode: "all"
    });




    // gọi data của User khi load trang 

    const ENDPOINT = "http://localhost:8083/api/v1/users";
    useEffect(() => { // gọi sẵn API khi load trang 
        const fetchUser = async () => {
            try {
                let rs = await axios.get(`${ENDPOINT}/${userID}`);
                setUser(rs.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchUser()
    }, [])
    // hàm gọi các Map của Thành Phố 
    useEffect(() => {
        const fetchMaps = async () => {
            try {
                let rs = await axios.get("https://provinces.open-api.vn/api/p/");
                setMap(rs.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchMaps()
    }, [])


    const handlenUpdate = () => {
        const userNew = {
            name: user.name,
            phone: user.phone,
            address: user.address
        }

        const newData = async () => {
            try {
                let rs = await axios.put(`${ENDPOINT}/${userID}`, userNew)
                setUser(rs.data)
            } catch (err) {
                console.log(err)
            }
        }
        newData();
    }
    const handlenAvatar = async (e) => {
        const file = e.target.files[0];
        const dataPush = new FormData();
        dataPush.append("file", file)
        try {
            const rs = await axios.put(`${ENDPOINT}/${userID}/update-avatar`, dataPush, {
                headers: {
                    "Content-Type": "multipart/from-data"
                }
            })
            setUser({ ...user, avatar: rs.data.url })
        } catch (err) {
            console.log(err);
        }
    }
    const onSubmit = async (data) => {
        try {
            let rs = axios.put(`${ENDPOINT}/${userID}`, data);
            alert("Update Thành Công ")

        } catch (err) {
            console.log(err)
        }
    }
    const handlenBtnPassword = async () => {
        try {
            let rs = await axios.post(`http://localhost:8083/api/v1/users/${userID}/forgot-password`)
            alert("Send newPassWord in Email of You")
        } catch (err) {
            alert(err)
        }
    }
    return (
        <>
            <div className="container mt-5 mb-5">
                <h2 className="text-center text-uppercase mb-3">Thông tin user</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="bg-light p-4">
                                <div className="mb-3">
                                    <label className="col-form-label">Fullname</label>
                                    <input type="text" id="fullname" className="form-control"
                                        defaultValue={user?.name}
                                        {...register("name")}
                                    />
                                    <p className='text-danger'>{errors.name?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Email</label>
                                    <input type="text" id="email" className="form-control" disabled
                                        value={user?.email || "This User haven't Email "}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Phone</label>
                                    <input type="text" id="phone" className="form-control"
                                        defaultValue={user?.phone || "Users have not Number Phone "}
                                        {...register("phone")}
                                    />
                                    <p className='text-danger'>{errors.phone?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Address</label>
                                    <select className="form-select" id="address"
                                        defaultValue={user?.address}
                                        {...register("address")}
                                    >
                                        {/* Show các giá trị để chọn  */}
                                        {
                                            mapVN.map((e) => (
                                                <option key={e.code} value={e.name}>{e.name}
                                                </option>
                                            ))
                                        }

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Avatar</label>
                                    <div className="avatar-preview mb-3 rounded">
                                        <img
                                            src={
                                                user?.avatar ? `http://localhost:8083${user?.avatar}` : "data:image/png;base64,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"
                                            }
                                            alt="avatar"
                                            id="avatar-preview" className="rounded"
                                        />
                                    </div>

                                    <label className="btn btn-warning" htmlFor="input">
                                        Chọn ảnh
                                    </label>
                                    <input type="file" id="input" className="d-none"
                                        onChange={(e) => handlenAvatar(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Password</label>
                                    <div className="">
                                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#modal-change-password">
                                            Đổi mật khẩu
                                        </button>
                                        <button onClick={handlenBtnPassword} class="btn btn-warning" id="btn-forgot-password">
                                            Quên mật khẩu
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <Link to={`/users`} className="btn btn-success">Quay Lại</Link>
                                <button type="submit" className="btn btn-success" id="btn-save">Cập nhật</button>

                            </div>
                        </div>
                    </div>
                </form>
                <ModalChangePassword userID={userID} />
                {/* <!-- Modal đổi mật khẩu--> */}
            </div>
        </>
    )
}

export default UserDetail1