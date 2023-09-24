import axios from "axios";
import { useEffect, useState } from "react";
import SearchById from "./search/SearchById";
import SearchByCustomerName from "./search/SearchByCustomerName";
import SearchByProductName from "./search/SearchByProductName";
import FilterByOrderStatus from "./filter/FilterByOrderStatus";
import FilterByProductName from "./filter/FilterByProductName";
import SortingAscOrDesc from "./sorting/SortingAscOrDesc";
import Pagination from "./pagination/Pagination";

const baseUrl = import.meta.env.VITE_BASE_URl;
// console.log(baseUrl)

function App() {
  const [orders, setOrders] = useState([]);
  const [searchByOrderId, setSearchByOrderId] = useState("");
  const [searchByCustomerName, setSearchByCustomerName] = useState("");
  const [searchByProductName, setSearchByProductName] = useState("");
  const [filterByOrderStatus, setFilterByOrderStatus] = useState("")
  const [filterByProductName, setFilterByProductName] = useState("")
  const [sortingAscOrDesc, setSortingAsOrDesc] = useState('')
  const [pagination, setPagination] = useState('')

  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  
  let totalAmount = 0;

  // Iterate through the list of orders and sum up the total_amount
  for (const order of orders) {
    totalAmount += parseInt(order.total_amount);
  }

  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold text-center my-10">
        Create an Order List Table with Search, Filter, Sorting, Pagination, and Order Statistics Features
      </h1>
     
      <div className="customContainer">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <div>
            <level>Search by order id :</level> <br />
            <input
              placeholder="Search by order id"
              className="text-center border py-2 my-3 px-10 outline-none"
              type="number"
              onChange={(e) => setSearchByOrderId(e.target.value)}
            />
          </div>
          <div>
            <level>Search by customer name:</level><br />
            <input
              placeholder="Search by customer name"
              className="text-center border py-2 my-3 px-10 outline-none"
              type="text"
              onChange={(e) => setSearchByCustomerName(e.target.value)}
            />
          </div>
          <div>
            <level>Search by product name:</level><br />
            <input
              placeholder="Search by product name"
              className="text-center border py-2 my-3 px-10 outline-none"
              type="text"
              onChange={(e) => setSearchByProductName(e.target.value)}
            />
          </div>
          <div>
            <level>Filter by order status:</level><br />
            <select onChange={(e) => setFilterByOrderStatus(e.target.value)} className="text-center border py-2 my-3 px-10 outline-none">
              <option>Filter Status</option>
              <option value='Pending'>Pending</option>
              <option value='Shipped'>Shipped</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
          <div>
            <level>filter by product name:</level><br />
            <input
              placeholder="filter by product name"
              className="text-center border py-2 my-3 px-10 outline-none"
              type="text"
              onChange={(e) => setFilterByProductName(e.target.value)}
            />
          </div>
          <div>
            <level>Sort Asc or Desc:</level><br />
            <select onChange={(e) => setSortingAsOrDesc(e.target.value)} className="text-center border my-3 py-2 px-10 outline-none">
              <option>Sort Asc or Desc</option>
              <option value='desc'> Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <div>
            <level>Pagination</level><br />
            <select onChange={(e) => setPagination(e.target.value)} className="text-center border my-3 py-2 px-10 outline-none">
              <option>Pagination</option>
              <option value='1'> 1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
          </div>
      </div>

        <div className="lg:flex my-5">
          <h1 className="text-xl">Total number of orders: <strong>{orders?.length}</strong> </h1>
          <h1 className="text-xl lg:ml-10">Summation  of total amount : <strong>{totalAmount}</strong> </h1>
        </div>


        <div className="border">
          <table className="my-10 customContainer">
            <thead>
              <tr>
                <th className="w-1/6">Order Id</th>
                <th className="w-1/6">Customer Name</th>
                <th className="w-2/6">Product Name</th>
                <th className="w-1/6">Date</th>
                <th className="w-1/6">Status</th>
              </tr>
            </thead>

            {
              (!searchByOrderId && !searchByCustomerName && !searchByProductName && !filterByOrderStatus && !filterByProductName && !sortingAscOrDesc && !pagination) ? (
                <tbody>
                  {orders.map((order) => (
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
              ) : (
                <>
                  {
                    searchByOrderId && (
                      <SearchById searchByOrderId={searchByOrderId} />
                    )
                  }

                  {searchByCustomerName && (
                    <SearchByCustomerName searchByCustomerName={searchByCustomerName} />
                  )
                  }
                  {searchByProductName && (
                    <SearchByProductName searchByProductName={searchByProductName} />
                  )
                  }
                  {
                    filterByOrderStatus && (
                      <FilterByOrderStatus filterByOrderStatus={filterByOrderStatus} />
                    )
                  }
                  {
                    filterByProductName && (
                      <FilterByProductName filterByProductName={filterByProductName} />
                    )
                  }
                  {
                    sortingAscOrDesc && (
                      <SortingAscOrDesc sortingAscOrDesc={sortingAscOrDesc} />
                    )
                  }
                  {
                    pagination && (
                      <Pagination pagination={pagination} sortingAscOrDesc={sortingAscOrDesc} filterByProductName={filterByProductName} filterByOrderStatus={filterByOrderStatus} />
                    )
                  }
                </>
              )

            }


          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
