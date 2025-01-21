using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class OrderRepository : ICRUD<Order>
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateAsync(Order item)
        {
            _context.Orders.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Orders.FindAsync(id);
            if (product == null) return false;
            _context.Orders.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Order>> ReadAllAsync()
        {
            //Console.WriteLine( "hello world");
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> ReadAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        

        public async Task<Order> UpdateAsync(object id, Order item)
        {
            if ((int)id != item.OrderId) return null;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return item;
        }
    }
}


