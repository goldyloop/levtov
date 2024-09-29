using BL;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloWorldController : ControllerBase
    {
        private HelloWorldService _helloWorldService;

        public HelloWorldController(HelloWorldService helloWorldService_, HelloWorldService helloWorldService)
        {
            _helloWorldService = helloWorldService;
        }

        //GET: api/helloworld
        [HttpGet]
        public ActionResult<string> Get()
        {
            // קריאה לשכבת ה-BLL כדי לקבל את המחרוזת
            return _helloWorldService.GetHelloWorld();
        }
    }
}