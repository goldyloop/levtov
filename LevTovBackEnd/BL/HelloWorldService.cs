using DAL;
using DAL.Repositories;

namespace BL
{
    public class HelloWorldService
    {
        private readonly HelloWorldRepository _helloWorldRepository;

        public HelloWorldService(HelloWorldRepository helloWorldRepository_)
        {
            _helloWorldRepository = helloWorldRepository_;
        }



        public string GetHelloWorld()
        {
            // כאן ניתן להוסיף לוגיקה נוספת לפי הצורך
            // קריאה לשכבת ה-DAL לקבלת הנתונים
            return _helloWorldRepository.GetHelloWorld();
        }
    }
}