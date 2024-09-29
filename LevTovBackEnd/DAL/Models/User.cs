using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Position { get; set; }

    public DateTime? CreatedAt { get; set; }
}
