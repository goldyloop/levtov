
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
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
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
                return; // מחזיר null במקרה של שגיאה
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
                console.log("user", user);
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
                <TableContainer component={Paper} >
                    <Table id="table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell className='chez' id="thc" align="right"></StyledTableCell>
                                <StyledTableCell className='tarich' id="th" align="center">תאריך</StyledTableCell>
                                <StyledTableCell className='shem' id="th" align="center">שם המזמין</StyledTableCell>
                                <StyledTableCell className='cheder' id="th" align="center">חדר</StyledTableCell>
                                <StyledTableCell className='pach' id="th" align="center"></StyledTableCell> {/* הוסף עמודה לפעולה */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.slice(0, visibleCount).map((row, index) => {
                                const isRowExpanded = expandedRows.includes(index);

                                const handleDelete = async (orderId) => {
                                    const swalWithBootstrapButtons = Swal.mixin({
                                        customClass: {
                                            confirmButton: "btn btn-success",
                                            cancelButton: "btn btn-danger"
                                        },

                                    });

                                    swalWithBootstrapButtons.fire({
                                        title: "האם אתה בטוח שברצונך למחוק את ההזמנה?",
                                        text: "שים לב, לא יהיה אפשרות לשחזר את ההזמנה!",
                                        icon: "question",
                                        showCancelButton: true,
                                        cancelButtonText: "לא, ביטול!",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "כן, מחק!",
                                        confirmButtonColor: "#3a9633",
                                        reverseButtons: true
                                    }).then(async (result) => {
                                        if (result.isConfirmed) {
                                            try {
                                                let response = await fetch(`https://localhost:7279/api/Order/delete?id=${orderId}`, {
                                                    method: 'DELETE',
                                                });
                                                if (response.ok) {
                                                    // עדכון הסטייט כדי להסיר את השורה מהטבלה
                                                    setRows(prevRows => prevRows.filter(r => r.orderId !== orderId));
                                                    Swal.fire({
                                                        title: "ההזמנה נמחקה בהצלחה!",
                                                        text: "",
                                                        icon: "success",
                                                        showConfirmButton: false,
                                                        timer: 1500,

                                                    });
                                                } else {
                                                    swalWithBootstrapButtons.fire("שגיאה", "אירעה שגיאה במחיקת ההזמנה.", "error");
                                                }
                                            } catch (error) {
                                                console.error("שגיאה במחיקת ההזמנה", error);
                                                swalWithBootstrapButtons.fire("שגיאה", "אירעה שגיאה במחיקת ההזמנה.", "error");
                                            }
                                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                                            swalWithBootstrapButtons.fire({
                                                title: "המחיקה בוטלה!",
                                                text: "",
                                                icon: "error",
                                                confirmButtonColor: "#d33",

                                            });
                                        }
                                    });
                                };


                                return (
                                    <React.Fragment key={index}>
                                        <StyledTableRow>
                                            <div id="icon">
                                                <IconButton id="arrow" onClick={() => handleExpandRow(index)}>
                                                    {isRowExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                </IconButton>
                                            </div>
                                            {!isRowExpanded && (
                                                <>
                                                    <StyledTableCell align="center" id="td">{format(new Date(row.orderDate), 'dd/MM/yyyy')}</StyledTableCell>
                                                    <StyledTableCell align="center" id="td">{userNames[row.userId] || ''}</StyledTableCell>
                                                    <StyledTableCell align="center" id="td">{row.roomId}</StyledTableCell>
                                                    <StyledTableCell align="center" id="del">
                                                        <IconButton onClick={() => handleDelete(row.orderId)} id="delete">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </>
                                            )}
                                            {isRowExpanded && (
                                                <div align="right" id='od'>
                                                    <b id="b"> שם:</b>
                                                    {userNames[row.userId]}
                                                    <br></br>
                                                    <b id="b"> תאריך:</b>
                                                    {format(new Date(row.orderDate), 'dd/MM/yyyy')}
                                                    <br></br>
                                                    <b id="b">חדר:</b>
                                                    {row.roomId}
                                                    <br></br>
                                                    <b id="b">טלפון:</b>
                                                    {row.userId}
                                                    <br />
                                                    <b id="b">אימייל:</b>
                                                    {userEmail[row.userId] || 'טוען...'}
                                                </div>
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
    )
};