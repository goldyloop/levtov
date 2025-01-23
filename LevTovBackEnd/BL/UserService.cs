using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DAL.Models;
using DAL.Repositories;

namespace BL
{
    public class UserService
    {
        private readonly UserRepository userRepository;

        public UserService(UserRepository userRepository_)
        {
            userRepository = userRepository_;
        }
        public Task<IEnumerable<User>> GetAllUsers()
        {
            // כאן ניתן להוסיף לוגיקה נוספת לפי הצורך
            // קריאה לשכבת ה-DAL לקבלת הנתונים
            return userRepository.ReadAllAsync();
        }


        public Task<User> GetUser(string phone)
        {
            return userRepository.ReadPhoneAsync(phone);
        }

        public Task<User> CreateUser(User item)
        {
            return userRepository.CreateAsync(item);
        }

        public Task<bool> DeleteUser(int id)
        {
            return userRepository.DeleteAsync(id);
        }
        public Task<User> UpdateUser(string id, User item)
        {
            return userRepository.UpdateAsync(id, item);
        }

      
    }
}

