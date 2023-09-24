import axios from 'axios';
import React, { useEffect, useState } from 'react'
const baseUrl = import.meta.env.VITE_BASE_URl;

const SearchByCustomerName = ({ searchByCustomerName }) => {

  const [searchByCustomerNameData, setSearchByCustomerNameData] = useState([]);
  // search customer name

  useEffect(() => {

    if (searchByCustomerName === "") {
      setSearchByCustomerNameData([]);
      return;
    }

    axios
      .get(`${baseUrl}/search_orders?customer_name=${searchByCustomerName}`)
      .then((response) => {
        setSearchByCustomerNameData(response.data.orders);
      })
      .catch((error) => {
        console.error('Error fetching filtered data:', error);
      });
  }, [searchByCustomerName]);
  return (
    <tbody>
      {searchByCustomerNameData.map((order) => (
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

export default SearchByCustomerName
