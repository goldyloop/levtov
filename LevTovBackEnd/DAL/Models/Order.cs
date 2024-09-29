using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public DateOnly? OrderDate { get; set; }

    public int? RoomId { get; set; }

    public string? GuestName { get; set; }

    public string? GuestPhoneNumber { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Room? Room { get; set; }
}
