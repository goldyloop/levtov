using BL;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace UI
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly OrderService _orderService;

        public OrderController(OrderService orderService_, ApplicationDbContext context)
        {
            _orderService = orderService_;
            _context = context;

        }

        //GET: api/helloworld
        [HttpGet("get")]
        public Task<Order> Get(int id)
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _orderService.GetOrder(id);
        }
        [HttpGet("getAll")] 
      
        public Task<IEnumerable<Order>> GetAll()
        {
            return _orderService.GetAllOrders();
        } 
        [HttpGet("GetRoomIdByUserId/{userId}")]
        public Task<IEnumerable<Order>> GetRoomIdByUserId(string userId)
        {
            return _orderService.GetRoomIdByUserId( userId);
        }


        [HttpPost("create")]
        public Task<Order> Create(Order item)
        {
            return _orderService.CreateOrder(item);
        }
        [HttpDelete("delete")]
        public Task<bool> Delete(int id)
        {
            return _orderService.DeleteOrder(id);
        }
        [HttpPut("update")]
        public Task<Order> Update(int id, Order item)
        {
            return _orderService.UpdateOrder(id, item);
        }
       
    }

}
