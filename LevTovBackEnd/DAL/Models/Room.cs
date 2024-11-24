using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Room
{
    public int RoomId { get; set; }

    public int? RoomStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
