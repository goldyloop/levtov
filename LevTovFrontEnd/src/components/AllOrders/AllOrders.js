
import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Logo from '../Logo/Logo';
import '../All.css';
import './AllOrders.css'
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
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const ExpandedTableRow = styled(TableRow)(({ backgroundColor }) => ({
    backgroundColor: backgroundColor,
}));
function createData(name, phone, email, nights, room, date) {
    return { name, phone, email, nights, room, date };
}
/*
// const rows = [
//     createData('ידלה שטיגליץ', '0504108994', 'r0504108994@gmail.com', 2, 'חדר 1', '11/11/2024'),
//     createData('חנה לוי', '0522646251', 'ruchami77@gmail.com', 5, 'חדר 2', '12/11/2024'),
//     createData('יהודית שחור', '0548468527', 'yossi0522646251@gmail.com', 3, 'חדר 3', '11/11/2024'),
//     createData('חיים ישראלי', '0527646251', 'esti695000@gmail.com', 2, 'חדר 4', '13/11/2024'),
//     createData('דוד שלום', '0527695000', 'l0548468527@gmail.com', 4, 'חדר 5', '14/11/2024'),
// ];
*/





export default function AllOrders() {

    const [rows, setRows] = React.useState([]);
  
    const [expandedRows, setExpandedRows] = React.useState([]);
    const handleExpandRow = (index) => {
        setExpandedRows((prev) => {
            if (prev.includes(index)) {
                return prev.filter((rowIndex) => rowIndex !== index);
            } else {
                return [...prev, index];
            }
        });

    };

    async function getAllData(url) {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error("לא הצליח להביא את הנתונים");
                return;
            }
            setRows(await response.json()) ;
            console.log(rows);
            return rows; // מחזירה את כל הנתונים מהטבלה
        } catch (error) {
            console.error('לא הצליח להתחבר לשרת', error);
        }
    }

    useEffect(() => {
        getAllData('https://localhost:7279/api/Order/getAll')
    }, []);

    return (
        <div id='all-orders-body'>
            <Logo />
            <Link to="/manager" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon'>
                    <ArrowBackIosIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Link>
            <h1 id='h1'>טבלת הזמנות</h1>
            <div id='allTable'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">שם המזמין</StyledTableCell>
                                <StyledTableCell align="right">תאריך</StyledTableCell>
                                <StyledTableCell align="right">פעולה</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => {
                                const isRowExpanded = expandedRows.includes(index);
                                const backgroundColor = isRowExpanded
                                    ? (index % 2 === 0 ? '#F5F5F5' : '#E0E0E0') // צבע השורה המורחבת
                                    : (index % 2 === 0 ? '#FFFFFF' : '#F5F5F5'); // צבע השורה המקורית
                                return (
                                    <React.Fragment key={index}>
                                        <StyledTableRow>
                                            <StyledTableCell align="right">{row.name}</StyledTableCell>
                                            <StyledTableCell align="right">{row.date}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                <IconButton onClick={() => handleExpandRow(index)}>
                                                    {isRowExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                        {isRowExpanded && (
                                            <ExpandedTableRow backgroundColor={backgroundColor}>
                                                <StyledTableCell colSpan={3} align="right">
                                                    <div>טלפון: {row.phone}</div>
                                                    <div>אימייל: {row.email}</div>
                                                    <div>מספר לילות: {row.nights}</div>
                                                    <div>חדר: {row.room}</div>
                                                </StyledTableCell>
                                            </ExpandedTableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}