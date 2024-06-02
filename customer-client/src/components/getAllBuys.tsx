import { Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import { useAppControllerGetAllBuysFromServerQuery } from "../store/customerApi"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const AllBuysComponent = () => {

    const {data,refetch} = useAppControllerGetAllBuysFromServerQuery()
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Customer Name</StyledTableCell>
                <StyledTableCell align="left">Customer Age</StyledTableCell>
                <StyledTableCell align="left">Product Name</StyledTableCell>
                <StyledTableCell align="left">Product Price</StyledTableCell>
              </TableRow>
            </TableHead>
            {data ?
            <TableBody>
              {data.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.age}</StyledTableCell>
                  <StyledTableCell align="left">{row.productName}</StyledTableCell>
                  <StyledTableCell align="left">{row.price}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody> : <></>
            }
          </Table>
        </TableContainer>

        <Button style={{ display: 'flex', flexDirection: 'column', gap: 2 }} variant="contained" color="primary" type="submit" onClick={refetch}>Refresh Purchases</Button>
        </div>
    )
}