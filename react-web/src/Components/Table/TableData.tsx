import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
const Status = [
  { status: "Active", Color: "#59fbd6" },
  { status: "Pending", Color: "#f6d050" },
  { status: "Delete", Color: "#f9556b" },
];
const TableComponent=(props: { count: number; page: number; rowsPerPage: number; onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void })=> {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TableComponent.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const SwtichRow = (key: string, property: { [key: string]: any }) => {
    switch (key) {
        case "HexColor": {
        return (
          <div
            style={{
              backgroundColor: property[key], // Thay đổi màu nền
              color: "#fff", // Màu chữ để nổi bật
              padding: "4px 8px",
              borderRadius: "4px",
              textAlign: "center",
              fontWeight: "bold",
              width:"80px"
            }}
          >
            {property[key]}
          </div>
        );
      }
     case "Status": {
        // Tìm màu theo Status
        const statusColor =
          Status.find((s) => s.status === property.Status)?.Color || "#000";
        return (
          <div
            style={{
              backgroundColor: statusColor, // Thay đổi màu nền
              color: "#fff", // Màu chữ để nổi bật
              padding: "4px 8px",
              borderRadius: "4px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {property.Status}
          </div>
        );
      }
      default:
        return <div>{property[key]}</div>;
    }
  };
const TableData=({Head,Data,HeaderComponent}: {Head: string[]; Data: { [key: string]: any }[]; HeaderComponent: React.ReactNode})=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Data.length) : 0;

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        {HeaderComponent}
        <TableHead>
            <TableRow  sx={{ backgroundColor: "#f5f6f8" }}>
                {
                    Head.map((item, index) => (
                        <TableCell key={index}>{item}</TableCell>
                    ))
                }
            </TableRow>
  
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : Data
          ).map((row, rowIndex) => {
            const uniqueKey = row.id || `${row.name}-${rowIndex}`;
            return (
              <TableRow key={uniqueKey}>
                {Head.map((el, index) => {
                  return (
                    <TableCell key={index}>{SwtichRow(el, row)}</TableCell>
                  )
                })}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={Data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TableComponent}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
export default TableData;