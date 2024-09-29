using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories
{
    public class RoomRepository : ICRUD<Room>
    {
        private readonly ApplicationDbContext _context;

        public RoomRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Room> CreateAsync(Room item)
        {
            _context.Rooms.Add(item);
            await _context.SaveChangesAsync();
            return item;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _context.Rooms.FindAsync(id);
            if (product == null) return false;
            _context.Rooms.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Room>> ReadAllAsync()
        {
            //Console.WriteLine( "hello world");
            return await _context.Rooms.ToListAsync();
        }

        public async Task<Room> ReadAsync(int id)
        {
            return await _context.Rooms.FindAsync(id);
        }

        public async Task<Room> UpdateAsync(int id, Room item)
        {
            if (id != item.RoomId) return null;
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return item;
        }
    }
}
