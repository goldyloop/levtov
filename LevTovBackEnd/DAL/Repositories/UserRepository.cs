using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Repositories;


public class UserRepository : ICRUD<User>
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }


    public async Task<User> CreateAsync(User item)
    {
        _context.Users.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Users.FindAsync(id);
        if (product == null)
            return false;
        _context.Users.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<IEnumerable<User>> ReadAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
    public async Task<User> ReadAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }
    public async Task<User> ReadPhoneAsync(string PhoneNumber)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.UserId == PhoneNumber);
    }

    public async Task<User> UpdateAsync(object id, User item)
    {
        if (id != item.UserId) return null;
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return item;
    }
}
