using Microsoft.AspNetCore.Mvc;
using BL.Interfaces;

namespace Trying__levTovBE.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly ICustomerService _customerService;

        public CustomerController(ILogger<CustomerController> logger, ICustomerService customerService)
        {
            _logger = logger;
            _customerService = customerService;
        }

        [HttpGet(Name = "GetCustomers")]
        public string Get()
        {

            return _customerService.Get().Name;

        }
    }
}
