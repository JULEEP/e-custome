import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Paper, Typography, CircularProgress } from '@mui/material';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa'; // Importing React Icons for View, Delete, Update actions
import axios from 'axios';
import './ProductTable.css'

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://admin-backend-rl94.onrender.com/api/products/', {
          params: {
            page: page + 1, // API uses 1-based page index
            limit: limit,
          },
        });
        const { products, totalProducts, totalPages } = response.data;
        setProducts(products);
        setTotalProducts(totalProducts);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleView = (productId) => {
    console.log("Viewing product:", productId);
    // Implement the logic to view the product details
  };

  const handleDelete = (productId) => {
    console.log("Deleting product:", productId);
    // Implement the logic to delete the product
  };

  const handleUpdate = (productId) => {
    console.log("Updating product:", productId);
    // Implement the logic to update the product
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.available ? "In Stock" : "Out of Stock"}</TableCell>
                  <TableCell>{product._id}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleView(product._id)}>
                      <FaEye />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(product._id)}>
                      <FaTrash />
                    </IconButton>
                    <IconButton color="default" onClick={() => handleUpdate(product._id)}>
                      <FaEdit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalProducts}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ProductsTable;
