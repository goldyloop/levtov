//using System;
//using System.Threading;
//using System.Threading.Tasks;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;
//using Microsoft.Extensions.DependencyInjection;
//using BL; // ודאי שה-namespace נכון בהתאם למיקום שכבת ה-BL

//public class RoomBackgroundService : BackgroundService
//{
//    private readonly IServiceScopeFactory _serviceScopeFactory;
//    private readonly ILogger<RoomBackgroundService> _logger;

//    public RoomBackgroundService(IServiceScopeFactory serviceScopeFactory, ILogger<RoomBackgroundService> logger)
//    {
//        _serviceScopeFactory = serviceScopeFactory;
//        _logger = logger;
//    }

//    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
//    {
//        Console.WriteLine(  "הפונקציה כאן מופעלת.....");
//        while (!stoppingToken.IsCancellationRequested)
//        {
//            DateTime now = DateTime.Now;
//            DateTime nextRun = now.Date.AddHours(18).AddMinutes(18); // 16:15 היום
//            if (now > nextRun)
//            {
//                nextRun = nextRun.AddDays(1); // אם השעה כבר עברה היום, נקבע למחר
//            }

//            TimeSpan delay = nextRun - now;
//            _logger.LogInformation($"RoomBackgroundService מתוזמן לרוץ בעוד: {delay.TotalHours} שעות.");

//            await Task.Delay(delay, stoppingToken); // המתנה עד 16:15
//            if (!stoppingToken.IsCancellationRequested)
//            {
//                try
//                {
//                    using (var scope = _serviceScopeFactory.CreateScope()) // יצירת Scope חדש
//                    {
//                        var roomService = scope.ServiceProvider.GetRequiredService<RoomService>(); // קבלת השירות
//                        _logger.LogInformation("מריץ getAllRoomsForToday...");
//                        roomService.UpdateRoomsForToday(); // קריאה לפונקציה
//                        _logger.LogInformation("המשימה הסתיימה בהצלחה.");
//                    }
//                }
//                catch (Exception ex)
//                {
//                    _logger.LogError($"שגיאה בביצוע המשימה: {ex.Message}");
//                }
//            }
//        }
//    }
//}
