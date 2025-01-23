using BL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace UI
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly UserService _userService;
        public UserController(UserService userService_, ApplicationDbContext context)
        {
            _userService = userService_;
            _context = context;
        }
        //Get: api/hellloworld
        [HttpGet("get/{phone}")]
        public Task<User> Get(string phone)
        {
           // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
           return _userService.GetUser(phone);
        }

        [HttpGet("getAll")]
        public Task<IEnumerable<User>> GetAll()
        {
            return _userService.GetAllUsers();
        }
        [HttpPost("create")]
        public Task<User> Create(User item)
        {
            return _userService.CreateUser(item);
        }
        [HttpDelete("delete")]
        public Task<bool> delete(int id)
        {
            return _userService.DeleteUser(id);
        }
      





        [HttpPut("update/{id}")]
        public Task<User> Update(string id, [FromBody] User item)
        {
            return _userService.UpdateUser(id, item);
        }
    }
}


