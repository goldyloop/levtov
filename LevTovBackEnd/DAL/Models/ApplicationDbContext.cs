using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<RoomStatus> RoomStatuses { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserPosition> UserPositions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=MYCOMP;Database=Lev_Tov;Trusted_Connection=True;Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("PK__Orders__C3905BCF0D3F3CA4");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasMaxLength(10);

            entity.HasOne(d => d.Room).WithMany(p => p.Orders)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("FK__Orders__RoomId__2A4B4B5E");

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Orders__UserId__4BAC3F29");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Rooms__32863939C0104119");

            entity.Property(e => e.RoomId).ValueGeneratedNever();
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.RoomStatusNavigation).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.RoomStatus)
                .HasConstraintName("FK__Rooms__RoomStatu__4CA06362");
        });

        modelBuilder.Entity<RoomStatus>(entity =>
        {
            entity.HasKey(e => e.StatusId).HasName("PK__RoomStat__C8EE20633F3EA41A");

            entity.ToTable("RoomStatus");

            entity.Property(e => e.StatusId).ValueGeneratedNever();
            entity.Property(e => e.StatusDescription)
                .HasMaxLength(25)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User_New__1788CC4CD79E1CD6");

            entity.Property(e => e.UserId).HasMaxLength(10);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(25);
            entity.Property(e => e.UserName).HasMaxLength(25);

            entity.HasOne(d => d.PositionNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Position)
                .HasConstraintName("FK__User_New__Positi__49C3F6B7");
        });

        modelBuilder.Entity<UserPosition>(entity =>
        {
            entity.HasKey(e => e.PositionId).HasName("PK__UserPosi__60BB9A7931129EAC");

            entity.ToTable("UserPosition");

            entity.Property(e => e.PositionId).ValueGeneratedNever();
            entity.Property(e => e.PositionDescription)
                .HasMaxLength(25)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
