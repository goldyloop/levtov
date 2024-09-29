using DAL.Models;
namespace DAL
{
    public class HelloWorldRepository
    {
        private readonly ApplicationDbContext _context;
        public HelloWorldRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public string GetHelloWorld()
        {
            // מחזיר את המחרוזת מה-DAL
            return "hello world this is";
        }
        
    }
}
