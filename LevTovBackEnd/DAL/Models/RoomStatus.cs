using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class RoomStatus
{
    public int StatusId { get; set; }

    public string? StatusDescription { get; set; }

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
