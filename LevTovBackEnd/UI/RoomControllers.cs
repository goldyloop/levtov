using BL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace UI
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly RoomService _roomService;

        public RoomController(RoomService roomService_, ApplicationDbContext context)
        {
            _roomService = roomService_;
            _context = context;

        }

        //GET: api/helloworld
        [HttpGet("getAll")]
        public Task<IEnumerable<Room>> GetAllRooms()
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _roomService.GetAllRooms();
        }

        [HttpGet("get/{id}")]
        public Task<Room> GetRoomByID(int id)
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _roomService.GetRoom(id);
        }

        [HttpPost("create")]
        public Task<Room> CreateRoom([FromBody] Room item)
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _roomService.CreateRoom(item);
        }
        
        [HttpDelete("delete/{id}")]
        public Task<bool> DeleteRoom(int id)
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _roomService.DeleteRoom(id);
        }

         [HttpPut("update/{id}")]
        public Task<Room> UpdateRoom(int id, [FromBody] Room item)
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _roomService.UpdateRoom(id, item);
        }
    }
}