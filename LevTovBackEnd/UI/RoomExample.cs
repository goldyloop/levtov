using BL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Controllers
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
        [HttpGet("get")]
        public Task<IEnumerable<Room>> Get()
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _roomService.GetRoom();
        }
        [HttpGet("check-db")]
        public async Task<IActionResult> CheckDatabase()
        {
            try
            {
                // ניסיון לבצע שאילתה פשוטה
                await _context.Rooms.FirstOrDefaultAsync();
                return Ok("Connection to the database is successful.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Database connection failed: {ex.Message}");
            }
        }
    }
}