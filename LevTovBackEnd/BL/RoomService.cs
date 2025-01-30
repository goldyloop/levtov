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
        private readonly OrderRepository orderRepository;

        public RoomService(RoomRepository roomRepository_, OrderRepository orderRepository_)
        {
            roomRepository = roomRepository_;
            orderRepository = orderRepository_;
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


        public async Task<IEnumerable<Room>> GetEmptyRoomsToDate(DateTime date)
        {
            // כל החדרים
            IEnumerable<Room> rooms = await roomRepository.ReadAllAsync();
            // כל ההזמנות
            IEnumerable<Order> orders = await orderRepository.ReadAllAsync();
            // סינון רק של ההזמנות שבתאריך שהתקבל
            IEnumerable<Order> ordersOnDate = orders.Where(order => order.OrderDate == date);
            // קח את כל ROOMID מההזמנות בתאריך הנתון
            var occupiedRoomIds = ordersOnDate.Select(order => order.RoomId).ToHashSet();
            // מצא את כל החדרים שלא מופיעים בהזמנות בתאריך הנתון
            IEnumerable<Room> emptyRooms = rooms.Where(room => !occupiedRoomIds.Contains(room.RoomId));

            return emptyRooms;
        }

        public async Task<string> DailyTask()
        {
            // מקבלים את היום בשבוע
            DayOfWeek dayOfWeek = DateTime.Now.DayOfWeek;

            // לפי היום בשבוע מחזירים את המחרוזת המתאימה
            switch (dayOfWeek)
            {
                case DayOfWeek.Sunday:
                    return "יום ראשון - תחילת שבוע!";
                case DayOfWeek.Monday:
                    return "יום שני - זמן להתחיל לעבוד!";
                case DayOfWeek.Tuesday:
                    return "יום שלישי - עוד יום להתקדם!";
                case DayOfWeek.Wednesday:
                    return "יום רביעי - חצי שבוע עבר!";
                case DayOfWeek.Thursday:
                    return "יום חמישי - כמעט סוף שבוע!";
                case DayOfWeek.Friday:
                    return "יום שישי - יום טוב!";
                case DayOfWeek.Saturday:
                    return "יום שבת - זמן למנוחה!";
                default:
                    return "היום לא תקין!";
            }
        }

    }
}

