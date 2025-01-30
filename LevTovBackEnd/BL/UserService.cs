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

        public Task<bool> DeleteUser(string id)
        {
            return userRepository.DeleteAsync(id);
        }
        public Task<User> UpdateUser(string id, User item)
        {
            return userRepository.UpdateAsync(id, item);
        }
        public async Task<IEnumerable<User>> GetAllManagers()
        {
            IEnumerable < User > users = await userRepository.ReadAllAsync();
            IEnumerable<User> managers = users.Where(user=>user.Position==1);
            return managers;
        }
        public async Task<IEnumerable<User>> GetManagersAndWorkers()
        {
            IEnumerable < User > users = await userRepository.ReadAllAsync();
            IEnumerable<User> managersAndWorkers = users.Where(user=>user.Position==1||user.Position==2);
            return managersAndWorkers;
        }


    }
}

