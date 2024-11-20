import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import CardProduct from '../Card/CardProduct';
import SettingTableProduct from '../Box/SettingTableProduct';
import CircleProductStock from '../Box/CircleProductStock';
function createData(product, material, Price, Stock, CreateAt) {
  return { product, material, Price, Stock, CreateAt};
}
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
const rows = [
  createData('Frozen yoghurt', "Vai", 60000, 24, "2024/20/12"),
  createData('Frozen yoghurt', "Vai", 60000, 24, "2024/20/12"),
  createData('Frozen yoghurt', "Vai", 60000, 24, "2024/20/12"),
  createData('Frozen yoghurt', "Vai", 60000, 24, "2024/20/12"),
];
const TableProduct = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="right">Material</TableCell>
            <TableCell align="right">Price Sell&nbsp;(vnđ)</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Create At</TableCell>
            <TableCell align="right">Setting      </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.product}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="right"><CardProduct/></TableCell>
              <TableCell align="right">{row.material}</TableCell>
              <TableCell align="center">{row.Price}</TableCell>
              <TableCell align="right"><CircleProductStock value={row.Stock}/></TableCell>
              <TableCell align="right">{row.CreateAt}</TableCell>
              <TableCell align="right"><SettingTableProduct/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableProduct
