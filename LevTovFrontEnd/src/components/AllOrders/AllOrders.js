
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
import { format } from 'date-fns';
import Logo from '../Logo/Logo';
import '../All.css';
import './AllOrders.css'
import { NoEncryption } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));




export default function AllOrders() {

    const [rows, setRows] = React.useState([]);
    const [userNames, setUserNames] = React.useState({});
    const [userEmail, setUserEmail] = React.useState({});
    const [expandedRows, setExpandedRows] = React.useState([]);
    const [filterByName, setFilterByName] = React.useState('');
    const [selectedRoom, setSelectedRoom] = React.useState("כל החדרים");
    const [rooms, setRooms] = React.useState([]);
    const [endDate, setEndDate] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [visibleCount, setVisibleCount] = React.useState(3);




    const handleExpandRow = (index) => {
        setExpandedRows((prev) => {
            if (prev.includes(index)) {
                return prev.filter((rowIndex) => rowIndex !== index);
            } else {
                return [...prev, index];
            }
        });
    };


    async function getAllData() {

        try {
            let response = await fetch('https://localhost:7279/api/Order/getAll');
            if (!response.ok) {
                console.error("לא הצליח להביא את הנתונים");
                return;
            }
            response = await response.json();
            setRows(response);
        } catch (error) {
            console.error('לא הצליח להתחבר לשרת', error);
        }
    }

    useEffect(() => {
        getAllData()
    }, []);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 50);
    };

    async function getUserById(id) {
        try {
            let response = await fetch(`https://localhost:7279/api/User/get/${id}`);
            if (!response.ok) {
                console.log('לא הצליח להביא את הנתונים מהשרת');
                return ; // מחזיר null במקרה של שגיאה
            }
            response = await response.json();
            return response;
        }
        catch (error) {
            console.error(error);
             // מחזיר null במקרה של שגיאה
        }
    }
    useEffect(() => {
        const fetchUserNames = async () => {
            const names = {};
            const emails = {};
            for (const row of rows) {
                const user = await getUserById(row.userId);
                console.log("user",user);
                if (user) { // רק אם user אינו null
                    const name = user.userName;
                    const email = user.email;
                    names[row.userId] = name;
                    emails[row.userId] = email;
                } else {
                    names[row.userId] = 'לא נמצא'; // או כל ערך ברירת מחדל אחר
                    emails[row.userId] = 'לא נמצא'; // או כל ערך ברירת מחדל אחר
                }
            }
            setUserNames(names);
            setUserEmail(emails);
        };


        if (rows.length > 0) {
            fetchUserNames();
        }
    }, [rows]);

    async function getAllRooms() {
        try {
            let response = await fetch('https://localhost:7279/api/Room/getAll')
            if (!response) {
                console.log("לא הצליח להביא את הנתונים מהשרת");
                return;
            }
            response = await response.json();
            setRooms(response);
        }
        catch (err) {
            console.error("בעית התחברות לשרת", err);
        }
    }
    useEffect(() => { getAllRooms() }, []);

    const filteredRows = rows.filter(row => {
        const orderDate = new Date(row.orderDate);
        const inputStartDate = startDate ? new Date(startDate) : null;
        const inputEndDate = endDate ? new Date(endDate) : null;

        return (
            (userNames[row.userId]?.toLowerCase().includes(filterByName.toLowerCase())) &&
            (selectedRoom == "כל החדרים" || row.roomId === Number(selectedRoom)) &&  // זהו התנאי שמוודא שהכל בסדר
            (inputStartDate === null || orderDate >= inputStartDate) &&
            (inputEndDate === null || orderDate <= inputEndDate)
        );
    });

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div id='all-orders-body'>
            <Logo />
            <Link to="/manager" style={{ textDecoration: 'none' }}>
                <IconButton id='hIcon'>
                    <ArrowBackIosIcon sx={{ fontSize: 60 }} />
                </IconButton>
            </Link>
            <h1 id='h1'>טבלת הזמנות</h1>
            <div className="input-container">
                <div id='inp1'>
                    <input
                        className='sort'
                        type="text"
                        placeholder="סנן לפי שם"
                        value={filterByName}
                        onChange={(e) => setFilterByName(e.target.value)}
                    />
                    <select className='sort' id='fff' onChange={(e) => setSelectedRoom(e.target.value)}>
                        <option>כל החדרים</option>
                        {rooms.map((room, index) => (
                            <option key={index} value={room.roomId}>
                                {room.roomId}
                            </option>))}
                    </select>
                </div>
                <div id='inp2'>
                    <div id="date">
                        <label>מתאריך:</label>
                        <input
                            className='sort'
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div id="date">
                        <label>עד תאריך:</label>
                        <input
                            className='sort'
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div id='allTable'>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow >
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="center">שם המזמין</StyledTableCell>
                                <StyledTableCell align="center">תאריך</StyledTableCell>
                                <StyledTableCell align="center">חדר</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.slice(0, visibleCount).map((row, index) => {
                                const isRowExpanded = expandedRows.includes(index);
                                console.log("row.roomId",row.roomId);


                                return (
                                    <React.Fragment key={index}>
                                        <StyledTableRow >
                                            <div id="icon">
                                                <IconButton onClick={() => handleExpandRow(index)}>
                                                    {isRowExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </div>
                                            {!isRowExpanded && (
                                                < >
                                                    <StyledTableCell align="center">{userNames[row.userId] || 'טוען...'}</StyledTableCell>
                                                    <StyledTableCell align="center">{format(new Date(row.orderDate), 'dd/MM/yyyy')}</StyledTableCell>
                                                    <StyledTableCell align="center">{row.roomId}</StyledTableCell>
                                                    
                                                   
                                                </>
                                            )}
                                            
                                            {isRowExpanded && (
                                                <StyledTableCell colSpan={4} align="right">
                                                    <div>שם: {userNames[row.userId]}</div>
                                                    <div>תאריך: {format(new Date(row.orderDate), 'dd/MM/yyyy')}</div>
                                                    <div>חדר: {row.roomId}</div>
                                                    <div>טלפון: {row.userId}</div>
                                                    <div>אימייל: {userEmail[row.userId] || 'טוען...'}</div>
                                                </StyledTableCell>
                                            )}
                                        </StyledTableRow>
                                    </React.Fragment>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {visibleCount < rows.length && (
                <button id="more" onClick={handleShowMore}>הצג עוד הזמנות</button>
            )}
        </div>
    );
}