//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace DAL.Interfaces
//{
//    internal interface ICrud
//    {

//    }
//}
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICRUD<T>
{
    Task<T> CreateAsync(T item);
    Task<T> ReadAsync(int id);
    Task<IEnumerable<T>> ReadAllAsync();
    Task<T> UpdateAsync(int id, T item);
    Task<bool> DeleteAsync(int id);
}
