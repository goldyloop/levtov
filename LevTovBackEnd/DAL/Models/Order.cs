using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public DateTime? OrderDate { get; set; }

    public int? RoomId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? UserId { get; set; }

    public virtual Room? Room { get; set; }

    public virtual User? User { get; set; }
}
