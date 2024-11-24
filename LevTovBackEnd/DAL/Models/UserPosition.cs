using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class UserPosition
{
    public int PositionId { get; set; }

    public string? PositionDescription { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
