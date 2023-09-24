
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URl;



const FilterByProductName = ({ filterByProductName }) => {
  const [FilterByProductNameData, setFilterByProductName] = useState([]);
  useEffect(() => {

    if (filterByProductName === "") {
      setFilterByProductName([]);
      return;
    }

    axios
      .get(`${baseUrl}/filter_orders?product_name=${filterByProductName}`)
      .then((response) => {
        console.log('res', response.data)
        setFilterByProductName(response.data);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  }, [filterByProductName]);
  return (
    <tbody>
      {FilterByProductNameData.map((order) => (
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

export default FilterByProductName
