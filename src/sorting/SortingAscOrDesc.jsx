
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URl;

const SortingAscOrDesc = ({ sortingAscOrDesc }) => {
  const [sortingAscOrDescData, setSortingAscOrDesc] = useState([]);
  useEffect(() => {

    if (sortingAscOrDesc === "") {
      setSortingAscOrDesc([]);
      return;
    }

    axios
      .get(`${baseUrl}/sorting_orders?sort=${sortingAscOrDesc}`)
      .then((response) => {
        // console.log('res', response.data)
        setSortingAscOrDesc(response.data);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  }, [sortingAscOrDesc]);
  return (
    <tbody>
      {sortingAscOrDescData.map((order) => (
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

export default SortingAscOrDesc
