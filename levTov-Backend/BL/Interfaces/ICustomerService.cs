using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces;

public interface ICustomerService
{
    List<Customer> GetAll();
    Customer Get();
    Customer Add(Customer entity);
    Customer Update(Customer entity, int id);
    Customer Delete(int id);
}
