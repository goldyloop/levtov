
using DAL.Repositories;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;

namespace BL
{
    public class OrderService
    {
        private readonly OrderRepository orderRepository;
        private readonly RoomRepository roomRepository;

        public OrderService(OrderRepository orderRepository_)
        {
            orderRepository = orderRepository_;
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            var orders = await orderRepository.ReadAllAsync();

            // מיין את ההזמנות לפי תאריך
            return orders.OrderByDescending(o => o.OrderDate);
        }

        public Task<IEnumerable<Order>> GetAllOrdersByUserName(string userName)
        {

            return orderRepository.ReadAllAsync();
        }

        public Task<Order> GetOrder(int id)
        {
            return orderRepository.ReadAsync(id);
        }
        public async Task<Order> GetRoomIdByUserIdAndForToday(string userId)
        {

            IEnumerable<Order> AllOrdersArr =await orderRepository.ReadAllAsync();
            Order orderArr = AllOrdersArr.First(order => order.OrderDate == DateTime.Today && userId == order.UserId);
            return orderArr;

        }
        public async Task<Order> GetOrderByUserIdAndDate(string userId, DateTime date)
        {

            IEnumerable<Order> AllOrdersArr =await orderRepository.ReadAllAsync();
            Order order = AllOrdersArr.FirstOrDefault(order => order.OrderDate == date && userId == order.UserId);
            return order;

        }
        public Task<Order> CreateOrder(Order item)
        {
            return orderRepository.CreateAsync(item);
        }
        public Task<Order> UpdateOrder(int id, Order item)
        {
            return orderRepository.UpdateAsync(id, item);
        }
        public Task<bool> DeleteOrder(int id)
        {
            return orderRepository.DeleteAsync(id);
        }



    }
}


