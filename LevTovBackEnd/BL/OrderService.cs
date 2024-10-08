﻿
using DAL.Repositories;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class OrderService
    {
        private readonly OrderRepository orderRepository;

        public OrderService(OrderRepository orderRepository_)
        {
            orderRepository = orderRepository_;
        }

        public Task<IEnumerable<Order>> GetAllOrders()
        {
            // כאן ניתן להוסיף לוגיקה נוספת לפי הצורך
            // קריאה לשכבת ה-DAL לקבלת הנתונים
            return orderRepository.ReadAllAsync();
        }
        public Task<Order> GetOrder(int id)
        {
            return orderRepository.ReadAsync(id);
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


