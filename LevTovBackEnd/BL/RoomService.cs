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

        public Task<IEnumerable<Room>> GetAllRooms()
        {
            // כאן ניתן להוסיף לוגיקה נוספת לפי הצורך
            // קריאה לשכבת ה-DAL לקבלת הנתונים
            return roomRepository.ReadAllAsync();
        }

        public Task<Room> GetRoom(int id)
        {
            return roomRepository.ReadAsync(id);
        }

        public Task<Room> CreateRoom(Room item)
        {
            return roomRepository.CreateAsync(item);
        }

        public Task<bool> DeleteRoom(int id)
        {
            return roomRepository.DeleteAsync(id);
        }

        public Task<Room> UpdateRoom(int id, Room item)
        {
            return roomRepository.UpdateAsync(id, item);
        }
    }
}

