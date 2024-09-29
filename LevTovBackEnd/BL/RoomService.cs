using DAL;
using DAL.Models;
using DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class RoomService
    {
        private readonly RoomRepository roomRepository;

        public RoomService(RoomRepository roomRepository_)
        {
            roomRepository = roomRepository_;
        }

        public Task<IEnumerable<Room>> GetRoom()
        {
            // כאן ניתן להוסיף לוגיקה נוספת לפי הצורך
            // קריאה לשכבת ה-DAL לקבלת הנתונים
            return roomRepository.ReadAllAsync();
        }
    }
}
