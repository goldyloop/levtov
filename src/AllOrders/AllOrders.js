import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { width } from '@mui/system';
import LogoLev from '../LogoLev.png';

import '../All.css';
import AllOrders from './AllOrders.css';
import { type } from '@testing-library/user-event/dist/type';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {

        backgroundColor: theme.palette.common.black,
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

function createData(name, calories, fat, carbs, protein, date_) {
    return { name, calories, fat, carbs, protein, date_ };
}

const rows = [
    createData('ידלה שטיגליץ', '0504108994', 'r0504108994@gmail.com', 2, 101, '11/11/2024'),
    createData('חנה לוי', '0522646251', 'ruchami77@gmail.com', 5, 103, '12/11/2024'),
    createData('יהודית שחור', '0548468527', 'yossi0522646251@gmail.com', 3, 105, '11/11/2024'),
    createData('חיים ישראלי', '0527646251', 'esti695000@gmail.com', 2, 108, '13/11/2024'),
    createData('דוד שלום', '0527695000', 'l0548468527@gmail.com', 4, 101, '14/11/2024'),
];

export default function CustomizedTables() {
    return (
        <div id='all'>
            <img id='logoLev' src={LogoLev} alt="Description of the image" />
            <h1 id='h1'>טבלת הזמנות</h1>
            <div id='allTable' >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <StyledTableCell align="right">שם המזמין</StyledTableCell>
                                <StyledTableCell align="right">טלפון</StyledTableCell>
                                <StyledTableCell align="right">מייל</StyledTableCell>
                                <StyledTableCell align="right">מספר לילות</StyledTableCell>
                                <StyledTableCell align="right">חדר</StyledTableCell>
                                <StyledTableCell align="right">תאריך</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                    <StyledTableCell align="right">{row.date_}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}