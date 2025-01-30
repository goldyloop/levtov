import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/src/sweetalert2.js';
// import '@sweetalert2/themes/dark/dark.scss';


const getUserById = async (phone) => {
    let userPhone = phone
    let user;
    try {
        const response = await fetch(`https://localhost:7279/api/User/get/${userPhone}`);
        if (response.status === 200) {
            user = await response.json()
            return user
        }
        else if (response.status === 204) {
            return null
        }
        // return user
    }
    catch (err) {
        console.log("לא התחבר");
    }
}
const getManagersAndWorkers = async () => {
    try {
        let response = await fetch("https://localhost:7279/api/User/getManagersAndWorkers")
        if (!response.ok) {
            console.error("שגיאה בקבלת המנהלים והעובדים מהשרת");
        }
        response = await response.json();
        return response;
    }
    catch (err) {
        console.error(err);
    }
}
const deleteUser = async (phone) => {
    try {
        let response = await fetch(`https://localhost:7279/api/User/delete/${phone}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            console.error("מחיקת המשתמש נכשלה");
            return;
        }
        response = await response.json();
        return response;
        // console.log("response", response);
    }
    catch (err) {
        console.error(err);
    }
}
const createNewUser = async (user) => {
    const newUser = user
    try {
        const response = await fetch('https://localhost:7279/api/User/create', {
            method: 'POST', // סוג הקריאה
            headers: {
                'Content-Type': 'application/json', // מגדירים שהנתונים שנשלחים הם בפורמט JSON
            },
            body: JSON.stringify(newUser), // המרת הנתונים לפורמט JSON לפני השליחה
        });
        if (!response.ok) {
            console.log("תקלה ביצירת המשתמש ")
            return false;
        }
        const result = await response.json()
        return true;
        // alert(result.userName)
    }
    catch (err) {
        console.error(err);
    }
}
const enoughManagers = async () => {
    try {
        let response = await fetch("https://localhost:7279/api/User/getAllManagers")
        if (!response.ok) {
            console.error("בעייה בקבלת כל המנהלים");
            return;
        }
        response = await response.json();
        console.log("מנהלים:", response);

        if (response.length < 2) {
            return false
        }
        return true;
    } catch (err) {
        console.error(err);
    }
}
const UpdateManagerOrWorker = () => {
    const [user, setUser] = useState(null)
    const [currentPassword, setCurrentPassword] = useState('')
    const [wontedPassword, setWontedPassword] = useState('')
    const [wontedPassword2, setWontedPassword2] = useState('')
    useEffect(() => {
        handlePhoneChange()
    }, [currentPassword])
    const handlePhoneChange = async () => {
        // const currentPassword = value;
        if (currentPassword.length == 10) {
            let u = await getUserById(currentPassword)
            setUser(u)
        }
        else {
            setUser(null)
        }
    }
    const updatePassword = async () => {
        let newUser = { ...user, userId: wontedPassword2 }
        // console.log(newUser);
        let d = await deleteUser(currentPassword)
        if (d) {
            let c = createNewUser(newUser)
            if (c) {
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "המשתמש עודכן",
                    showConfirmButton: true,
                    timer: 1500
                }).then(() => {
                    window.location.reload();
                });
            }
        }
        else {
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "תקלה בעדכון המשתמש ",
                text: "נסו שוב מאוחר יותר",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
        }
    }
    return (
        // <div id='option-body'>
        <div>
            <input
                type="text"
                className="password-inputs"
                onChange={(e) => { setCurrentPassword(e.target.value) }}
                placeholder="הכנס את סיסמת המנהל/עובד שברצונך לשנות">
            </input>
            {((currentPassword.length >= 1) && (currentPassword.length < 10)) && !user &&
                <span className="password-errors">מספר לא תקין</span>
            }
            {(currentPassword.length == 10 && (!user || user.position == 3)) &&
                <span className="password-errors"> לא קיים מנהל או עובד עם המספר שהקשת</span>
            }
            {user && user.position == 1 &&
                (<>
                    <span id="password-good-errors"> נמצא המנהל : {user.userName}</span>
                    {/* <h6>{wontedPassword}</h6> */}
                </>)
            }
            {user && user.position == 2 &&
                (<>
                    <span id="password-good-errors"> נמצא העובד : {user.userName}</span>
                    {/* <h6>{wontedPassword}</h6> */}
                </>)
            }
            <input
                type="text"
                className="password-inputs"
                onChange={(e) => { setWontedPassword(e.target.value) }}
                disabled={!(user && (user.position == 1 || user.position == 2))}
                placeholder="הכנס את הסיסמה החדשה">
            </input>
            <input
                type="text"
                className="password-inputs"
                onChange={(e) => { setWontedPassword2(e.target.value) }}
                disabled={(wontedPassword.length != 10)}
                placeholder="אמת את הסיסמה החדשה">
            </input>
            {(wontedPassword.length == 10 && wontedPassword2.length == 10 && wontedPassword != wontedPassword2) &&
                <span className="password-errors">אימות הסיסמה החדשה לא הצליח</span>
            }
            <button
                className="OK-button"
                disabled={!(wontedPassword2.length == 10 && wontedPassword == wontedPassword2)}
                onClick={updatePassword}
            >
                שנה סיסמה
            </button>

        </div>
    );
}
// const validationSchema = Yup.object({
//     name: Yup.string().required('שם הוא שדה חובה').min(2, 'השם חייב להיות לפחות 2 תווים'),
//     phone: Yup.string()
//         .required('טלפון הוא שדה חובה')
//         .matches(/^[0-9]{10}$/, 'טלפון חייב להכיל 10 ספרות'),
//     email: Yup.string().required('מייל הוא שדה חובה').email('מייל לא תקין'),
//     role: Yup.string().required('יש לבחור תפקיד')
// });

const AddNewManager = () => {
    const [sameUser, setSameUser] = useState(null)
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        email: '',
        position: null
    });
    const [errors, setErrors] = useState({
        userId: '',
        userName: '',
        email: '',
        position: ''
    });

    useEffect(() => {
        const upd = async () => {
            if ((formData.userId).length === 10) {
                let u = await getUserById(formData.userId);
                setSameUser(u);
            }
        }
        upd()
    }, [formData.userId])

    const checkErrors = async () => {
        const newErrors = {};
        if (!formData.userId) {
            newErrors.userId = "חובה להכניס מספר טלפון";
        }
        if (formData.userId && formData.userId.length != 10) {
            newErrors.userId = "מספר לא תקין";
        }
        if (sameUser) {
            newErrors.userId = "כבר קיים משתמש עם מספר זה";
        }
        if (!formData.userName) {
            newErrors.userName = "חובה להכניס שם משתמש";
        }
        if (!formData.position) {
            newErrors.position = "חובה לבחור תפקיד";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // אם אין שגיאות, מחזירים true
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        let err = await checkErrors()
        if (!err) {
            return
        }
        console.log("formData", formData);
        // createNewUser(formData)
        let c = await createNewUser(formData)
        if (c) {
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "המשתמש נשמר בהצלחה",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
        }
        else {
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "תקלה ביצירת המשתמש ",
                text: "נסו שוב מאוחר יותר",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });

        }
    }
    return (
        // <div id='option-body'>
        <div>
            <form onSubmit={submit}>
                <div>
                    <input
                        type="text"
                        className="password-inputs"
                        name="userName"
                        onChange={(e) => { handleChange(e) }}
                        placeholder="הכנס שם"
                    />
                    {errors.userName && <span className="password-errors">{errors.userName}</span>}
                </div>

                <div>
                    <input
                        type='phone'
                        className="password-inputs"
                        name="userId"
                        placeholder="הכנס טלפון"
                        onChange={(e) => { handleChange(e) }}
                    // onBlur={(e) => { checkErrors(e) }}
                    >
                    </input>
                    {errors.userId && <span className="password-errors">{errors.userId}</span>}
                </div>

                <div>
                    <input
                        type="email"
                        className="password-inputs"
                        name="email"
                        value={formData.email}
                        // onBlur={(e) => { checkErrors(e) }}
                        onChange={handleChange}
                        placeholder="הכנס מייל"
                    />
                </div>

                <div>
                    <label>תפקיד:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="position"
                                value={1}
                                onChange={handleChange}
                            />
                            מנהל
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="position"
                                value={2}
                                onChange={handleChange}
                            />
                            עובד
                        </label>
                    </div>
                    {errors.position && <span className="password-errors">{errors.position}</span>}
                </div>

                <div>
                    <button className="OK-button" type="submit" >הוסף משתמש</button>
                </div>
            </form>
        </div>
    );
}
const DeleteExistingManager = () => {
    const [user, setUser] = useState(null)
    const [currentPassword, setCurrentPassword] = useState('')
    let [isEnoughManagers, setIsEnoughManagers] = useState(false);

    useEffect(() => {
        handlePhoneChange()
        chackIsEnoughManagers();
    }, [currentPassword])
    const handlePhoneChange = async () => {
        // const currentPassword = value;
        if (currentPassword.length == 10) {
            let u = await getUserById(currentPassword)
            setUser(u)
        }
        else {
            setUser(null)
        }
    }
    const chackIsEnoughManagers = async () => {
        let en = await enoughManagers();
        setIsEnoughManagers(en);
        console.log(isEnoughManagers);
    }
    const deleteManagerOrWorker = async () => {
        // alert(isEnoughManagers)
        // alert("המשתמש ימחק כאן")
        // alert(user.position === 1 && (!isEnoughManagers))
        if (user.position === 1 && (!isEnoughManagers)) {
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "בעייה במחיקת המנהל",
                text: "אין אפשרות למחוק את המנהל כיוון שהוא המנהל היחיד, באפשרותך לייצור קודם מנהל חדש ואז למחוק את מנהל זה",
                showConfirmButton: true
            }).then(() => {
                window.location.reload();
            });
            return;
        }
        let d = await deleteUser(currentPassword)
        if (d) {
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "המשתמש נמחק בהצלחה",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
        }
        else {
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "תקלה במחיקת המשתמש ",
                text: "נסו שוב מאוחר יותר",
                showConfirmButton: true,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });
        }
    }
    return (
        // <div id='option-body'>
        <div>
            <input
                type="text"
                className="password-inputs"
                onChange={(e) => { setCurrentPassword(e.target.value) }}
                placeholder="הכנס את סיסמת המנהל שברצונך לשנות">
            </input>
            {((currentPassword.length >= 1) && (currentPassword.length < 10)) && !user &&
                <span className="password-errors">מספר לא תקין</span>
            }
            {(currentPassword.length == 10 && (!user || user.position == 3)) &&
                <span className="password-errors"> לא קיים מנהל או עובד עם המספר שהקשת</span>
            }
            {user && user.position == 1 &&
                (<>
                    <span id="password-good-errors"> נמצא המנהל : {user.userName}</span>
                </>)
            }
            {user && user.position == 2 &&
                (<>
                    <span id="password-good-errors"> נמצא העובד : {user.userName}</span>
                </>)
            }
            <button
                className="OK-button"
                disabled={!user}
                onClick={deleteManagerOrWorker}
            >
                מחק משתמש
            </button>
        </div>
    );
};


const UsersTable = () => {
    const [users, setUsers] = useState([]);

    // סימולציה של חיבור ל-API או קבלת נתונים מהשרת
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getManagersAndWorkers();
            if (data) {
                // console.error("");
                setUsers(data);
            }
        };

        fetchUsers();
    }, []);

    // פילוח המשתמשים לפי תפקיד
    const managers = users.filter(user => user.position === 1);
    const employees = users.filter(user => user.position === 2);

    return (
        <div>
            <h2 className="table-titel">מנהלים</h2>
            <table id="users-table">
                {/* <thead> */}
                <tr>
                    <th id="name-column">שם</th>
                    <th id="phone-column">סיסמה</th>
                    <th id="email-column">מייל</th>
                    {/* <th>תפקיד</th> */}
                </tr>
                {/* </thead> */}
                <tbody>
                    {managers.length > 0 ? (
                        managers.map((user, index) => (
                            <tr key={index}>
                                <td id="name-column">{user.userName}</td>
                                <td id="phone-column">{user.userId}</td>
                                <td id="email-column">{user.email}</td>
                                {/* <td>מנהל</td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">לא נמצאו מנהלים</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2 className="table-titel">עובדים</h2>
            <table id="users-table">
                {/* <thead> */}
                <tr>
                    <th id="name-column">שם</th>
                    <th id="phone-column">סיסמה</th>
                    <th id="email-column">מייל</th>
                    {/* <th>תפקיד</th> */}
                </tr>
                {/* </thead> */}
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((user, index) => (
                            <tr key={index}>
                                <td id="name-column">{user.userName}</td>
                                <td id="phone-column">{user.userId}</td>
                                <td id="email-column">{user.email}</td>
                                {/* <td>עובד</td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">לא נמצאו עובדים</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export { UpdateManagerOrWorker, AddNewManager, DeleteExistingManager, UsersTable };