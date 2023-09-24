
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URl;

const Pagination = ({ pagination, sortingAscOrDesc, filterByProductName, filterByOrderStatus }) => {


  const [paginationData, setPagination] = useState([]);
  useEffect(() => {

    if (pagination === "") {
      setPagination([]);
      return;
    }

    axios
      .get(`${baseUrl}/pagination_orders?page=${pagination}&limit=10&order_status=${filterByOrderStatus}&product=${filterByProductName}&sort=${sortingAscOrDesc}`)
      .then((response) => {
        // console.log('res', response.data)
        setPagination(response.data.orders);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  }, [pagination, filterByOrderStatus, filterByProductName, sortingAscOrDesc]);
  return (
    <tbody>
      {paginationData?.map((order) => (
        <tr key={order._id} className="hover:bg-gray-100 text-center h-10">
          <td className="w-1/6">{order.order_id}</td>
          <td className="w-1/6">{order.customer_name}</td>
          <td className="w-2/6">
            {order.product.map((product) => product.product_name).join(", ")}
          </td>
          <td className="w-1/6">{order.order_date}</td>
          <td className="w-1/6">{order.order_status}</td>
        </tr>
      ))}
    </tbody>
  )
}

export default Pagination
