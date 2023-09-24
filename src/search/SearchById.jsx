import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URl;

const SearchById = ({ searchByOrderId }) => {
  const [searchByOrderIdData, setSearchByOrderIdData] = useState([]);
 useEffect(() => {

  if (searchByOrderId === "") {
    setSearchByOrderIdData([]);
    return;
  }

  axios
    .get(`${baseUrl}/search_orders?order_id=${searchByOrderId}`)
    .then((response) => {
      // console.log('res', response.data)
      setSearchByOrderIdData(response.data.orders);
    })
    .catch((error) => {
      console.error('Error fetching filtered data:', error);
    });
}, [searchByOrderId]);
  return (
    <tbody>
      {searchByOrderIdData.map((order) => (
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

export default SearchById
