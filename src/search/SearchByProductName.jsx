import axios from 'axios';
import React, { useEffect, useState } from 'react'
const baseUrl = import.meta.env.VITE_BASE_URl;

const SearchByProductName = ({ searchByProductName }) => {
  const [searchByProductNameData, setSearchByProductNameData] = useState([]);
  // search product name

  useEffect(() => {

    if (searchByProductName === "") {
      setSearchByProductNameData([]);
      return;
    }

    axios
      .get(`${baseUrl}/search_orders?product_name=${searchByProductName}&limit=10`)
      .then((response) => {
        setSearchByProductNameData(response.data.orders);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  }, [searchByProductName]);

  return (
    <tbody>
      {searchByProductNameData.map((order) => (
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

export default SearchByProductName
