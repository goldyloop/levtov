using BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class CustomerService : ICustomerService
    {
        public Customer Add(Customer entity)
        {
            throw new NotImplementedException();
        }

        public Customer Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Customer Get()
        {
            return new Customer();
        }

        public List<Customer> GetAll()
        {
            throw new NotImplementedException();
        }

        public Customer Update(Customer entity, int id)
        {
            throw new NotImplementedException();
        }
    }
}
