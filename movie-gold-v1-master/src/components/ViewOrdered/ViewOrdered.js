import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Form, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
const ViewOrdered = ({ userSeat, setUserSeat, user, setUser, loginData }) => {
    useEffect(() => {
        fetchOrderedSeats(Cookies.get('user_name'));
    }, [loginData]);

    useEffect(() => {
        console.log(user)
        setUserSeat(user?.orderedSeat);
    }, [user]);

    const fetchOrderedSeats = async (username) => {
        try {
            const response = await api.get(`/api/users/user/${username}`);
            const u = response.data;
            setUser(u);
        } catch (error) {
            console.error(error);
        }
    };

    if (userSeat?.length === 0) {
        return (
            <p>Hiện tại không có ghế nào được đặt bởi người dùng {loginData.username}</p>
        );
    }

    return (
        <div className='justify-content-center'>
            <Row className='justify-content-center mb-3'><h2 className='text-center'>LIST ORDERED SEATS</h2></Row>
            <table className="table table-bordered table-triped table-dark mt-3">
                <thead>
                    <tr>
                        <th>Tên ghế</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Ngày đặt</th>
                        <th>Tên phim</th>
                    </tr>
                </thead>
                <tbody>
                    {userSeat?.map((seat) => (
                        <tr key={seat.id}>
                            <td>{seat.seatName}</td>
                            <td>{seat.style}</td>
                            <td>{seat.price}</td>
                            <td>{seat.updated}</td>
                            <td>{seat.moviesId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {userSeat?.length === 0 && (
                <p>Hiện tại không có ghế nào được đặt bởi người dùng {loginData.username}</p>
            )}
        </div>
    );
};

export default ViewOrdered;
