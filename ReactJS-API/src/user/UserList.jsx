import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
function UserList() {
    const [users, setUsers] = useState([]);
    const [eventKey, setEventKey] = useState("");
    useEffect(() => {
        const getData = async () => {
            const data = await fetch(`http://localhost:8083/api/v1/users`)
            const dataJson = await data.json()
            setUsers(dataJson)
        }
        getData()
    },[])

    // const deleteUser = async (id) => {
    //     const deleteData = await fetch(`http://localhost:8083/api/v1/users/delete/${id}`,
    //     {
    //         method: "GET"
    //     })
    //     const xData = await deleteData.json();
    //     setUsers(xData)
    // }
    const deleteUser = async (id) => {
        await fetch(`http://localhost:8083/api/v1/users/${id}`, {
            method: 'DELETE'
        });
        setUsers(users.filter((user) => user.id !== id));
    }

    // const deleteUser = async (id) => {
    //     await fetch(`http://localhost:8083/api/v1/users/delete/${id}`, {
    //         method: "DELETE"
    //     })
    //     const newUsers = users.filter(e => e.id != id)
    //     setUsers(newUsers)
    // }


    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center text-uppercase">Danh sách user</h2>

            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                        <Link to={"/users/create"} className="btn btn-warning">Tạo user</Link>
                        <input type="text" id="search" className="form-control w-50" placeholder="Tìm kiếm user"/>
                    </div>
                    <div className="bg-light p-4">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                 users.length>0 && users.map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                        <td>{u.address}</td>
                                        <td>
                                            <Link to={`/users/${u.id}`} className="btn btn-success">Xem chi tiet</Link>
                                            <button className="btn btn-danger" onClick={() => deleteUser(u.id)}>Xoa</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <p className="message d-none"></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList